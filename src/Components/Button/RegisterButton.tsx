import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    name: any,
    onPress?: void,

}
const RegisterButton = ({name, onPress}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
    <div className="p-bold" style={{textAlign:'center'}}>
       <ButtonBox type="submit">{name}</ButtonBox>
    </div>
      
  );
}

const ButtonBox = Styled.button`
    padding: 10px;
    width: 360px;
    color: black;
    background-color: ${POINT_COLOR};
    border: 0;
    border-radius: 5px;
    margin-top: 30px;
    font-size: 18px;
`


export default RegisterButton;