import React, {useCallback, useEffect, useState} from 'react'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import NormalFileInput from '../../Components/Input/NormalFileInput'
import {getToken} from '../../Common/tokenFunctions'
import {getParameter, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import ListHeader from '../../Components/Text/ListHeader'
import OldFileInput from '../../Components/Input/OldFileInput'
import RadioInput from '../../Components/Input/RadioInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import {API_URLS, getCustomerData} from '../../Api/mes/customer'
import NormalAddressInput from '../../Components/Input/NormalAddressInput'
import Styled from 'styled-components'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'

interface Props {
    match: any;
    // chilren: string;
}


// 거래처 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const CustomerRegister = ({match}: Props) => {


    const history = useHistory()

    const [pk, setPk] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [no, setNo] = useState<number>()
    const [type, setType] = useState<string>('0') //0: 법인, 1:개인
    const [phone, setPhone] = useState<number>()
    const [address, setAddress] = useState<{ postcode: string, roadAddress: string, detail: string }>(
        {postcode: '', roadAddress: '', detail: ''}
    )
    const [fax, setFax] = useState<number>()
    const [phoneM, setPhoneM] = useState<number>()
    const [emailM, setEmailM] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [manager, setManager] = useState<string>('')
    const [ceo, setCeo] = useState<string>('')
    const [infoList, setInfoList] = useState<IInfo[]>([])

    const [paths, setPaths] = useState<any[1]>([null])
    const [oldPaths, setOldPaths] = useState<any[1]>([null])

    const [isUpdate, setIsUpdate] = useState<boolean>(false)


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

        const tempUrl = `${API_URLS['customer'].load}?pk=${match.params.pk}`
        const res = await getCustomerData(tempUrl)

        if (res === false) {
            //TODO: 에러 처리
        } else {
            setName(res.name)
            setPk(res.pk)
            setNo(res.number)
            setType(res.type)
            setPk(res.pk)
            setCeo(res.ceo_name)
            setOldPaths([res.photo])
            setPhone(res.telephone)
            setEmailM(res.manager_email)
            setPhoneM(res.manager_phone)
            setManager(res.manager)
            setEmail(res.ceo_email)

            setInfoList(res.info_list)
            setAddress(res.address ? res.address : {roadAddress: '', detail: '', postcode: ''})
            setFax(res.fax)
        }
    }, [pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM, address, fax])

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
            alert('이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (ceo === '') {
            alert('대표자 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (!no && String(no) === '') {
            alert('사업자 번호는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            pk: pk,
            name: name.trim(),
            number: no,
            type: String(type),
            ceo_name: ceo.trim(),
            photo: paths[0],
            telephone: phone === undefined ? null : phone,
            ceo_email: (email === '' || !email) ? null : email.trim(),
            manager: (manager === '' || !manager) ? null : manager.trim(),
            manager_phone: String(phoneM) === '' ? null : String(phoneM),
            manager_email: (emailM === '' || !emailM) ? null : emailM.trim(),
            address: address ? address : null,
            fax: String(fax) === '' ? null : fax,
            //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        }

        const res = await postRequest(`${SF_ENDPOINT}/api/v1/customer/update/`, data, getToken(TOKEN_NAME))
        if (res === false) {
            // alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        } else {
            // alert('성공적으로 수정 되었습니다')
            setIsUpdate(false)
            history.push('/customer/current/list')
        }

    }, [pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM, address, fax, manager])

    const ckBisNo = (bisNo: string) => {
        // 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
        // @ts-ignore
        if ((bisNo = (bisNo + '').match(/\d{1}/g)).length != 10) {
            alert('올바르지 않은 사업자 인증번호입니다.')
            return false
        }
        // 합 / 체크키
        let sum = 0
        const key = [1, 3, 7, 1, 3, 7, 1, 3, 5]
        // 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
        for (let i = 0; i < 9; i++) {
            sum += (key[i] * Number(bisNo[i]))
        }
        // 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
        // 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
        return (10 - ((sum + Math.floor(key[8] * Number(bisNo[8]) / 10)) % 10)) == Number(bisNo[9])
    }


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
    
        if (name.trim() === '') {
            alert('이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (ceo.trim() === '') {
            alert('대표자 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (!ckBisNo(String(no))) {
            // alert('사업자 번호는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {

            name: name.trim(),
            number: no,
            type: type,
            ceo_name: ceo.trim(),
            photo: paths[0],
            telephone: phone === undefined ? '' : phone,
            ceo_email: (email === '' || !email) ? '' : email.trim(),
            manager: (manager === '' || !manager) ? '' : manager.trim(),
            manager_phone: phoneM ? String(phoneM) === '' ? '' : String(phoneM) : '',
            manager_email: (emailM === '' || !emailM) ? '' : emailM.trim(),
            address: address ? address : '',
            fax: String(fax) === '' ? '' : fax,
            // info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

        }

        const res = await postRequest(`${SF_ENDPOINT}/api/v1/customer/register`, data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                // alert('성공적으로 등록 되었습니다')

                history.push('/customer/current/list')
            } else {
                //TODO:  기타 오류
            }
        }

    }, [pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM, address, fax, manager])


    return (
        <div>
            <Header title={isUpdate ? '거래처 정보수정' : '거래처 정보등록'}/>
            <WhiteBoxContainer>
                <ListHeader title="필수 항목"/>
                <NormalInput title={'사업장 이름'} value={name} onChangeEvent={setName} description={'사업장 이름을 입력하세요'}/>
                <NormalInput title={'대표자 이름'} value={ceo} onChangeEvent={setCeo} description={'사업장 대표자 이름을 입력하세요'}/>
                <RadioInput title={'사업자 구분'} target={Number(type)} onChangeEvent={setType}
                            contents={[{value: 0, title: '법인'}, {value: 1, title: '개인'}]}/>

                {/* <NormalInput title={'사업자 번호'} value={no} onChangeEvent={setNo} description={'사업자 번호를 입력하세요 (-제외)'}/> */}
                <NormalNumberInput title={'사업자 번호'} value={no} onChangeEvent={setNo} returnType={'string'}
                                   description={'사업자 번호를 입력하세요 (-제외)'}/>
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalFileInput title={'사업자 등록증 사진'} name={paths[0]} thisId={'photo'}
                                 onChangeEvent={(e) => addFiles(e, 0)}
                                 description={isUpdate ? oldPaths[0] : '사업자 등록증 사진 혹은 스캔본을 등록하세요'}
                                 style={{width: 'calc(100% - 109px)'}}/>
                {
                    isUpdate ?
                        <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['']} isImage={true}/>
                        :
                        null
                }
                <NormalNumberInput title={'사업장 대표 연락처'} value={phone} onChangeEvent={setPhone} returnType={'string'}
                                   description={'사업자 등록증에기재되어있는 연락처를 입력하세요'}/>
                <NormalAddressInput title={'공장 주소'} value={address} onChangeEvent={(input) => setAddress(input)}/>
                <NormalInput title={'사업장 이메일'} value={email} onChangeEvent={setEmail}
                             description={'사업장 이메일을 입력하세요'}/>
                {/* <NormalInput title={'사업장 대표 FAX'} value={fax} onChangeEvent={setFax}
                             description={'사업장 팩스번호를 입력하세요'}/> */}
                <NormalNumberInput title={'사업장 대표 FAX'} value={fax} returnType={'string'}
                                   onChangeEvent={setFax}
                                   description={'사업장 팩스번호를 입력하세요'}/>
                <NormalInput title={'담당자 이름'} value={manager} onChangeEvent={setManager}
                             description={'사업장 담당자(관리자) 이름을 입력하세요'}/>
                <NormalNumberInput title={'담당자 연락처'} value={phoneM} onChangeEvent={setPhoneM} returnType={'string'}
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
                <div style={{marginTop: 72, marginLeft: 340}}>
                    {isUpdate ?
                        <ButtonWrap onClick={async () => {
                            await onsubmitFormUpdate()
                        }}>
                            <div style={{
                                width: 360,
                                height: 46,
                                boxSizing: 'border-box',
                                paddingTop: '9px'
                            }}>
                                <p style={{fontSize: 18}}>수정하기</p>
                            </div>
                        </ButtonWrap>
                        :
                        <ButtonWrap onClick={async () => {
                            await onsubmitForm()
                        }}>
                            <div style={{
                                width: 360,
                                height: 46,
                                boxSizing: 'border-box',
                                paddingTop: '9px'
                            }}>
                                <p style={{fontSize: 18}}>등록하기</p>
                            </div>
                        </ButtonWrap>
                    }
                </div>
            </WhiteBoxContainer>
        </div>
    )
}


const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;s
`

export default CustomerRegister
