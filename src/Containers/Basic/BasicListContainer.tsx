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
  const [page, setPage] = useState<number>(1);
  const [pageType, setPageType] = useState<string>(type);



  const optionList = [
    "등록순",
  ]

  const list_info_case = {
    machine: {
      title:'기계 기본정보',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/machine/delete`,
        create:`http://61.101.55.224:9912/api/v1/machine/register`,
        update:`http://61.101.55.224:9912/api/v1/machine/register`,
        list:`http://61.101.55.224:9912/api/v1/machine/list`,
        load:`http://61.101.55.224:9912/api/v1/machine/load`,
      },
      url:{
        create: `/basic/machine/register`,
        update: `/basic/machine/register`,
        load:  `/basic/machine/register`,
        list:  `/basic/list/machine`,
      },
      index:{
        pk: 'PK',
        machine_name:'기계명',
        machine_type:'기계종류(코드)',
        manufacturer_code: '제조번호',
        location_name: '공장명'
      }
    },
    device: {
      title:'주변장치 기본정보',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/device/delete`,
        create:`http://61.101.55.224:9912/api/v1/device/register`,
        update:`http://61.101.55.224:9912/api/v1/device/register`,
        list:`http://61.101.55.224:9912/api/v1/device/list`,
        load:`http://61.101.55.224:9912/api/v1/device/load`,
      },
      url:{
        create: `/basic/device/register`,
        update: `/basic/device/register`,
        load:  `/basic/device/register`,
        list:  `/basic/list/device`,
      },
      index:{
        pk: 'PK',
        device_name: '장치명',
        device_type: '장치종류(코드)',
        manufacturer_code: '제조번호',
        location_name: '공장명',
      }
    },
    material: {
      title:'품목 기본정보',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/material/delete`,
        create:`http://61.101.55.224:9912/api/v1/material/register`,
        update:`http://61.101.55.224:9912/api/v1/material/register`,
        list:`http://61.101.55.224:9912/api/v1/material/list`,
        load:`http://61.101.55.224:9912/api/v1/material/load`,
      },
      url:{
        create: `/basic/material/register`,
        update: `/basic/material/register`,
        load:  `/basic/material/register`,
        list:  `/basic/list/material`,
      },
      index:{
        pk: 'PK',
        material_name: '이름',
        material_type: '카테고리(코드)',
        location_name: '공장명',
        stock: '재고'
      }
    },
    mold: {
      title:'금형 기본 정보',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/mold/delete`,
        create:`http://61.101.55.224:9912/api/v1/mold/register`,
        update:`http://61.101.55.224:9912/api/v1/mold/register`,
        list:`http://61.101.55.224:9912/api/v1/mold/list`,
        load:`http://61.101.55.224:9912/api/v1/mold/load`,
      },
      url:{
        create: `/basic/mold/register`,
        update: `/basic/mold/register`,
        load:  `/basic/mold/register`,
        list:  `/basic/list/mold`,
      },
      index:{
        pk: 'PK',
        mold_name: '금형이름',
        mold_type: '금형종류(코드)',
        limit: '최대타수',
        current: '현재타수',
        location_name: '공장명'
      }
    },
    factory: {
      title:'공장 기본정보',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/factory/delete`,
        create:`http://61.101.55.224:9912/api/v1/factory/register`,
        update:`http://61.101.55.224:9912/api/v1/factory/register`,
        list:`http://61.101.55.224:9912/api/v1/factory/list`,
        load:`http://61.101.55.224:9912/api/v1/factory/load`,
      },
      url:{
        create: `/basic/factory/register`,
        update: `/basic/factory/register`,
        load:  `/basic/factory/register`,
        list:  `/basic/list/factory`,
      },
      index:{
        pk: 'PK',
        name:'공장명',
        location:'위치',
      }
    },
    subdivided: {
      title:'공장 세분화',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/subdivided/delete`,
        create:`http://61.101.55.224:9912/api/v1/subdivided/register`,
        update:`http://61.101.55.224:9912/api/v1/subdivided/register`,
        list:`http://61.101.55.224:9912/api/v1/subdivided/list`,
        load:`http://61.101.55.224:9912/api/v1/subdivided/load`,
      },
      url:{
        create: `/basic/subdivided/register`,
        update: `/basic/subdivided/register`,
        load:  `/basic/subdivided/register`,
        list:  `/basic/list/subdivided`,
      },
      index:{
        pk: 'PK',
        subdivided_name:'부속 공장명',
        factory_name:'공장명',
      }
    },
    item: {
      title:'표준 항목',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/item/delete`,
        create:`http://61.101.55.224:9912/api/v1/item/register`,
        update:`http://61.101.55.224:9912/api/v1/item/register`,
        list:`http://61.101.55.224:9912/api/v1/item/list`,
        load:`http://61.101.55.224:9912/api/v1/item/load`,
      },
      url:{
        create: `/basic/item/register`,
        update: `/basic/item/register`,
        load:  `/basic/item/register`,
        list:  `/basic/list/item`,
      },
      index:{
        pk: 'PK',
        category: '카테고리(코드)',
        name: '이름',
      }
    },
    document: {
      title:'표준 문서',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/document/delete`,
        create:`http://61.101.55.224:9912/api/v1/document/register`,
        update:`http://61.101.55.224:9912/api/v1/document/register`,
        list:`http://61.101.55.224:9912/api/v1/document/list`,
        load:`http://61.101.55.224:9912/api/v1/document/load`,
      },
      url:{
        create: `/basic/document/register`,
        update: `/basic/document/register`,
        load:  `/basic/document/register`,
        list:  `/basic/list/document`,
      },
      index:{
        pk: 'PK',
        category: '카테고리(코드)',
        name: '이름',
      }
    },
    barcode: {
      title:'바코드 표준',
      api:{
        delete:`http://61.101.55.224:9912/api/v1/barcode/standard/delete`,
        create:`http://61.101.55.224:9912/api/v1/barcode/standard/register`,
        update:`http://61.101.55.224:9912/api/v1/barcode/standard/register`,
        list:`http://61.101.55.224:9912/api/v1/barcode/standard/list`,
        load:`http://61.101.55.224:9912/api/v1/barcode/standard/load`,
      },
      url:{
        create: `/basic/barcode/register`,
        update: `/basic/barcode/register`,
        load:  `/basic/barcode/register`,
        list:  `/basic/list/barcode`,
      },
      index:{
        pk: 'PK',
        name: '이름',
        type: '타입(코드)',
        rules: '규칙',
      }
    },
  }


   /**
   * getList()
   * 목록 불러오기
   */
  const getList = useCallback(async (thisType)=>{
  
    const res = await getRequest(`${list_info_case[thisType].api['list']}?page=${page}`, getToken(TOKEN_NAME))

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
  },[list, keyword, option, pageType])


  useEffect(()=>{

    setList([])
    setPageType(type)

  },[type])
 
  useEffect(()=>{

    getList(pageType)

  },[pageType])
 
  
  /**
   * onClickDelete()
   * 리스트 항목 삭제
   */
  const onClickDelete = useCallback(async (id)=>{

    const results = await postRequest(list_info_case[pageType].api['delete'], {pk:id}, getToken(TOKEN_NAME))
    const tid = id;
   
    if(results === false){
      alert('[SERVER ERROR] 요청을 처리 할 수없습니다.')
    }else{
      if(results.status === 200 || results.status === "200"){
        alert('해당 데이터가 성공적으로 삭제되었습니다.')
        setList(list.filter(v => v.pk !== tid))
      }else{
        alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
      }
    }
    
  
  },[list, pageType])
 
  return (
        <>
          <div style={{position:'relative'}}>
            <Header title={`${list_info_case[type].title} 관리 (${list.length})`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>           
              <SmallButtonLink name="+ 등록하기" link={`/basic/${pageType}/register`}/> 
            
            </div>
          </div>
          {
            pageType !== null &&
            <InfoTable 
              indexList={list_info_case[pageType].index} 
              type={type} 
              pkKey={'pk'} 
              onClickLinkUrl={list_info_case[pageType].url['update']+`?pk=`} 
              contents={list} 
              onClickRemove={onClickDelete}/>
          }
          
        </>
  );
}



export default BasicListContainer;

