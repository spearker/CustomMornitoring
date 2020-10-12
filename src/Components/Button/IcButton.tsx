import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'

//아이콘 버튼

interface IProps{
    image: any,
    dim : boolean //누를수 있는지 없는지 상태
    onClickEvent?: any
    customStyle?: object
}
const IcButton = ({image, dim, onClickEvent, customStyle}: IProps) => {
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

       <ButtonBox type="submit" style={customStyle} onClick={()=>onClickEvent}>
         <img src={image} style={{width: 20}}/>
       </ButtonBox>


  );
}





export default IcButton;
