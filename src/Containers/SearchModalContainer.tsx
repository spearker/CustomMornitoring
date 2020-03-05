import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcPlus from '../../Assets/Images/ic_plus_gray.png'
import WhiteBoxContainer from './WhiteBoxContainer';
import PopupButtons from '../Components/Button/PopupButtons';

//기본형 모달

interface IProps{
    title?: string,
    isVisible: boolean,
    children: any,
    onClickClose: ()=>void,
    onClickEvent: ()=>void,
}
const SearchModalContainer = ({title, onClickClose, isVisible, children, onClickEvent}: IProps) => {

    
  useEffect(()=>{
   
  },[])

  return ( 
        isVisible ?
            <>
            <WrapHoverBox onClick={onClickClose}/>
            <InnerBox>
                <div style={{position:'relative', backgroundColor:'#f4f6fa',  textAlign: 'left',minWidth:440, padding:'19px 20px 0px 20px'}}>
                    {
                        title!== undefined && title !==null?
                        <p style={{fontWeight:'bold', color:'black', marginBottom:19}}>· {title}</p>
                        :
                        null
                    }
                    <div style={{paddingBottom:66, maxHeight:380}}>
                    {children}
                    </div>
        
                    <div className="p-bold" style={{marginTop:60,width:'100%', position:'absolute', display:'flex', zIndex:4, bottom:0, left:0,  color:'black', justifyItems:'center', alignItems:'center',textAlign:'center', fontSize:14}}>
                        <div style={{ width:'50%', padding:9, backgroundColor: '#e7e9eb', color:'#717c90'}} onClick={onClickClose}>
                            <p>취소</p>
                        </div>
                        <div style={{ width:'50%', padding:9, backgroundColor: POINT_COLOR}} onClick={onClickEvent}>
                            <p>추가</p>
                        </div>
                    </div>
                </div>

            </InnerBox>
            </>
        :
        null
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
    margin-left: -240px; 
    top: 50%;
    margin-top: -240px; 
    overflow: auto;
    p{
        font-size: 14px;
    }
`

export default SearchModalContainer;