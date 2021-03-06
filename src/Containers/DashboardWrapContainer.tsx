import React, {useEffect} from 'react'
import Styled from 'styled-components'
import {TOKEN_NAME} from '../Common/configset'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import ProfileBar from '../Components/Navigation/ProfileBar'
import {getToken, loadXHR, setToken} from '../Common/tokenFunctions'
import {useUser, useUserDispatch} from '../Context/UserContext'
import {getRequest} from '../Common/requestFunctions'
import {PM_MENU_LIST} from '../Common/routerset'
import {SF_ENDPOINT} from '../Api/SF_endpoint'
//대시보드를 감싸는 wrap 박스

const DashboardWrapContainer = ({children, index}: any) => {

  const dispatch = useUserDispatch()
  const User = useUser()
  /**
   * loadUserInfo()
   * : 유저 정보 로드 후 user info dispatch
   * @returns X
   */
  const loadUserInfo = async () => {
    if (User.pk !== '') {
      return
    }
    const results = await getRequest(`${SF_ENDPOINT}/api/v1/user/load`, getToken(TOKEN_NAME))

    if (results === false) {
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {
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
            company_name: results.results.company_name,
          }
        })

        loadXHR('8285' + results.results.profile_img).then(function (blob) {
          setToken('sizl_photo', blob)
        })

        setToken('USERNAME', results.results.name)
      } else {
        //TODO : 지울것
        //alert('세션 체크 실패 : 테스트 기간동안은 임시로 비로그인 접속 허용')
      }
    }
  }

  useEffect(() => {

    loadUserInfo()

  }, [])


  return (
    <>
      <DashboardWrapDiv>
        <DashboardNavigation select={index}/>
        <div style={{width: '100%', marginBottom: 88, textAlign: 'center'}}>
          <ProfileBar title={Object.keys(PM_MENU_LIST).find(f => f == index) ? 'PM System' : 'MES System'}/>
          <div style={{minWidth: 1100}}>
            {children}
          </div>
        </div>
        <div style={{width: 70}}/>
      </DashboardWrapDiv>
    </>

  )
}

const DashboardWrapDiv = Styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    min-width: 1180px;
    background-image: linear-gradient(to right, #202e4a 0%, #0f1722 100%);
    position: relative;
`

export default DashboardWrapContainer
