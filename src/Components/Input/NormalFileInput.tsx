import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';

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
        <InputContainer title={title}>
            <InputWrapBox> 
                <input type="text" value={name} placeholder={description} readOnly style={{textAlign:'right',border: 'solid 0.5px #d3d3d3', borderRight:0, width:'calc(100% - 90px)', padding:6, backgroundColor:'#f4f6fa', paddingLeft:8, fontSize:14}}/>
                <label htmlFor={thisId}  style={{border: 'solid 0.5px #d3d3d3', textAlign:'center', fontSize:14, width:84, paddingBottom:2 , paddingTop:3, backgroundColor:POINT_COLOR, paddingLeft:12, paddingRight:12, cursor:'pointer'}}>파일 선택</label>       
            </InputWrapBox>
            <input type="file" name="file" id={thisId} style={{display:'none'}} onChange={onChangeEvent}/>
        </InputContainer> 
  );
}

const InputWrapBox = Styled.div`
    font-size: 14px;
    width: calc(100% - 190px);
    padding: 0px;
    display: flex;
    background-color: #f4f6fa;
`


export default NormalFileInput;