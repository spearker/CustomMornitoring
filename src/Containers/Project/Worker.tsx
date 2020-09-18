import React, {useCallback, useEffect, useState,} from "react";
import OvertonTable from "../../Components/Table/OvertonTable";
import {API_URLS, getProjectList,} from "../../Api/mes/production";
import {useHistory} from "react-router-dom";


const WorkerContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [index, setIndex] = useState({worker_name:'작업자'});
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
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
            Link: ()=>history.push('/project/work/history/register')
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


    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시

        const tempUrl = `${API_URLS['production'].history}?pk=&from=${'2020-08-31'}&to=${'2020-09-20'}&page=${1}`
        const res = await getProjectList(tempUrl)


        setList(res.info_list)

    },[list])

    useEffect(()=>{
        getList()
        setTitleEventList(titleeventdummy)
        setIndex(indexList["worker"])
        // setList(dummy)

    },[])

    return (
        <div>
            <OvertonTable
                title={'작업 이력'}
                calendar={true}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                noChildren={true}
                mainOnClickEvent={onClick}>
            </OvertonTable>
        </div>
    );
}


export default WorkerContainer;
