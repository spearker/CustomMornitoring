import React, {useCallback, useEffect, useState} from 'react';
import {getParameter, postRequestWithNoToken} from '../../Common/requestFunctions';
import WelcomeContainer from '../../Containers/WelcomeContainer';
import WelcomeInput from '../../Components/Input/WelcomeInput';
import {useTranslation} from 'react-i18next';
import BasicColorButton from '../../Components/Button/BasicColorButton';

// 회원가입 정보 입력 페이지 (메일 인증 후 )

const Signup = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [pwCheck, setPwCheck] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [auth, setAuth] = useState<string>('');
    const {t} = useTranslation();
    /**
     * onsubmitForm()
     * : 회원가입
     * @param {string} email 이메일
     * @param {string} pw 패스워드
     * @param {string} pwCheck 패스워드 확인
     * @param {string} name 이름
     * @param {string} code 회사코드
     * @param {string} auth 이메일 인증코드
     * @returns X
     */
    const onsubmitForm = useCallback(async () => {

        //window.location.href= "/complete" //TODO: 지울것

        //발리데이션
        if (pw == '' || name == '' || email === '' || code === '') {
            //alert(t('errorAllSubmit'))
            return
        }
        if (pw.length < 6 || pw !== pwCheck) {
            //alert(t('errorPassord'))
            setPwCheck('')
            return
        }
        if (email.length < 6 || !email.includes('@')) {
            //alert(t('errorUse'))
            setEmail('')
            return
        }

        let data: object = {
            name: name,
            email: email,
            password: pw,
            company_code: code,
            auth_code: auth,
        }
        const results = await postRequestWithNoToken('http://203.234.183.22:8299/user/register', data)

        if (results === false) {
            //TODO: 에러 처리
        } else {
            if (results.status === 200) {
                alert(t('성공적으로 가입신청되었습니다.'))
                window.location.href = "/complete"
            } else if (results.status === 1001) {
                // alert(t('errorUse'))
                setEmail('')
                window.location.href = "/login"
            } else if (results.status === 1003) {
                // alert(t('errorCode'))
                setCode('')
            } else if (results.status === 1004) {
                alert(t('만료된 인증코드 입니다. 이메일인증을 다시 해주세요.'))
                window.location.href = "/login"
                setCode('')
            } else {
                //기타 에러처리

            }
        }

    }, [email, name, pw, pwCheck, auth, code])

    useEffect(() => {

        const param = getParameter('email');
        const param2 = getParameter('authcode');
        if (param === undefined || param === "" || param2 === undefined) {
            //alert('잘못된 접근입니다.')
        } else {
            setEmail(param)
            setAuth(param2)
        }

    }, [])

    return (
        <WelcomeContainer>
            <div style={{width: 320, textAlign: 'left'}}>
                <p className="p-eng" style={{fontSize: 36, marginBottom: 26}}>Sign Up</p>
                <WelcomeInput type="text" value={name} title={'Name'}
                              onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                  setName(e.target.value)
                              }} hint={t('enterName')}/>
                <WelcomeInput type="email" value={email} title={'ID (e-mail)'} hint={t('enterEmail')}/>
                <WelcomeInput type="password" value={pw} title={'Password'}
                              onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                  setPw(e.target.value)
                              }} hint={t('enterPassword')}/>
                <WelcomeInput type="password" value={pwCheck} title={'Confirm Password'}
                              onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                  setPwCheck(e.target.value)
                              }} hint={t('enterPasswordRe')}/>
                <WelcomeInput type="text" value={code} title={'Company Code'}
                              onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                  setCode(e.target.value)
                              }} hint={t('enterCode')}/>

                <div style={{textAlign: 'center', marginTop: 52}}>
                    <BasicColorButton onClickEvent={onsubmitForm} width="100%" name={t('signUp')}/>
                </div>

            </div>
        </WelcomeContainer>

    );
}

export default Signup;
