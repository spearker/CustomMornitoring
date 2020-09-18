import React, {useCallback, useEffect, useState,} from "react";
import OvertonTable from "../../Components/Table/OvertonTable";
import {API_URLS, getProjectList} from "../../Api/mes/production";


const ScheduleManageContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({manager_name:'계획자명'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        scheduleManage: {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            amount: '총 수량',
            current_amount: '현재 수량',
        }
    }

    const dummy = [
        {
            manager_name: '홍길동',
            material_name: '품목(품목명)',
            schedule: '2000.00.00~2000.00.00',
            amount: '99,999,999',
            current_amount: '1,000,000',
        },
        {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            amount: '총 수량',
            current_amount: '현재 수량',
        },
        {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            amount: '총 수량',
            current_amount: '현재 수량',
        },
        {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            amount: '총 수량',
            current_amount: '현재 수량',
        },
        {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            amount: '총 수량',
            current_amount: '현재 수량',
        },
    ]

    const titleeventdummy = [
        {
            Name: '수정',
        },
        {
            Name: '취소',
        }
    ]

    const eventdummy = [
        {
            Name: '전표 이력',
        },
        {
            Name: '작업자 이력',
        }
    ]

    const detaildummy = [
        {
            pk: 'PK1',
            max_count: 100,
            current_count: 20
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


    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['production'].list}?from=${'2020-08-31'}&to=${'2020-09-13'}&page=${1}`
        const res = await getProjectList(tempUrl)


        setList(res.info_list)

    },[list])

    useEffect(()=>{
        getList()
        setIndex(indexList["scheduleManage"])
        // setList(dummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
        setDetailList(detaildummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'생산 계획 관리 리스트'}
                calendar={true}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                EventList={eventList}
                checkBox={true}
                noChildren={true}
                mainOnClickEvent={onClick}>
            </OvertonTable>
        </div>
    );
}


export default ScheduleManageContainer;
