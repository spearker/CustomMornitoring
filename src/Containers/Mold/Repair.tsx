import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldList, postMoldState} from "../../Api/mes/manageMold";


const RepairContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({mold_name: '금형 이름'});
    const [subIndex, setSubIndex] = useState({manager: "작업자"})
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectMold, setSelectMold] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const indexList = {
        repair: {
            mold_name: '금형 이름',
            manager_name: '수리 담당자',
            complete_date: '완료 예정 날짜',
            registered: '수리 등록 날짜',
            status: "상태"
        }
    }


    const detailTitle = {
        repair: {
            manager: "작업자",
            repair_content: '수리 내용',
            status: '상태',
            complete_date: '완료 날짜'
        },
    }


    const detaildummy = [
        {
            part_name: '부품명00',
            repair_content: '부품명00에 대한 수리내용은 본 내용과 같습니다.',
            repair_status: '완료',
            complete_date: '2020.08.09'
        },
    ]

    const eventdummy = [
        {
            buttonState: true,
            Width: 98,
            Link: (v) => v.status === '진행중' ? getComplete(v.pk) : getCancel(v.pk)
        },
    ]

    const titleeventdummy = [
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

    const getComplete = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].complete}`
        const res = await postMoldState(tempUrl, {pk: pk})
        if (res) {
            setDetailList(res)
            getList()
        }
    }, [detailList])

    const getCancel = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].cancel}`
        const res = await postMoldState(tempUrl, {pk: pk})
        if (res) {
            setDetailList(res)
            getList()
        }
    }, [detailList])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시

        const tempUrl = `${API_URLS['repair'].detail}?pk=${pk}`
        const res = await getMoldList(tempUrl)
        if (res) {

            const Detail = [res].map((v, i) => {
                const status = v.status === 'WAIT' ? "진행중" : "완료"

                return {...v, status: status}
            })

            setDetailList(Detail)
        }
    }, [detailList, selectPk])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['repair'].list}?page=${page.current}&keyword=&type=0&limit=15`
        const res = await getMoldList(tempUrl)
        if (res) {
            const listStatus = res.info_list.map((v, i) => {
                const status = v.status === 'WAIT' ? "진행중" : "완료"

                return {...v, status: status}
            })

            setList(listStatus)

            setPage({current: res.current_page, total: res.total_page})
        }
    }, [list, page])

    useEffect(() => {
        getList()
    }, [page.current])

    useEffect(() => {
        getList()
        setIndex(indexList["repair"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['repair'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'금형 수리 현황'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                buttonState={true}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}
                noChildren={true}
            >
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

export default RepairContainer
