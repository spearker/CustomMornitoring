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
import FactoryBox from "../../Components/Box/FactoryBox";
import VoucherDropdown from "../../Components/Dropdown/VoucherDropdown";



const ScheduleContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({manager_name:'계획자명'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        schedule: {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            supplier_name: '납품 업체',
            amount: '총 수량',
            state: '현황'
        }
    }

    const dummy = [
        {
            manager_name: '홍길동',
            material_name: '품목(품목명)',
            schedule: '2000.00.00~2000.00.00',
            supplier_name: '(주)대한민국',
            amount: '99,999,999',
            state: '배포'
        },
        {
            manager_name: '홍길동',
            material_name: '품목(품목명)',
            schedule: '2000.00.00~2000.00.00',
            supplier_name: '(주)대한민국',
            amount: '99,999,999',
            state: '배포'
        },
        {
            manager_name: '홍길동',
            material_name: '품목(품목명)',
            schedule: '2000.00.00~2000.00.00',
            supplier_name: '(주)대한민국',
            amount: '99,999,999',
            state: '배포'
        },
        {
            manager_name: '홍길동',
            material_name: '품목(품목명)',
            schedule: '2000.00.00~2000.00.00',
            supplier_name: '(주)대한민국',
            amount: '99,999,999',
            state: '배포'
        },
        {
            manager_name: '홍길동',
            material_name: '품목(품목명)',
            schedule: '2000.00.00~2000.00.00',
            supplier_name: '(주)대한민국',
            amount: '99,999,999',
            state: '배포'
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
        },
        {
            Name: '취소',
        }
    ]

    const detailTitle = {
        schedule: {
            part_name: '부품명',
            repair_content: '수리 내용',
            repair_status: '수리 상태',
            complete_date: '완료 날짜',
        },
    }

    const eventdummy = [
        {
            Name: '삭제',
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
        setIndex(indexList["schedule"])
        setList(dummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
        setDetailList(detaildummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'생산 계획 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                EventList={eventList}
                checkBox={true}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                    <LineTable title={'대한민국_품목 01'} >
                        <VoucherDropdown pk={'123'} name={'생산 계획 공정'} clickValue={'123'}>
                            <FactoryBox title={'공정 A'}/>
                        </VoucherDropdown>
                        <VoucherDropdown pk={'123'} name={'전표 리스트'} clickValue={'123'}>

                        </VoucherDropdown>
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

export default ScheduleContainer