import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, TOKEN_NAME} from '../../Common/configset'
import IMG_PROFILE from '../../Assets/Images/img_profile.png'
import {useUser, useUserDispatch} from '../../Context/UserContext'
import moment from 'moment'
import 'moment/locale/ko'
import {getToken, removeToken} from '../../Common/tokenFunctions'
import {postRequest} from '../../Common/requestFunctions'
import {usePopup} from '../../Context/PopupContext'
import {SF_ENDPOINT_RESOURCE} from '../../Api/SF_endpoint'
import NowTime from '../Toggle/NowTime'

/*
useEffect(()=>{
const interval = setInterval(() => {
  setNowTime(moment().format('a HH:mm'))
}, 100000);

return () => clearInterval(interval);

},[nowTime])
*/

interface Props {
  title: string
}

const ProfileBar = ({title}: Props) => {

  const user = useUser() // 유저 컨텍스트 데이터 받아오는 커스텀 훅스
  const dispatch = useUserDispatch()
  const [nowTime, setNowTime] = useState<string>(moment().format('a HH:mm'))
  const nav = usePopup()
  /**
   * onClickLogout()
   * : 로그아웃
   * @returns X
   */
  const onClickLogout = useCallback(async () => {
    ////alert('테스트 : 로그아웃 - ' + getToken(TOKEN_NAME));
    removeToken(TOKEN_NAME)
    //alert('성공적으로 로그아웃 되었습니다');
    window.location.href = '/'
    return
    const data = {}
    const results = await postRequest('/logout', data, getToken(TOKEN_NAME))

    if (results === false) {
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {
        removeToken(TOKEN_NAME)
        dispatch({
          type: 'LOGOUT_USER',
        })
        //alert("")
        window.location.href = '/'

      } else if (results.status === 1001 || results.data.status === 1002) {
        //TODO:  아이디 존재 확인
      } else {
        //TODO:  기타 오류
      }
    }
  }, [])

  useEffect(() => {
    if (user && user.company_name) {
      localStorage.setItem('userPermission', String(user.is_admin))
    }
  }, [user])


  return (

    <SearchBarWrapDiv>
      <SearchBarInnerDiv>
        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
          {/*{window.location.href.indexOf('/dashboard') !== -1 && <p  className="p-bold" ><span style={{color:POINT_COLOR}}> {user.company_name}&nbsp;</span>  대시보드 홈</p>}*/}
          {/*{window.location.href.indexOf('/pm') !== -1 && nav.mode === 'mes'|| window.location.href.indexOf('/dashboard') == -1 && nav.mode === 'home' && <p  className="p-bold"><span style={{color:POINT_COLOR}}> {user.company_name}&nbsp;</span>  {title}</p>}*/}
          {/*{window.location.href.indexOf('/dashboard') == -1 && nav.mode === 'pm' && <p  className="p-bold"><span style={{color:POINT_COLOR}}> {user.company_name}&nbsp;</span>  {title}</p>}*/}
          {/*{window.location.href.indexOf('/dashboard') == -1 && nav.mode === 'mes' && <p  className="p-bold"><span style={{color:POINT_COLOR}}> {user.company_name}&nbsp;</span>  {title}</p>}*/}
          {window.location.href.indexOf('/dashboard') !== -1 &&
          <p className="p-bold"> 대시보드 홈 (<NowTime/>)</p>}
          {window.location.href.indexOf('/pm') !== -1 && nav.mode === 'mes' || window.location.href.indexOf('/dashboard') == -1 && nav.mode === 'home' &&
          <p className="p-bold"> {title}</p>}
          {window.location.href.indexOf('/dashboard') == -1 && nav.mode === 'pm' &&
          <p className="p-bold"> {title}</p>}
          {window.location.href.indexOf('/dashboard') == -1 && nav.mode === 'mes' &&
          <p className="p-bold"> {title}</p>}

          {/*
                  <div style={{display:'flex', alignItems: 'center', paddingLeft:10, width: '50%', height:'100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden',position:'relative'}}>
                    <img src={IcBell} style={{width: 32, marginRight: 8, }}/>
                    <p className="p-bold p-limit" style={{color:'white', fontSize:17, display:'inline-block', fontWeight:'bold'}}>현재 데모 및 시연용 계정은 모든 관리자 기능이 해제되어있습니다</p>
                  </div>
                  */}
          <div style={{textAlign: 'right', marginLeft: 'auto', width: '70%'}}>

            <a className="p-eng" style={{float: 'right', marginTop: 2}} onClick={onClickLogout}>
              Log out
            </a>

            <span className="p-bold" style={{
              float: 'right',
              marginRight: 32,
              display: 'inline-block',
              color: 'white'
            }}>{user.name}{user.is_admin ? '(관리자)' : user.appointment}</span>
            <div style={{float: 'right', display: 'inline-block', color: 'white'}}>
              <ImageBox style={{float: 'left'}}
                        src={user.profile_img === '' ? IMG_PROFILE : `${SF_ENDPOINT_RESOURCE}${user.profile_img}`}/>

            </div>
          </div>
        </div>

      </SearchBarInnerDiv>
    </SearchBarWrapDiv>

  )
}


const SearchBarWrapDiv = Styled.div`
  width: 100%;
  font-size: 18px;
  padding-top: 22px;
  color: white;
  padding-bottom:22px;
  opacity: 100%;
  text-align: center;
`
const SearchBarInnerDiv = Styled.div`
  width: 1100px;
  display: inline-block; 
  text-align: left;

`
const ProfileDiv = Styled.div`
  display: inline-block;
  float: left;
  text-align: right;
`

const ImageBox = Styled.img`
  border-radius: 15px;
  margin-right: 10px;
  width: 31px;
  min-width: 31px;
  float: left;
  height: 31px;
  object-fit: cover;

`

const InputBox = Styled.input`
  padding-left: 40px;
  padding-top: 6px;
  padding-bottom: 6px; 
  font-size: 18px;
  width: 356px;
  color:white;
  background: ${BG_COLOR_SUB};
  border: 1px solid gray;
  border-radius: 20px;

 
`


export default ProfileBar
