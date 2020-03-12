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
import { ROUTER_STOCK } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest } from '../../Common/requestFunctions';


const MaterialList = () => {

  const [list, setList] = useState<IMaterial[]>(dataSet.materialList);
  const [option, setOption] = useState(0);

  const optionList = [
    "등록순", "이름순", "재고순"
  ]
  const index = {
    material_name:'자재 이름',
    material_code:'자재 번호',
    distributor:'유통사', 
    material_spec:'스펙',
    stock:'수량'
  }

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback((filter:number)=>{
    setOption(filter)
    alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    return;
    const results = getRequest(BASE_URL + '',getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
       
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[option])

  useEffect(()=>{

   
  },[])

  const onClickModify = useCallback((id, stock)=>{

    console.log('--select id : ' + id + '/' + stock)
  
  
  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_STOCK}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'자재 수량 정보'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>

          <NormalTable widthList={['253px', '130px', '130px', '270px', '180px']} 
          onChangeEvent={
            setList
          }
          indexList={index} keyName={'pk'} eventType="input" buttonName='변경' onClickEvent={onClickModify} contents={list}/>
          </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default MaterialList;