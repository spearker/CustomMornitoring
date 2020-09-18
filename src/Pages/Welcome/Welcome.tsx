import React, {useEffect} from 'react';
import {SERVICE_TITLE} from '../../Common/configset'
import {useTranslation} from 'react-i18next';
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
