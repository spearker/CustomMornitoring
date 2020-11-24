import React from 'react';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import {useTranslation} from 'react-i18next';
import BasicColorButtonLink from '../../Components/Button/BasicColorButtonLink';


const Complete = () => {

    const {t} = useTranslation();

    return (
        <WelcomeContainer>
            <div style={{width: 320, textAlign: 'left'}}>
                <p className="p-eng" style={{fontSize: 36, marginBottom: 40}}>Sign Up</p>
                <p className="p-bold" style={{fontSize: 16, marginBottom: 59, lineHeight: '40px'}}>
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

