import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'

//아이콘 버튼

interface IProps{
    image: any,
    dim : boolean //누를수 있는지 없는지 상태
    onClickEvent?: ()=>void

}
const IcButton = ({image, dim, onClickEvent}: IProps) => {
  useEffect(()=>{
   
  },[])


  const ButtonBox = Styled.button`
    display: inline-block;
    padding: 6px;
    color: black;
    background-color: ${dim === true ? POINT_COLOR : '#f4f4f4'};
    border: solid 0.5px #d3d3d3;
  `
  return (

       <ButtonBox type="submit" onClick={onClickEvent}>
         <img src={image} style={{width: 14}}/>
       </ButtonBox>

      
  );
}





export default IcButton;