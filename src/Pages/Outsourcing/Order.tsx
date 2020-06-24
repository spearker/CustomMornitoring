import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';

import 'react-dropdown/style.css'

import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';

import SearchInputSmall from '../../Components/Input/SearchInputSmall';
import MultiButtonTaskTable from '../../Components/Table/MultiButtonTaskTable';

const dummy = [
  {pk:'1231dd', name:'거래처01', product_name:'제품01', manager:'홍길동', stock:'1000', price:'100,000,000', date:'2020-07-16', created:'2020-06-16', place:'서울특별시 강남구 강남동 강남아파트 123-123', condition:'선금 50% 납품시 50%'},
  {pk:'1dwqdfcs', name:'거래처02', product_name:'제품02', manager:'홍길동', stock:'1000', price:'100,000,000', date:'2020-07-16', created:'2020-06-16', place:'서울특별시 강남구 강남동 강남아파트 123-123', condition:'선금 50% 납품시 50%'},
  {pk:'q121qdw', name:'거래처03', product_name:'제품03', manager:'홍길동', stock:'1000', price:'100,000,000', date:'2020-07-16', created:'2020-06-16', place:'서울특별시 강남구 강남동 강남아파트 123-123', condition:'선금 50% 납품시 50%'},
  {pk:'qwd13wq', name:'거래처04', product_name:'제품04', manager:'홍길동', stock:'1000', price:'100,000,000', date:'2020-07-16', created:'2020-06-16', place:'서울특별시 강남구 강남동 강남아파트 123-123', condition:'선금 50% 납품시 50%'},
  {pk:'qweqw324f', name:'거래처05', product_name:'제품05', manager:'홍길동', stock:'1000', price:'100,000,000', date:'2020-07-16', created:'2020-06-16', place:'서울특별시 강남구 강남동 강남아파트 123-123', condition:'선금 50% 납품시 50%'},
  {pk:'qecqefw1', name:'거래처06', product_name:'제품06', manager:'홍길동', stock:'1000', price:'100,000,000', date:'2020-07-16', created:'2020-06-16', place:'서울특별시 강남구 강남동 강남아파트 123-123', condition:'선금 50% 납품시 50%'}
]

interface IOrder{
   pk: string,
   name: string,
   product_name: string,
   manager: string,
   stock: string | number,
   created: string,
   condition: string,
   date: string,
   place: string,
}
const Order = () => {

  const [list, setList] = useState<IOrder[]>(dummy);
  const [option, setOption] = useState(0);
  const [target, setTarget] = useState<IOrder | null>(null);
  const [keyword, setKeyword] = useState<string>('');

  const optionList = [
    "등록순", "이름순"
  ]
  const indexList = {
    name:'거래처명',
    product_name:'제품명',
    stock: '수량',
    price:'총 금액(원)', 
    created:'등록일',
  }
  const subIndexList = {
    manager:'담당자',
    date: '납기날짜',
    place:'납품 장소',
    condition:'대금지급조건'
  }

 
 

  useEffect(()=>{
    //getList()
   
  },[])


  return (
      <DashboardWrapContainer index={3}>
        <SubNavigation list={ROUTER_MENU_LIST[3]}/>
        <InnerBodyContainer>
        <div style={{position:'relative'}}>
            <Header title={`발주 관리 (${list.length})`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>           
           
            <SearchInputSmall 
                description={'검색어 입력'} 
                value={keyword} 
                onChangeEvent={()=>{}}
                onClickEvent={()=>{}}
                button={{
                  name: '발주 등록',
                  url:'/outsourcing/order/register'
                }}
                />
                 
            </div>
          </div>

          <MultiButtonTaskTable 
            indexList={indexList} 
            subIndexList={subIndexList} 
            target={target} 
            keyName={'pk'} 
            contents={list} 
            events={[
              
              {name: '보기', event: (t)=>setTarget(t)},
              {name: '수정', color:'gray', event: ()=>{}},
            ]} 
            onClickEvent={(t)=>setTarget(t)}/>

        </InnerBodyContainer>


      </DashboardWrapContainer>
      
  );
}


export default Order;