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
import { TOKEN_NAME } from "../../Common/configset";
import { API_URLS, getCluchData, getMoldData, } from "../../Api/pm/preservation";
import {useHistory} from "react-router-dom";



const CurrentContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ name: '외주처' });
    const [subIndex, setSubIndex] = useState({ writer: '작성자' })
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectMold, setSelectMold] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const history = useHistory();

    const indexList = {
        current: {
            name: '외주처 명',
            telephone: '전화 번호',
            fax: '팩스 번호',
            ceo_name: '대표자',
            registered: '등록 날짜',
            /* safety_stock: '안전재고' */
        }
    }


    const detailTitle = {
        current: {
            writer: '작성자',
            sortation: '구분',
            stock_quantity: '수량',
            before_quantity: '변경전 재고량',
            date: '날짜',
        },
    }

    const dummy = [
        {
            name: '외주처 01',
            telephone: '000-000-000',
            fax: '000-000-000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 02',
            telephone: '000-000-000',
            fax: '000-000-000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 03',
            telephone: '000-000-000',
            fax: '000-000-000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 04',
            telephone: '000-000-000',
            fax: '000-000-000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 05',
            telephone: '000-000-000',
            fax: '000-000-000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
    ]

    const detaildummy = [
        {
            writer: '김담당',
            sortation: '정상 입고',
            stock_quantity: '9,999,999,999',
            before_quantity: '9,999,999,999',
            date: '2020.08.09',
        },
    ]

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf', mold.pk, mold.mold_name);
        if (mold.pk === selectPk) {
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        } else {
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }



    }, [list, selectPk]);

    const eventdummy = [
        {
            Name: '삭제',
            Width: 60,
            Color: 'white'
        },

    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/outsourcing/register')
        },
        {
            Name: '삭제',
        }
    ]

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
        setIndex(indexList["current"])
        setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['current'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'외주 현황'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                checkBox={true}
                /* clickValue={selectValue} */
                noChildren={true}
                mainOnClickEvent={onClick}>
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
