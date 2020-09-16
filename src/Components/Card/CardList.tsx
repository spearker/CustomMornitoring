import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/temp_machine.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'

interface Props{
  code: string,
  name: string,
  imgUrl: string,
  on: boolean,
}


// 기계 및 장치 썸네일 카드

const CardList = ({ code, name, imgUrl, on }: Props) => {



  useEffect(()=>{

  },[])

  return (
    <CardWrap>
        <p style={{margin:'10px 10px 10px 10px', textAlign:'left', fontSize:15, fontWeight:'bold'}}>{name}</p>
        <img src={on ? icCloudOn : icCloudOff} style={{height:22, position:'absolute', top:8, right:8}}/>
        <ImageBox src={tempIamge}/>
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
  position: relative;
  margin-right: 10px;
  margin-left: 10px
  color: #252525;
  text-align: center;
  width: 140px;
  background-color: white;
  height: 152px;
  margin-top:5px;
  margin-bottom: 5px;
`



export default CardList;
