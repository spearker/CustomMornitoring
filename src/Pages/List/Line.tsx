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
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import CardList from '../../Components/Card/CardList';
import SmallButton from '../../Components/Button/SmallButton';
import { getRequest } from '../../Common/requestFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_LIST, ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import MachineList from './Machine';
import ItemList from '../../Components/List/ItemList';

// 라인 리스트
const LineList = () => {

  interface Line{
    pk: string,
    line_code: string,
    line_detail: string,
    item_list: IStatus[]
  }
  interface LineMachine{
    machine_code: string,
    machine_photo: string,
    machine_name: string,
    is_connected: boolean,
  }

  const [list, setList] = useState<Line[]>([]);
  const [option, setOption] = useState<number>(0);

  const optionList = [
    "등록순", "이름(번호)순",
  ]
   /**
   * getList()
   * 목록 불러오기
   * @param {string} url 
   * @returns X
   */
  const getList = useCallback(async ()=>{
   
    const results = await getRequest(BASE_URL + '/api/v1/procedure/list/0',getToken(TOKEN_NAME))

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
    
    const results = await getRequest(BASE_URL + '/api/v1/procedure/list/'+filter,getToken(TOKEN_NAME))

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
    //getList()
   setList(dataSet.lineList)
  },[])


  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)
    window.location.href=`/update/line?pk=${id}`
  
  },[])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_MENU_LIST[0]}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'라인 정보 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>
          {
              list.map((v: Line)=>{
                return(
                  <ItemList pk={v.pk} description={v.line_detail} title={v.line_code} contents={v.item_list} stock={v.item_list.length} onClickEvent={onClickModify} />
                )
              })
            }
        
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


export default LineList;