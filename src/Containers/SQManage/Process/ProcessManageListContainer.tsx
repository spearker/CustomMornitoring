import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../../Components/Table/OvertonTable'
import {API_URLS, getCustomerData, postCustomerDelete} from '../../../Api/mes/customer'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'
import OptimizedTable from '../../../Components/Table/OptimizedTable'
import OptimizedHeaderBox from '../../../Components/Box/OptimizedHeaderBox'

Notiflix.Loading.Init({svgColor: '#1cb9df',})


const ProcessManageListContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [list, setList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [index, setIndex] = useState({name: '거래처 명'})
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [option, setOption] = useState<number>(0)
    const [contentsList, setContentsList] = useState<any[]>(['거래처명', '대표자명'])
    const [searchValue, setSearchValue] = useState<any>('')
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const history = useHistory()

    const indexList = {
        sqProcess: {
            name: '공정명',
            type: ['공정 타입', '단발', '라인'],
            state: '현황',
        }
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

    const optionChange = useCallback(async (filter: number) => {
        setOption(filter)
        const tempUrl = `${API_URLS['customer'].list}?keyword=${searchValue}&type=${(filter + 1)}&page=${page.current}&limit=15`
        const res = await getCustomerData(tempUrl)

        setList(res.info_list)
        setPage({current: res.current_page, total: res.total_page})
    }, [option, searchValue, page])


    const searchChange = useCallback(async (search) => {
        setSearchValue(search)

    }, [searchValue])

    const searchOnClick = useCallback(async () => {

        const tempUrl = `${API_URLS['customer'].list}?keyword=${searchValue}&type=${(option + 1)}&page=${page.current}&limit=15`
        const res = await getCustomerData(tempUrl)

        setList(res.info_list)
        setPage({current: res.current_page, total: res.total_page})

    }, [searchValue, option, page])

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v) => history.push(`/customer/register/${v.pk}`)
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/customer/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['customer'].delete}`
        const res = await postCustomerDelete(tempUrl, deletePk)

        arrayDelete()
        getList()
    }, [deletePk])

    const getList = useCallback(async () => { // useCallback
        // //TODO: 성공시
        // Notiflix.Loading.Circle()
        // const tempUrl = `${API_URLS['customer'].list}?keyword=${searchValue}&type=${option + 1}&page=${page.current}&limit=15`
        // const res = await getCustomerData(tempUrl)
        //
        // console.log('response', res)
        // setList(res.info_list)
        // setPage({current: res.current_page, total: res.total_page})
        // Notiflix.Loading.Remove()
    }, [searchValue, option, list, page])

    const titleButtons = [
        {
            Name: '등록하기',
            Width: '96px',
            Link: () => {
                history.push('/sq/manage/processregister')
            }
        },
        {
            Name: '삭제',
            Width: '68px',
            Link: () => {
            }
        }
    ]

    useEffect(() => {
        getList()
    }, [page.current])

    useEffect(() => {
        getList()
        setIndex(indexList['sqProcess'])
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    }, [])

    return (
        <div>
            <OptimizedHeaderBox title={'공정 SQ 인증 관리'} searchButtonOnClick={() => {
            }} titleOnClickEvent={titleButtons}/>
            <OptimizedTable
                widthList={['296px', '128px', '152px']}
                allCheckOnClickEvent={allCheckOnClick}
                indexList={index}
                valueList={list}
                currentPage={page.current}
                totalPage={page.total}
                selectBoxChange={() => {
                }}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                checkOnClickEvent={checkOnClick}
                noChildren={true}>
            </OptimizedTable>
        </div>
    )
}

export default ProcessManageListContainer
