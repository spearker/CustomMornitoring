
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import {useUser, useUserDispatch} from '../../Context/UserContext';
import Axios from 'axios';
import { read } from 'fs';
import { postRequestWithNoToken } from '../../Common/requestFunctions';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import { useTranslation } from 'react-i18next';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import { Link } from 'react-router-dom';
import BasicColorButtonLink from '../../Components/Button/BasicColorButtonLink';


const Complete = () => {

  const {t} = useTranslation();

  return (
    <WelcomeContainer >
      <div style={{width:320, textAlign:'left'}}>
        <p className="p-eng" style={{fontSize:36, marginBottom:40}}>Sign Up</p>
        <p className="p-bold" style={{fontSize:16, marginBottom:59, lineHeight:'40px'}}>
        {t('complete1')}<br/>
        {t('complete2')}<br/><br/>
        {t('complete3')}
        </p>
        <BasicColorButtonLink to={'/login'} width="100%" name={t('back')}/>
       
      </div>
    </WelcomeContainer>
      
  );
}


export default Complete;

