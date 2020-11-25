import React, { useEffect } from 'react';
import Styled from 'styled-components'

//대시보드를 감싸는 wrap 박스

const BigWhiteBoxContainer = ({children}: any) => {
  useEffect(()=>{

  },[])

  return (
    <>
    <WhiteWrapDiv >
      <div style={{padding:'35px 20px 79px 20px', borderRadius:6, width: '100%', textAlign:'left', color:'#252525'}}>
        {children}
      </div>
    </WhiteWrapDiv>
    </>

  );
}

const WhiteWrapDiv = Styled.div`
    display: flex;
    border-radius: 5px;
    width: 100%;
    background-color: #fff;
    
`

export default BigWhiteBoxContainer;
