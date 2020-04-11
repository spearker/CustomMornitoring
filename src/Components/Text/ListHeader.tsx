import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'

//페이지 헤더
interface IProps{
    title: string,
}
const ListHeader = ({title}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
    
        <div style={{textAlign:'left', }}>
            <p className="p-bold" style={{fontSize: 15, color:POINT_COLOR,paddingLeft:3, marginBottom:6, marginTop:12}}> {title}
             </p>
        </div>
      
  );
}



export default ListHeader;