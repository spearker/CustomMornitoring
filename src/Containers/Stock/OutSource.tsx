import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getStockList} from '../../Api/mes/manageStock'
import {useHistory} from 'react-router-dom'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const OutSourceContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [index, setIndex] = useState({material_name: '품목명'})
    const [subIndex, setSubIndex] = useState({registerer: '작성자'})
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [filter, setFilter] = useState<number>(-1)
    const [keyword, setKeyword] = useState<string>('')
    const [saveKeyword, setSaveKeyword] = useState<string>('')
    const [option, setOption] = useState<number>(0)
    const [contentsList, setContentsList] = useState<any[]>(['품목명', '품번', '보관장소'])
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1
    })

    const history = useHistory()

    const indexList = {
        outsource: {
            material_name: '품목명',
            material_code: '품번',
            material_type: ['품목 종류', '원자재', '부자재', '반제품', '완제품'],
            current_stock: '현재 재고',
            safe_stock: '안전 재고',
            location_name: '보관 장소',
        }
    }


    const detailTitle = {
        outsource: {
            registerer: '작성자',
            type: '구분',
            amount: '수량',
            before_amount: '변경전 재고량',
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
            date: '2020.08.09',
        },
    ]

    const eventdummy = [
        {
            Name: '입고',
            Width: 60,
            Color: 'white'
        },
        {
            Name: '출고',
            Width: 60,
            Color: 'white'
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

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        if (pk === null) {
            return
        }

        const tempUrl = `${API_URLS['stock'].loadDetail}?pk=${pk}&page=${detailPage.current}&limit=6`
        const res = await getStockList(tempUrl)
        if (res) {
            const getStock = res.info_list.map((v, i) => {
                const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                const before_amount = v.before_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                return {...v, amount: amount, before_amount: before_amount,}
            })

            setDetailList(getStock)

            setDetailPage({current: res.current_page, total: res.total_page})
        }
    }, [detailList, detailPage])

    const getList = useCallback(async (isSearch?: boolean, searchOption?: number) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['stock'].outsourcelist}?&filter=${filter}&page=${isSearch ? 1 : page.current}&limit=5&keyword=${searchOption !== undefined ? '' : saveKeyword}&st=${searchOption ? searchOption : option}`
        const res = await getStockList(tempUrl)
        if (res) {
            const getStock = res.info_list.map((v, i) => {
                const material_type = transferCodeToName('material', v.material_type)
                const safe_stock = v.safe_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                const current_stock = v.current_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                return {...v, material_type: material_type, safe_stock: safe_stock, current_stock: current_stock}
            })
            setIsFirst(true)
            setList(getStock)
            setSelectPk(null)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page, keyword, filter, saveKeyword])

    const selectBox = useCallback((value) => {
        if (value === '원자재') {
            setFilter(0)
        } else if (value === '부자재') {
            setFilter(1)
        } else if (value === '반제품') {
            setFilter(10)
        } else if (value === '완제품') {
            setFilter(30)
        } else if (value === '품목 종류') {
            setFilter(-1)
        }

    }, [filter])

    useEffect(() => {
        if (isFirst) {
            getList(true)
        }
    }, [filter])

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
        setIndex(indexList['outsource'])
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['outsource'])
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
                title={'외주 재고 관리'}
                indexList={index}
                valueList={list}
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
                selectBoxChange={selectBox}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'입출고 현황'} contentTitle={subIndex} contentList={detailList}
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

export default OutSourceContainer
