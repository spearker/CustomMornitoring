import React, {useCallback, useEffect, useState} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getOvertoneData} from '../../Api/pm/preservation'
import Styled from 'styled-components'
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});


const OvertonMaintenanceContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [option, setOption] = useState(0)
    const [keyword, setKeyword] = useState<string>('')
    const [index, setIndex] = useState({machine_name: '기계명'})
    const [subIndex, setSubIndex] = useState({tons: '정상톤'})
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMachine, setSelectMachine] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)


    const indexList = {
        overtone: {
            machine_name: '기계명',
            manufacturer_code: '기계 번호',
            factory_name: '공정명',
            registered: '기계 등록 시간'
        }
    }

    const detailTitle = {
        overtone: {
            tons: '정상톤',
            overTon: '오버톤',
            registered: '오버톤 시간',
        },
    }

    const onClick = useCallback(machine => {
        console.log(machine.pk, machine.machine_name)
        if (machine.pk === selectPk) {
            setSelectPk(null)
            setSelectMachine(null)
            setSelectValue(null)
            setDetailPage({...detailPage, current: 1})
        } else {
            setSelectPk(machine.pk)
            setSelectMachine(machine.machine_name)
            setSelectValue(machine)
            //TODO: api 요청
            getData(machine.pk)
            setDetailPage({...detailPage, current: 1})
        }
    }, [list, selectPk])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시

        if (pk) {
            Notiflix.Loading.Circle()
            const tempUrl = `${API_URLS['overtone'].load}?pk=${pk}&page=${detailPage.current}&limit=15`
            const res = await getOvertoneData(tempUrl)

            setDetailList(res.info_list)

            setDetailPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [detailList, selectPk])


    const getList = useCallback(async () => { // useCallback
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['overtone'].list}?page=${page.current}&limit=15`
        const res = await getOvertoneData(tempUrl)

        setList(res.info_list)

        setPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
    }, [list, page])

    useEffect(() => {
        setIndex(indexList['overtone'])
        setSubIndex(detailTitle['overtone'])
        getList()
    }, [])


    useEffect(() => {
        getList()
    }, [page.current])

    useEffect(() => {
        getData(selectPk)
    }, [page.current])

    return (
        <OvertonTable
            title={'프레스 오버톤'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            currentPage={page.current}
            totalPage={page.total}
            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    <LineTable title={selectMachine + ' 상세내용'}
                               contentTitle={subIndex}
                               contentList={detailList}
                               currentPage={detailPage.current}
                               totalPage={detailPage.total}
                               pageOnClickEvent={(i: number) => setDetailPage({...detailPage, current: i})}>
                        <Line/>
                    </LineTable>
                    :
                    null
            }
        </OvertonTable>
    )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default OvertonMaintenanceContainer
