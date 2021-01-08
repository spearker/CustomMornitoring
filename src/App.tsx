import * as React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import Routers from './Routers/Routers'
import SuminRouters from './Routers/SuminRouters'
import JunheeRouters from './Routers/JunheeRouters'
import JMRouters from './Routers/JMRouters'
import YejiRouters from './Routers/YejiRouters'
import Styled from 'styled-components'
import AlertPopup from './Components/Modal/AlertPopup'
import {
  BASE_URL,
  BG_COLOR,
  BG_COLOR_SUB,
  SYSTEM_NAME,
  BG_COLOR_SUB2,
  COMPANY_LOGO,
  POINT_COLOR,
  MAX_WIDTH
} from './Common/configset'
import {UserContextProvider} from './Context/UserContext'
import Check from './Assets/Images/ic_checkbox_y.png'
import RadioCheck from './Assets/Images/btn_radio_check.png'
import Radio from './Assets/Images/btn_radio.png'
import '../src/Assets/Css/reset.css'
import {PopupContextProvider} from './Context/PopupContext'
import {I18nextProvider} from 'react-i18next'
import i18n from './Common/i18n'
import ProcessSelectModal from './Components/Modal/ProcessSelectModal'
import Notiflix from 'notiflix'

Notiflix.Confirm.Init({
  className: 'notiflix-confirm',
  width: '300px',
  zindex: 4003,
  position: 'center',
  distance: '10px',
  backgroundColor: '#f8f8f8',
  borderRadius: '25px',
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  rtl: false,
  useGoogleFont: false,
  fontFamily: 'Quicksand',
  cssAnimation: true,
  cssAnimationStyle: 'fade',
  cssAnimationDuration: 300,
  plainText: true,
  titleColor: 'red',
  titleFontSize: '16px',
  titleMaxLength: 34,
  messageColor: 'red',
  messageFontSize: '14px',
  messageMaxLength: 110,
  buttonsFontSize: '15px',
  buttonsMaxLength: 34,
  okButtonColor: 'white',
  okButtonBackground: 'red',
  cancelButtonColor: '#f8f8f8',
  cancelButtonBackground: '#a9a9a9',
})


const App = () => {

  return (
    <I18nextProvider i18n={i18n}>
      <UserContextProvider>
        <PopupContextProvider>
          <BrowserRouter>
            <AppBodyContainer>
              <ProcessSelectModal/>
              <AlertPopup/>
              <Routers/> {/*  src/Router/Routers.tsx 에 라우터 정의  */}
              <JunheeRouters/>
              <SuminRouters/>
              <JMRouters/>
              <YejiRouters/>
            </AppBodyContainer>
          </BrowserRouter>
        </PopupContextProvider>
      </UserContextProvider>
    </I18nextProvider>

  )
}
const AppBodyContainer = Styled.div`
  min-width: 1700px;
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
    border: 0/* 1.5px solid #00000040 */;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/18px no-repeat; 
    border: 0/* 1.5px solid orange */;
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
    width:18px;
    height: 18px;
    
} 
input[type="radio"]:not(old) + label {
    width:18px;
    height: 18px;
    display: inline-block; 
    text-align: left;
    resize: cover; 
    background: url(${Radio}) left/24px no-repeat; 
    background-size: 18px 18px;
    line-height: 130%; vertical-align: top;
}
input[type="radio"]:not(old):checked + label {
  background: url(${RadioCheck}) left/24px no-repeat;
  background-size: 18px 18px; 
}
`

export default App
