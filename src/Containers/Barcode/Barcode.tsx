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
import VoucherDropdown from "../../Components/Dropdown/VoucherDropdown";



const BarcodeListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({   item_name: "품목명",});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        barcode: {
            item_name: "품목(품목명)",
            item_type: "제품 분류",
            barcode_num : "바코드 번호",
            basic_barcode : "기준 바코드",
            registered: "등록 날짜",
        }
    }

    const dummy = [
        {
            item_name: "품목명",
            item_type: "완제품",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "원자재",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "원자재",
            barcode_num : "A123456789B",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "완제품",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
        },
        {
            item_name: "품목명",
            item_type: "완제품",
            barcode_num : "1111-111-11-1234567",
            basic_barcode : "1111-111-11",
            registered: "2020.06.16",
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
        setIndex(indexList["barcode"])
        setList(dummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'바코드 현황'}
                allCheckbox={true}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                checkBox={true}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'바코드 이미지'} >
                                <BarcodeContainer>
                                    <BarcodeImage>
                                        <p>바코드 이미지가 없습니다.</p>
                                    </BarcodeImage>
                                    <BarcodeNum>
                                        <div>
                                            <p>바코드 번호</p>
                                            <p>A123456789B</p>
                                        </div>
                                        <div>
                                            <p>기준 바코드</p>
                                            <p>A123</p>
                                        </div>
                                    </BarcodeNum>
                                    <ButtonBox>바코드 이미지 다운로드</ButtonBox>
                                </BarcodeContainer>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    );
}


const BarcodeContainer = Styled.div`
    padding: 10px;
    width: 96.3%;
    height: 184px;
    display: flex;
    flexDirection: row;
`

const BarcodeImage = Styled.div`
    display: flex;
    width: 310px;
    height: 182px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    p {
        color: #b3b3b3;
        font-family: NotoSansCJKkr-Bold;
    }
`

const BarcodeNum = Styled.div`
    padding: 140px 0px 10px 40px;
    color: white;
    width: 235px;
    height: 52px;
    div {
        font-family: NotoSansCJKkr-Bold;
        display: flex;
        flexDirection: row;
        p {
            &:first-child{
                padding-right: 10px;
            }
        }
    }
`

const ButtonBox = Styled.button`
    margin-left: 30%;
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 188px;
    height: 30px;
`

export default BarcodeListContainer;
