import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import IcCheck from '../../Assets/Images/ic_alert_check.png'
import IC_X from '../../Assets/Images/ic_task_close.png'
import useOnclickOutside from 'react-cool-onclickoutside';
import { usePopupDispatch, usePopup } from '../../Context/PopupContext';
import SmallButton from '../Button/SmallButton';
import BasicColorButton from '../Button/BasicColorButton';


//팝업 컨테이너 박스

interface Props{
    onClickOpen: any,
    onClickConfirm?: any,
    children: any,
    title?: string,
    isActive?: boolean
}

const BasicPopupContainer = ({ title, isActive, onClickOpen, onClickConfirm, children }:Props) => {

    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const popUp = usePopup();
    const dispatch = usePopupDispatch();
    

    const ref = useOnclickOutside(() => {
        onClickOpen(false);
      });
     
    const handleClickBtn = () => {

    };

    const onClickClose = () => {
        onClickOpen(false);
    }


    useEffect(()=>{
    
    },[])

  return ( 
 
        <WrapHoverBox  >
            <Wrapper ref={ref}>
                <WrapperInner>
                <img src={IC_X} onClick={()=>onClickOpen(false)} />
                {title!== undefined && <TitleText>{title}  </TitleText>}
               
                <InnderContentsBox>
                    {children}
                </InnderContentsBox> 
                {
                    onClickConfirm!== undefined &&
                    <ButtonBox>
                       
                            <p onClick={()=>onClickOpen(false)} >취소</p>
                            <p onClick={()=>onClickConfirm} style={ isActive !== undefined && isActive ? {backgroundColor: POINT_COLOR, color:'black'} : {}}>확인</p>
                  
                    </ButtonBox>

                }
                </WrapperInner>
            </Wrapper>
        </WrapHoverBox>
  )
}

const WrapHoverBox = Styled.div`
    background-color: #00000090;
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    display: table;

`
const Wrapper = Styled.div`
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    
`
const TitleText = Styled.p`
    padding: 15px 20px;
    font-size: 18px;
    font-weight: bold;
`
const WrapperInner = Styled.div`

        width: 900px;
        margin-bottom: 50px;
        display: inline-block;
        max-width: 900px;

        img{
            cursor: pointer;
            float: right;
            height: 20px;
            padding: 15px;
    
        }
        background-color: white;
        text-align: left;

    
`

const InnderContentsBox = Styled.div`
    box-sizing: border-box;
    max-height: 600px;
    
    min-height: 160px;
    padding: 20px;
    overflow:scroll;
`

const ButtonBox = Styled.div`
    width: 100%;
    background-color: #dddddd !important;
    margin: 0 !important;

        p{
            cursor: pointer;
            width: 450px;
            padding: 9px !important;
            text-align: center;
            box-sizing: border-box;
            color: #666d79;
            display: inline-block;
       

        }
    
`

export default BasicPopupContainer;