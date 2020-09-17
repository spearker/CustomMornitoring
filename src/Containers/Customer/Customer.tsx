import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getCustomerData, postCustomerDelete} from "../../Api/mes/customer";
import LoadtoneBox from "../../Components/Box/LoadtoneBox";
import icCurrentValue from "../../Assets/Images/ic_current_down.png"
import {useHistory} from "react-router-dom";

const ClientContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [index, setIndex] = useState({  name: "거래처 명" });
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [deletePk, setDeletePk] = useState<({keys: string[]})>({keys: []});
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    const indexList = {
        customer: {
            name: "거래처 명",
            telephone: "전화 번호",
            fax: "팩스 번호",
            ceo_name: "대표자",
            number: "사업자 번호",
            registered: "등록 날짜",
        }
    }

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
            // getData(customer.pk)
        }



    }, [list, selectPk]);

    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []
        list.map((v,i)=>{
            console.log(v.pk)
            tmpPk.push(v.pk)
        })
        setDeletePk({...deletePk, keys: tmpPk})
    },[deletePk])

    const checkOnClick = useCallback((Data) => {
        deletePk.keys.push(Data.pk)
        console.log(deletePk.keys)
    },[deletePk])

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v)=>history.push(`/customer/register/${v.pk}`)
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
            Link: ()=> postDelete()
        }
    ]

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['customer'].delete}`
        const res = await postCustomerDelete(tempUrl, deletePk)

        getList()
    },[deletePk])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['customer'].list}?keyword=&type=1&page=1`
        const res = await getCustomerData(tempUrl)
        console.log(res.info_list)
        setList(res.info_list)
    },[])

    useEffect(()=>{
        getList()
        setIndex(indexList["customer"])
        // setList(dummy)
        // setDetailList(detaildummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    },[])

    useEffect(()=>{
        console.log(deletePk)
    },[deletePk])

    return (
        <div>
            <OvertonTable
                title={'거래처 리스트'}
                titleOnClickEvent={titleEventList}
                dropDown={true}
                searchBar={true}
                allCheckbox={true}
                allCheckOnClickEvent={allCheckOnClick}
                indexList={index}
                valueList={list}
                EventList={eventList}
                checkBox={true}
                checkOnClickEvent={checkOnClick}
                noChildren={true}>
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
