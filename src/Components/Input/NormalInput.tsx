import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';

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
        <InputContainer title={title}>
            { onChangeEvent !== null ?
            <InputBox type="text" value={value} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent(e.target.value)}} placeholder={description}/>
            :
            <InputBox type="text" value={value} placeholder={description} disabled/>
            }
        </InputContainer> 
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 200px);
    background-color: white;
`


export default NormalInput;