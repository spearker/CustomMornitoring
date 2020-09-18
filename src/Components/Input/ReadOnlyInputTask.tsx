import React, {useEffect} from 'react';
import Styled from 'styled-components'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    value: string,
}
const ReadOnlyInputTask = ({title, value}: IProps) => {
  useEffect(()=>{

  },[])

  return (
    <div style={{ borderBottom: 'solid 0.5px #d3d3d3' , display:'flex', paddingTop:17, paddingBottom:17, verticalAlign: 'top'}}>
    <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: 110, display:'inline-block',}}>{title === "" ? " " : `· ${title}`}</p>
    <InputBox>{value}</InputBox>
    </div>

  );
}

const InputBox = Styled.div`
    border: 0;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 280px);
    background-color: transparate;
`


export default ReadOnlyInputTask;
