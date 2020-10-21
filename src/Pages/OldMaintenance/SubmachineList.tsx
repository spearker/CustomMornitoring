import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import {getToken} from '../../Common/tokenFunctions';
import 'react-dropdown/style.css'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getRequest, postRequest} from '../../Common/requestFunctions';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';
import InfoTable from '../../Components/Table/InfoTable';


const SubmachineMaintenance = () => {

    const [list, setList] = useState<IMaintenance[]>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    const type = "peripheral"

    const optionList = [
        "등록순", "이름순"
    ]
    const index = {
        name: '이름',
        term: '권장 점검 주기(일)'
    }

    /**
     * getSearchList()
     * 목록 검색
     * @param {string} url
     * @returns X
     */
    const getSearchList = useCallback(async (e) => {
        e.preventDefault();
        const results = await getRequest('http://222.100.89.245:8299/api/v1/preserve/list?keyword=' + keyword + '&orderBy=' + option + '&type=' + type, getToken(TOKEN_NAME))
        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
                setKeyword('')
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [list, option, keyword, type])

    /**
     * getList()
     * 목록 불러오기
     * @param {string} url
     * @returns X
     */
    const getList = useCallback(async () => {

        const results = await getRequest('http://222.100.89.245:8299/api/v1/preserve/list?keyword=' + keyword + '&orderBy=' + option + '&type=' + type, getToken(TOKEN_NAME))
        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [option, keyword, list])

    /**
     * onClickFilter()
     * 리스트 필터 변경
     * @param {string} filter 필터 값
     * @returns X
     */
    const onClickFilter = useCallback(async (filter: number) => {
        setOption(filter)
        ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )

        const results = await getRequest('http://222.100.89.245:8299/api/v1/preserve/list?keyword=' + keyword + '&orderBy=' + option + '&type=' + type, getToken(TOKEN_NAME))
        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [option, keyword, list])

    useEffect(() => {
        getList()

        //setList(dataSet.maintenanceList)
    }, [])
    const onClickModify = useCallback((id) => {

        console.log('--select id : ' + id)
        window.location.href = `/update/design?pk=${id}`

    }, [])
    const onClickDelete = useCallback(async (id) => {

        const results = await postRequest('http://222.100.89.245:8299/api/v1/preserve/delete', {pk: id}, getToken(TOKEN_NAME))

        const tg = id
        //console.log('--select id : ' + id)
        if (results === false) {
            //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
        } else {
            if (results.status === 200 || results.status === "200") {
                //alert('해당 데이터가 성공적으로 삭제되었습니다.')
                setList(list.filter(v => v.pk !== tg))
            } else {
                //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
            }
        }

    }, [list])

    return (
        <DashboardWrapContainer index={5}>
            <SubNavigation list={ROUTER_MENU_LIST[5]}/>
            <InnerBodyContainer>
                <div style={{position: 'relative'}}>
                    <Header title={`주변장치 보전리스트 (${list.length})`}/>
                    <div style={{position: 'absolute', display: 'inline-block', top: 0, right: 0, zIndex: 4}}>
                        <SmallButtonLink name="+ 등록하기" link="/maintenance/register"/>
                        <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
                    </div>
                </div>
                <SearchInputSmall
                    description={'검색어 입력'}
                    value={keyword}
                    onChangeEvent={(e) => {
                        setKeyword(e.target.value)
                    }}
                    onClickEvent={getSearchList}
                />

                <InfoTable indexList={index} type={'maintenance'} pkKey={'pk'}
                           onClickLinkUrl="/maintenance/update?type=peripheral&pk=" contents={list}
                           onClickRemove={onClickDelete}/>


            </InnerBodyContainer>
        </DashboardWrapContainer>

    );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default SubmachineMaintenance;
