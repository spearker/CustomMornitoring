import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";
import {useHistory} from "react-router-dom"


const StockListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [BOMlist, setBOMList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any>({
        machine_pk: "",
        machine_name: "",
        recommend: 0
    });
    const [index, setIndex] = useState({ item_name: "품목(품목명)" });
    const [BOMindex, setBOMIndex] = useState({ item_name: "품목명00"});
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectStock, setSelectStock] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [subIndex, setSubIndex] = useState({writer: "작성자"})
    const history = useHistory()

    const indexList = {
        stock_list: {
            item_name: "품목(품목명)",
            // 자재 종류가 없습니다
            stock_type: "재고 분류",
            stock_quantity: "재고량",
            storage_location: "보관장소",
            safety_stock: "안전재고"
          }
    }

    const dummy = [
        {
            item_name: "품목명00",
            stock_type: "일반",
            stock_quantity: "1,000,000",
            storage_location: "창고01",
            safety_stock: "9,999,999"
        },
        {
            item_name: "품목명01",
            stock_type: "재공재고",
            stock_quantity: "1,000,000",
            storage_location: "창고01",
            safety_stock: "9,999,999"
        },
        {
            item_name: "품목명02",
            stock_type: "외주 재고",
            stock_quantity: "1,000,000",
            storage_location: "창고01",
            safety_stock: "9,999,999"
        },
        {
            item_name: "품목명03",
            stock_type: "외주 재고",
            stock_quantity: "1,000,000",
            storage_location: "창고01",
            safety_stock: "9,999,999"
        },
        {
            item_name: "품목명04",
            stock_type: "일반",
            stock_quantity: "1,000,000",
            storage_location: "창고01",
            safety_stock: "9,999,999"
        }
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/manageStock/register')
        },
        {
            Name: '삭제',
        }
    ]

    const eventdummy = [
        {
            Name: '입고',
            Width: 68,
            Color: 'white'
        },
        {
            Name: '출고',
            Width: 68,
            Color: 'white'
        },
    ]

    const detailTitle = {
        item_detailList: {
            writer: "작성자",
            sortation: "구분",
            stock_quantity: "수량",
            before_quantity: "변경전 재고량",
            date: "날짜"
        }
    }

    const detailValue = [
        {
            writer: "김담당",
            sortation: "정상 입고",
            stock_quantity: "9,999,999,9999",
            before_quantity: "9,999,999,9999",
            date: "2020.08.09"
        },
        {
            writer: "김담당",
            sortation: "정상 출고",
            stock_quantity: "9,999,999,9999",
            before_quantity: "9,999,999,9999",
            date: "2020.08.09"
        },
        {
            writer: "김담당",
            sortation: "정상 입고",
            stock_quantity: "9,999,999,9999",
            before_quantity: "9,999,999,9999",
            date: "2020.08.09"
        },
        {
            writer: "김담당",
            sortation: "정상 입고",
            stock_quantity: "9,999,999,9999",
            before_quantity: "9,999,999,9999",
            date: "2020.08.09"
        }
    ]


    const onClick = useCallback((stock) => {
        console.log('dsfewfewf', stock.type);
        if (stock.pk === selectPk) {
            setSelectPk(null);
            setSelectStock(null);
            setSelectValue(null);
        } else {
            setSelectPk(stock.pk);
            setSelectStock(stock.item_name);
            setSelectValue(stock)
            //TODO: api 요청
            // getData(stock.pk)
        }

    }, [list, selectPk]);

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    }, [list])

    useEffect(() => {
        // getList()
        setIndex(indexList["stock_list"])
        setTitleEventList(titleeventdummy)
        setList(dummy)
        setDetailList(detailValue)
        setSubIndex(detailTitle['item_detailList'])
        setEventList(eventdummy)
    }, [])

    return (
        <div>
            <OvertonTable
                title={'재고 현황'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                checkBox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectStock+' 입출고 현황'} contentTitle={subIndex} contentList={detailList}>
                            <Line />
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

export default StockListContainer;
