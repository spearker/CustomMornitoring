
import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/temp_machine.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'

interface Props{
  date: string,
  id: string,
  num: number,
  dim: boolean,
  on: boolean,
  onClickEvent: (id: string)=>void;
}


// 날짜 카드

const DayCard = ({ date, num,id,  dim, on , onClickEvent}: Props) => {

    

  useEffect(()=>{
   
  },[])

  return (
      <div onClick={()=>onClickEvent(id)} style={{width:'100%'}}>
      {
          dim ?
            <CardWrap>
                <p style={{paddingBottom:9, marginTop:2,color:'#d3d3d3',textAlign:'left', fontSize:16, borderBottom:'1px solid #d3d3d3'}}>{date}</p>
                <p style={{fontSize:70, color:'#d3d3d3',marginTop:37}}>-</p>
            </CardWrap>  
          :
          on ?
            <CardWrapOn>
                <p style={{paddingBottom:9,textAlign:'left', fontSize:16, borderBottom:'1px solid #252525'}}>{date}</p>
                <p style={{fontSize:70, marginTop:37}}>{num === 0 ? '-' : num } </p>
            </CardWrapOn>  
            :
            <CardWrap>
                <p style={{paddingBottom:9,  marginTop:2,textAlign:'left', fontSize:16, borderBottom:'1px solid #252525'}}>{date}</p>
                <p style={{fontSize:70, marginTop:37}}>{num === 0 ? '-' : num } </p>
            </CardWrap>  

      }
      </div>
    
  );
}


const CardWrap = Styled.div`
        width: calc( 100% - 32px );
        text-align: center;
        background-color: #efefef;
        height: 166px;
        padding: 16px;
    `
const CardWrapOn = Styled.div`
    width: calc( 100% - 32px );
    text-align: center;
    background-color: ${POINT_COLOR};
    height: 166px;
    padding: 16px;
`



export default DayCard;