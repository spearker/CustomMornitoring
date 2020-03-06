import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icPlus from '../../Assets/Images/ic_plus.png'
import icDelete from '../../Assets/Images/ic_minus.png'
import IconSquareButton from '../Button/IconSquareButton';
interface Props{
  title: string,
  name: string,
  onClickEvent: ()=>void,
}


// 텍스트 리스트
const TextList = ({ title, name, onClickEvent }: Props) => {
  
  useEffect(()=>{
   
  },[])

  return (
    
      <ListWrapDiv>
        <div style={{width: '20%'}}>
        <p className="p-limit">{title}</p>
        </div>
        <div style={{width: 'calc(80% - 34px)'}}>
          <p>|&nbsp;&nbsp;{name}</p>
        </div>
        <div onClick={onClickEvent} style={{width:32, position:'absolute', top:-1, right:0,}}>
            <IconSquareButton  color="#e7e9eb" width="32px" imageSize="22px" image={icDelete} dim={true}/>  
        </div> 
      </ListWrapDiv> 

  );
}


const ListWrapDiv = Styled.div`
  border: solid 0.5px #d3d3d3;
  background-color: #f4f6fa;
  font-size: 13px;
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  padding: 6px;
    padding-left: 10px;
`



export default TextList;