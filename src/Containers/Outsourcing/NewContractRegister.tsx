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
import {API_URLS, getOutsourcingList, postOutsourcingRegister} from '../../Api/mes/outsourcing'
import {postCustomerDelete} from '../../Api/mes/customer'
import DateInput from '../../Components/Input/DateInput'
import moment from 'moment'
import RadioInput from '../../Components/Input/RadioInput'
import { transferCodeToName } from '../../Common/codeTransferFunctions'
import NewItemPickerModal from '../../Components/Modal/NewItemPickerModal'

// 수주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
interface Props {
  match: any;
  // chilren: string;
}

const pickerModalData = {
    productLot: [
      {title: '품목명', key: 'material_name', width: 100},
      {title: '로트번호', key: 'LOT', width: 70},
      {title: '현재 재고량', key: 'current_stock', width: 70},
      {title: '보관장소', key: 'location_name', width: 100},
      {title: '재질', key: 'texture', width: 100},
      {title: '입고일', key: 'warehousing_date', width: 100},
    ],
    product: [
      {title: '품목명', key: 'material_name', width: 100},
      {title: '품목 종류', key: 'material_type', width: 100},
      {title: '현재 수량', key: 'stock', width: 100},
      {title: '공장', key: 'location', width: 100},
    ],
  }

const NewContractRegister = ({match}: Props) => {
  const history = useHistory()

  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
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

  const [materialType, setMaterialType] = useState<number>(30)
  const [materials, setMaterials] = useState<any[]>([])
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [material, setMaterial] = useState<string>('')

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

        {/* ------------------ */}
        <>
        <RadioBox>
            <RadioInput 
                title={'품목 종류'}
                id={''}
                contents={[
                {value: 30, title: '완제품'},
                {value: 10, title: '반제품'}
                ]}
                target={materialType}
                onChangeEvent={(e) => {
                setMaterials([])
                setMaterialType(e)
                }}
                width={120}
                line={false}/>
        </RadioBox>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{width: '100%', border: '0.5px solid #b3b3b3'}}>
                    <NewItemPickerModal isMultiSelect onClickEvent={(e) => setMaterials(e.map((v, i) => {
                      return {...v, count: v.current_stock}
                    }))}
                                     text={'품목을 선택해주세요'} type={materialType === 30 ? 'rawlot' : 'product'} title={'품목'}
                                     mainKey={'LOT'}
                                     etc={
                                       materialType === 30
                                         ? `option=1${material ? `&material=${material}` : ''}`
                                         : `option=1&filter=10`
                                     }
                                     tableHeaderValue={materialType === 30 ? pickerModalData.productLot : pickerModalData.product}
                                     select={materials}
                    />
                    <div>
                      {
                        //@ts-ignore
                        materials && materials.length !== 0
                          ?
                          <div style={{width: '100%', height: 'auto'}}>
                            <div style={{
                              display: 'flex',
                              marginTop: 5,
                              padding: 5
                            }}>
                              <div style={{flex: 1, textAlign: 'left'}}>품목명
                              </div>
                              <div style={{flex: 1, textAlign: 'left'}}>품목타입
                              </div>
                              {
                                materialType === 10 && <div style={{flex: 1, textAlign: 'left'}}>현재 수량
                                </div>
                              }
                              <div style={{flex: 1, textAlign: 'left'}}>출하 수량
                              </div>
                            </div>
                            {
                              //@ts-ignore
                              materials && materials.map((value, index) => {
                                return <div style={{
                                  display: 'flex',
                                  marginTop: 5,
                                  padding: 5
                                }}>
                                  <div style={{
                                    flex: 1, textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                  }}>
                                    <p
                                      style={{
                                        textAlign: 'left',
                                      }}>{transferCodeToName('material', value.material_type)}</p>
                                  </div>
                                  <div style={{
                                    flex: 1, textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                  }}>
                                    <p
                                      style={{
                                        textAlign: 'left',
                                      }}>{value.material_name}</p>
                                  </div>
                                  {
                                    materialType === 10 && <div style={{
                                      flex: 1, textAlign: 'left',
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'center'
                                    }}>
                                        <p
                                            style={{
                                              textAlign: 'left',
                                            }}>{value.stock}</p>
                                    </div>
                                  }
                                  <div style={{
                                    flex: 1,
                                    textAlign: 'left',
                                    width: 112,
                                    height: 36
                                  }}>
                                    <input type={'number'}
                                           style={{
                                             width: '112px',
                                             height: '24px',
                                             padding: 0,
                                             margin: '5px 0'
                                           }}
                                           value={
                                             //@ts-ignore
                                             materials[index].count ? materials[index].count + '' : 0
                                           }
                                           onChange={(e) => {
                                             const tmpDetailMaterials = materials

                                             //@ts-ignore
                                             tmpDetailMaterials[index] = {
                                               //@ts-ignore
                                               ...tmpDetailMaterials[index],
                                               count: Number(e.target.value)
                                             }

                                             setMaterials([...tmpDetailMaterials])

                                           }}/>
                                  </div>
                                </div>
                              })
                            }
                          </div>
                          : <div style={{padding: '10px 0 10px 0'}}>출하 할 품목을
                            선택해주세요.</div>
                      }
                    </div>
                  </div>
                </div>
        </>




        {/* <InputContainer title={'품목(품목명)'} width={120}>
          <ProductionPickerModal select={selectMaterial}
                                 onClickEvent={(e) => {
                                   setSelectMaterial({...selectMaterial, ...e})
                                 }} text={'품목명을 검색해주세요.'} type={1}/>
        </InputContainer>
        <NormalNumberInput title={'수량'} value={quantity} onChangeEvent={setQuantity} description={'수량을 입력하세요.'}
                           width={120}/>
        <NormalNumberInput title={'미납 수량'} value={unpaid} onChangeEvent={setUnpaid}
                           description={'미납 수량을 입력하세요.'}
                           width={120}/> */}



        <NormalInput title={'대금 지불조건'} value={paymentCondition} onChangeEvent={setPaymentCondition}
                     description={'대금 지불조건을 입력해 주세요.'} width={120}/>
        <DateInput title={'납기일'} description={''} value={selectDate} onChangeEvent={setSelectDate}
                   style={{width: '125%'}} inputStyle={{boxSizing: 'border-box'}}/>
        <NormalAddressInput title={'공장 주소'} value={inputData.location} titleWidth={'120px'}
                            onChangeEvent={(input) => setInputData(`location`, input)}/>
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


const RadioBox = Styled.div`
    display: flex;
    align-items: center;
    *{
        align-items: center;
    }
    &>div{
        width: 100%;
        span {
            padding-top: 0px !important;
        }
    }
`

export default NewContractRegister
