import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, MES_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, postRequest } from '../../Common/requestFunctions';
import AddInput from '../../Components/Input/AddInput';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';
import InfoTable from '../../Components/Table/InfoTable';
import { machineStringToCode, machineCodeToName } from '../../Common/codeTransferFunctions';


interface Props{
  type: string
}

// 리스트 부분 컨테이너
const BasicListContainer = ({type}:Props) => {

  const [list, setList] = useState<any[]>([]);
  const [option, setOption] = useState(0);
  const [keyword, setKeyword] = useState<string>('');
  const [index, setIndex] = useState({pk:'PK'});
  const [page, setPage] = useState<number>(1);
  const optionList = [
    "등록순",
  ]

  const index_list= {
    machine: {
      pk: 'PK',
      machine_name:'기계명',
      machine_type:'기계종류(코드)',
      manufacturer_code: '제조번호',
      location_name: '공장명'
    },
    factory:{
      pk: 'PK',
      name:'공장명',
      location:'위치',
    },
    subdivided:{
      pk: 'PK',
      factory_name:'공장명',
      subdivided_name:'부속 공장명',
    },
    device:{
      pk: 'PK',
      device_name: '장치명',
      device_type: '장치종류(코드)',
      manufacturer_code: '제조번호',
      location_name: '공장명',
    },
    mold:{
      pk: 'PK',
      mold_name: '금형이름',
      mold_type: '금형종류(코드)',
      limit: '최대타수',
      current: '현재타수',
      location_name: '공장명'
    },
    item:{
      pk: 'PK',
      category: '카테고리(코드)',
      name: '이름',

    },
    document:{
      pk: 'PK',
      category: '카테고리(코드)',
      name: '이름',

    }

  }
 

  const index_name = {
    machine: '기계 기본정보 ',
    device: '주변장치 기본정보 ',
    mold: '금형 기본정보 ',
    factory:'공장 기본정보 ',
    material: '품목 기본정보 ',
    product: '완제품 기본정보 ', 
    subdivided:'공장 세분화 ',
    barcode: '바코드 표준 ',
    outsourcing_list: '외주사 ',
    outsourcing_order: '외주 발주 ',
    outsourcing_contract: '외주 수주 ',
    item: '표준 항목 ',
    document: '표준 문서 ',
  }

  const index_create_host = {
    machine: `http://61.101.55.224:9912/api/v1/${type}/list`,
    device: `http://61.101.55.224:9912/api/v1/${type}/list`,
    mold: `http://61.101.55.224:9912/api/v1/${type}/list`,
    factory:`http://61.101.55.224:9912/api/v1/${type}/list`,
    material: `http://61.101.55.224:9912/api/v1/${type}/list`,
    product: `http://61.101.55.224:9912/api/v1/${type}/list`,
    subdivided:`http://61.101.55.224:9912/api/v1/${type}/list`,
    barcode: `http://61.101.55.224:9912/api/v1/${type}/list`,
    outsourcing_list:  `http://61.101.55.224:9912/api/v1/${type}/list`,
    outsourcing_order:  `http://61.101.55.224:9912/api/v1/${type}/list`,
    outsourcing_call:  `http://61.101.55.224:9912/api/v1/${type}/list`,
    item: `http://61.101.55.224:9912/api/v1/${type}/list`,
    document: `http://61.101.55.224:9912/api/v1/${type}/list`,
  }

  const index_delete_host = {
    machine: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    device: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    mold: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    factory:`http://61.101.55.224:9912/api/v1/${type}/delete`,
    material: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    product: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    subdivided:`http://61.101.55.224:9912/api/v1/${type}/delete`,
    barcode: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    outsourcing_list:  `http://61.101.55.224:9912/api/v1/${type}/delete`,
    outsourcing_order:  `http://61.101.55.224:9912/api/v1/${type}/delete`,
    outsourcing_call:  `http://61.101.55.224:9912/api/v1/${type}/delete`,
    item: `http://61.101.55.224:9912/api/v1/${type}/delete`,
    document: `http://61.101.55.224:9912/api/v1/${type}/delete`,
  }

   /**
   * getList()
   * 목록 불러오기
   */
  const getList = useCallback(async ()=>{
   
    const res = await getRequest(`http://61.101.55.224:9912/api/v1/${type}/list?page=${page}`, getToken(TOKEN_NAME))

    
    if(res === false){
      alert('[SERVER ERROR] 데이터를 로드 할 수 없습니다.')
    }else{
      if(res.status === 200){
        if(res.results === []){
          return;
        }
        setList(res.results.items)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, keyword, option, type])



  

  useEffect(()=>{
    //alert(type)
    setList([])
    setIndex(index_list[type])
    getList()

    /*
    if(type == 'machine'){
      setIndex(index_machine)
    }else if(type == 'factory'){
      setIndex(index_factory);
    }
    */

  },[type])
 
  

  const onClickDelete = useCallback(async (id)=>{

    const results = await postRequest(index_delete_host[type], {pk:id}, getToken(TOKEN_NAME))
    const tg = id;
    //console.log('--select id : ' + id)
    if(results === false){
      alert('[SERVER ERROR] 요청을 처리 할 수없습니다.')
    }else{
      if(results.status === 200 || results.status === "200"){
        alert('해당 데이터가 성공적으로 삭제되었습니다.')
        setList(list.filter(v => v.pk !== tg))
      }else{
        alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
      }
    }
    
  
  },[list])
 
  return (
        <>
          <div style={{position:'relative'}}>
            <Header title={`${index_name[type]} 관리 (${list.length})`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>           
              <SmallButtonLink name="+ 등록하기" link={`/basic/${type}/register`}/> 
            
            </div>
          </div>
          
          <InfoTable indexList={index} type={type} pkKey={'pk'} onClickLinkUrl={`/basic/${type}/register?pk=`} contents={list} onClickRemove={onClickDelete}/>
        </>
  );
}



export default BasicListContainer;

