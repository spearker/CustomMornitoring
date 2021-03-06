import React, {useCallback, useEffect, useState} from 'react'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import NormalFileInput from '../../Components/Input/NormalFileInput'
import {getToken} from '../../Common/tokenFunctions'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import ListHeader from '../../Components/Text/ListHeader'
import OldFileInput from '../../Components/Input/OldFileInput'
import RadioInput from '../../Components/Input/RadioInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import NormalAddressInput from '../../Components/Input/NormalAddressInput'
import useObjectInput from '../../Functions/UseInput'
import Styled from 'styled-components'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {API_URLS, postOutsourcingRegister} from "../../Api/mes/outsourcing";
import {getCustomerData} from "../../Api/mes/customer";

// 거래처 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const OutsourcingRegister = ({match}: any) => {
    const history = useHistory()

    const [pk, setPk] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [no, setNo] = useState<number>()
    const [type, setType] = useState<string>('0') //0: 법인, 1:개인
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
        const tempUrl = `${API_URLS['outsourcing'].load}`
        const res = await postOutsourcingRegister(tempUrl, {pk: match.params.pk})

        if (res) {
            const data = res.results
            setName(data.name)
            setPk(data.pk)
            setNo(data.number)
            setType(data.type)
            setPk(data.pk)
            setCeo(data.ceo_name)
            setPaths([data.photo_url === '-' ? null : data.photo_url])
            setPhone(data.telephone)
            setEmailM(data.manager_email)
            setPhoneM(data.manager_phone)
            setManager(data.manager)
            setEmail(data.ceo_email)

            setInfoList(data.info_list)
            setInputData('location', data.address)
            setFax(data.fax)

        }
    }, [pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM, address, fax, inputData])

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

        if (name === '') {
            alert('사업장은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (ceo === '') {
            alert('대표자는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (no === null || no === undefined || no === 0 || no.toString() === '') {
            alert('사업자 번호는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }


        const data = {
            pk: match.params.pk,
            name: name,
            number: no.toString(),
            type: type.toString(),
            ceo_name: ceo,
            photo: paths[0],
            telephone: phone === '' ? null : phone,
            ceo_email: email === '' ? null : email,
            manager: manager === '' ? null : manager,
            manager_phone: phoneM === '' ? null : phoneM,
            manager_email: emailM === '' ? null : emailM,
            address: inputData === null && inputData.location.postcode === undefined && inputData.location.roadAddress === undefined && inputData.location.detail === undefined ? null : inputData.location,
            fax: fax === '' ? null : fax,
            //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        }

        const tempUrl = `${API_URLS['outsourcing'].update}`
        const res = await postOutsourcingRegister(tempUrl, data)

        if (res) {

            setIsUpdate(false)
            history.push('/outsourcing/current/list')

        }


    }, [pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM, address, fax, manager, inputData])

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

            if (name === '') {
                alert('사업장은 필수 항목입니다. 반드시 입력해주세요.')
                return
            } else if (ceo === '') {
                alert('대표자는 필수 항목입니다. 반드시 입력해주세요.')
                return
            } else if (no === null || no === undefined || no === 0 || no.toString() === '') {
                alert('사업자 번호는 필수 항목입니다. 반드시 입력해주세요.')
                return
            }

            const data = {

                name: name,
                number: no.toString(),
                type: type.toString(),
                ceo_name: ceo,
                photo: paths[0],
                telephone: phone === '' ? null : phone,
                ceo_email: email === '' ? null : email,
                manager: manager === '' ? null : manager,
                manager_phone: phoneM === '' ? null : phoneM,
                manager_email: emailM === '' ? null : emailM,
                address: inputData.location.postcode === '' && inputData.location.roadAddress === '' && inputData.location.detail === '' ? null : inputData.location,
                fax: fax === '' ? null : fax,
                // info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

            }

            const tempUrl = `${API_URLS['outsourcing'].register}`
            const res = await postOutsourcingRegister(tempUrl, data)


            if (res) {
                //TODO: 에러 처리
                history.push('/outsourcing/current/list')

            }

        }, [pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM, address, fax, manager, inputData]
    )


    return (
        <div>
            <Header title={isUpdate ? '외주처 정보수정' : '외주처 정보등록'}/>
            <WhiteBoxContainer>
                <ListHeader title="필수 항목"/>
                <NormalInput title={'사업장 이름'} value={name} onChangeEvent={setName} description={'사업장 이름을 입력하세요'}/>
                <NormalInput title={'대표자 이름'} value={ceo} onChangeEvent={setCeo} description={'사업장 대표자 이름을 입력하세요'}/>
                <RadioInput title={'사업자 구분'} target={Number(type)} onChangeEvent={setType}
                            id={'business-classification'}
                            contents={[{value: 0, title: '법인'}, {value: 1, title: '개인'}]}/>
                <NormalNumberInput title={'사업자 번호'} value={no} onChangeEvent={setNo}
                                   description={'사업자 번호를 입력하세요 (-제외)'}/>
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalFileInput title={'사업자 등록증 사진'} name={paths[0]} thisId={'photo'}
                                 onChangeEvent={(e) => addFiles(e, 0)}
                                 description={isUpdate ? paths[0] : '사업자 등록증 사진 혹은 스캔본을 등록하세요'}/>
                {
                    isUpdate ?
                        <OldFileInput title={'기존 첨부 파일'} urlList={paths} nameList={['']} isImage={true}/>
                        :
                        null
                }
                <NormalAddressInput title={'사업장 주소'} value={inputData.location}
                                    onChangeEvent={(input) => setInputData(`location`, input)}/>
                <NormalInput title={'사업장 대표 연락처'} value={phone} onChangeEvent={setPhone}
                             description={'사업자 등록증에 기재되어있는 연락처를 입력하세요'}/>
                <NormalInput title={'사업장 이메일'} value={email} onChangeEvent={setEmail}
                             description={'사업장 이메일을 입력하세요'}/>
                <NormalInput title={'사업장 대표 FAX'} value={fax} onChangeEvent={setFax}
                             description={'사업장 팩스번호를 입력하세요'}/>
                <NormalInput title={'담당자 이름'} value={manager} onChangeEvent={setManager}
                             description={'사업장 담당자(관리자) 이름을 입력하세요'}/>
                <NormalInput title={'담당자 연락처'} value={phoneM} onChangeEvent={setPhoneM}
                             description={'사업장 담당자(관리자) 연락처를 입력하세요'}/>
                <NormalInput title={'담당자 이메일'} value={emailM} onChangeEvent={setEmailM}
                             description={'사업장 담당자(관리자) 이메일을 입력하세요'}/>
                {/* 자유항목 입력 창
             <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
              const tempInfo = infoList.slice();
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
                    <div style={{marginTop: 40, marginLeft: 340}}>
                        <ButtonWrap onClick={async () => {
                            await onsubmitFormUpdate()
                        }}>
                            <div style={{width: 360, height: 40}}>
                                <p style={{fontSize: 18, marginTop: 15}}>수정하기</p>
                            </div>
                        </ButtonWrap>
                    </div>
                    :
                    <div style={{marginTop: 40, marginLeft: 340}}>
                        <ButtonWrap onClick={async () => {
                            await onsubmitForm()
                        }}>
                            <div style={{width: 360, height: 40}}>
                                <p style={{fontSize: 18, marginTop: 15}}>등록하기</p>
                            </div>
                        </ButtonWrap>
                    </div>
                }
            </WhiteBoxContainer>
        </div>
    )
}

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    margin-bottom: 20px;
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

export default OutsourcingRegister
