import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'

//아이콘 버튼 정사각형

interface IProps{
    image: string,
    dim : boolean, //누를수 있는지 없는지 상태
    width: string,
    imageSize: string, 

}
const IconSquareButton = ({image, dim, width, imageSize}: IProps) => {
  useEffect(()=>{
   
  },[])


  const ButtonBox = Styled.button`
    display: inline-block;
    width: ${width};
    height: ${width};
    color: black;
    background-color: ${!dim ? POINT_COLOR : '#f4f4f4'};
    border: solid 0.5px #d3d3d3;
  `
  return (

       <ButtonBox>
           <div style={{justifyContent:'center', display:'flex', alignItems: 'center', textAlign:'center'}}>
                <img src={image} style={{width: imageSize, height: imageSize}}/>
           </div>
       </ButtonBox>

      
  );
}





export default IconSquareButton;