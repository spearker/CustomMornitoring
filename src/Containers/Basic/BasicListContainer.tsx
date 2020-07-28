import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import InfoTable from '../../Components/Table/InfoTable';
import { getBasicList, API_URLS, deleteBasicList } from '../../Api/mes/basic';

interface Props{
  type: string
}

const optionList = [
  "등록순",
]

// 리스트 부분 컨테이너
const BasicListContainer = ({type}:Props) => {

  const [list, setList] = useState<any>([]);
  const [option, setOption] = useState(0);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageType, setPageType] = useState<string>(type);

  useEffect(()=>{
    setPageType(type)
  },[type])

  useEffect(()=>{

    setList([])
    getList(pageType)

  },[pageType])

  
   /**
   * getList()
   * 목록 불러오기
   */
  const getList = useCallback(async (pageType)=>{

    const tempUrl = `${API_URLS[pageType].list}?page=${page}`
    const resultList = await getBasicList(tempUrl);
    setList(resultList);

  },[list, keyword, option, pageType])
        
  /**
   * onClickDelete()
   * 리스트 항목 삭제
   */
  const onClickDelete = useCallback(async (id)=>{
    
    const tempUrl = `${API_URLS[pageType].delete}`
    const result = await deleteBasicList(tempUrl, id);
    if(result){
      setList(list.filter(f => f.pk !== id));
    }

  },[list, pageType])

  /**
   * getListUrl()
   * 리스트 항목 클릭했을 때 이동하는 url return
   * @returns {string} link url
   */
  const getListUrl = useCallback(()=>{

    if(pageType === ''){
      return `/basic/standard/barcode/update?pk=`
    }else{
      return `/basic/${pageType}/register?pk=`
    }

  },[pageType])

  return (
        <>
          <div style={{position:'relative'}}>
            <Header title={`${LIST_INDEX[type].title ?? '항목 없음'} 관리 (${list.length})`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <SmallButtonLink name="+ 등록하기" link={`/basic/${pageType}/register`}/>
            </div>
          </div>
          {
            pageType !== null &&
            <InfoTable 
              indexList={LIST_INDEX[pageType].index} 
              type={type} 
              pkKey={'pk'} 
              onClickLinkUrl={getListUrl()} 
              contents={list} 
              onClickRemove={onClickDelete}/>
          }
        </>
  );
}

export const LIST_INDEX = {
  machine: {
      title:'기계 기본정보',
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
    index:{
      pk: 'PK',
      name:'공장명',
      location:'위치',
    }
  },
  subdivided: {
    title:'공장 세분화',
    index:{
      pk: 'PK',
      subdivided_name:'부속 공장명',
      factory_name:'공장명',
    }
  },
  item: {
    title:'표준 항목',
    index:{
      pk: 'PK',
      category: '카테고리(코드)',
      name: '이름',
    }
  },
  document: {
    title:'표준 문서',
    index:{
      pk: 'PK',
      category: '카테고리(코드)',
      name: '이름',
    }
  },
  barcode: {
    title:'바코드 표준',
    index:{
      pk: 'PK',
      name: '이름',
      type: '타입(코드)',
      rules: '규칙',
    }
  },
}

export default BasicListContainer;
