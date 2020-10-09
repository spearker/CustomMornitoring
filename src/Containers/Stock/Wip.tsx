import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {useHistory} from "react-router-dom"
import {API_URLS, getStockList} from "../../Api/mes/manageStock";
import {transferCodeToName} from "../../Common/codeTransferFunctions";

const SelectType = [0,10,30]

const WipContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ material_name: "품목(품목명)" });
    const [subIndex, setSubIndex] = useState({ writer: '작성자' })
    const [filter, setFilter] = useState(10)
    const [type, setType] = useState(10)
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory()

    const indexList = {
        wip: {
            material_name: "품목(품목명)",
            material_type: ['자재 종류','반제품','완제품'],
            current_stock: "재고량",
            location_name: "보관장소",
            safe_stock: "안전재고",
        }
    }


    const detailTitle = {
        wip: {
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
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '반제품',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '자재 종류',
            stock_type: '재공재고',
            stock_quantity: '1,000,000',
            storage_location: '창고01',
            safety_stock: '9,999,999'
        },
        {
            item_pk: '품목00',
            materials_type: '자재 종류',
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
            date:'2020.08.09',
        },
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
            getData(mold.pk)
        }



    }, [list, selectPk]);

    const eventdummy = [
        {
            Name: '입고',
            Width: 60,
            Color: 'white',
            Link: (v)=>history.push(`/stock/warehousing/register/${v.pk}/${v.material_name}`)
        },
        {
            Name: '출고',
            Width: 60,
            Color: 'white',
            Link: (v)=>history.push(`/stock/release/register/${v.pk}/${v.material_name}`)
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

    const selectBox = useCallback((value)=>{
        console.log(value)
        if(value === '반제품' || value === '자재 종류'){
            setFilter(10)
        } else if (value === '완제품'){
            setFilter(15)
        }

    },[filter])

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['stock'].loadDetail}?pk=${pk}`
        const res = await getStockList(tempUrl)

        setDetailList(res.logs)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['stock'].list}?type=${type}&filter=${filter}&page=${page.current}&limit=15`
        const res = await getStockList(tempUrl)

        const getStock = res.items.map((v,i)=>{
            const material_type = transferCodeToName('material', v.material_type)

            return {...v, material_type: material_type}
        })

        setList(getStock)

        setPage({ current: res.current_page, total: res.total_page })
    },[list,type,filter])

    useEffect(()=>{
        getList()
    },[filter])

    useEffect(()=>{
        getList()
    },[page.current])

    useEffect(()=>{
        getList()
        setIndex(indexList["wip"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['wip'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'재공 재고 관리'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                selectBoxChange={selectBox}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
                noChildren={true}>
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

export default WipContainer
