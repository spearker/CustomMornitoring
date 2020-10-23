import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {useHistory} from "react-router-dom"
import {API_URLS, getStockList} from "../../Api/mes/manageStock";
import {transferCodeToName} from "../../Common/codeTransferFunctions";


const PartsContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({parts_name: "부품명"});
    const [subIndex, setSubIndex] = useState({type: "입/반출"})
    const [filter, setFilter] = useState(-1)
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectMold, setSelectMold] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory()

    const indexList = {
        parts: {
            parts_name: "부품명",
            parts_type_name: "부품 종류",
            parts_stock: "부품 재고량",
            parts_cost: "부품 원가",
            location_name: "공장명"
        }
    }


    const detailTitle = {
        parts: {
            type: "입/반출",
            division: "구분",
            amount: "입/반출 수량",
            date: "날짜"
        },
    }

    const detaildummy = [
        {
            writer: '김담당',
            sortation: '정상 입고',
            stock_quantity: '9,999,999,999',
            before_quantity: '9,999,999,999',
            date: '2020.08.09'
        },
    ]

    const eventdummy = [
        {
            Name: '입고',
            Width: 60,
            Color: 'white',
            Link: (v) => history.push(`/stock/warehousing/register/${v.pk}/${v.parts_name}/${true}`)
        },
        {
            Name: '출고',
            Width: 60,
            Color: 'white',
            Link: (v) => {
                if (Number(v.parts_stock) > 0) {
                    history.push(`/stock/release/register/${v.pk}/${v.parts_name}/${true}`)
                } else {
                    alert('출고할 수 있는 재고가 없습니다.')
                }
            }
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/manageStock/register')
        },
        {
            Name: '삭제',
        }
    ]

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf', mold.pk, mold.mold_name);
        if (mold.pk === selectPk) {
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        } else {
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }


    }, [list, selectPk]);

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['parts'].detail}?pk=${pk}`
        const res = await getStockList(tempUrl)

        const getStock = res.info_list.map((v, i) => {
            const division = transferCodeToName('stock', Number(v.division))
            return {...v, division: division}
        })

        console.log(getStock)
        setDetailList(getStock)

    }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['parts'].list}?page=${page.current}&limit=15`
        const res = await getStockList(tempUrl)

        setList(res.info_list)

        setPage({current: res.current_page, total: res.total_page})

    }, [list, page])

    useEffect(() => {
        getList()
    }, [page.current])

    useEffect(() => {
        getList()
        setIndex(indexList["parts"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['parts'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'부품 관리'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'입반출 현황'} contentTitle={subIndex} contentList={detailList}>
                            <Line/>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default PartsContainer
