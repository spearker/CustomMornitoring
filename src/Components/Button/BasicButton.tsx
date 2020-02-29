import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    name: string,
    onPress?: void,

}
const BasicButton = ({name, onPress}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (

    <ButtonBox type="submit">{name}</ButtonBox>
      
  );
}

const ButtonBox = Styled.button`
    padding: 15px;
    width: 100%;
    border-radius: 4px;
    color: black;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 18px;

`


export default BasicButton;