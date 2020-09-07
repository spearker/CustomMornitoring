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
import {useHistory} from "react-router-dom";



const VoucherContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [BOMlist, setBOMList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any>({
        pk: "",
        max_count: 0,
        current_count: 0,
    });
    const [index, setIndex] = useState({registerer_name:'등록자'});
    const [BOMindex, setBOMIndex] = useState({material_name: '품목(품목명)'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    const indexList = {
        voucher: {
            registerer_name: '등록자',
            supplier_name: '납품 업체',
            deadline: '납기일',
            material_name: '품목(품목명)',
            goal: '생산 할 수량',
            current_amount: '현재 생산 수량'
        }
    }

    const dummy = [
        {
            registerer_name: '홍길동',
            supplier_name: '(주)대한민국',
            deadline: '2020.09.09',
            material_name: '품목(품목명)',
            goal: '999,999,999,999',
            current_amount: '99,999'
        },
        {
            registerer_name: '홍길동',
            supplier_name: '(주)대한민국',
            deadline: '2020.09.09',
            material_name: '품목(품목명)',
            goal: '999,999,999,999',
            current_amount: '99,999'
        },
        {
            registerer_name: '홍길동',
            supplier_name: '(주)대한민국',
            deadline: '2020.09.09',
            material_name: '품목(품목명)',
            goal: '999,999,999,999',
            current_amount: '99,999'
        },
        {
            registerer_name: '홍길동',
            supplier_name: '(주)대한민국',
            deadline: '2020.09.09',
            material_name: '품목(품목명)',
            goal: '999,999,999,999',
            current_amount: '99,999'
        },
        {
            registerer_name: '홍길동',
            supplier_name: '(주)대한민국',
            deadline: '2020.09.09',
            material_name: '품목(품목명)',
            goal: '999,999,999,999',
            current_amount: '99,999'
        },
    ]


    const detaildummy = [
        {
            pk: 'PK1',
            max_count: 100,
            current_count: 20
        }
    ]


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/project/chit/register')
        },
        {
            Name: '삭제',
        }
    ]


    const eventdummy = [
        {
            Name: '삭제',
            Width: 60,
            Color: 'white'
        },
    ]

    const BOMtitle = {
        BOM: {
            material_name: '품목(품목명)',
            production: '제품 분류',
            goal: '생산 할 수량',
            current_amount: '현재 생산 수량',
            remain_amount: '남은 생산 수량',
            safet_stock: '안전 재고'
        }
    }

    const BOMvalue = [
        {
            material_name: '품목명',
            production: '반제품',
            goal: 'N개',
            current_amount: 'N개',
            remain_amount: 'N개',
            safet_stock: '200개'
        },
        {
            material_name: '반재품 D',
            production: '원자재',
            goal: '500개',
            current_amount: '500개',
            remain_amount: '500개',
            safet_stock: '1000개'
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
        setIndex(indexList["voucher"])
        setBOMIndex(BOMtitle["BOM"])
        setTitleEventList(titleeventdummy)
        setList(dummy)
        setBOMList(BOMvalue)
        setEventList(eventdummy)
        setDetailList(detaildummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'전표 리스트'}
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
                        <LineTable title={'홍길동 / (주)대한민국 전표 자세히 보기'}>
                            <VoucherDropdown pk={'123'} name={'전표 바코드'} clickValue={'123'}>
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
                                       <ButtonBox>수정</ButtonBox>
                                    </BarcodeContainer>
                            </VoucherDropdown>
                            <VoucherDropdown pk={'123'} name={'공정 경로'}>
                                <div>

                                </div>
                            </VoucherDropdown>
                            <VoucherDropdown pk={'124'} name={'BOM'} clickValue={'124'}>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    {
                                        Object.keys(BOMindex).map((v, i) => {
                                            console.log('sfsdfdsewwefwefwefwee',BOMindex[v])
                                            return (
                                                <p key={v} className="p-limits" style={{fontFamily:'NotoSansCJKkr-Bold'}}>{BOMindex[v]}</p>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    BOMvalue.map((v, i) => {
                                        return(
                                            <div style={{display:"flex", flexDirection:"row"}}>
                                                        {
                                                            Object.keys(BOMindex).map((mv, mi) => {
                                                                return(
                                                                    <p key={`p-${i}-${mv}`} className="p-limits" >{v[mv]}</p>
                                                                )
                                                            })
                                                        }
                                            </div>
                                        )
                                    })
                                }
                            </VoucherDropdown>
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
    margin-left: 40%;
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 68px;
    height: 30px;
`

export default VoucherContainer;
