import React, {useCallback, useEffect, useState} from 'react';
import {TOKEN_NAME} from '../../Common/configset'
import {useUserDispatch} from '../../Context/UserContext';
import {setToken} from '../../Common/tokenFunctions';
import {postRequestWithNoToken} from '../../Common/requestFunctions';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import {usePopupDispatch} from '../../Context/PopupContext';
import {API_URLS, getServerStatus} from '../../Api/mes/common';
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from "../../Api/SF_endpoint";

// 로그인 페이지
const Login = () => {

    const dispatch = useUserDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const {t} = useTranslation();
    const dispatchp = usePopupDispatch();
    const history = useHistory()

    /**
     * onsubmitForm()
     * : 로그인
     * @param {string} email 이메일
     * @param {string} password 패스워드
     * @returns X
     */
    const onsubmitForm = useCallback(async (e) => {
        e.preventDefault();
        let data: object = {
            email: email,
            password: password,
        }
        const results = await postRequestWithNoToken(`${SF_ENDPOINT}/user/login`, data)

        if (results === false) {
            //TODO: 에러 처리
        } else {
            if (results.status === 200) {
                setToken(TOKEN_NAME, results.results.token)

                try {
                    if (window.location.search) {
                        const type = window.location.search.split('type=')

                        console.log('type1', type[1])

                        if (type[1] === 'dashboard') {
                            window.location.href = "/custom/dashboard"
                        } else if (type[1] === 'back') {
                            history.goBack()
                        }
                    } else {
                        window.location.href = "/dashboard"
                    }


                } catch (error) {
                    alert('에러가 발생했습니다. 관리자에게 문의하세요.')
                }

            } else if (results.status === 1001 || results.status === 1002) {
                alert('아이디와 패스워드를 확인하세요.')
            } else if (results.status === 1003) {
                alert('승인 대기중인 이메일 입니다. 관리자 승인 후 로그인 할 수 있습니다.')

            } else {
                //기타 에러처리

            }
        }

    }, [email, password])


    /**
     * getCheck()
     * 서버상태 체크
     */
    const getCheck = useCallback(async () => {


        const tempUrl = `${API_URLS.status.check}`
        const results = await getServerStatus(tempUrl);
        if (results === false) {
            dispatchp({
                type: 'OPEN_POPUP',
                data: {
                    type: 'error',
                    contents: '임시 알림 : 현재 백서버가 닫혀있습니다. - 로그인 및 테스트 불가'
                }
            })
            setError('[서버 상태] 접속 불가')
        } else {
            setError('')
        }


    }, [error])

    useEffect(() => {
        getCheck()
    }, [])

    return (
        <WelcomeContainer>
            <form style={{width: 320, textAlign: 'left'}}>
                <p className="p-eng" style={{fontSize: 36, marginBottom: 26}}>Log In</p>
                <WelcomeInput type="email" value={email} title={'ID (e-mail)'}
                              onChangeEvent={useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
                                  setEmail(e.target.value)
                              }, [email])} hint={t('enterEmail')}/>
                <WelcomeInput type="password" value={password} title={'Password'}
                              onChangeEvent={useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
                                  setPassword(e.target.value)
                              }, [password])} hint={t('enterPassword')}/>
                <div style={{textAlign: 'center', marginTop: 38}}>
                    <p style={{marginBottom: 10, color: 'red'}}>{error}</p>
                    <BasicColorButton onClickEvent={(e) => onsubmitForm(e)} width="100%" name={t('login')}/>
                    <div style={{marginTop: 13, marginBottom: 24}}>
                        <Link to="/forgot">{t('findPassword')}</Link>
                        <span style={{paddingLeft: 8, paddingRight: 8}}>|</span>
                        <Link to="/email">{t('signUp')}</Link>
                    </div>

                </div>
            </form>
        </WelcomeContainer>

    );
}


export default Login;
