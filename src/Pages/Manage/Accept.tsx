import React, {useCallback, useEffect, useState} from 'react';
import {TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import {getToken} from '../../Common/tokenFunctions';
import 'react-dropdown/style.css'
import {getRequest, postRequest} from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import MultiButtonNormalTable from '../../Components/Table/MultiButtonNormalTable';

// 멤버 승인
const AcceptMember = () => {

    const [list, setList] = useState<[]>([]);

    const index = {
        email: '성명',
        name: '이메일',
    }

    /**
     * getList()
     * 승인요청 리스트 조회
     * @param {string} url 요청 주소
     * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
     */
    const getList = useCallback(async () => {
        const results = await getRequest('http://203.234.183.22:8299/api/v1/member/load/temp', getToken(TOKEN_NAME))

        if (results === false) {
            //TODO: 에러 처리
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                //TODO:  기타 오류
            }
        }
    }, [list])


    useEffect(() => {

        //setList(dataSet.acceptList); //TODO: 테스트용. 지울것.
        getList();

    }, [])

    const onClickAccept = useCallback(async (id) => {

        console.log('--select id : ' + id)
        const results = await postRequest('http://203.234.183.22:8299/api/v1/member/accept', {user_pk: id}, getToken(TOKEN_NAME))

        if (results === false) {
            //alert('승인 실패하였습니다. 관리자에게 문의하세요.')
            //setList([""])
            //TODO: 에러 처리
        } else {
            if (results.status === 200) {

                //alert('승인 되었습니다.')
                getList()
            } else {
                //alert('승인 실패하였습니다. 관리자에게 문의하세요.')
            }
        }

    }, [])

    return (
        <DashboardWrapContainer index={1}>
            <SubNavigation list={ROUTER_MENU_LIST[1]}/>
            <InnerBodyContainer>
                <div style={{position: 'relative'}}>
                    <Header title={'승인 신청 리스트'}/>
                </div>
                <MultiButtonNormalTable indexList={index} keyName={'pk'} contents={list} buttonName={'가입승인'}
                                        buttonName2={'거절'} onClickEvent2={() => alert('거절 불가')}
                                        onClickEvent={onClickAccept}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    );
}

export default AcceptMember;
