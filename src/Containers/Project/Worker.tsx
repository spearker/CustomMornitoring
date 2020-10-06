import React, {useCallback, useEffect, useState,} from "react";
import OvertonTable from "../../Components/Table/OvertonTable";
import {API_URLS, getProjectList,} from "../../Api/mes/production";
import {useHistory} from "react-router-dom";
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import moment from "moment";

interface Props {
    match: any;
    // chilren: string;
}

const WorkerContainer =  ({ match }: Props) => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const [list, setList] = useState<any[]>([]);
    const [index, setIndex] = useState({worker_name:'작업자'});
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [selectDate, setSelectDate] = useState({start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    const indexList = {
        worker: {
            worker_name: '작업자' ,
            material_name: '품목명',
            process_name: '공정명',
            worked: '총 작업시간',
            amount: '작업량'
        }
    }


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/project/history/register')
        },
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

    const calendarOnClick = useCallback(async (start, end)=>{
        setSelectDate({start: start, end: end ? end : ''})

        const tempUrl = `${API_URLS['production'].history}?pk=&from=${start}&to=${end}&page=${page.current}`
        const res = await getProjectList(tempUrl)

        const getWorker= res.info_list.map((v,i)=>{

            const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            return {...v, amount: amount}
        })
        setPage({ current: res.current_page, total: res.total_page })
        setList(getWorker)
    },[selectDate])


    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시

        const tempUrl = `${API_URLS['production'].history}?pk=${match.params.pk !== undefined ? match.params.pk : ''}&from=${selectDate.start}&to=${selectDate.end}&page=${page.current}`
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
        setIndex(indexList["worker"])
        // setList(dummy)

    },[])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OvertonTable
                title={'작업 이력'}
                calendar={true}
                selectDate={selectDate}
                calendarOnClick={calendarOnClick}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                noChildren={true}
                mainOnClickEvent={onClick}>
            </OvertonTable>
            <NumberPagenation stock={page.total ? page.total : 0} selected={page.current} onClickEvent={(i: number) => setPage({...page, current: i})}/>
        </div>
    );
}


export default WorkerContainer;
