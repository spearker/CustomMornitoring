import React, {useCallback, useEffect, useState} from "react";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {API_URLS, getProjectList, postProjectDelete} from "../../Api/mes/production";
import OvertonTable from "../../Components/Table/OvertonTable";
import NumberPagenation from "../../Components/Pagenation/NumberPagenation";


const DefectiveContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const [list, setList] = useState<any[]>([]);
    const [index, setIndex] = useState({checker:'검수자명'});
    const [eventList, setEventList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [deletePk, setDeletePk] = useState<(string[])>([]);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    const indexList = {
        defective: {
            checker: '검수자명',
            material_name: "품목명",
            amount: "불량 개수",
            date: "검수일",
        }
    }


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/project/defective/register')
        },
        {
            Name: '삭제',

        }
    ]


    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v)=>history.push(`/project/defective/register/${v.pk}`)
        },
    ]

    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []
        {list.length === 0 ?
            deletePk.map((v,i)=>{
                deletePk.pop()
            })
            :
            list.map((v, i) => {
                tmpPk.push(v.barcode_pk)
                deletePk.push(tmpPk.toString())
            })
        }
    },[deletePk])


    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.indexOf(Data.barcode_pk)
        {deletePk.indexOf(Data.barcode_pk) !== -1 ?
            deletePk.splice(IndexPk,1)
            :
            deletePk.push(Data.barcode_pk)
        }
    },[deletePk])

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['barcode'].delete}`
        const res = await postProjectDelete(tempUrl, deletePk)
        console.log(res)

        getList()

        selectPk(null)
    },[deletePk])

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf',mold.pk,mold.mold_name);
        if(mold.pk === selectPk){
            setSelectPk(null);
            setSelectValue(null);
        }else{
            setSelectPk(mold.pk);
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }

    }, [list, selectPk]);


    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시

        const tempUrl = `${API_URLS['defective'].list}?page=${page.current}&limit=15`
        const res = await getProjectList(tempUrl)

        const getWorker= res.info_list.map((v,i)=>{

            const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            return {...v, amount: amount}
        })

        setPage({ current: res.current_page, total: res.total_page })
        setList(getWorker)

    },[list])

    useEffect(()=>{
        // getList()
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
        setIndex(indexList["defective"])
        // setList(dummy)

    },[])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OvertonTable
                title={'불량 이력'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                checkOnClickEvent={checkOnClick}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
                noChildren={true}>
            </OvertonTable>
        </div>
    )
}

export default DefectiveContainer
