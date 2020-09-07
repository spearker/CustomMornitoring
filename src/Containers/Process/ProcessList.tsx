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
import { getRequest } from "../../Common/requestFunctions";
import { getToken } from "../../Common/tokenFunctions";
import { API_URLS, getCluchData, getMoldData, } from "../../Api/pm/preservation";
import VoucherDropdown from "../../Components/Dropdown/VoucherDropdown";
import {useHistory} from "react-router-dom";



const ProcessListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [BOMlist, setBOMList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any>({
        machine_pk: "",
        machine_name: "",
        recommend: 0
    });
    const [index, setIndex] = useState({ type: "타입" });
    const [BOMindex, setBOMIndex] = useState({ material_name: '품목(품목명)' });
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectProcess, setSelectProcess] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [subIndex, setSubIndex] = useState({machine_pk: "공정 순"})
    const history = useHistory();

    const indexList = {
        info_list: {
            type: "타입",
            name: "공정 명",
            status: "현황/상태"
        }
    }

    const dummy = [
        {
            type: "단발",
            name: "공정 01",
            status: "진행중"
        },
        {
            type: "라인",
            name: "공정 02",
            status: "Off"
        },
        {
            type: "검수",
            name: "공정 03",
            status: "에러"
        },
        {
            type: "라인",
            name: "공정 04",
            status: "상태"
        },
        {
            type: "라인",
            name: "공정 05",
            status: "상태"
        }
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/process/detail/register')
        },
        {
            Name: '삭제',
        }
    ]

    const detailTitle = {
        processes:  {
            machine_pk: "공정 순",
            machine_name: "기계 명",
            recommend: "권장 SPM"
        }
    }

    const detailValue = [ //이것도 받는 이름 그대로 일까요
        {
            machine_pk: "라인 1차",
            machine_name: "기계명 01",
            recommend: 100
        },
        {
            machine_pk: "라인 2차",
            machine_name: "기계명 00",
            recommend: 100
        },
        {
            machine_pk: "라인 3차",
            machine_name: "기계명 00",
            recommend: 100
        },
        {
            machine_pk: "라인 4차",
            machine_name: "기계명 00",
            recommend: '' //null도 들어올 수 있음
        }
    ]


    const onClick = useCallback((process) => {
        console.log('dsfewfewf', process.type);
        if (process.pk === selectPk) {
            setSelectPk(null);
            setSelectProcess(null);
            setSelectValue(null);
        } else {
            setSelectPk(process.pk);
            setSelectProcess(process.name);
            setSelectValue(process)
            //TODO: api 요청
            // getData(process.pk)
        }

    }, [list, selectPk]);

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    }, [list])

    useEffect(() => {
        // getList()
        setIndex(indexList["info_list"])
        setTitleEventList(titleeventdummy)
        setList(dummy)
        setDetailList(detailValue)
        setSubIndex(detailTitle['processes'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'공정 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                checkBox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectProcess+' 상세 보기'} contentTitle={subIndex} contentList={detailList}>
                            <Line />
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

export default ProcessListContainer;
