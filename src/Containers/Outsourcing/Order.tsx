import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getOutsourcingList, postOutsourcingDelete, postOutsourcingList} from '../../Api/mes/outsourcing'
import {useHistory} from 'react-router-dom'
import {getCustomerData} from '../../Api/mes/customer'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import Notiflix from 'notiflix'
import {postMoldState} from '../../Api/mes/manageMold'
import OptimizedLineTable from '../../Components/Table/OptimizedLineTable'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const OrderContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [detailEventList, setDetaileventList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [contentsList, setContentsList] = useState<any[]>(['거래처명', '제품명'])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [index, setIndex] = useState({company_name: '외주처 명'})
    const [subIndex, setSubIndex] = useState({manager: '작성자'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMaterial, setSelectMaterial] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const history = useHistory()

    const indexList = {
        order: {
            company_name: '외주처 명',
            product: '제품 명',
            quantity: '수량',
            unpaid: '미납 수량',
            ceo_name: '대표자 명',
            registered: '등록 날짜',
        }
    }


    const detailTitle = {
        order: {
            manager: '작성자',
            due_date: '납기일',
            address: '회사 주소',
            payment_condition: '대금 지급 조건',
            status: '상태',
        },
    }


    const detaildummy = [
        {
            writer: '김담당',
            delivery_date: '2020.08.09',
            address: '회사시 회사구 회사동 123-456 A동 01',
            payment_condition: '납품 후 100일 내 잔금',
            statement: '대기중',
        },
    ]

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
        setSearchValue('')
        getList(filter, true)
    }, [option, searchValue])


    const searchChange = useCallback(async (search) => {
        setSearchValue(search)

    }, [searchValue])

    const searchOnClick = useCallback(async () => {
        getList(undefined, true)

    }, [searchValue, option])

    const onClick = useCallback((mold) => {
        if (mold.pk === selectPk) {
            setSelectPk(null)
            setSelectMaterial(null)
            setSelectValue(null)
        } else {
            setSelectPk(mold.pk)
            setSelectMaterial(mold.product)
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }

    }, [list, selectPk])


    const eventdummy = [
        {
            Name: '수정',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => history.push(`/outsourcing/order/register/${v.pk}`)
        },
        {
            buttonState: true,
            buttonWidth: 98,
            Link: (v) => v.status === '진행중' ? getComplete(v.pk) : getCancel(v.pk)
        }
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/outsourcing/order/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const detaileventdummy = [
        {
            Name: '완료하기',
            Width: 90,
        },
    ]

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['order'].delete}`
        const res = await postOutsourcingDelete(tempUrl, deletePk)

        arrayDelete()
        getList(undefined, true)
    }, [deletePk])


    const getComplete = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['order'].complete}`
        const res = await postMoldState(tempUrl, {pk: pk})

        setSelectPk(null)
        setSelectValue(null)
        getList()
    }, [selectPk, selectValue])

    const getCancel = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['order'].cancel}`
        const res = await postMoldState(tempUrl, {pk: pk})

        setSelectPk(null)
        setSelectValue(null)
        getList()
    }, [selectPk, selectValue])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['order'].load}?pk=${pk}`
        const res = await getOutsourcingList(tempUrl)
        if (res) {
            setDetailList([res])
        }
    }, [detailList])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const getList = useCallback(async (filter?: number, isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['order'].list}?keyword=${filter !== undefined ? '' : searchValue}&type=${filter !== undefined ? filter : option}&page=${isSearch ? 1 : page.current}&limit=15`
        const res = await getOutsourcingList(tempUrl)
        if (res) {
            const orderList = res.info_list.map((v) => {

                const quantity = AddComma(v.quantity)
                const unpaid = AddComma(v.unpaid)
                const status = v.status === 'WAIT' ? '진행중' : '완료'

                return {...v, quantity: quantity, unpaid: unpaid, status: status}
            })

            setList(orderList)
            setSelectPk(null)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page, option, searchValue])

    useEffect(() => {
        getList()
        setIndex(indexList['order'])
        // setList(dummy)
        // setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setDetaileventList(detaileventdummy)
        setSubIndex(detailTitle['order'])
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OvertonTable
                title={'외주처 발주 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                searchValue={searchValue}
                searchButtonOnClick={searchOnClick}
                indexList={index}
                valueList={list}
                buttonState={true}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                checkOnClickEvent={checkOnClick}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <OptimizedLineTable title={`${selectMaterial} 자세히 보기`} contentTitle={subIndex}
                                            contentList={detailList}
                                            widthList={['100px', '100px', '400px', '350px', '50px']}>
                            <Line/>
                        </OptimizedLineTable>
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

export default OrderContainer
