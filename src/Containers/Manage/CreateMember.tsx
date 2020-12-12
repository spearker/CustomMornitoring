import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import {getToken} from '../../Common/tokenFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {getMaterialTypeList,} from '../../Common/codeTransferFunctions'
import ListHeader from '../../Components/Text/ListHeader'
import useObjectInput from '../../Functions/UseInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import RadioInput from '../../Components/Input/RadioInput'
import GrayRegisterButton from '../../Components/Button/GrayRegisterButton'
import FactoryPickerModal from '../../Components/Modal/FactoryPickerModal'
import InputContainer from '../InputContainer'
import ModelRulesInput from '../../Components/Input/ModelRulesInput'
import FullAddInput from '../../Components/Input/FullAddInput'
import * as _ from 'lodash'
import NormalFileInput from '../../Components/Input/NormalFileInput'
import {uploadTempFile} from '../../Common/fileFuctuons'
import {API_URLS, getMemberList, postCreateMember} from '../../Api/mes/member'
import {getMarketing} from '../../Api/mes/marketing'
import NormalButtonInput from '../../Components/Input/NormalButtonInput'
import Notiflix from 'notiflix'
import OldFileInput from "../../Components/Input/OldFileInput";

interface Props {
    match: any
}

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;


// 품목 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const CreateMemberContainer: React.FunctionComponent<Props> = ({match}) => {
    const history = useHistory()
    const [document, setDocument] = useState<any>({id: '', value: '(선택)'})
    const [type, setType] = useState<number>(0)
    const [essential, setEssential] = useState<any[]>([])
    const [optional, setOptional] = useState<any[]>([])
    const [idCheck, setIdCheck] = useState<boolean>(false)

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [userImage, setUserImage] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [pk, setPk] = useState<string>('')

    const [inputData, setInputData] = useObjectInput('CHANGE', {
        email: '',
        password: '',
        name: '',
        authority: 'ADMIN',
        profile: null,
    })

    useEffect(() => {

        if (match.match.params.pk) {

            setIsUpdate(true)
            getData()
        }

    }, [])

    const emailDuplicated = useCallback(async () => {
        if (korean.test(inputData.email)) {
            alert('아이디에 한글이 들어갈 수 없습니다.')
            return
        }

        const data = {
            email: inputData.email
        }

        const res = await postRequest(`${SF_ENDPOINT}/user/duplicated`, data, '')

        if (res === false) {
            return Notiflix.Report.Failure('요청 실패', '체크할 아이디를 입력하셨는지 확인해주세요.', '닫기')
        } else {
            if (res.results === false) {
                setIdCheck(true)
                Notiflix.Report.Success('사용할 수 있는 아이디', '사용할 수 있는 아이디 입니다.', '닫기')
            } else {
                Notiflix.Report.Warning('사용할 수 없는 아이디', '사용할 수 없는 아이디 입니다. 아이디를 변경해주세요.', '닫기')
            }
        }

    }, [inputData])

    const getData = useCallback(async () => {

        const tempUrl = `${API_URLS['member'].load}?pk=${match.match.params.pk}`
        const resultData = await getMemberList(tempUrl)

        if (resultData) {
            const data = resultData
            const form = {
                email: data.email,
                password: '',
                name: data.name,
                authority: data.authority,
                profile: null,
            }
            setUserImage(data.profile)
            setInputData('all', form)

        }
    }, [pk, optional, essential, inputData])


    const onsubmitFormUpdate = useCallback(async () => {
        if (confirmPassword !== inputData.password) {
            alert('비밀번호가 같지 않습니다.')
            return
        } else if (inputData.name === '') {
            alert('유저명을 입력해주세요.')
            return
        } else if (1 <= inputData.password.length && inputData.password.length < 4) {
            alert('비밀번호 재설정은 4자리 이상으로 해주세요.')
            return
        }

        // const temp: any = []
        // temp.push(inputData)

        const data = {
            member: inputData
        }

        const tempUrl = `${API_URLS['member'].update}`
        const resultData = await postCreateMember(tempUrl, data)


        if (resultData !== undefined) {
            //alert('성공적으로 등록 되었습니다')
            history.push('/manage/member/list')
        } else {
            ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        }


    }, [pk, optional, essential, inputData, confirmPassword])

    const onsubmitForm = useCallback(async () => {
        if (confirmPassword !== inputData.password) {
            alert('비밀번호가 같지 않습니다.')
            return
        } else if (inputData.name === '') {
            alert('유저명을 입력해주세요.')
            return
        } else if (inputData.email === '') {
            alert('아이디를 입력해주세요.')
            return
        } else if (!idCheck) {
            alert('아이디 중복체크를 해주세요.')
            return
        } else if (1 <= inputData.password.length && inputData.password.length < 4) {
            alert('비밀번호를 4자리 이상으로 해주세요.')
            return
        }

        const temp: any = []
        temp.push(inputData)

        const data = {
            members: temp
        }

        const tempUrl = `${API_URLS['member'].create}`
        const resultData = await postCreateMember(tempUrl, data)


        if (resultData !== undefined) {
            //alert('성공적으로 등록 되었습니다')
            history.push('/manage/member/list')
        } else {
            ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        }

    }, [pk, optional, essential, inputData, document, idCheck, confirmPassword])


    /**
     * addFiles()
     * 사진 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFiles = async (event: any): Promise<void> => {

        if (event.target.files[0] === undefined) {

            return
        }

        if (event.target.files[0].type.includes('image')) { //이미지인지 판별

            const tempFile = event.target.files[0]
            const res = await uploadTempFile(event.target.files[0])

            if (res !== false) {
                setInputData('profile', res)
                return
            } else {
                return
            }

        } else {

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }

    return (
        <div>
            <Header title={isUpdate ? '사용자 정보수정' : '사용자 정보 등록'}/>
            <WhiteBoxContainer>
                {
                    // document.id !== '' || isUpdate == true?
                    <div>
                        <ListHeader title="필수 항목"/>
                        <RadioInput title={'권한'} target={inputData.authority}
                                    onChangeEvent={(e) => setInputData('authority', e)}
                                    contents={[{value: 'ADMIN', title: '관리자'}, {value: 'USER', title: '작업자'}]}/>
                        <NormalInput title={'유저명'} value={inputData.name}
                                     onChangeEvent={(input) => setInputData(`name`, input)}
                                     description={'유저명을 입력해주세요.'}/>
                        <NormalButtonInput title={'아이디'} description={'아이디를 입력해주세요.'} value={inputData.email}
                                           disabled={isUpdate}
                                           onClickEvent={() => emailDuplicated()}
                                           onChangeEvent={(input) => {
                                               setInputData(`email`, input);
                                               setIdCheck(false)
                                           }}
                                           style={{width: 'calc(100% - 109px)'}}/>
                        <NormalInput title={'비밀번호'} value={inputData.password} type={'password'}
                                     onChangeEvent={(input) => setInputData(`password`, input)}
                                     description={'비밀번호를 입력해주세요'}/>
                        <NormalInput title={'비밀번호 확인'} value={confirmPassword} type={'password'}
                                     onChangeEvent={(input) => setConfirmPassword(input)}
                                     description={'비밀번호를 한번 더 입력해주세요.'}/>
                        <br/>
                        <ListHeader title="선택 항목"/>
                        <NormalFileInput title={'사용자 사진'} name={inputData.profile} thisId={'ProfilePhoto'}
                                         onChangeEvent={(e) => addFiles(e)}
                                         description={isUpdate ? '' : '사용자 사진을 사진으로 찍어 등록해주세요'}
                                         style={{width: 'calc(100% - 109px)'}}/>
                        {
                            isUpdate ?
                                <OldFileInput title={'기존 첨부 파일'} urlList={[userImage]}
                                              nameList={['사용자 사진']}
                                              isImage={true}/>
                                : null
                        }
                        {isUpdate ?
                            <div style={{display: 'flex', marginTop: '40px', justifyContent: 'center'}}>
                                <TestButton onClick={() => onsubmitFormUpdate()}>
                                    <div>
                                        <p style={{fontSize: 18}}>수정하기</p>
                                    </div>
                                </TestButton>

                                <ButtonWrap onClick={() => history.push('/manage/member/list')}>
                                    <div>
                                        <p style={{fontSize: 18}}>리스트 보기</p>
                                    </div>
                                </ButtonWrap>
                            </div>
                            :
                            <GrayRegisterButton name={'등록하기'}
                                                onPress={() => onsubmitForm()}/>
                        }
                    </div>

                }
            </WhiteBoxContainer>
        </div>
    )
}

const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    width: 224px;
    height: 46px;
    border-radius: 6px;
    border-radius: 6px;
    border: none;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #0d0d0d;
`

const TestButton = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: #e7e9eb;
    width: 224px;
    height: 46px;
    border-radius: 6px;
    border-radius: 6px;
    border: none;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #666d79;
    margin-right: 20px;
`

const ProcessAddButton = Styled.button`
    
`

export default CreateMemberContainer
