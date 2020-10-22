import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {useHistory} from "react-router-dom"
import {API_URLS, getStockList} from "../../Api/mes/manageStock";
import {transferCodeToName} from "../../Common/codeTransferFunctions";


const FinishMaterialContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ material_name: "품목(품목명)" });
    const [subIndex, setSubIndex] = useState({ worker: '작업자'})
    const [filter, setFilter] = useState(30)
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory()

    const indexList = {
        quality: {
            material_name: "품목(품목명)",
            material_type: "자재 종류",
            current_stock: "재고량",
            location_name: "보관장소",
            safe_stock: "안전재고",
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
            Link: (v)=>{
                if(Number(v.current_stock) > 0){  
                    history.push(`/stock/release/register/${v.pk}/${v.material_name}`)
                } else {
                    alert('출고할 수 있는 재고가 없습니다.')
                }
            }
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
        const tempUrl = `${API_URLS['stock'].list}?type=30&filter=${filter}&page=${page.current}&limit=15`
        const res = await getStockList(tempUrl)

        const getStock = res.info_list.map((v,i)=>{
            const material_type = transferCodeToName('material', v.material_type)

            return {...v, material_type: material_type}
        })

        setList(getStock)

        setPage({ current: res.current_page, total: res.total_page })

    },[list,page])

    useEffect(()=>{
        getList()
    },[page.current])

    useEffect(()=>{
        getList()
        setIndex(indexList["quality"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['quality'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'완제품 관리'}
                indexList={index}
                valueList={list}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
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
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default FinishMaterialContainer
