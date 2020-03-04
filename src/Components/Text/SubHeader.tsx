import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//페이지 헤더
interface IProps{
    title: string,
}
const SubHeader = ({title}: IProps) => {
  useEffect(()=>{
   
  },[])

  return (
    
        <div style={{textAlign:'left',display:'inline-block' }}>
            <p className="p-bold" style={{textAlign:'left',fontSize: 20, marginBottom:15, margin:0}}>{title}</p>
        </div>
      
  );
}



export default SubHeader;