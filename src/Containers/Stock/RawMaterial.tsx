import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {useHistory} from "react-router-dom"
import {API_URLS, getStockList} from "../../Api/mes/manageStock";
import {transferCodeToName} from "../../Common/codeTransferFunctions";
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

const RawMaterialContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({material_name: "품목(품목명)"});
    const [subIndex, setSubIndex] = useState({registerer: '작성자',})
    const [filter, setFilter] = useState(-1)
    const [type, setType] = useState(0)
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectMold, setSelectMold] = useState<any>(null);

    const [selectValue, setSelectValue] = useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1
    })
    const history = useHistory()

    const indexList = {
        rawmaterial: {
            material_name: "품목(품목명)",
            material_type: ['자재 종류', '원자재', '부자재'],
            current_stock: "재고량",
            location_name: "보관장소",
            safe_stock: "안전재고",
        }
    }


    const detailTitle = {
        rawmaterial: {
            registerer: '작성자',
            type: '구분',
            amount: '수량',
            before_amount: '변경전 재고량',
            date: '날짜',
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
            Link: (v) => history.push(`/stock/warehousing/register/${v.pk}/${v.material_name}`)
        },
        {
            Name: '출고',
            Width: 60,
            Color: 'white',
            Link: (v) => {
                if (Number(v.current_stock) <= 0) {
                    alert('출고할 수 있는 재고가 없습니다.');
                } else {
                    history.push(`/stock/release/register/${v.pk}/${v.material_name}`);
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
        if (pk === null) {
            return
        }
        const tempUrl = `${API_URLS['stock'].loadDetail}?pk=${pk}&page=${detailPage.current}&limit=6`
        const res = await getStockList(tempUrl)
        if (res) {
            const getStock = res.info_list.map((v, i) => {
                const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                const before_amount = v.before_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                return {...v, amount: amount, before_amount: before_amount,}
            })

            setDetailList(getStock)

            setDetailPage({current: res.current_page, total: res.total_page})
        }
    }, [detailList, detailPage])

    const selectBox = useCallback((value) => {
        if (value === '원자재') {
            setFilter(0)
        } else if (value === '부자재') {
            setFilter(1)
        } else if (value === '자재 종류') {
            setFilter(-1)
        }

    }, [filter])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['stock'].list}?type=${type}&filter=${filter}&page=${page.current}&limit=5`
        const res = await getStockList(tempUrl)
        if (res) {
            const getStock = res.info_list.map((v, i) => {
                const material_type = transferCodeToName('material', v.material_type)
                const safe_stock = v.safe_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                const current_stock = v.current_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                return {...v, material_type: material_type, safe_stock: safe_stock, current_stock: current_stock}
            })

            setList(getStock)

            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, type, filter, page])

    useEffect(() => {
        getList()
    }, [filter])

    useEffect(() => {
        getList()
    }, [page.current])

    useEffect(() => {
        getData(selectPk)
    }, [detailPage.current])

    useEffect(() => {
        getList()
        setIndex(indexList["rawmaterial"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['rawmaterial'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'원자재 관리'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                selectBoxChange={selectBox}
                mainOnClickEvent={onClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            >
                {
                    selectPk !== null ?
                        <LineTable title={'입출고 현황'} contentTitle={subIndex} contentList={detailList}
                                   currentPage={detailPage.current}
                                   totalPage={detailPage.total}
                                   pageOnClickEvent={(event, i) => setDetailPage({...detailPage, current: i})}>
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

export default RawMaterialContainer
