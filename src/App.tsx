import * as React from 'react';
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import Routers from './Routers/Routers'
import Styled from 'styled-components'
import AlertPopup from './Components/Modal/AlertPopup'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from './Common/configset'
import {UserContextProvider} from './Context/UserContext';
import Check from './Assets/Images/ic_checkbox_y.png';
import RadioCheck from './Assets/Images/btn_radio_check.png';
import Radio from './Assets/Images/btn_radio.png';
import '../src/Assets/Css/reset.css'
import { PopupContextProvider } from './Context/PopupContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './Common/i18n';
import * as Promise from 'bluebird';


const App = () => {

  return (
    <I18nextProvider i18n={i18n}>
        <UserContextProvider>
          <PopupContextProvider>
            <BrowserRouter>
                <AppBodyContainer>   
                  <AlertPopup/>
                  <Routers /> {/*  src/Router/Routers.tsx 에 라우터 정의  */}
                </AppBodyContainer>
            </BrowserRouter>
          </PopupContextProvider>
        </UserContextProvider>
    </I18nextProvider>
        
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
  input::-ms-input-placeholder { color: #b3b3b3; }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 1.5px solid #00000040;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/18px no-repeat; 
    border: 1.5px solid orange;
  }
  input[type="checkbox"] {
    display: none;
  }
  form label{
    font-size: 10px;
    font-weight: 700;
  }

input[type="radio"]:not(old) {
    margin:0; padding:0; opacity:0; 
    background: url(${Radio}) left/24px no-repeat; 
    width:0; 
    
} 
input[type="radio"]:not(old) + label {
    display: inline-block; 
    text-align: left; height:25px; padding-left: 25px; 
    background: url(${Radio}) left/24px no-repeat; 
    line-height: 130%; vertical-align: top;
}
input[type="radio"]:not(old):checked + label {
  background: url(${RadioCheck}) left/24px no-repeat; 
}
`

export default App;