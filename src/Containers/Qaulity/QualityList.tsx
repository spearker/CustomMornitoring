import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getQualityList, postQualityRegister} from '../../Api/mes/quality'
import {getCustomerData} from '../../Api/mes/customer'
import QualityTableDropdown from '../../Components/Dropdown/QualityTableDropdown'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const QualityListContainer = () => {

    const history = useHistory()

    const [list, setList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [detailList, setDetailList] = useState<any[]>([])
    const [index, setIndex] = useState({material_name: '품목(품목명)'})
    const [subIndex, setSubIndex] = useState({factory_name: '공정명'})
    const [checkIndex, setCheckIndex] = useState({checker: '검사자'})
    const [checkDetail, setCheckDetail] = useState<any[]>([])
    const [countIndex, setCountIndex] = useState({total_count: '총 완료 개수'})
    const [countDetail, setCountDetail] = useState<any[]>([])
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [workerIndex, setWorkerIndex] = useState({worker: '작업자'})
    const [workerDetail, setWorkerDetail] = useState<any[]>([])
    const [selectPk, setSelectPk] = useState<any>(null)
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const indexList = {
        quality: {
            material_name: '품목(품목명)',
            process_name: '공정명',
            amount: '총 완료 개수',
            eligible: '적격 개수',
            ineligible: '부적격 개수',
            whether: '적격 여부',
            statement: '검수 상태'
        }
    }

    const onClick = useCallback((obj) => {
        if (obj.statement === '검수 완료') {
            history.push(`/quality/current/detail/${obj.request_pk}`)
        } else {
            history.push(`/quality/test/request/status/${obj.request_pk}`)
        }
    }, [])

    const eventdummy = [
        {
            Name: '삭제',
            Width: '180px',
            Color: 'white',
            buttonWidth: '70px',
            Link: (v) => v.statement === '대기' ? onClickDelete(v.request_pk) : onClickDelete(v.response_pk)
        },
    ]

    // const optionChange = useCallback(async (filter:number)=>{
    //     setOption(filter)
    //     const tempUrl = `${API_URLS['customer'].list}?keyword=${searchValue}&type=${(filter+1)}&page=${page.current}`
    //     const res = await getCustomerData(tempUrl)

    //     setList(res.info_list)
    //     setPage({ current: res.current_page, total: res.total_page })
    // },[option,searchValue])


    const searchChange = useCallback(async (search) => {
        setSearchValue(search)

    }, [searchValue])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const searchOnClick = useCallback(async (isPage?: boolean) => {
        setIsSearch(true)
        const tempUrl = `${API_URLS['status'].search}?keyWord=${searchValue}&page=${isPage ? page.current : 1}&limit=15`
        const res = await getCustomerData(tempUrl)
        if (res) {
            let viewList: any[] = []

            res.info_list.map(v => viewList.push(
                {
                    request_pk: v.request_pk,
                    material_name: v.material_name !== undefined ? v.material_name : '-',
                    process_name: v.process_name !== undefined ? v.process_name : '-',
                    amount: v.amount !== undefined ? AddComma(v.amount) : 0,
                    eligible: v.eligible !== undefined ? AddComma(v.eligible) : 0,
                    ineligible: v.ineligible !== undefined ? AddComma(v.ineligible) : 0,
                    whether: v.whether !== undefined ? v.whether : '-',
                    statement: v.statement !== undefined ? v.statement : '-'
                }
            ))

            setList(viewList.filter((f: any) => f.material_name !== undefined))
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [searchValue, page])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['status'].list}?page=${page.current}&limit=15`
        const res = await getQualityList(tempUrl)
        if (res) {
            let viewList: any[] = []

            res.info_list.map(v => viewList.push(
                {
                    request_pk: v.request_pk,
                    material_name: v.material_name !== undefined ? v.material_name : '-',
                    process_name: v.process_name !== undefined ? v.process_name : '-',
                    amount: v.amount !== undefined ? AddComma(v.amount) : 0,
                    eligible: v.eligible !== undefined ? AddComma(v.eligible) : 0,
                    ineligible: v.ineligible !== undefined ? AddComma(v.ineligible) : 0,
                    whether: v.whether !== undefined ? v.whether : '-',
                    statement: v.statement !== undefined ? v.statement : '-',
                    response_pk: v.response_pk !== undefined ? v.response_pk : '-'
                }
            ))
            setIsFirst(true)
            setList(viewList.filter((f: any) => f.material_name !== undefined))
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page])

    /**
     * onClickDelete()
     * 리스트 항목 삭제
     */
    const onClickDelete = useCallback(async (id) => {
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['status'].delete}`
        const result = await postQualityRegister(tempUrl, {quality_pk: id})
        if (result) {
            getList().then(() => Notiflix.Loading.Remove(300))
        }
        getList().then(() => Notiflix.Loading.Remove(300))
    }, [list])


    useEffect(() => {
        if (isSearch) {
            searchOnClick(true)
        } else {
            if (isFirst) {
                getList()
            }
        }
    }, [page.current])

    useEffect(() => {
        getList()
        setIndex(indexList['quality'])
        setEventList(eventdummy)
    }, [])

    return (
        <div>
            <OvertonTable
                title={'제품 품질 현황'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                widthList={['220px', '220px', '130px', '130px', '130px', '130px', '80px']}
                mainOnClickEvent={onClick}
                noChildren={true}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                searchValue={searchValue}
                searchButtonOnClick={searchOnClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'제품 품질 현황 자세히 보기 : 품목명 00 _ 공정명 00 '}>
                            <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={subIndex}
                                                  contentList={detailList} widthList={['40%', '45%', '15%']}/>
                            <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={checkIndex}
                                                  contentList={checkDetail} widthList={['10%', '75%', '15%']}>
                                <div style={{marginTop: '70px', marginLeft: '10%', marginBottom: '50px'}}>
                                    <QualityTableDropdown pk={'123'} contentTitle={countIndex} contentList={countDetail}
                                                          widthList={['32%', '30%', '19%', '16%']}>

                                    </QualityTableDropdown>
                                </div>
                            </QualityTableDropdown>
                            <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={workerIndex}
                                                  contentList={workerDetail} widthList={['10%', '75%', '15%']}/>
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

export default QualityListContainer
