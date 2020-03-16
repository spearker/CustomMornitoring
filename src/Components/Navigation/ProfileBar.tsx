import React, { useEffect , useCallback, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME, BASE_URL} from '../../Common/configset'
import IMG_PROFILE from '../../Assets/Images/img_profile.png'
import IcSearch from '../../Assets/Images/ic_search_w.png'
import IcBell from '../../Assets/Images/ic_bell.png'
import NavList from './NavList'
import { useUser, useUserDispatch } from '../../Context/UserContext';
import moment from 'moment';
import 'moment/locale/ko';
import { getToken, removeToken } from '../../Common/tokenFunctions';
import { postRequest } from '../../Common/requestFunctions';
//대시보드 네비게이션
interface Props{
  select?: string
}
    /*
  useEffect(()=>{
    const interval = setInterval(() => {
      setNowTime(moment().format('a HH:mm'))
    }, 100000);

    return () => clearInterval(interval);

  },[nowTime])
  */

const ProfileBar = ({select}: Props) => {

  const user = useUser(); // 유저 컨텍스트 데이터 받아오는 커스텀 훅스
  const dispatch = useUserDispatch();
  const [nowTime, setNowTime] = useState<string>(moment().format('a HH:mm'))

  /**
   * onClickLogout()
   * : 로그아웃
   * @returns X
   */
  const onClickLogout = useCallback(async()=>{
    //alert('테스트 : 로그아웃 - ' + getToken(TOKEN_NAME));
    removeToken(TOKEN_NAME)
    alert('성공적으로 로그아웃 되었습니다');
    window.location.href="/"
    return;
    const data = {}
    const results = await postRequest(BASE_URL + '/logout', data, getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        removeToken(TOKEN_NAME);
        dispatch({
          type: 'LOGOUT_USER',
        });
        alert("")
        window.location.href="/"
        
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[])


  return (
    
        <SearchBarWrapDiv>
            <SearchBarInnerDiv>
                <div style={{display:'flex', alignItems: 'center',   }}>
                  <div style={{width: 45}}>
                    <ImageBox src={user.profile_img === '' ? IMG_PROFILE : user.profile_img} />
                  </div>
                  <div style={{width: 250}}>
                    <p className="p-bold" style={{display:'inline-block', color:'white'}}>{user.name}</p>
                  </div>
                  <div style={{display:'flex', alignItems: 'center', width: 600, height:'100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden',position:'relative'}}>
                    <img src={IcBell} style={{width: 31, marginRight: 8}}/>
                    <p className="p-bold" style={{color:POINT_COLOR, fontSize:18, display:'inline-block', fontWeight:'bold'}}>현재 테스트 기간으로 세션 및 관리자권한은 해제되어있습니다.</p>
                  </div>
                  <div style={{textAlign:'right', width:205}}>
                    <a className="p-eng" style={{marginRight:26}}>
                      {nowTime}
                    </a>
                    <a className="p-eng" onClick={onClickLogout}>
                      Log out
                    </a>
                  </div>
                </div>
                
            </SearchBarInnerDiv>
        </SearchBarWrapDiv>
      
  );
}


const SearchBarWrapDiv = Styled.div`
  width: 100%;
  font-size: 18px;
  padding-top: 22px;
  color: white;
  padding-bottom:22px;
  background-color: ${BG_COLOR_SUB};
  text-align: center;
`
const SearchBarInnerDiv = Styled.div`
  width: 1100px;
  display: inline-block;
  text-align: left;

`


const ImageBox = Styled.img`
  border-radius: 15px;
  margin-top: 2px;
  width: 31px;
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





export default ProfileBar;