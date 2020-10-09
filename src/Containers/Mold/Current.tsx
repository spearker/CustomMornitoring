import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldList} from "../../Api/mes/manageMold";
import {useHistory} from "react-router-dom";


const CurrentContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ mold_name: '금형 이름' });
    const [subIndex, setSubIndex] = useState({ part_name: '부품명00' })
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const history = useHistory()

    const indexList = {
        repair: {
            mold_name: '금형명',
            manager: "담당자 이름",
            registered: "수리 등록 날짜",
            complete_date: "완료 예정 날짜",
            status: "상태"
        }
    }


    const detailTitle = {
        repair: {
            part_name: '부품명',
            repair_content: '수리 내용',
            repair_status: '상태',
            complete_date: '완료 날짜'
        },
    }

    const detaildummy = [
        {
            worker: '홍길동',
            total_count: '99,999',
            defective_count: '91',
            description: ['요청 내용이 입력되어 있습니다. 요청 내용이 입력되어 있습니다.','요청 내용이 입력되어 있습니다. 요청 내용이 입력되어 있습니다.','요청 내용이 입력되어 있습니다. 요청 내용이 입력되어 있습니다.']
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=> history.push('/mold/repair/register')
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
            setSelectPk(mold.repair_pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.repair_pk)
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].detail}?pk=${pk}`
        const res = await getMoldList(tempUrl)

        setDetailList(res.mold_partList)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].list}?page=${page.current}&keyword=''&type=0&limit=15`
        const res = await getMoldList(tempUrl)

        setList(res.items)

        setPage({ current: res.currentPage, total: res.totalPage })
    },[list])

    useEffect(()=>{
        getList()
    },[page.current])


    useEffect(()=>{
        getList()
        setIndex(indexList["repair"])
        // setList(dummy)
        setDetailList(detaildummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle["current"])
    },[])

    return (
        <div>
            <OvertonTable
                title={'금형 수리 현황'}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectMold+' 수리 현황'} contentTitle={subIndex} contentList={detailList}>
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

export default CurrentContainer
