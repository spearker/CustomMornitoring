import React, {useCallback, useEffect, useState} from "react";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {API_URLS, getProjectList} from "../../Api/mes/production";
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
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    const indexList = {
        defective: {
            checker: '검수자명',
            material_name: "품목명",
            amount: "불량 개수",
            registered: "검수일",
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
            Color: 'white'
        },
    ]

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

        const tempUrl = `${API_URLS['defective'].list}?page=${page.current}`
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
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                EventList={eventList}
                noChildren={true}
                mainOnClickEvent={onClick}>
            </OvertonTable>
            <NumberPagenation stock={page.total ? page.total : 0} selected={page.current} onClickEvent={(i: number) => setPage({...page, current: i})}/>
        </div>
    )
}

export default DefectiveContainer
