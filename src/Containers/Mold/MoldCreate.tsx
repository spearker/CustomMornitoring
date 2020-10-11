import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldList, postMoldRegister, postMoldState} from "../../Api/mes/manageMold";
import NumberPagenation from "../../Components/Pagenation/NumberPagenation";
import {useHistory} from 'react-router-dom';

const CreateContainer = () => {

    const history = useHistory()
    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ mold_name: '금형 이름' });
    const [deletePk, setDeletePk] = useState<({keys: string[]})>({keys: []});
    const [subIndex, setSubIndex] = useState({ part_name: '부품명' })
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });


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


    const indexList = {
        making: {
            mold_name: "금형 명",
            barcode:"금형 바코드 번호",
            manager: "제작 담당자" ,
            schedule: "제작 일정",
            status:"제작 현황",
        }
    }


    const detailTitle = {
        repair: {
            part_name: '부품명',
            repair_content: '수리 내용',
            repair_status: '수리 상태',
            complete_date: '완료 날짜',
        },
    }

    const eventdummy = [
        {
            Width: 98,
            Link: (v)=> v.status === '진행중' ?  getComplete(v.pk) : getCancel(v.pk)
        },
    ]

    const titleeventdummy = [
        {
            Name: '삭제',
        }
    ]


    const getComplete = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['making'].complete}`
        const res = await postMoldState(tempUrl,{pk:pk})

        setDetailList(res)
        getList()
    },[detailList])

    const getCancel = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['making'].cancel}`
        const res = await postMoldState(tempUrl,{pk:pk})

        setDetailList(res)
        getList()
    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['making'].list}?page=${page.current}&keyword=&type=0&limit=15`
        const res = await getMoldList(tempUrl)

        const Detail = res.info_list.map((v,i)=>{
            const status = v.status === 'WAIT' ? "진행중" : "완료"

            return {...v, status: status}
        })

        setList(Detail)

        setPage({ current: res.current_page, total: res.total_page })
    },[list,page])

    useEffect(()=>{
        getList()
    },[page.current])

    useEffect(()=>{
        getList()
        setIndex(indexList["making"])
        // setList(dummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'금형 제작 현황 리스트'}
                mainOnClickEvent={(v)=>history.push(`/mold/create/register/${v.pk}`)}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                buttonState={true}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
                noChildren={true}>
                {
                    selectPk !== null ?
                        <LineTable title={'수리 현황'} contentTitle={subIndex} contentList={detailList}>
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

export default CreateContainer
