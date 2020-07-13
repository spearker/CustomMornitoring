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

  const optionList = [
    "등록순",
  ]

  const index_machine = {
    pk: 'PK',
    machine_name:'기계명',
    machine_type:'기계종류(코드값)',
    manufacturer_code: '제조번호',
    location_name: '공장명'
  }

  const index_name = {
    machine: '기계 ',
    submachine: '주변장치 ',
    mold: '금형 ',
    factory:'공장 ',
    material: '품목 ',
    product: '완제품 ', 
    place:'공장 세분화 ',
    barcode: '바코드 표준 '
  }

   /**
   * getList()
   * 목록 불러오기
   */
  const getList = useCallback(async ()=>{
   
    const results = await getRequest(`http://211.208.115.66:PORT/api/v1/${type}/list`, getToken(TOKEN_NAME))

    
    if(results === false){
      alert('[SERVER ERROR] 데이터를 로드 할 수 없습니다.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, keyword, option])



  

  useEffect(()=>{
    getList()
    if(type == 'machine'){
      setIndex(index_machine)
    }

  },[])
 
  

  const onClickDelete = useCallback(async (id)=>{

    const results = await postRequest(`http://211.208.115.66:PORT/api/v1/${type}/delete`, {pk:id}, getToken(TOKEN_NAME))
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
            <Header title={`${index_name[type]} 기본 정보 관리 (${list.length})`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>           
              <SmallButtonLink name="+ 등록하기" link={`/basic/${type}/register`}/> 
            
            </div>
          </div>
          
          <InfoTable indexList={index} type={type} pkKey={'pk'} onClickLinkUrl={`/basic/${type}/update?pk=`} contents={list} onClickRemove={onClickDelete}/>
        </>
  );
}



export default BasicListContainer;

