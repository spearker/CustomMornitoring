import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import Routers from './Routers/Routers'
import Styled from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from './Common/configset'
import {UserContextProvider} from './Context/UserContext';
import Check from './Assets/Images/ic_checkbox_y.png';
//import GlobalStyles from "./Common/globalStyles";



const App = () => {

  //const { isLoggedIn } = useContext(UserDataContext);

  return (

    <UserContextProvider>
        <BrowserRouter>
            <AppBodyContainer>   
              <Routers /> {/*  src/Router/Routers.tsx 에 라우터 정의  */}
            </AppBodyContainer>
        </BrowserRouter>
    </UserContextProvider>

    
    
  );
}
const AppBodyContainer = Styled.div`
  width: 100%;
  height: 100%;
  a{
    text-decoration:none;
    color:inherit;
    pointer: cursor;
  }
  p{
    margin-block-start: 0;
    margin-block-end: 0;
  }
  input::-ms-input-placeholder { color: #9B9B9B; }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #9B9B9B;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/20px no-repeat; 
    border: 1px solid ${POINT_COLOR};
  }
  input[type="checkbox"] {
    display: none;
  }
  form label{
    font-size: 10px;
    font-weight: 700;
  }
`

export default App;