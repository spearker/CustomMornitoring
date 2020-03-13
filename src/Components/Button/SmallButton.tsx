import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//작은 버튼 + 포인트 컬러

interface IProps{
    name: any,
    onClickEvent?: ()=>void,

}
const SmallButton = ({name, onClickEvent}: IProps) => {
  const ButtonBox = Styled.button`
    padding: 7px 18px 7px 18px;
    color: black;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`
  useEffect(()=>{
   
  },[])

  return (
    <div style={{textAlign:'center', }}>
       <ButtonBox type="submit" onClick={onClickEvent}>{name}</ButtonBox>
    </div>
      
  );
}




export default SmallButton;