import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";
import {useHistory} from "react-router-dom"


const OutSourceContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({  item_pk: '품목(품목명)' });
    const [subIndex, setSubIndex] = useState({   writer: '작성자', })
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory()

    const indexList = {
        outsource: {
            item_pk: '품목(품목명)',
            materials_type: '자재 종류',
            stock_type: '재고 분류',
            stock_quantity: '재고량',
            storage_location: '보관장소',
            safety_stock: '안전재고'
        }
    }


    const detailTitle = {
        outsource: {
            writer: '작성자',
            sortation:'구분' ,
            stock_quantity:'수량',
            before_quantity:'변경전 재고량',
            date:'날짜',
        },
    }

    const dummy = [
        {
            item_pk: '품목00',
            materials_type: '완제품',
            stock_type: '외주 재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '반제품',
            stock_type: '외주 재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '원자재',
            stock_type: '외주 재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '완제품',
            stock_type: '외주 재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '완제품',
            stock_type: '외주 재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
    ]

    const detaildummy = [
        {
            writer: '김담당',
            sortation:'정상 입고' ,
            stock_quantity:'9,999,999,999',
            before_quantity:'9,999,999,999',
            date:'2020.08.09',
        },
    ]

    const eventdummy = [
        {
            Name: '입고',
            Width: 60,
            Color: 'white'
        },
        {
            Name: '출고',
            Width: 60,
            Color: 'white'
        },
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

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf',mold.pk,mold.mold_name);
        if(mold.pk === selectPk){
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        }else{
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        // getList()
        setIndex(indexList["outsource"])
        setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['outsource'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'외주 재고 관리'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                checkBox={true}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'입출고 현황'} contentTitle={subIndex} contentList={detailList}>
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

export default OutSourceContainer
