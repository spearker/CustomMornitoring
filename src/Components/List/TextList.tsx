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
  onClickSearch?: ()=>void,
}


// 텍스트 리스트
const TextList = ({ title, name, onClickEvent,onClickSearch }: Props) => {
  const ListWrapDiv = Styled.div`
  margin-top: 5px;
  border: solid 0.5px #d3d3d3;
  background-color: #f4f6fa;
  font-size: 13px;
  width: 100%;
  height: 32px;
  position: relative;
  margin-bottom: ${onClickSearch !== undefined ? 0 : '11px'};
`
  useEffect(()=>{
   
  },[])

  return (
    
      <ListWrapDiv>
        <ListDiv>
          <div style={{width: '80%'}}>
          <p className="p-limit">&nbsp;&nbsp;{title}</p>
          </div>
     
        </ListDiv>
        {
          onClickSearch !== undefined ?
          <div style={{marginLeft: 'auto',display:'flex', position:'absolute',top:0, right:0, height: 33}}>
          <a className="p-bold" onClick={onClickSearch} style={{paddingLeft:11, paddingRight:11, paddingTop:6, backgroundColor:'#e7e9eb', border: 'solid 0.5px #d3d3d3', borderRight:0}}>
              변경
          </a> 
          <div onClick={onClickEvent} style={{marginLeft: 'auto',width:32}}>
            <IconSquareButton color="#e7e9eb" width="33px" imageSize="22px" image={icDelete} dim={true}/>  
          </div> 
          </div>
          :
          <div style={{marginLeft: 'auto',display:'flex', position:'absolute', top:0, right:0, height: 33}}>
          <div onClick={onClickEvent} style={{marginLeft: 'auto',width:32}}>
            <IconSquareButton color="#e7e9eb" width="33px" imageSize="22px" image={icDelete} dim={true}/>  
          </div> 
          </div>
        }
      </ListWrapDiv> 

  );
}




const ListDiv = Styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  display: flext;
`


export default TextList;