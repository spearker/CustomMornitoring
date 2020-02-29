import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Profile from '../../Assets/Images/ic_profile.png'
import IcSearch from '../../Assets/Images/ic_search_w.png'
import IcBell from '../../Assets/Images/ic_bell.png'
import NavList from './NavList'
import { useUser } from '../../Context/UserContext';

//대시보드 네비게이션
interface Props{
  select?: string
}


const SearchBar = ({select}: Props) => {

  const user = useUser(); // 유저 컨텍스트 데이터 받아오는 커스텀 훅스

  useEffect(()=>{
   
  },[])


  return (
    
        <SearchBarWrapDiv>
            <SearchBarInnerDiv>
                <div style={{display:'flex', alignItems: 'center',   }}>
                  <div style={{width: 46}}>
                    <ImageBox src={user.profile_img === '' ? Profile : user.profile_img} />
                  </div>
                  <div style={{width: 150}}>
                    <p style={{display:'inline-block', color:'white'}}>{user.name}</p>
                  </div>
                  <div style={{display:'flex', alignItems: 'center', width: 490, height:'100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden',position:'relative'}}>
                    <img src={IcBell} style={{width: 24, marginRight: 8}}/>
                    <p style={{color:POINT_COLOR, fontSize:18, display:'inline-block', fontWeight:'bold'}}>현재 아이콘은 임의 적용되어 있음. 추후 보내주시면 반영..</p>
                  </div>
                  <div style={{width: 360,position:'relative' }}>
                    <InputBox />
                    <img src={IcSearch} style={{position:'absolute',top: 7, left:12, width: 20}}/>
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





export default SearchBar;