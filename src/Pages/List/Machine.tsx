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
import { ROUTER_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest } from '../../Common/requestFunctions';

// 기계 리스트
const MachineList = () => {

  const [list, setList] = useState<IMachine[]>([]);
  const [option, setOption] = useState(0);

  const optionList = [
    "등록순", "기계이름 순", "기계종류 순", "기계번호 순", "제조사 순"
  ]
  const index = {
    machine_name:'기계 이름',
    machine_label:'기계 종류',
    machine_code:'기계 번호',
    manufacturer:'제조사', 
    manufacturer_code:'제조사 번호', 
  }

   /**
   * getList()
   * 목록 불러오기
   * @param {string} url 
   * @returns X
   */
  const getList = useCallback(async ()=>{
   
    const results = await getRequest('http://211.208.115.66:8088/api/v1/machine/list/0',getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    //alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    
    const results = await getRequest('http://211.208.115.66:8088/api/v1/machine/list/' + filter,getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[option])

  useEffect(()=>{
    getList()
   
  },[])
 
  

  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)
    window.location.href=`/update/machine?pk=${id}`
  
  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_LIST}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'기계 정보 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>

          <NormalTable widthList={['263px', '150px', '150px', '150px', '150px']} indexList={index} keyName={'pk'} buttonName='수정하기' contents={list} onClickEvent={onClickModify}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}



export default MachineList;


 /*
    const item_list = [
      {title:"색상", value:"은wd"},
      {title:"소재", value:"실버ddwwdwd"},
      {title:"품질", value:"바보ddwwdwd"},
      {title:"배고파", value:"응ddwwdwd"},
      {title:"자장면", value:"중국ddwwdwd"}
    ]
  
    const newObject = new Object();
    const newArray = new Array();
    for(let i = 0; i < item_list.length; i ++ ){
      newObject[item_list[i].title] = item_list[i].value
      newArray.push(newObject);
    }
  
    alert(newObject)
    console.log(newObject)
    console.log(newArray)
    */