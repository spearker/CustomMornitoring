import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {useHistory} from "react-router-dom"
import {API_URLS,getStockList} from "../../Api/mes/manageStock";
import {transferCodeToName} from "../../Common/codeTransferFunctions";


const RawMaterialContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ material_name: "품목(품목명)" });
    const [subIndex, setSubIndex] = useState({ writer: '작성자' })
    const [filter, setFilter] = useState(-1)
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory()

    const indexList = {
        rawmaterial: {
            material_name: "품목(품목명)",
            material_type: ['자재 종류','원자재','부자재'],
            current_stock: "재고량",
            location_name: "보관장소",
            safe_stock: "안전재고",
        }
    }


    const detailTitle = {
        rawmaterial: {
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
            materials_type: '원자재',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '원자재',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '원자재',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '원자재',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '원자재',
            stock_type: '재공재고',
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
            date:'2020.08.09'
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
    //
    // const getData = useCallback( async(pk)=>{
    //     //TODO: 성공시
    //     const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
    //     const res = await getMoldData(tempUrl)
    //
    //     setDetailList(res)
    //
    // },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['stock'].list}?type=0&filter=${filter}&page=${page.current}`
        const res = await getStockList(tempUrl)

        const getStock = res.items.map((v,i)=>{
            const material_type = transferCodeToName('material', v.material_type)

            return {...v, material_type: material_type}
        })

        setList(getStock)

        setPage({ current: res.current_page+1, total: res.total_page })

    },[list])

    useEffect(()=>{
        getList()
        setIndex(indexList["rawmaterial"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['rawmaterial'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'원자재 관리'}
                indexList={index}
                valueList={list}
                EventList={eventList}
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

export default RawMaterialContainer
