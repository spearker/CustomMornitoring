import React, { useEffect } from 'react';
import Styled from 'styled-components'
import IMG_BG from '../../Assets/Images/img_welcome_bg.png'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME,SERVICE_TITLE, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useTranslation } from 'react-i18next';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import BasicColorButtonLink from '../../Components/Button/BasicColorButtonLink';
import WelcomeContainer from '../../Containers/WelcomeContainer';


// 접속시 보이는 웰컴(스플래시) 페이지

const Welcome = () => {
  const { t, i18n } = useTranslation();

  useEffect(()=>{
   
  },[])

  return (
    <WelcomeContainer>
      <div>
        <p className="p-eng" style={{fontSize: 60, paddingLeft:10, paddingRight:10, paddingBottom:27,  borderBottom: '1px solid white'}}>{SERVICE_TITLE}</p>
        <p className="p-eng" style={{fontSize: 36, marginTop: 25, marginBottom:32}}>{t('welcomeTitle')}</p>
        <BasicColorButtonLink to={'/login'} width={'320px'} name={t('welcomeStart')}/>
      </div>  
    </WelcomeContainer>
      
  );
}


export default Welcome;