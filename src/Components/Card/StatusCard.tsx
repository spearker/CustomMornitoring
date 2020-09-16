import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/temp_machine.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import icCircle from '../../Assets/Images/ic_circle.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import { changeStatusToString } from '../../Common/statusFunctions';

// 장비 현황 썸네일 카드
const StatusCard = ({target}) => {
  
  
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
        <div style={{color:'white',backgroundColor: `${getColor(target.status)}` ,borderRadius:4, textAlign:'left', fontSize:15, padding:'8px 10px 8px 10px' }}>
          <p className="p-bold p-limit" style={{width:'85%'}} >{changeStatusToString(target.status)}</p>
          <img className="rotating" src={target.status === 'active' ? icCircleRotate : icCircle} style={{width:17, top:10, right:10, position:'absolute'}} />
        </div>
        <div style={{padding:10}}>
          <img src={target.is_connect ? icCloudOn : icCloudOff} style={{marginTop:10, height:22, position:'absolute', top:35, left:10}}/>
         
          <ImageBox src={target.photo === "" ? tempIamge : target.photo}/>
          <hr/>
          <div >
            <p className="p-bold p-limit" style={{fontSize:16,marginBottom:0}}>{target.name}</p>
   
          </div>
          </div>
        
    </CardWrap>  
  );
}

const ImageBox = Styled.img`
  width: 75px;
  height: 100px;
  object-fit: cover;

`

const CardWrap = Styled.div`
  display: inline-block;
  flex-direction: column;
  position: relative;
  margin-right: 10px;
  margin-left: 10px
  float: left;
  cursor: pointer;
  border: 0px;
  border-radius: 4px;
  color: #252525;
  text-align: center;
  width: 150px;
  background-color: white;
`



export default StatusCard;
