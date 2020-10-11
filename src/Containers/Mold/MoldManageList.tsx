import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldList} from "../../Api/mes/manageMold";


const CreateContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ mold_name: '금형 이름' });
    const [subIndex, setSubIndex] = useState({ part_name: '부품명' })
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });


    const indexList = {
        making: {
            mold_name: "금형명",
            manufacturing_date: "제조일",
            site: "창고위치" ,
            production:"생산품목",
            registered:"등록날짜",
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
            Name: '수정',
            Width: 60,
            Color: 'white'
        },
    ]

    const titleeventdummy = [
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
        const tempUrl = `${API_URLS['making'].list}?page=${page.current}&keyword=''&type=0&limit=15`
        const res = await getMoldList(tempUrl)

        setList(res.info_list)

        setPage({ current: res.currentPage, total: res.totalPage })
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
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
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
