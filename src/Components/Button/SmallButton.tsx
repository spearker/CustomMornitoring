import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//작은 버튼 + 그레이 컬러

interface IProps{
    name: any,
    onClickEvent?: ()=>void,

}
const SmallButton = ({name, onClickEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
    <div style={{textAlign:'center'}}>
       <ButtonBox type="submit" onClick={onClickEvent}>{name}</ButtonBox>
    </div>
      
  );
}

const ButtonBox = Styled.button`
    padding: 5px;
    width: 100%;
    color: black;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 13px;
`


export default SmallButton;