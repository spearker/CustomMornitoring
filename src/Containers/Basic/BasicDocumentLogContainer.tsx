import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, excelPost, excelGet} from '../../Api/mes/basic'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import BlackChildrenBox from '../../Components/Box/BlackChildrenBox'
import InAndOutHeader from '../../Components/Box/InAndOutHeader'
import InAndOutTable from '../../Components/Table/InAndOutTable'
import moment from 'moment'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const BasicDocumentLogContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [keyword, setKeyword] = useState<string>('')
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any>()
    const [filter, setFilter] = useState(-1)
    const [type, setType] = useState(10)
    const [selectTitle, setSelectTitle] = useState<number>(0)
    const [index, setIndex] = useState({log_data: '품목(품목명)'})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectStock, setSelectStock] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [subIndex, setSubIndex] = useState({writer: '출처'})
    const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))

    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1
    })
    const history = useHistory()

    const indexList = {
        wip: {
            log_data: '변경 사항',
            time: '변동 시간',
        }
    }


    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].logList}?page=${page.current}&limit=15`
        const res = await excelGet(tempUrl)

        if (res) {
            setList(res.info_list)
        }
        if (!page.total) {
            setPage({current: res.current_page, total: res.total_page})
        }
        Notiflix.Loading.Remove()
    }, [list, type, filter, page])


    useEffect(() => {
        getList()
        setIndex(indexList['wip'])
        // setList(dummy)
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OptimizedHeaderBox title={'표준 문서 변경 사항'}/>
            <OptimizedTable widthList={['904px', '200px']} indexList={index}
                            valueList={list}
                            currentPage={page.current}
                            totalPage={page.total}
                            mainOnClickEvent={(v) => Notiflix.Report.Success('변경 사항', `${v.log_data}`)}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            >
            </OptimizedTable>
        </div>
    )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default BasicDocumentLogContainer
