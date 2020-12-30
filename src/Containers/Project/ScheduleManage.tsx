import React, {useCallback, useEffect, useState,} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getProjectList, postProjectDelete} from '../../Api/mes/production'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const ScheduleManageContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [index, setIndex] = useState({manager_name: '계획자명'})
    const [selectValue, setSelectValue] = useState<any>(null)
    const [selectDate, setSelectDate] = useState({
        start: moment().startOf('month').format('YYYY-MM-DD'),
        end: moment().endOf('month').format('YYYY-MM-DD')
    })
    const [contentsList, setContentsList] = useState<any[]>(['계획자명', '생산 품목명', '납품 업체명'])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)

    const history = useHistory()

    const indexList = {
        scheduleManage: {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            // schedule: '일정', 잘려서 뺌
            amount: '목표수량',
            current_amount: '작업수량',
        }
    }


    const titleeventdummy = [
        // {
        //     Name: '수정',
        // },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const eventdummy = [
        {
            Name: '전표 이력',
            Link: (v) => history.push(`/project/voucher/list/${v.pk}`)
        },
        {
            Name: '작업자 이력',
            Link: (v) => history.push(`/project/work/history/${v.pk}`)
        }
    ]

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

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.pk.indexOf(Data.pk)
        {
            deletePk.pk.indexOf(Data.pk) !== -1 ?
                deletePk.pk.splice(IndexPk, 1)
                :
                deletePk.pk.push(Data.pk)
        }
    }, [deletePk])


    const searchOnClick = useCallback(async () => {
        getList(undefined, true)

    }, [searchValue, option, page])

    const optionChange = useCallback(async (filter: number) => {
        setOption(filter)
        getList(filter, true)
    }, [option, searchValue, page])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const calendarOnClick = useCallback(async (start, end) => {
        setSelectDate({start: start, end: end ? end : ''})

        const tempUrl = `${API_URLS['production'].list}?from=${start}&to=${end}&page=1&keyword=${searchValue}&limit=5&type=${option}`
        const res = await getProjectList(tempUrl)
        if (res) {
            const getScheduleMange = res.info_list.map((v, i) => {

                const amount = AddComma(v.amount)
                const current_amount = AddComma(v.current_amount)
                return {...v, amount: amount, current_amount: current_amount}
            })

            setPage({current: res.current_page, total: res.total_page})

            setList(getScheduleMange)
        }
    }, [selectDate, page, searchValue, option])

    const getList = useCallback(async (filter?: number, isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['production'].list}?from=${selectDate.start}&to=${selectDate.end}&page=${isSearch ? 1 : page.current}&keyword=${searchValue}&limit=15&type=${filter !== undefined ? filter : option}`

        const res = await getProjectList(tempUrl)
        if (res) {
            const getScheduleMange = res.info_list.map((v, i) => {

                const amount = AddComma(v.amount)
                const current_amount = AddComma(v.current_amount)
                return {...v, amount: amount, current_amount: current_amount}
            })

            setPage({current: res.current_page, total: res.total_page})

            setList(getScheduleMange)
            Notiflix.Loading.Remove()
        }
    }, [list, page, selectDate, searchValue, option])

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['production'].delete}`
        const res = await postProjectDelete(tempUrl, deletePk)

        getList()
    }, [deletePk])

    useEffect(() => {
        getList()
    }, [page.current])


    useEffect(() => {
        getList()
        setIndex(indexList['scheduleManage'])
        // setList(dummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    }, [])

    return (
        <div>
            <OvertonTable
                title={'생산 계획 관리 리스트'}
                selectDate={selectDate}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchValue={searchValue}
                searchButtonOnClick={searchOnClick}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                calendarOnClick={calendarOnClick}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                EventList={eventList}
                checkOnClickEvent={checkOnClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                calendarState={true}
                noChildren={true}>
            </OvertonTable>
        </div>
    )
}


export default ScheduleManageContainer
