import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getMoldList, postMoldRegister, postMoldState} from '../../Api/mes/manageMold'
import {useHistory} from 'react-router-dom'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import {postOutsourcingDelete} from '../../Api/mes/outsourcing'
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

const CurrentContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [index, setIndex] = useState({mold_name: '금형 이름'})
    const [subIndex, setSubIndex] = useState({manager: '작업자'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const history = useHistory()

    const indexList = {
        repair: {
            mold_name: '금형명',
            manager_name: '담당자 이름',
            registered: '수리 등록 날짜',
            complete_date: '완료 예정 날짜',
            status: '상태'
        }
    }


    const detailTitle = {
        repair: {
            manager: '작업자',
            repair_content: '수리 내용',
            status: '상태',
            complete_date: '완료 날짜'
        },
    }

    const detaildummy = [
        {
            worker: '홍길동',
            total_count: '99,999',
            defective_count: '91',
            description: ['요청 내용이 입력되어 있습니다. 요청 내용이 입력되어 있습니다.', '요청 내용이 입력되어 있습니다. 요청 내용이 입력되어 있습니다.', '요청 내용이 입력되어 있습니다. 요청 내용이 입력되어 있습니다.']
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/mold/repair/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const eventdummy = [
        {
            Width: 98,
            Link: (v) => v.status === '진행중' ? getComplete(v.pk) : getCancel(v.pk),
            buttonState: true
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
        let mySet: Set<string> = new Set<string>()

        {
            list.length === 0 ?
                arrayDelete()
                :
                list.map((v, i) => {
                    arrayDelete()

                    if (deletePk.pk.indexOf(v.pk) === -1) {
                        mySet.add(v.pk)
                    }

                    mySet.forEach((vi) => {
                        if (deletePk.pk.indexOf(v.pk) === -1) {
                            deletePk.pk.push(vi)
                        }
                    })

                    if (mySet.size < deletePk.pk.length) {
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

    const onClick = useCallback((mold) => {
        if (mold.pk === selectPk) {
            setSelectPk(null)
            setSelectMold(null)
            setSelectValue(null)
        } else {
            setSelectPk(mold.repair_pk)
            setSelectMold(mold.mold_name)
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }
    }, [list, selectPk])


    const getComplete = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].complete}`
        const res = await postMoldState(tempUrl, {pk: pk})

        setDetailList(res)
        getList()
    }, [detailList])

    const getCancel = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].cancel}`
        const res = await postMoldState(tempUrl, {pk: pk})

        setDetailList(res)
        getList()
    }, [detailList])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].detail}?pk=${pk}`
        const res = await getMoldList(tempUrl)

        const Detail = [res].map((v, i) => {
            const status = v.status === 'WAIT' ? '진행중' : '완료'

            return {...v, status: status}
        })

        setDetailList(Detail)

    }, [detailList, selectPk])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['repair'].list}?page=${page.current}&keyword=&type=0&limit=15`
        const res = await getMoldList(tempUrl)

        const getStock = res.info_list.map((v, i) => {
            const status = v.status === 'WAIT' ? '진행중' : '완료'

            return {...v, status: status}
        })

        setList(getStock)

        setPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
    }, [list])

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['repair'].delete}`
        const res = await postMoldRegister(tempUrl, deletePk)

        arrayDelete()
        getList()
    }, [deletePk])

    useEffect(() => {
        getList()
    }, [page.current])


    useEffect(() => {
        getList()
        setIndex(indexList['repair'])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['repair'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'금형 수리 현황 없음'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                indexList={index}
                valueList={list}
                EventList={eventList}
                buttonState={true}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectMold + ' 수리 현황'} contentTitle={subIndex} contentList={detailList}>
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

export default CurrentContainer
