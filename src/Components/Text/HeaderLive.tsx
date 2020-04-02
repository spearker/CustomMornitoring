import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'

//페이지 헤더
interface IProps{
    title: string,
    isTurn: boolean
}

const HeaderLive = ({title, isTurn}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
    
        <div style={{textAlign:'left', }}>
           
            <p className="p-bold" style={{fontSize: 20, marginBottom:15, marginTop:75}}>
              {title}
              {
                isTurn?
                <img className="rotating" src={icCircleRotate}  style={{ width:16, marginLeft:8,  display:'inline-block'  }} />
                :
                <img src={icCircleRotate}  style={{ width:16, marginLeft:8,  display:'inline-block'  }} />
              }
              
            </p>
        </div>
      
  );
}



export default HeaderLive;