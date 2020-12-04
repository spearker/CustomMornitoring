import React, {useCallback, useEffect, useState,} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getProjectList, postProjectDelete} from '../../Api/mes/production'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'

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
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)

    const history = useHistory()

    const indexList = {
        scheduleManage: {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            // schedule: '일정', 잘려서 뺌
            amount: '총 수량',
            current_amount: '현재 수량',
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


    const calendarOnClick = useCallback(async (start, end) => {
        setSelectDate({start: start, end: end ? end : ''})

        const tempUrl = `${API_URLS['production'].list}?from=${start}&to=${end}&page=${page.current}&limit=15`
        const res = await getProjectList(tempUrl)
        if (res) {
            const getScheduleMange = res.info_list.map((v, i) => {

                const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                const current_amount = v.current_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                return {...v, amount: amount, current_amount: current_amount}
            })

            setPage({current: res.current_page, total: res.total_page})

            setList(getScheduleMange)
        }
    }, [selectDate, page])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['production'].list}?from=${selectDate.start}&to=${selectDate.end}&page=${page.current}&limit=15`

        const res = await getProjectList(tempUrl)
        if (res) {
            const getScheduleMange = res.info_list.map((v, i) => {

                const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                const current_amount = v.current_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                return {...v, amount: amount, current_amount: current_amount}
            })

            setPage({current: res.current_page, total: res.total_page})

            setList(getScheduleMange)
            Notiflix.Loading.Remove()
        }
    }, [list, page])

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
