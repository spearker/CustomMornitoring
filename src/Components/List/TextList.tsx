import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icPlus from '../../Assets/Images/ic_plus.png'
import icXgray from '../../Assets/Images/ic_x_small.png'
interface Props{
  title: string,
  name: string,
}


// 텍스트 리스트
const TextList = ({ title, name }: Props) => {
  
  useEffect(()=>{
   
  },[])

  return (
    <ListWrapDiv>
      <div style={{width: 66}}>
       <p >{title}</p>
      </div>
      <div>
        <p>|&nbsp;&nbsp;{name}</p>
      </div>
    </ListWrapDiv>  
  );
}


const ListWrapDiv = Styled.div`
  border: solid 0.5px #d3d3d3;
  background-color: white;
  position: relative;
  font-size: 13px;
  display: flex;
  margin-bottom: 10px;
  padding: 6px;
`



export default TextList;