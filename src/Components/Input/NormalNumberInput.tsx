import React, {useEffect} from 'react';
import Styled from 'styled-components'
import InputContainer from '../../Containers/InputContainer';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    description: string,
    value: number | undefined,
    onChangeEvent: any,
  width?: number | string
    line?: boolean
}
const NormalNumberInput = ({title, line, description, value, onChangeEvent, width}: IProps) => {
  useEffect(()=>{

  },[])


  return (
        <InputContainer title={title} line={line} width={width}>
            { onChangeEvent !== null ?
            <InputBox type="number" value={value} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent(e.target.value)}} placeholder={description}/>
            :
            <InputBox type="number" value={value} placeholder={description} disabled/>
            }
        </InputContainer>
  );
}

const InputBox = Styled.input`
border: solid 0.5px #d3d3d3;
font-size: 14px;
padding: 6px;
padding-left: 10px;
width: calc(100% - 124px);
background-color: #f4f6fa;
`
export default NormalNumberInput;
