import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2} from '../../Common/configset'
import Axios from 'axios';
import NormalTable from '../../Components/Table/NormalTable';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_SUPER_ADMIN} from '../../Common/routerset';

// 회사 조회 페이지

const SuperList = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [pwCheck, setPwCheck] = useState<string>('');
    const [error, setError] = useState<string>('-- 에러--');
    const [code, setCode] = useState<string>('');
    const [compayList, setCompanyList] = useState<object[]>([]);

    //const { tempEmail } = useContext(UserDataContext); //인증된 이메일
    const index = {
        pk: 'PK',
        company_name: '회사 이름',
        created: '생성일',
        user_pk: '관리자 PK',
        user_email: '관리자 이메일',
        company_code: '회사코드'
    }
    const onsubmitForm = useCallback((e) => {
        e.preventDefault();

        //window.location.href= "/complete" //TODO: 지울것
    }, [email, name, pw, pwCheck])

    useEffect(() => {

        // 리슽트 받기
        Axios.get('http://61.101.55.224:18299/api/v2/super/company/load')
            .then(function (res: IServerResponse) {
                console.log(res);
                if (res.data.status === 200) {
                    //welcome/auth로 이동
                    console.log(res.data.results)
                    setCompanyList(res.data.results)
                } else {
                    //기타 에러처리
                    //alert('SERVER ERROR CHECK : ' + res.data.status)

                }
            })
            .catch(function (error) {
                console.log(error);
                setError('로그인 할 수 없습니다')
            });

    }, [])
    const onClickModify = useCallback((id) => {

        console.log('--select id : ' + id)

    }, [])
    return (

        <FullPageDiv>
            <SubNavigation list={ROUTER_SUPER_ADMIN}/>
            <InnerDiv>
                <p style={{fontSize: 20, marginTop: 37, marginBottom: 30}}>회사 조회 </p>
                <NormalTable indexList={index} keyName={'pk'} contents={compayList} onClickEvent={onClickModify}/>

            </InnerDiv>
        </FullPageDiv>

    );
}
const FullPageDiv = Styled.div`
  width: 100%;
  min-height: 100vh;
  hegith: 100%;
  text-align:center;
  background-color: ${BG_COLOR_SUB2}
`

const InnerDiv = Styled.div`
  display:inline-block;
  width: 327px;
  height: 100%;
  width: 1100px;
  color: white;
  text-align:left;
`

const WelcomeInputBox = Styled.input`
    
    border: solid 1px #b3b3b370;
    font-size: 15px;
    padding: 15px;
    width: calc(100% - 30px) !important;
    background-color: transparent;
    color: white;
`

export default SuperList;
