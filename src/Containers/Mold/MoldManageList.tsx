import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldList} from "../../Api/mes/manageMold";
import {postCustomerDelete} from "../../Api/mes/customer";


const CreateContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({mold_name: '금형 이름'});
    const [subIndex, setSubIndex] = useState({part_name: '부품명'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []});
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectMold, setSelectMold] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });


    const indexList = {
        manage: {
            mold_name: "금형명",
            manufacturing_date: "제조일",
            site: "창고위치",
            production: "생산품목",
            registered: "등록날짜",
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

    // const eventdummy = [
    //     {
    //         Name: '수정',
    //         Width: 60,
    //         Color: 'white',
    //         Link: () => {}
    //     },
    // ]

    const titleeventdummy = [
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const arrayDelete = () => {
        while (true) {
            deletePk.pk.pop()
            if (deletePk.pk.length === 0) {
                break;
            }
        }
    }

    const allCheckOnClick = useCallback((list) => {
        let tmpPk: string[] = []

        {
            list.length === 0 ?
                arrayDelete()
                :
                list.map((v, i) => {
                    arrayDelete()

                    if (deletePk.pk.indexOf(v.pk) === -1) {
                        tmpPk.push(v.pk)
                    }

                    tmpPk.map((vi, index) => {
                        if (deletePk.pk.indexOf(v.pk) === -1) {
                            deletePk.pk.push(vi)
                        }
                    })

                    if (tmpPk.length < deletePk.pk.length) {
                        deletePk.pk.shift()
                    }

                    console.log('deletePk.pk', deletePk.pk)
                })
        }
    }, [deletePk])

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.pk.indexOf(Data.pk)
        {
            deletePk.pk.indexOf(Data.pk) !== -1 ?
                deletePk.pk.splice(IndexPk, 1)
                :
                deletePk.pk.push(Data.pk)
        }
    }, [deletePk])


    const onClick = useCallback((mold) => {
        console.log('dsfewfewf', mold.pk, mold.mold_name);
        if (mold.pk === selectPk) {
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        } else {
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

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS["manage"].list}?page=${page.current}&keyword=&type=0&limit=15`
        const res = await getMoldList(tempUrl)

        setList(res.info_list)

        setPage({current: res.current_page, total: res.total_page})
    }, [list, page])

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['manage'].delete}`
        const res = await postCustomerDelete(tempUrl, deletePk)

        getList()
    }, [deletePk])

    useEffect(() => {
        getList()
    }, [page.current])

    useEffect(() => {
        getList()
        setIndex(indexList["manage"])
        // setList(dummy)
        // setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
    }, [])

    return (
        <div>
            <OvertonTable
                title={'금형 관리 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                indexList={index}
                valueList={list}
                // EventList={eventList}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
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
