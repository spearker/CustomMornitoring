import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    description: string,
    thisId: string,
    name: string,
    onChangeEvent: (e: any) => void
}
const NormalFileInput = ({title, description, name, thisId, onChangeEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <div style={{ borderBottom: 'solid 0.5px #d3d3d3'}}>
            <p style={{fontSize: 12, fontWeight: 700, width: 130, display:'inline-block'}}>· {title}</p>
            <InputWrapBox> 
                <label htmlFor={thisId}  style={{border: 0, backgroundColor:POINT_COLOR, padding:5, cursor:'pointer'}}>파일 업로드</label>
                <input type="text" value={name} placeholder={description} readOnly style={{border: 0, width: '80%', paddingLeft:6, fontSize:13}}/>
                <input type="file" name="file" id={thisId} style={{display:'none'}} onChange={onChangeEvent}/>
            </InputWrapBox>
        </div> 
  );
}

const InputWrapBox = Styled.div`
    border: solid 0.5px #d3d3d3;
    font-size: 13px;
    display: inline-block;
    padding: 5px;
    padding-bottom: 8px;
    width: 390px;
    background-color: white;
    margin-bottom: 17px;
    margin-top: 17px;
`


export default NormalFileInput;