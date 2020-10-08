import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {API_URLS, getQualityList} from "../../Api/mes/quality";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import Styled from "styled-components";
import NumberPagenation from '../../Components/Pagenation/NumberPagenation';

const QualityTestCompleteWorker = () => {
    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({  processName: "공정명" });
    const [subIndex, setSubIndex] = useState({ worker: '작업자'})
    const [filter, setFilter] = useState(-1)
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory()

    const indexList = {
        request: {
            processName: "공정명",
            machineName: "기계명",
            materialName: "품목(품목명)",
            requestTime: "요청 시간",
            whether: "적격 여부",
        }
    }


    const detailTitle = {
        quality: {
            worker: '작업자',
            total_count: '총 완료 개수',
            defective_count: '불량 개수',
            description: '요청 내용'
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

    const onClick = useCallback((obj) => {
        history.push(`/quality/test/detail/worker/${obj.requestPk}`)
    }, []);

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
        const tempUrl = `${API_URLS['request'].completeList}?currentPage=${page.current}`
        const res = await getQualityList(tempUrl)

        setList(res.info_list)

        setPage({ current: res.currentPage, total: res.totalPage })

    },[list])

    useEffect(()=>{
        getList()
        setIndex(indexList["request"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'제품 검사 완료 (작업자)'}
                indexList={index}
                mainOnClickEvent={onClick}
                valueList={list}
                noChildren={true}>
                {
                    selectPk !== null ?
                        <LineTable title={'상세보기'} contentTitle={subIndex} contentList={detailList}>
                            <Line/>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
            <NumberPagenation stock={page.total ? page.total : 0} selected={page.current} onClickEvent={(i: number) => setPage({...page, current: i})}/>
        </div>
    )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`


export default QualityTestCompleteWorker
