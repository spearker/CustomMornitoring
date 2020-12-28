import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getOutsourcingList, postOutsourcingDelete} from '../../Api/mes/outsourcing'
import {useHistory} from 'react-router-dom'
import {getCustomerData} from '../../Api/mes/customer'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const CurrentContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [contentsList, setContentsList] = useState<any[]>(['외주처명', '대표자명'])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [index, setIndex] = useState({name: '외주처'})
    const [subIndex, setSubIndex] = useState({writer: '작성자'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const history = useHistory()

    const indexList = {
        current: {
            name: '외주처 명',
            telephone: '전화 번호',
            fax: '팩스 번호',
            ceo_name: '대표자 명',
            registered: '등록 날짜',
            /* safety_stock: '안전재고' */
        }
    }

    const detailTitle = {
        current: {
            writer: '작성자',
            sortation: '구분',
            stock_quantity: '수량',
            before_quantity: '변경전 재고량',
            date: '날짜',
        },
    }

    const arrayDelete = () => {
        while (true) {
            deletePk.pk.pop()
            if (deletePk.pk.length === 0) {
                break
            }
        }
    }

    const allCheckOnClick = useCallback((list) => {
        let tmpPk: string[] = []

        {
            list.length === 0 ?
                arrayDelete()
                :
                list.map((v, i) => {
                    arrayDelete()

                    if (deletePk.pk.indexOf(v.pk) === -1) {
                        tmpPk.push(v.pk)
                    }

                    tmpPk.map((vi, index) => {
                        if (deletePk.pk.indexOf(v.pk) === -1) {
                            deletePk.pk.push(vi)
                        }
                    })

                    if (tmpPk.length < deletePk.pk.length) {
                        deletePk.pk.shift()
                    }

                })
        }
    }, [deletePk])

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.pk.indexOf(Data.pk)
        {
            deletePk.pk.indexOf(Data.pk) !== -1 ?
                deletePk.pk.splice(IndexPk, 1)
                :
                deletePk.pk.push(Data.pk)
        }
    }, [deletePk])

    const optionChange = useCallback(async (filter: number) => {
        setOption(filter)
        getList(filter, true)
    }, [option, searchValue, page])


    const searchChange = useCallback(async (search) => {
        setSearchValue(search)

    }, [searchValue])

    const searchOnClick = useCallback(async () => {
        getList(undefined, true)

    }, [searchValue, option, page])

    const onClick = useCallback((mold) => {
        if (mold.pk === selectPk) {
            setSelectPk(null)
            setSelectMold(null)
            setSelectValue(null)
        } else {
            setSelectPk(mold.pk)
            setSelectMold(mold.mold_name)
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }


    }, [list, selectPk])

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v) => history.push(`/outsourcing/register/${v.pk}`)
        },

    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/outsourcing/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    // const getData = useCallback(async (pk) => {
    //     //TODO: 성공시
    //     const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
    //     const res = await getMoldData(tempUrl)
    //
    //     setDetailList(res)
    //
    // }, [detailList])
    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['outsourcing'].delete}`
        const res = await postOutsourcingDelete(tempUrl, deletePk)

        arrayDelete()

        getList(undefined, true)
    }, [deletePk])

    const getList = async (filter?: number, isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()

        const tempUrl = `${API_URLS['outsourcing'].list}?keyword=${searchValue}&type=${filter !== undefined ? filter : option}&page=${isSearch ? 1 : page.current}&limit=15`
        const res = await getOutsourcingList(tempUrl)
        if (res) {
            setList(res.info_list)

            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }

    useEffect(() => {
        getList()
        setIndex(indexList['current'])
        // setList(dummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['current'])
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OvertonTable
                title={'외주처 현황'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                searchButtonOnClick={searchOnClick}
                searchValue={searchValue}
                indexList={index}
                valueList={list}
                EventList={eventList}
                checkOnClickEvent={checkOnClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                /* clickValue={selectValue} */
                noChildren={true}
                mainOnClickEvent={onClick}>
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

export default CurrentContainer
