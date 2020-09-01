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



const SegmentListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ process_name: '프로세스 명'});
    const [subIndex, setSubIndex] = useState({order: '공정 순서'})
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        segment: {
            process_name: '프로세스 명',
            material_name: '(품목)품목명',
            status: '현황/상태'
        }
    }


    const detailTitle = {
        segment: {
            order:'공정 순서',
            type: '공정 타입',
            detail_order: '상세 공정 순',
            machine_name: '기계명',
            recommend_spm: '권장 SPM',
        },
    }

    const dummy = [
        {
            process_name: '프로세스명 01',
            material_name: '(품목)품목명',
            status: '진행중'
        },
        {
            process_name: '라인',
            material_name: '(품목)품목명',
            status: 'Off'
        },
        {
            process_name: '검수',
            material_name: '(품목)품목명',
            status: '에러'
        },
        {
            process_name: '라인',
            material_name: '(품목)품목명',
            status: '상태'
        },
        {
            process_name: '라인',
            material_name: '(품목)품목명',
            status: '상태'
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


    const detaildummy = [
        {
            order:'1차',
            type: '라인',
            detail_order: ['라인 1차','라인 2차','라인 3차'],
            machine_name: ['기계명 01','기계명 02','기계명 03'],
            recommend_spm: ['100','100','100'],
        },
        {
            order:'2차',
            type: '단발',
            detail_order: '',
            machine_name: '기계명 00',
            recommend_spm: '100',
        },
        {
            order:'3차',
            type: '검수',
            detail_order: ['라인 1차','라인 2차','라인 3차'],
            machine_name: ['기계명 01','기계명 02','기계명 03'],
            recommend_spm: ['100','100','100'],
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
        setIndex(indexList["segment"])
        setList(dummy)
        setTitleEventList(titleeventdummy)
        setDetailList(detaildummy)
        setSubIndex(detailTitle['segment'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'프로세스 리스트(공정별 세분화)'}
                allCheckbox={true}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
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

export default SegmentListContainer;
