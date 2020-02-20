import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcPlus from '../../Assets/Images/ic_plus_gray.png'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';

//기본형 모달

interface IProps{
    header?: string,
    closeEvent?: ()=> void,
    children: any,
    isVisible: boolean
}
const BasicModal = ({header,closeEvent, isVisible,children}: IProps) => {

    
  useEffect(()=>{
   
  },[])

  return ( 
      <>
        {
            isVisible ?
            <>
            <WrapHoverBox onClick={closeEvent}/>
            <InnerBox onClick={()=>console.log('d')}>
                <WhiteBoxContainer>
                    <p style={{fontWeight:'bold', marginBottom:11}}>· {header}</p>
                    {children}
                </WhiteBoxContainer>
            </InnerBox>
            </>
            :
            null
        }
        </>
  );
}


const WrapHoverBox = Styled.div`
    background-color: #00000090;
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
`
const InnerBox = Styled.div`
    position: fixed;
    left: 50%;
    margin-left: -180px; 
    top: 50%;
    margin-top: -150px; 
    overflow: auto;
    p{
        font-size: 13px;
    }
`

export default BasicModal;