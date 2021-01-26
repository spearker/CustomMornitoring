import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {useHistory} from 'react-router-dom'
import {API_URLS, getStockList} from '../../Api/mes/manageStock'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const PartsContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [index, setIndex] = useState({parts_name: '부품명'})
    const [subIndex, setSubIndex] = useState({type: '입/반출'})
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [filter, setFilter] = useState(-1)
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [keyword, setKeyword] = useState<string>('')
    const [saveKeyword, setSaveKeyword] = useState<string>('')
    const [option, setOption] = useState<number>(0)
    const [contentsList, setContentsList] = useState<any[]>(['부품명', '부품 종류명', '보관장소'])
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1,
    })
    const history = useHistory()

    const indexList = {
        parts: {
            parts_name: '부품명',
            parts_type_name: '부품 종류',
            parts_stock: '부품 재고량',
            parts_cost: '부품 원가',
            location_name: '공장명'
        }
    }


    const detailTitle = {
        parts: {
            type: '입/반출',
            division: '구분',
            amount: '입/반출 수량',
            date: '입/출고 날짜',
            registered: '등록일자'
        },
    }

    const detaildummy = [
        {
            writer: '김담당',
            sortation: '정상 입고',
            stock_quantity: '9,999,999,999',
            before_quantity: '9,999,999,999',
            date: '2020.08.09'
        },
    ]

    const eventdummy = [
        {
            Name: '입고',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => history.push(`/stock/warehousing/register/${v.pk}/${encodeURIComponent(v.parts_name)}/${true}`)
        },
        {
            Name: '출고',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => {
                if (v.parts_stock.split(',').join('') > 0) {
                    history.push(`/stock/release/register/${v.pk}/${encodeURIComponent(v.parts_name)}/${true}`)
                } else {
                    alert('출고할 수 있는 재고가 없습니다.')
                }
            }
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/manageStock/register')
        },
        {
            Name: '삭제',
        }
    ]

    const onClick = useCallback((mold) => {
        setDetailPage({...detailPage, current: 1})
        if (mold.pk === selectPk) {
            setSelectPk(null)
            setSelectMold(null)
            setSelectValue(null)
        } else {
            setSelectPk(mold.pk)
            setSelectMold(mold.mold_name)
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }


    }, [list, selectPk])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        if (pk === null) {
            return
        }

        const tempUrl = `${API_URLS['parts'].detail}?pk=${pk}&page=${detailPage.current}&limit=7`
        const res = await getStockList(tempUrl)
        if (res) {
            const getStock = res.info_list.map((v, i) => {
                const division = transferCodeToName('stock', Number(v.division))
                const amount = AddComma(v.amount)
                const parts_stock = AddComma(v.parts_stock)

                return {...v, division: division, amount: amount, parts_stock: parts_stock,}
            })

            setDetailList(getStock)

            setDetailPage({current: res.current_page, total: res.total_page})
        }
    }, [detailList, detailPage])

    const getList = useCallback(async (isSearch?: boolean, searchOption?: number) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['parts'].list}?page=${isSearch ? 1 : page.current}&limit=5&keyword=${searchOption !== undefined ? '' : saveKeyword}&st=${searchOption ? searchOption : option}`
        const res = await getStockList(tempUrl)
        if (res) {
            const getStock = res.info_list.map((v, i) => {
                const parts_cost = AddComma(v.parts_cost)
                const parts_stock = AddComma(v.parts_stock)

                return {...v, parts_cost: parts_cost, parts_stock: parts_stock}
            })
            setIsFirst(true)
            setList(getStock)
            setSelectPk(null)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page, keyword, saveKeyword])

    useEffect(() => {
        if (isFirst) {
            getList()
        }
    }, [page.current])

    useEffect(() => {
        if (selectPk !== null) {
            getData(selectPk)
        }
    }, [detailPage.current])

    useEffect(() => {
        getList()
        setIndex(indexList['parts'])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['parts'])
    }, [])

    useEffect(() => {
        if (isFirst) {
            getList(true)
        }
    }, [saveKeyword])

    const optionChange = useCallback(async (filter: number) => {
        setOption(filter)
        getList(true, filter)
        setKeyword('')
        setSaveKeyword('')
    }, [option, keyword, page, saveKeyword])

    return (
        <div>
            <OvertonTable
                title={'부품 관리'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                dropDownContents={contentsList}
                dropDownOnClick={optionChange}
                dropDownOption={option}
                searchValue={keyword}
                searchBarChange={(e) => setKeyword(e)}
                searchButtonOnClick={() => setSaveKeyword(keyword)}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'입반출 현황'} contentTitle={subIndex} contentList={detailList}
                                   currentPage={detailPage.current}
                                   totalPage={detailPage.total}
                                   pageOnClickEvent={(event, i) => setDetailPage({...detailPage, current: i})}>
                            <Line/>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default PartsContainer
