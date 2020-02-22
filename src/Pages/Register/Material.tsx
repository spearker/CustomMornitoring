import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'

import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';


// 자재등록 페이지
const RegisterMaterial = () => {

  const [made, setMade] = useState<string>('');
  const [no, setNo] = useState<string>('');
  const [spec, setSpec] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [moldNo, setMoldNo] = useState<string>('');

  useEffect(()=>{

  },[])

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
    console.log('--onSubmitForm')
    
    Axios.post(BASE_URL + '/ㅇ', {
      manufacturer: made, 
      product_code: no, 
      product_spec: spec, 
      mold_name: name,
      mold_label: type, 
      mold_code: moldNo,
    })
    .then(function (res) {
      console.log(res);
      if(res.status === 200){
        //성공
        alert('등록 되었습니다.')
        
        setMade('');
        setNo('');
        setMoldNo('');
        setName('');
        setSpec('');
        setType('');
      }else{
        //에러처리 
      
        
      }
    })
    .catch(function (error) {
      console.log(error);
     
    });

  },[made, no, name, type, moldNo, spec])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
            <Header title={'자재 정보 등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={onsubmitForm}>
                   <RegisterButton name={'자재 정보 등록하기'} />
              </form>
            </WhiteBoxContainer>
            
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default RegisterMaterial;