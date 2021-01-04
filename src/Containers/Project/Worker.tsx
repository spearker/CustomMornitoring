import React, {useCallback, useEffect, useState,} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getProjectList,} from '../../Api/mes/production'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import moment from 'moment'
import Notiflix from 'notiflix'

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
Notiflix.Loading.Init({svgColor: '#1cb9df',})

interface Props {
    match: any;
    // chilren: string;
}

const WorkerContainer = ({match}: Props) => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [list, setList] = useState<any[]>([])
    const [index, setIndex] = useState({worker_name: '작업자'})
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [selectDate, setSelectDate] = useState({
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    })
    const [eventList, setEventList] = useState<any[]>([])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const history = useHistory()

    const indexList = {
        worker: {
            worker_name: '작업자',
            material_name: '품목명',
            process_name: '공정명',
            worked: '총 작업시간',
            amount: '작업량',
            state: '상태'
        }
    }


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/project/history/register')
        },
    ]

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

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

    const calendarOnClick = useCallback(async (start, end, isSearch?: boolean) => {
        setSelectDate({start: start, end: end ? end : ''})
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['production'].history}?pk=${match.params.pk !== undefined ? match.params.pk : ''}&from=${start}&to=${end}&limit=15&page=${isSearch ? 1 : page.current}&keyword=${searchValue}`
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
    }, [selectDate, match.params.pk, searchValue, page, option])

    const searchOnClick = useCallback(async () => {
        getList(true)

    }, [searchValue, option, page])

    const getList = useCallback(async (isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['production'].history}?pk=${match.params.pk !== undefined ? match.params.pk : ''}&from=${selectDate.start}&to=${selectDate.end}&limit=15&page=${isSearch ? 1 : page.current}&keyword=${searchValue}`
        const res = await getProjectList(tempUrl)
        if (res) {
            const getWorker = res.info_list.map((v, i) => {

                const amount = AddComma(v.amount)


                return {...v, amount: amount}
            })
            setIsFirst(true)
            setPage({current: res.current_page, total: res.total_page})
            setList(getWorker)
            Notiflix.Loading.Remove()
        }
    }, [list, selectDate, page, match.params.pk, option, searchValue])

    const eventdummy = [
        {
            buttonWidth: 80,
            Color: 'white',
            Link: (v) => v.state === '완료됨' ? null : history.push(`/project/history/register/${v.pk}`),
            Text: (v) => v.state === '완료됨' ? v.scheduled.split('~')[1] : undefined

        },
    ]

    useEffect(() => {
        // getList()
        setTitleEventList(titleeventdummy)
        setIndex(indexList['worker'])
        setEventList(eventdummy)
        // setList(dummy)

    }, [])

    useEffect(() => {
        if (isFirst) {
            getList()
        }
    }, [page.current, match.params.pk])

    return (
        <div>
            <OvertonTable
                title={'작업 이력'}
                selectDate={selectDate}
                searchValue={searchValue}
                searchButtonOnClick={searchOnClick}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                calendarOnClick={calendarOnClick}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                eventTitle={'작업 완료 시간'}
                buttonDisappear={true}
                noChildren={true}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}>
            </OvertonTable>
        </div>
    )
}


export default WorkerContainer
