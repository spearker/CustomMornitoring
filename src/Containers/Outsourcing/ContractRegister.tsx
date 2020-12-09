import React, {useCallback, useEffect, useState} from 'react'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import ListHeader from '../../Components/Text/ListHeader'
import {useHistory} from 'react-router-dom'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import InputContainer from '../InputContainer'
import Styled from 'styled-components'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import NormalAddressInput from '../../Components/Input/NormalAddressInput'
import useObjectInput from '../../Functions/UseInput'
import OutsourcingPickerModal from '../../Components/Modal/OutsourcingRegister'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {API_URLS, getOutsourcingList, postOutsourcingRegister} from "../../Api/mes/outsourcing";
import {postCustomerDelete} from "../../Api/mes/customer";

// 수주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
interface Props {
    match: any;
    // chilren: string;
}

const ContractRegister = ({match}: Props) => {
    const history = useHistory()

    const [selectDate, setSelectDate] = useState<string>('')
    const [pk, setPk] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [no, setNo] = useState<number>()
    const [type, setType] = useState<number>(0) //0: 법인, 1:개인
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [fax, setFax] = useState<string>('')
    const [phoneM, setPhoneM] = useState<string>('')
    const [emailM, setEmailM] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [manager, setManager] = useState<string>('')
    const [ceo, setCeo] = useState<string>('')
    const [infoList, setInfoList] = useState<IInfo[]>([])

    const [paths, setPaths] = useState<any[1]>([null])
    const [oldPaths, setOldPaths] = useState<any[1]>([null])

    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>()
    const [selectOutsource, setSelectOutsource] = useState<{ name?: string, pk?: string }>()
    const [quantity, setQuantity] = useState<number>()
    const [unpaid, setUnpaid] = useState<number>()
    const [paymentCondition, setPaymentCondition] = useState('')

    //생산품 검색
    const [isPoupup, setIsPoupup] = useState<boolean>(false)
    const [isSearched, setIsSearched] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    const [checkList, setCheckList] = useState<IMaterial[]>([])
    const [list, setList] = useState<IMaterial[]>([])
    const [searchList, setSearchList] = useState<IMaterial[]>([])

    const [inputData, setInputData] = useObjectInput('CHANGE', {
        name: '',
        description: '',
        location: {
            postcode: '',
            roadAddress: '',
            detail: '',
        },

    })

    useEffect(() => {
        if (match.params.pk) {
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    }, [])

    const onClickSearch = useCallback(async (e) => {
        ////alert('keyword')
        e.preventDefault()
        let type = 'material'
        // //alert('keyword')
        if (isPoupup === true) {
            type = 'material'
        } else {
            return
        }

        if (keyword === '' || keyword.length < 2) {
            //alert('2글자 이상의 키워드를 입력해주세요')

            return
        }
        setIsSearched(true)

        const res = await getRequest(`${SF_ENDPOINT}/api/v1/${type}/search?keyword=` + keyword, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                const results = res.results
                if (isPoupup === true) {
                    setSearchList(results)
                } else {
                    return
                }


            } else {
                //TODO:  기타 오류
            }
        }
    }, [keyword])

    /**
     * addFiles()
     * 사진 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFiles = async (event: any, index: number): Promise<void> => {

        if (event.target.files[0] === undefined) {

            return
        }

        if (event.target.files[0].type.includes('image')) { //이미지인지 판별

            const tempFile = event.target.files[0]

            const res = await uploadTempFile(event.target.files[0])

            if (res !== false) {
                const tempPatchList = paths.slice()
                tempPatchList[index] = res
                setPaths(tempPatchList)
                return
            } else {
                return
            }

        } else {

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }


    /**
     * getData()
     * 기계 정보 수정을 위한 조회
     * @param {string} url 요청 주소
     * @param {string} pk 기계 pk
     * @returns X
     */
    const getData = useCallback(async () => {

        const tempUrl = `${API_URLS['contract'].load}?pk=${match.params.pk}`
        const res = await getOutsourcingList(tempUrl)

        if (res === false) {
            //TODO: 에러 처리
        } else {
            const data = res
            setInputData('location', data.address)
            setSelectMaterial({name: data.product, pk: data.product_pk})
            setSelectOutsource({name: data.company_name, pk: data.company_pk})
            setQuantity(data.quantity)
            setUnpaid(data.unpaid)
            setSelectDate(data.due_date)
            setPaymentCondition(data.payment_condition)
        }
    }, [pk, selectOutsource, selectMaterial, selectDate, quantity, unpaid, paymentCondition, inputData])

    /**
     * onsubmitFormUpdate()
     * 기계 정보 수정 요청
     * @param {string} url 요청 주소
     * @param {string} pk 기계 pk
     * @param {string} name 이름
     * @param {string} no 넘버
     * @param {object(file)} file 사진 파일
     * @param {string} info 상세정보
     * @param {string} made 제조정보
     * @param {string} type 종류
     * @param {string} madeNo 제조사넘버
     * @returns X
     */
    const onsubmitFormUpdate = useCallback(async () => {

        if (selectOutsource?.pk === '' || selectOutsource?.pk === undefined) {
            alert('외주처는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMaterial?.pk === '' || selectMaterial?.pk === undefined) {
            alert('품목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (!quantity || quantity === 0) {
            alert('수량은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (unpaid === null) {
            alert('미납 수량은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (paymentCondition === '') {
            alert('대급 지불조건은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (selectDate === '') {
            alert('납기일은 필수 항목입니다. 반드시 선택주세요.')
            return
        } else if (inputData.location.postcode === '') {
            alert('공장 주소는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            pk: match.params.pk,
            company: selectOutsource?.pk,
            product: selectMaterial?.pk,
            quantity: quantity.toString(),
            unpaid: String(unpaid),
            due_date: selectDate,
            payment_condition: paymentCondition,
            address: inputData.location
            //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
        }

        const tempUrl = `${API_URLS['contract'].update}`
        const res = await postOutsourcingRegister(tempUrl, data)

        if (res) {
            ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        } else {
            history.goBack()

        }


    }, [pk, selectOutsource, selectMaterial, selectDate, quantity, unpaid, paymentCondition, inputData])

    /**
     * onsubmitForm()
     * 기계 정보 등록
     * @param {string} url 요청 주소
     * @param {string} name 이름
     * @param {string} no 넘버
     * @param {string} info 상세정보
     * @param {string} made 제조정보
     * @param {string} type 종류
     * @param {string} madeNo 제조사넘버
     * @returns X
     */
    const onsubmitForm = useCallback(async () => {
        ////alert(JSON.stringify(infoList))
        if (selectOutsource?.pk === '' || selectOutsource?.pk === undefined) {
            alert('외주처는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMaterial?.pk === '' || selectMaterial?.pk === undefined) {
            alert('품목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (quantity === null) {
            alert('수량은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (unpaid === null) {
            alert('미납 수량은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (paymentCondition === '') {
            alert('대급 지불조건은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (selectDate === '') {
            alert('납기일은 필수 항목입니다. 반드시 선택주세요.')
            return
        } else if (inputData.location.postcode === '') {
            alert('공장 주소는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }
        const data = {
            company: selectOutsource?.pk,
            product: selectMaterial?.pk,
            quantity: String(quantity),
            unpaid: String(unpaid),
            due_date: selectDate,
            payment_condition: paymentCondition,
            address: inputData.location

        }
        const tempUrl = `${API_URLS['contract'].register}`
        const res = await postOutsourcingRegister(tempUrl, data)

        if (res) {
            //TODO: 에러 처리
            history.push('/outsourcing/contract/list')

        }

    }, [selectOutsource, selectMaterial, selectDate, quantity, unpaid, paymentCondition, inputData])


    return (
        <div>
            <Header title={isUpdate ? '수주 수정' : '수주 등록'}/>
            <WhiteBoxContainer>
                <ListHeader title="필수 항목"/>
                <InputContainer title={'외주처 명'} width={120}>
                    <OutsourcingPickerModal select={selectOutsource}
                                            onClickEvent={(e) => {
                                                setSelectOutsource({...selectOutsource, ...e})
                                            }} text={'외주처 명을 검색해주세요.'}/>
                </InputContainer>
                <InputContainer title={'품목(품목명)'} width={120}>
                    <ProductionPickerModal select={selectMaterial}
                                           onClickEvent={(e) => {
                                               setSelectMaterial({...selectMaterial, ...e})
                                           }} text={'품목명을 검색해주세요.'} type={1}/>
                </InputContainer>
                <NormalNumberInput title={'수량'} value={quantity} onChangeEvent={setQuantity} description={'수량을 입력하세요.'}
                                   width={120}/>
                <NormalNumberInput title={'미납 수량'} value={unpaid} onChangeEvent={setUnpaid}
                                   description={'미납 수량을 입력하세요.'}
                                   width={120}/>
                <NormalInput title={'대금 지불조건'} value={paymentCondition} onChangeEvent={setPaymentCondition}
                             description={'대금 지불조건을 입력해 주세요.'} width={120}/>
                <InputContainer title={'납기일'} width={120}>
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: '#f4f6fa',
                        border: '0.5px solid #b3b3b3',
                        height: 32
                    }}>
                        <div style={{width: 817, display: 'table-cell'}}>
                            <div style={{marginTop: 5}}>
                                {
                                    selectDate === ''
                                        ? <InputText>&nbsp; 납기일을 선택해 주세요.</InputText>
                                        : <InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                                }
                            </div>
                        </div>
                        <ColorCalendarDropdown unLimit={true} select={selectDate} onClickEvent={(select) => {
                            setSelectDate(select)
                        }} text={'날짜 선택'} type={'single'} customStyle={{height: 32, marginLeft: 0}}/>
                    </div>
                </InputContainer>
                <NormalAddressInput title={'공장 주소'} value={inputData.location}
                                    onChangeEvent={(input) => setInputData(`location`, input)}/>
                {/* 자유항목 입력 창
             <FullAddInput title={'자유 항목'}  ={()=>{
              const tempInfo = infoList.slice()=-
              tempInfo.push({title:`자유 항목 ${infoList.length + 1}`, value:""});
              setInfoList(tempInfo)
            }}>
              {
                infoList.map((v: IInfo, i)=>{
                  return(
                      <CustomIndexInput index={i} value={v}
                      onRemoveEvent={()=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1)
                        setInfoList(tempInfo)
                      }}
                      onChangeEvent={(obj: IInfo)=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1, obj)
                        setInfoList(tempInfo)
                      }}
                      />
                  )
                })
              }
              </FullAddInput>

            */}
                {isUpdate ?
                    <div style={{marginTop: 72, marginLeft: 340}}>
                        <ButtonWrap onClick={async () => {
                            await onsubmitFormUpdate()
                        }}>
                            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
                                <p style={{fontSize: 18}}>수정하기</p>
                            </div>
                        </ButtonWrap>
                    </div>
                    :
                    <div style={{marginTop: 72, marginLeft: 340}}>
                        <ButtonWrap onClick={async () => {
                            await onsubmitForm()
                        }}>
                            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
                                <p style={{fontSize: 18}}>등록하기</p>
                            </div>
                        </ButtonWrap>
                    </div>
                }
            </WhiteBoxContainer>
        </div>
    )
}

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`


const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
`

export default ContractRegister
