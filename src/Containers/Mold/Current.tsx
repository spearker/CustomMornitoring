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
import {Simulate} from "react-dom/test-utils";



const CurrentContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ mold_name: '금형 이름' });
    const [subIndex, setSubIndex] = useState({ part_name: '부품명00' })
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        current: {
            mold_name: '금형 이름',
            mold_location: '보관장소',
            charge_name: '수리 담당자',
            registered_date: '수리 등록 날짜',
            complete_date: '완료 예정 날짜',
            status: '완료'
        }
    }


    const detailTitle = {
        current: {
            part_name: '부품명00',
            repair_content: '부품명00에 대한 수리내용은 본 내용과 같습니다.',
            repair_status: '완료',
            complete_date: '2020.08.09'
        },
    }

    const dummy = [
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '수리중'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '수리중'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
    ]

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
            Color: 'white'
        },
        {
            Name: '출고',
            Width: 60,
            Color: 'white'
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
        setIndex(indexList["current"])
        setList(dummy)
        setDetailList(detaildummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle["current"])
    },[])

    return (
        <div>
            <OvertonTable
                title={'금형 수리 현황'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                checkBox={true}
                mainOnClickEvent={onClick}>
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

export default CurrentContainer
