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



const OrderContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [detailEventList, setDetaileventList] = useState<any[]>([])
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
        order: {
            name: '외주처 명',
            material_name: '제품 명',
            quantity: '수량',
            ceo_name: '대표자명',
            registered: '등록 날짜',
        }
    }


    const detailTitle = {
        order: {
            writer: '작성자',
            price_per_unit: '개당 단가',
            total_price: '총 금액',
            delivery_date: '납기일',
            address: '회사 주소',
            payment_condition: '대금 지급 조건',
            statement: '상태',
        },
    }

    const dummy = [
        {
            name: '외주처 01',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 02',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 03',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 04',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 05',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
    ]

    const detaildummy = [
        {
            writer: '김담당',
            delivery_date: '2020.08.09',
            address: '회사시 회사구 회사동 123-456 A동 01',
            payment_condition: '납품 후 100일 내 잔금',
            statement: '대기중',
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
            Name: '수정',
            Width: 60,
            Color: 'white'
        }
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

    const detaileventdummy = [
        {
            Name: '완료하기',
            Width: 90,
        },
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
        setIndex(indexList["order"])
        setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setDetaileventList(detaileventdummy)
        setSubIndex(detailTitle['order'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'외주처 발주 리스트'}
                titleOnClickEvent={titleEventList}
                /* detaileOnClickEvent={detailEventList} */
                allCheckbox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                checkBox={true}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'자세히 보기'} contentTitle={subIndex} contentList={detailList}>
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

export default OrderContainer
