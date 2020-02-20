
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import { BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import { read } from 'fs';
import SuperNavigation from '../../Components/Navigation/SuperNavigation';
import NormalList from '../../Components/List/NormalList';

// 회사 조회 페이지

const SuperList = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');
  const [error, setError] = useState<string>('-- 에러--');
  const [code, setCode] = useState<string>('');
  const [compayList, setCompanyList] = useState<object[]>([]);
  //const { tempEmail } = useContext(UserDataContext); //인증된 이메일

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();

    window.location.href= "/complete" //TODO: 지울것

    // 이메일 보내기 
    Axios.post(BASE_URL + '/api문서참고', {
      email: 'Fred',
      check: 'Flintstone'
    })
    .then(function (res) {
      console.log(res);
      if(res.status === 200){
        //welcome/auth로 이동 
        
      }else{
        //중복확인 에러처리 
        setError('이메일과 패스워드를 확인해주세요')
        
      }
    })
    .catch(function (error) {
      console.log(error);
      setError('로그인 할 수 없습니다')
    });
    

  },[email, name, pw, pwCheck])

  useEffect(()=>{
    //setEmail(tempEmail);

    setCompanyList(
      [
        {
          pk: 'SIZL0514',
          company_name: '(주)수민산업',
          created : '2020-03-10 15:33:00',
          user_pk : 'pk239444',
          user_email : 'sumin@gmail.com',
          user_name : '이수민',
          company_code: 'SIZL3024'
 
       },
       {
        pk: 'SIZL0313',
        company_name: '(주)길동주식회사',
        created : '2020-03-03 08:45:00',
        user_pk : 'pk239444',
        user_email : 'sumin_gildong@gmail.com',
        user_name : '홍길동',
        company_code: 'SIZL3014'

     },
        {
          pk: 'SIZL0319',
          company_name: '유한회사제스텍',
          created : '2020-02-18 15:33:00',
          user_pk : 'pk239444',
          user_email : 'sumin2@gmail.com',
          user_name : '도우너 ',
          company_code: 'SIZL3023'

      },
      ]
    )
},[])
  return (

    
        <FullPageDiv>
            <SuperNavigation position={'static'} />
            <InnerDiv >
              <p style={{fontSize:20, marginTop:37}}>회사 조회 </p>
              <div style={{marginTop:34, marginBottom:108}}>
                {
                  compayList.map((v: object)=>{
                    return(
                      <NormalList contents={Object.values(v)}/>
                    )
                  
                  })
                }
              </div>
              
            </InnerDiv>
            
        </FullPageDiv>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  min-height: 100vh;
  hegith: 100%;
  text-align:center;
  background-color: ${BG_COLOR_SUB2}
`

const InnerDiv = Styled.div`
  display:inline-block;
  width: 327px;
  height: 100%;
  width: 1100px;
  color: white;
  text-align:left;
 
  
`

 const WelcomeInputBox = Styled.input`
    
    border: solid 1px #b3b3b370;
    font-size: 15px;
    padding: 15px;
    width: calc(100% - 30px) !important;
    background-color: transparent;
    color: white;
`

export default SuperList;