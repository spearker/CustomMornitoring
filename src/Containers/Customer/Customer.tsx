import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getCustomerData} from "../../Api/mes/customer";
import LoadtoneBox from "../../Components/Box/LoadtoneBox";
import icCurrentValue from "../../Assets/Images/ic_current_down.png"
import {useHistory} from "react-router-dom";

const ClientContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [index, setIndex] = useState({ name: '거래처 명' });
    const [detailList,setDetailList] = useState<any>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [widthPercent, setWidthPercent] = useState<number>(0)
    const history = useHistory();

    const indexList = {
    customer: {
            name: '거래처 명',
            telephone: '회사 전화번호',
            fax: '팩스 번호',
            ceo_name: '대표자',
            registered: '날짜'
        }
    }

    const dummy = [
        {
            name: '거래처 01',
            telephone: '000-0000-0000',
            fax: '000-000-0000',
            ceo_name: '김대표',
            registered: '2020.06.16'
        },
        {
            name: '거래처 02',
            telephone: '000-0000-0000',
            fax: '000-000-0000',
            ceo_name: '김대표',
            registered: '2020.06.16'
        },
        {
            name: '거래처 03',
            telephone: '000-0000-0000',
            fax: '000-000-0000',
            ceo_name: '김대표',
            registered: '2020.06.16'
        },
        {
            name: '거래처 04',
            telephone: '000-0000-0000',
            fax: '000-000-0000',
            ceo_name: '김대표',
            registered: '2020.06.16'
        },
        {
            name: '거래처 05',
            telephone: '000-0000-0000',
            fax: '000-000-0000',
            ceo_name: '김대표',
            registered: '2020.06.16'
        },
        {
            name: '거래처 06',
            telephone: '000-0000-0000',
            fax: '000-000-0000',
            ceo_name: '김대표',
            registered: '2020.06.16'
        },
    ]

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white'
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/customer/register')
        },
        {
            Name: '삭제',
        }
    ]

    const detaildummy = [
        {
            max_count: 50000,
            today_count: 1000,
            current_count: 38898
        },
    ]

    const onClick = useCallback((customer) => {
        console.log('dsfewfewf',customer.pk,customer.customer_name);
        if(customer.pk === selectPk){
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        }else{
            setSelectPk(customer.pk);
            setSelectMold(customer.customer_name);
            setSelectValue(customer)
            //TODO: api 요청
            getData(customer.pk)
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['customer'].load}?pk=${pk}`
        const res = await getCustomerData(tempUrl)

        setDetailList(res)

    },[])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['customer'].list}?keyword=&type=0&page=0`
        const res = await getCustomerData(tempUrl)

        setList(res)

    },[])

    useEffect(()=>{
        getList()
        // setIndex(indexList["customer"])
        // setList(dummy)
        // setDetailList(detaildummy)
        // setTitleEventList(titleeventdummy)
        // setEventList(eventdummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'거래처 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                checkBox={true}
                clickValue={selectValue}
                noChildren={true}
                mainOnClickEvent={onClick}>
            </OvertonTable>
        </div>
    );
}

const CountingContainer = Styled.div`
   display: flex;
   flex-direction: row;
   margin-right: 20px;
   p {
    font-size: 14px;
      &:first-child{
      font-family: NotoSansCJKkr-Bold;
      }
   }
`
const MoldArrowContainer = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
`

const MoldMaxBar = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  background-color: #1b2333;
  div {
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const CountingNum = Styled.p`
   margin-left: 85px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   span {
      font-size: 14px;
   }
`

const BottomBox = Styled.div`
    display: inline-block;
    p {
        font-size: 20px;
         &:first-child{
            font-size: 40px;
            }
    }
`

export default ClientContainer;
