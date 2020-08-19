import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'

//작은 버튼 + 포인트 컬러

interface IProps{
    name: any,
    onClickEvent?: ()=>void,
    color?: string,

}
const SmallButton = ({name, onClickEvent, color}: IProps) => {
  const ButtonBox = Styled.button`
    padding: 7px 18px 7px 18px;
    color: black;
    border-radius: 5px;
    background-color: ${color === undefined ? POINT_COLOR : color};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`
  useEffect(()=>{

  },[])

  return (
    <div style={{textAlign:'center', }}>
       <ButtonBox type="submit" onClick={onClickEvent}>{name}</ButtonBox>
    </div>

  );
}




export default SmallButton;
