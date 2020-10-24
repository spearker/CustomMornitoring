import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import {getToken} from '../../Common/tokenFunctions'
import 'react-dropdown/style.css'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown'
import SubNavigation from '../../Components/Navigation/SubNavigation'
import {ROUTER_MENU_LIST} from '../../Common/routerset'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getRequest, postRequest} from '../../Common/requestFunctions'
import SearchInputSmall from '../../Components/Input/SearchInputSmall'
import SmallButtonLink from '../../Components/Button/SmallButtonLink'
import InfoTable from '../../Components/Table/InfoTable'

import {useHistory} from 'react-router-dom'

const StockList = () => {
    const history = useHistory()

    const [list, setList] = useState<IMaterial[]>([])
    const [option, setOption] = useState(0)
    const [keyword, setKeyword] = useState<string>('')
    const optionList = [
        '등록순', '이름순', '재고순'
    ]
    const index = {
        material_name: '자재 이름',
        material_code: '자재 번호',
        distributor: '유통사',
        stock: '재고',
    }


    /**
     * getSearchList()
     * 목록 검색
     * @param {string} url
     * @returns X
     */
    const getSearchList = useCallback(async (e) => {
        e.preventDefault()
        const results = await getRequest('http://211.208.115.66:8199/api/v1/material/list?keyword=' + keyword + '&orderBy=' + option, getToken(TOKEN_NAME))
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
    }, [list, option, keyword])


    /**
     * getList()
     * 목록 불러오기
     * @param {string} url
     * @returns X
     */
    const getList = useCallback(async () => {

        const results = await getRequest('http://211.208.115.66:8199/api/v1/material/list?keyword=' + keyword + '&orderBy=' + option, getToken(TOKEN_NAME))
        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [list, keyword, option])

    /**
     * onClickFilter()
     * 리스트 필터 변경
     * @param {string} filter 필터 값
     * @returns X
     */
    const onClickFilter = useCallback(async (filter: number) => {
        setOption(filter)
        ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )

        const results = await getRequest('http://211.208.115.66:8199/api/v1/material/list?keyword=' + keyword + '&orderBy=' + option, getToken(TOKEN_NAME))

        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [option, list, keyword])

    useEffect(() => {
        getList()

    }, [])


    const onClickDelete = useCallback(async (id) => {

        const results = await postRequest('http://112.168.150.239:8299/api/v1/material/delete', {pk: id}, getToken(TOKEN_NAME))

        console.log('--select id : ' + id)
        if (results === false) {
            //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
        } else {
            if (results.status === 200) {
                getList()
            } else {
                //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
            }
        }


    }, [])


    const onClickList = useCallback((id) => {
        history.push(`/stock/change/in?pk=${id}`)


    }, [])
    const onClickList2 = useCallback((id) => {
        history.push(`/stock/change/out?pk=${id}`)


    }, [])
    return (
        <DashboardWrapContainer index={8}>
            <SubNavigation list={ROUTER_MENU_LIST[8]}/>
            <InnerBodyContainer>
                <div style={{position: 'relative'}}>
                    <Header title={`재고 현황 (${list.length})`}/>
                    <p style={{float: 'left', color: '#ffffff90'}}>각 항목을 클릭하면, 해당 재고의 최근 변동 이력을 확인 할 수 있습니다.</p>
                    <div style={{position: 'absolute', display: 'inline-block', top: 0, right: 0, zIndex: 4}}>
                        <SmallButtonLink name="+ 입고 등록" link="/stock/change/in"/>
                        <SmallButtonLink name="+ 출고 등록" link="/stock/change/out"/>
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

                <InfoTable indexList={index} pkKey={'pk'} type={'material'} onClickEvent={onClickList}
                           onClickEventName={'입고'}
                           onClickEvent2={onClickList2} onClickEventName2={'출고'} onClickLinkUrl="/stock/history?pk="
                           contents={list}/>

            </InnerBodyContainer>
        </DashboardWrapContainer>

    )
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default StockList
