import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import IcButton from '../Button/IcButton';
import IC_MINUS from '../../Assets/Images/ic_minus.png'

interface IInfo {
    title: string,
    value: string,
}
//항목 명도 수정이 가능한 커스텀 인풋
interface IProps{
    index: number,
    value: IInfo,
    onChangeEvent: (v: IInfo)=>void,
    onRemoveEvent: (i: number)=>void,
}
const CustomIndexInput = ({index, value, onChangeEvent, onRemoveEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
       
        <div style={{marginTop:17, marginBottom:17, display:'flex', alignItems:'center'}}>
            <InputBox className="p-bold" style={{width: '18%', fontSize:13, marginRight: 9}} type="text" value={value.title} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent({title: e.target.value, value: value.value})}} placeholder={'(항목 이름)' }/>
            <InputBox style={{width: 'calc(100% - 40px)'}} type="text" value={value.value} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent({title: value.title, value: e.target.value})}} placeholder={'내용을 입력하세요.'}/>
            <img src={IC_MINUS} style={{width: 20, height:20, marginLeft: 8,  cursor:'pointer'}} onClick={()=>onRemoveEvent(index)}/>
        </div>

  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 7px;
    padding-left: 10px;
    background-color: #f4f6fa;
`


export default CustomIndexInput;
