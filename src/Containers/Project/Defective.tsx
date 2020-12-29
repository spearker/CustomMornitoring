import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import {API_URLS, getProjectList, postProjectDelete} from '../../Api/mes/production'
import OvertonTable from '../../Components/Table/OvertonTable'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})
const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const DefectiveContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [list, setList] = useState<any[]>([])
    const [index, setIndex] = useState({checker_name: '검수자명'})
    const [contentsList, setContentsList] = useState<any[]>(['검수자명', '품목명'])
    const [searchValue, setSearchValue] = useState<any>('')
    const [option, setOption] = useState<number>(0)
    const [eventList, setEventList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [selectPk, setSelectPk] = useState<any>(null)
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [selectValue, setSelectValue] = useState<any>(null)
    const history = useHistory()

    const indexList = {
        defective: {
            checker_name: '검수자명',
            material_name: '품목명',
            amount: '불량 개수',
            date: '검수일',
        }
    }


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/project/defective/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]


    const eventdummy = [
        {
            Name: '수정',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => history.push(`/project/defective/register/${v.pk}`)
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

    const optionChange = useCallback(async (filter: number) => {
        setOption(filter)
        getList(filter, true)
    }, [option, searchValue, page])

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.pk.indexOf(Data.pk)
        {
            deletePk.pk.indexOf(Data.pk) !== -1 ?
                deletePk.pk.splice(IndexPk, 1)
                :
                deletePk.pk.push(Data.pk)
        }
    }, [deletePk])

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['defective'].delete}`
        const res = await postProjectDelete(tempUrl, {pk: deletePk.pk[0]})


        arrayDelete()
        getList()
        // selectPk(null)
    }, [deletePk])

    const searchOnClick = useCallback(async () => {
        getList(undefined, true)

    }, [searchValue, page])

    const onClick = useCallback((mold) => {
        if (mold.pk === selectPk) {
            setSelectPk(null)
            setSelectValue(null)
        } else {
            setSelectPk(mold.pk)
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }

    }, [list, selectPk])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const getList = useCallback(async (filter?: number, isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['defective'].list}?page=${isSearch ? 1 : page.current}&limit=15&keyword=${searchValue}&type=${filter !== undefined ? filter : option}`
        const res = await getProjectList(tempUrl)
        if (res) {
            const getWorker = res.info_list.map((v, i) => {

                const amount = AddComma(v.amount)

                return {...v, amount: amount}
            })

            setPage({current: res.current_page, total: res.total_page})
            setList(getWorker)
            Notiflix.Loading.Remove()
        }
    }, [list, page.current, searchValue, option])

    useEffect(() => {
        // getList()
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
        setIndex(indexList['defective'])
        // setList(dummy)

    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OvertonTable
                title={'불량 이력'}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchValue={searchValue}
                searchButtonOnClick={searchOnClick}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                checkOnClickEvent={checkOnClick}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                noChildren={true}>
            </OvertonTable>
        </div>
    )
}

export default DefectiveContainer
