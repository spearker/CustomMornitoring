import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/dummy_press.png'
import icCloudOn from '../../Assets/Images/ic_cloud_w.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import icCircle from '../../Assets/Images/ic_circle.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import { changeStatusToString } from '../../Common/statusFunctions';

// 장비 현황 썸네일 카드
const StatusCard2 = ({target}) => {
  
  
  const getColor = (status) => {
      if(status === 'active'){
          return '#25b4b4'
      }else if(status === 'done'){
        return '#717c90'
      }else if(status === 'error'){
        return '#ff461a'
      }else if(status === 'noraml'){
        return '#717c90'
      }else{
        return '#717c90'
      }
      return 
  }

  useEffect(()=>{
   
  },[])

  return (
    <CardWrap>
        <div style={{color:'white',backgroundColor: `${getColor(target.status)}` ,borderRadius:4, textAlign:'left', fontSize:15, padding:'7px 13px 4px 13px', }}>
         
          <img src={target.is_connect ? icCloudOn : icCloudOff} style={{width:24}} />
          <img className="rotating" src={target.status === 'active' ? icCircleRotate : icCircle} style={{width:17, marginTop: 4, float:'right'}} />
        </div>
        <div style={{marginTop:'-2px'}}>
          
          <ImageBox src={target.photo === "" ? tempIamge : target.photo}/>
          
          <div >
            <p className="p-bold p-limit" style={{fontSize:16,marginBottom:8}}>{target.name}</p>
   
          </div>
          </div>
        
    </CardWrap>  
  );
}

const ImageBox = Styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

`

const CardWrap = Styled.div`
  display: inline-block;
  flex-direction: row;
  position: relative;
  margin-right: 10px;

  margin-left: 10px
  float: left;
  cursor: pointer;
  border: 0px;
  border-radius: 4px;
  color: #252525;
  text-align: center;
  width: 100%;
  max-width: 152px;
  background-color: white;
  &:first-child{
    margin-left: 20px;
  }
  &:last-child{
    margin-right: 20px;
  }
`



export default StatusCard2;