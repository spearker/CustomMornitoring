import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    onClickEvent: ()=>void,
    onCloseEvent: ()=>void
}
const PopupButtons = ({onClickEvent, onCloseEvent}: IProps) => {

  return (
    <div style={{display:'flex', height:38,  color:'black', justifyItems:'center', alignItems:'center',textAlign:'center', fontSize:14}}>
      <div style={{width: '50%', backgroundColor: '#e7e9eb', color:'#717c90'}} onClick={onCloseEvent}>
        <p>취소</p>
      </div>
      <div style={{width: '50%', backgroundColor: POINT_COLOR}} onClick={onClickEvent}>
        <p>추가</p>
      </div>
    </div>

  );
}




export default PopupButtons;
