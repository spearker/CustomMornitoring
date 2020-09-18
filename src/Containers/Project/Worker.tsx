import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
    ReactElement,
} from "react";
import Styled from "styled-components";
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { ROUTER_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";
import ReactShadowScroll from "react-shadow-scroll";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
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
            machine_name: '기계명',
            schedule: '일정',
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

        const tempUrl = `${API_URLS['production'].list}?from=${'2020-08-31'}&to=${'2020-09-13'}&page=${1}`
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
