import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icPlus from '../../Assets/Images/ic_plus.png'
import icXgray from '../../Assets/Images/ic_x_small.png'
interface Props{
  title: string,
  name: string,
  pk: string,
  onClickEvent : ()=>void;
  press: boolean,
  check: boolean,
}


// 추가 버튼이 있는 리스트 
const AddList = ({ title, name, check, press, onClickEvent }: Props) => {
  
  const RawInnerDiv = Styled.div`
    display: inline-block;
    text-align: left;
    p{
      margin-left: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 98%;
      overflow:hidden;
    }
`


  useEffect(()=>{
   
  },[])

  return (
    <ListWrapDiv>
      <div style={{width: 66}}>
       <p>{title}</p>
      </div>
      <div>
        <p>|&nbsp;&nbsp;{name}</p>
      </div>
      <div style={{position:'absolute', top:-1, right:0, zIndex:4}}>
        {
          press ?
          <IcButton image={press ? icPlus : icXgray} onClickEvent={onClickEvent} dim={check}/> 
          :
          <IcButton image={press ? icPlus : icXgray} onClickEvent={onClickEvent} dim={press}/> 
        }
          
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
  padding: 6px;
`



export default AddList;