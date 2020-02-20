import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcPlus from '../../Assets/Images/ic_plus_gray.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    onChangeEvent: ()=>void,
    children: any,
}
const AddInput = ({title, onChangeEvent, children}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <div style={{ borderBottom: 'solid 0.5px #d3d3d3'}}>
            <p style={{fontSize: 12, fontWeight: 700, width: 130, display:'inline-block'}}>· {title}</p>
            <InputBox onClick={onChangeEvent}>
                <img src={IcPlus} style={{width: 12}} />
            </InputBox>
            <div style={{marginLeft: 130, width: 400}}>
                {children}
            </div>
        </div> 
  );
}

const InputBox = Styled.button`
    border: solid 0.5px #d3d3d3;
    font-size: 13px;
    padding: 6px;
    padding-left: 10px;
    width: 401px;
    background-color: white;
    margin-bottom: 17px;
    margin-top: 17px;

`


export default AddInput;