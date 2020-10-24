import React, {useEffect} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, BG_COLOR_SUB2, TOKEN_NAME} from '../Common/configset'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import {getToken} from '../Common/tokenFunctions'
import {useUserDispatch, useUser} from '../Context/UserContext'
import {getRequest} from '../Common/requestFunctions'

//대시보드를 감싸는 wrap 박스  (풀사이즈)

const FullSizeContainer = ({children}: any) => {

  const dispatch = useUserDispatch()
  const User = useUser()
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
      } else {
        //TODO : 지울것
        //alert('세션 체크 실패 : 테스트 기간동안은 임시로 비로그인 접속 허용')
      }
    }
  }

  useEffect(() => {

    loadUserInfo()

  }, [loadUserInfo])


  return (

    <DashboardWrapDiv>
      <DashboardNavigation folding={true}/>
      <div style={{width: '100%', marginBottom: 88, textAlign: 'center'}}>
        <SearchBarWrapDiv>
        </SearchBarWrapDiv>
        <div style={{minWidth: 1100}}>
          {children}
        </div>
      </div>
    </DashboardWrapDiv>


  )
}

const SearchBarWrapDiv = Styled.div`
  width: 100%;
  font-size: 18px;
  height: 63px;
  color: white;
  background-color: ${BG_COLOR_SUB};
  text-align: center;
`
const DashboardWrapDiv = Styled.div`
    width: 100vw;
    padding-bottom: 120px;
    heigth: 100%;
    min-width: 1180px;
    background-color: ${BG_COLOR_SUB2};
`

export default FullSizeContainer
