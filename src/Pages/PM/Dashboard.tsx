import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'

// PM2 대시보드
// 예지 작업 
const PmDasbhaord = () => {

  const history = useHistory();

  useEffect(()=>{


  },[])


  return (
      <Wrapper>
          <p>예지 작업</p>
      </Wrapper>

  );
}



const Wrapper = Styled.div`
    background-color: #202e4a;
    color: white;
    width: 100%;
    height: 100vh;


`
export default PmDasbhaord;
