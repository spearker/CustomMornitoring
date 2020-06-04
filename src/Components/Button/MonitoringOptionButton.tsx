import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'

//아이콘 버튼 정사각형

interface IProps{
    image?: string,
    width?: string,
    color?: string,
    title: string,
    onClickEvent?: any,

}
const MonitoringOptionButton = ({image, width, title,onClickEvent, color}: IProps) => {
  useEffect(()=>{
   
  },[])


  const ButtonBox = Styled.button`
    padding: 2px 14px 3px 14px;
    color: black;
    display: inline-block;
    background-color: ${color !== undefined ? color : POINT_COLOR };
    border-radius: 5px;
    font-size: 15px;
    span {
      font-weight: bold;
    }
    margin-left: 10px;
  `
  return (

       <ButtonBox onClick={onClickEvent !== undefined ? onClickEvent : undefined}>
           <div style={{justifyContent:'center', display:'flex', alignItems: 'center', textAlign:'center'}}>
                {image !== undefined && <img src={image} style={{width: 10, height: 10}}/>}
                 <span>{title}</span>
           </div>
       </ButtonBox>

      
  );
}




export default MonitoringOptionButton;