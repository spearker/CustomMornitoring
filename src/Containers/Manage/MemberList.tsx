import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getMemberList} from '../../Api/mes/member'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import BlackChildrenBox from '../../Components/Box/BlackChildrenBox'
import InAndOutHeader from '../../Components/Box/InAndOutHeader'
import InAndOutTable from '../../Components/Table/InAndOutTable'
import moment from 'moment'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const MemberListContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [keyword, setKeyword] = useState<string>('')
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any>()
    const [auth, setAuth] = useState(-1)
    const [index, setIndex] = useState({pk: '아이디'})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [selectStock, setSelectStock] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [subIndex, setSubIndex] = useState({writer: '출처'})
    const [saveKeyword, setSaveKeyword] = useState<string>('')

    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1
    })
    const history = useHistory()

    const indexList = {
        wip: {
            pk: '아이디',
            name: '유저명',
            authority: ['권한', '관리자', '작업자'],
        }
    }

    const detailTitle = {
        wipDetail: {
            writer: '출처',
            stock_quantity: '입고 수량',
            before_quantity: '',
            date: '입고일'
        }
    }

    const selectBox = useCallback((value) => {
        if (value === '관리자') {
            setAuth(0)
        } else if (value === '작업자') {
            setAuth(1)
        } else if (value === '권한') {
            setAuth(-1)
        }

    }, [auth])

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/manage/member/register')
        },
        // {
        //     Name: '수정',
        // },
        // {
        //     Name: '삭제',
        //     Link: () => 'postDelete()'
        // }
    ]

    const onClick = useCallback((stock) => {
        if (stock.pk === selectPk) {
            setSelectPk(null)
            setSelectStock(null)
            setSelectValue(null)
        } else {
            setSelectPk(stock.pk)
            setSelectStock(stock.item_name)
            setSelectValue(stock)
            //TODO: api 요청
            getData(stock.pk)
        }

    }, [list, selectPk])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        if (pk === null) {
            return
        }
        const tempUrl = `${API_URLS['stock'].loadDetail}?pk=${pk}&page=${detailPage.current}&limit=6`
        const res = await getMemberList(tempUrl)
        if (res) {
            setDetailList(res.info_list)
            setDetailPage({current: res.current_page, total: res.total_page})
        }
    }, [detailList, detailPage])

    const getList = useCallback(async (isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['member'].list}?keyword=${saveKeyword}&page=${isSearch ? 1 : page.current}&limit=15&auth=${auth}`
        const res = await getMemberList(tempUrl)
        if (res) {
            setList(res.info_list)
            setIsFirst(true)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, keyword, auth, page, saveKeyword])


    useEffect(() => {
        getList()
        setIndex(indexList['wip'])
        setTitleEventList(titleeventdummy)
        // setList(dummy)
    }, [])

    useEffect(() => {
        if (isFirst) {
            getList()
            setSubIndex(detailTitle['wipDetail'])
        }
    }, [page.current])


    useEffect(() => {
        if (isFirst) {
            getList(true)
        }
    }, [auth])

    useEffect(() => {
        if (isFirst) {
            getList(true)
        }
    }, [saveKeyword])

    return (
        <div>
            <OptimizedHeaderBox title={'사용자 리스트'} searchBarChange={(e) => setKeyword(e)}
                                searchBarValue={keyword}
                                searchButtonOnClick={() => setSaveKeyword(keyword)}
                                titleOnClickEvent={titleEventList}/>
            <OptimizedTable widthList={['264px', '96px', '96px']} indexList={index}
                            mainOnClickEvent={(v) => history.push(`/manage/member/register/${v.pk}`)}
                            selectBoxChange={selectBox}
                            valueList={list}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                            noChildren={true}
            >
            </OptimizedTable>
        </div>
    )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default MemberListContainer

