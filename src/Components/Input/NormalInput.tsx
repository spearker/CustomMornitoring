import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    description: string,
    value: string,
    onChangeEvent: any
}
const NormalInput = ({title, description, value, onChangeEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <div style={{ borderBottom: 'solid 0.5px #d3d3d3'}}>
            <p style={{fontSize: 12, fontWeight: 700, width: 130, display:'inline-block'}}>· {title}</p>
            <InputBox type="text" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent(e.target.value)}} placeholder={description}/>
        </div> 
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 13px;
    padding: 6px;
    padding-left: 10px;
    width: 384px;
    background-color: white;
    margin-bottom: 17px;
    margin-top: 17px;

`


export default NormalInput;