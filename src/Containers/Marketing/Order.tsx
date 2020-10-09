import React, {useCallback, useEffect, useState,} from "react";
import OvertonTable from "../../Components/Table/OvertonTable";
import {API_URLS, getMarketing, postMarketing} from "../../Api/mes/marketing";
import {useHistory} from "react-router-dom";
import {postOutsourcingDelete} from "../../Api/mes/outsourcing";


const OrderContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ customer_name: '거래처 명'});
    const [deletePk, setDeletePk] = useState<({keys: string[]})>({keys: []});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory();

    const indexList = {
        order: {
            customer_name: '거래처 명',
            material_name: '(품목)품목명',
            amount: '수량',
            date: '수주 날짜'
        }
    }

    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []
        {list.length === 0 ?
            deletePk.keys.map((v,i)=>{
                deletePk.keys.pop()
            })
            :
            list.map((v, i) => {
                tmpPk.push(v.pk)
                deletePk.keys.push(tmpPk.toString())
            })
        }
    },[deletePk])

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.keys.indexOf(Data.pk)
        {deletePk.keys.indexOf(Data.pk) !== -1 ?
            deletePk.keys.splice(IndexPk,1)
            :
            deletePk.keys.push(Data.pk)
        }
    },[deletePk])

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/marketing/contract/register')
        },
        {
            Name: '삭제',
            Link: ()=>postDelete()
        }
    ]

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v)=>history.push(`/marketing/contract/modify/${v.pk}`)
        },
    ]

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['contract'].delete}`
        const res = await postMarketing(tempUrl, deletePk)

        getList()
    },[deletePk])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['contract'].list}?page=${page.current}&limit=15`
        const res = await getMarketing(tempUrl)

        setList(res.info_list)

        setPage({ current: res.current_page, total: res.total_page })
    },[list,page])

    useEffect(()=>{
        getList()
        setIndex(indexList["order"])
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    },[])

    useEffect(()=>{
        getList()
    },[page.current])


    return (
        <div>
            <OvertonTable
                title={'수주 리스트'}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                EventList={eventList}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
                noChildren={true}>
            </OvertonTable>
        </div>
    );
}


export default OrderContainer;
