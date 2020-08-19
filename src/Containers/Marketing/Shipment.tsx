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
import {API_URLS, getCluchData, getMoldData,} from "../../Api/pm/preservation";



const ShipmentContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({customer_name: '거래처 명'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        shipment: {
            customer_name: '거래처 명',
            material_name: '(품목)품목명',
            amount: '수량',
            date: '출하 날짜'
        }
    }

    const dummy = [
        {
            customer_name: '(주)대한민국',
            material_name: '(품목)품목명',
            amount: '00 ea',
            date: '2020.07.07'
        },
        {
            customer_name: '(주)대한민국',
            material_name: '(품목)품목명',
            amount: '00 ea',
            date: '2020.07.07'
        },
        {
            customer_name: '(주)대한민국',
            material_name: '(품목)품목명',
            amount: '00 ea',
            date: '2020.07.07'
        },
        {
            customer_name: '(주)대한민국',
            material_name: '(품목)품목명',
            amount: '00 ea',
            date: '2020.07.07'
        },
        {
            customer_name: '(주)대한민국',
            material_name: '(품목)품목명',
            amount: '00 ea',
            date: '2020.07.07'
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
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

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        // getList()
        setIndex(indexList["shipment"])
        setList(dummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
        setDetailList(detaildummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'출하 리스트'}
                allCheckbox={true}
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


export default ShipmentContainer;
