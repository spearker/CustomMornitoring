import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import {getToken, loadXHR, setToken} from '../../Common/tokenFunctions'
import 'react-dropdown/style.css'
import {getRequest, postRequest} from '../../Common/requestFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import BasicColorButton from '../../Components/Button/BasicColorButton'
import ProfileInput from '../../Components/Input/ProfileInput'
import ReadOnlyInput from '../../Components/Input/ReadOnlyInput'
import {useUser, useUserDispatch} from '../../Context/UserContext'
import {uploadTempFile} from '../../Common/fileFuctuons'
import {usePopupDispatch} from '../../Context/PopupContext'


const MyPage = () => {

  const [target, setTarget] = useState<IMmember>()
  const [pk, setPk] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [rank, setRank] = useState<string>('')
  const [year, setYear] = useState<number>(0)
  const [joinDate, setJoinDate] = useState<string>('')
  const [joinType, setJoinType] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [file, setFile] = useState<any>()
  const [photo, setPhoto] = useState<any | null>()
  const [path, setPath] = useState<string | null>(null)

  const User = useUser()
  const dispatch = useUserDispatch()
  const dispatchp = usePopupDispatch()
  /**
   * loadUserInfo()
   * : 유저 정보 로드 후 user info dispatch
   * @returns X
   */
  const loadUserInfo = async () => {


    const results = await getRequest('http://61.101.55.224:18299/api/v1/user/load', getToken(TOKEN_NAME))

    if (results === false) {
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {
        dispatch({
          type: 'SET_USER',
          data: {
            pk: User.pk,
            email: User.email,
            is_admin: User.is_admin,
            appointment: User.appointment,
            name: User.name,
            profile_img: '',
            is_login: true,
          }
        })
        dispatch({
          type: 'SET_USER',
          data: {
            pk: results.results.pk,
            email: results.results.email,
            is_admin: results.results.is_admin,
            appointment: results.results.appointment,
            name: results.results.name,
            profile_img: results.results.profile_img,
            is_login: true,
          }
        })
        loadXHR(results.results.profile_img).then(function (blob) {
          setToken('sizl_photo', blob)
        })

      } else {
        //TODO : 지울것
        //alert('세션 체크 실패 : 테스트 기간동안은 임시로 비로그인 접속 허용')
      }
    }
  }
  /**
   * onClickSave()
   * 프로필 수정
   * @param {string} pk 유저 pk
   * @param {string} profile_img 이미지 데이터
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const onClickSave = useCallback(async () => {
    ////alert('[서버 알림]현재 프로필 사진 변경이 불가능합니다...')
    //return;

    const data = {
      pk: User.pk,
      profile_img: path

    }
    const results = await postRequest('http://61.101.55.224:18299/api/v1/member/profile', data, getToken(TOKEN_NAME))

    if (results === false) {
      //alert('실패하였습니다. 잠시 후 다시 시도해주세요.')
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {
        //alert('성공적으로 업데이트 되었습니다')
        loadUserInfo()
      } else {
        //alert('실패하였습니다. 잠시 후 다시 시도해주세요.')
      }

    }

  }, [file, User, path])

  /**
   * getTarget()
   * 멤버 데이터 조회
   * @param {string} url 요청 주소
   * @param {string} pk 멤버 pk
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getTarget = useCallback(async () => {

    console.log(User.email)
    const results = await getRequest('http://61.101.55.224:18299/api/v1/member/view?pk=' + encodeURIComponent(User.email), getToken(TOKEN_NAME))

    if (results === false) {
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {

        setTarget(results.results)
        setName(results.results.name)
        setJoinDate(results.results.join_date)
        setJoinType(results.results.join_type)
        setRank(results.results.appointment)
        setStatus(results.results.status)
        setYear(results.results.year)
        setPhoto(results.results.profile_img)
      } else {
        //alert('잘못된 접근입니다.')
        window.location.href = '/manage/members'
      }
    }
  }, [target, joinType, joinDate, status, year, rank])


  useEffect(() => {
    dispatchp({
      type: 'CHANGE_MODE',
      data: {
        mode: 'mes'
      }
    })

    getTarget()

  }, [])


  /**
   * addFile()
   * 멤버 데이터 조회
   * @param {string} e.target.file 파일
   * @returns X
   */
  const addFile = useCallback(async (event: any): Promise<void> => {
    console.log(event.target.files[0])

    if (event.target.files[0] === undefined) {
      setFile(null)
      setPath(null)
      return
    }
    console.log(event.target.files[0].type)
    if (event.target.files[0].type.includes('image')) { //이미지인지 판별


      setFile(event.target.files[0])
      const previewFile = URL.createObjectURL(event.target.files[0])
      setPreview(previewFile)
      console.log(file)
      const temp = await uploadTempFile(event.target.files[0])
      if (temp === false) {
        console.log(temp)
        setPhoto(null)
        setFile(null)
        return
      } else {
        console.log(temp)
        setPath(temp)

        console.log(previewFile)
        setPreview(previewFile)
        console.log(file)
        console.log(file)
      }


    } else {

      setFile(null)
      //alert('이미지 형식만 업로드 가능합니다.')
    }

  }, [file, photo, path])

  const setPreview = useCallback((blobUrl) => {
    console.log('setPreview' + typeof blobUrl)
    setPhoto(blobUrl)
    console.log(photo)
  }, [photo])


  return (
    <DashboardWrapContainer>
      <InnerBodyContainer>
        <div style={{position: 'relative'}}>
          <Header title={'마이페이지'}/>
          <div style={{position: 'absolute', display: 'inline-block', top: 0, right: 0, zIndex: 4}}>

          </div>
        </div>
        {

        }
        <WhiteBoxContainer>

          <div>
            <ReadOnlyInput title={'성명'} value={name}/>
            <ReadOnlyInput title={'직급'} value={rank}/>
            <ReadOnlyInput title={'연차'} value={String(year)}/>
            <ReadOnlyInput title={'입사일'} value={joinDate}/>
            <ProfileInput photo={photo} title={'프로필 사진'} name={'profilePhoto'} thisId={'profilePhoto'}
                          onChangeEvent={addFile}/>
          </div>

          <div style={{textAlign: 'center', marginTop: 31}}>
            <BasicColorButton name="마이페이지 저장하기" onClickEvent={onClickSave} width={'360px'}/>
          </div>
        </WhiteBoxContainer>
      </InnerBodyContainer>
    </DashboardWrapContainer>

  )
}

const InputBox = Styled.input`
    width: 276px;
    height: 40px;
    border: solid 1px #b3b3b3;
    padding-left: 11px;
    font-size: 14px;
    font-weight: bold;
    background-color: transparent;
`

const ButtonBox = Styled.button`
    padding: 4px 24px 4px 24px;
    color: white;
    border-radius: 5px;
    background-color: ${BG_COLOR_SUB};
    border: 0;
    font-size: 14px;
    margin-left: 9px;
`
export default MyPage
