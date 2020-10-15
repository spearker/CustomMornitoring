import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BASE_URL, BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import {getToken} from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getRequest, postRequest} from '../../Common/requestFunctions';


const MaterialList = () => {

  const [list, setList] = useState<IMaterial[]>([]);
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
  const onClickFilter = useCallback(async(filter:number)=>{
    setOption(filter)
    const results = await getRequest('http://192.168.0.47:8299/api/v1/material/list/'+filter,getToken(TOKEN_NAME))

    if(results === false){
     ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
       ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[option])

   /**
   * getList()
   * 목록 불러오기
   * @param {string} url
   * @returns X
   */
  const getList = useCallback(async ()=>{

    const results = await getRequest('http://192.168.0.47:8299/api/v1/material/list/0',getToken(TOKEN_NAME))

    if(results === false){
     ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
       ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list])


  useEffect(()=>{
    getList();

  },[])

  const onClickModify = useCallback(async (id, stock)=>{

    console.log('--select id : ' + id + '/' + stock)
    const results = await postRequest(BASE_URL + '/api/v1/material/stock/', {pk: id, stock:stock}, getToken(TOKEN_NAME))

    if(results === false){
      //alert('요청 실패하였습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        //alert('성공적으로 변경되었습니다.')
        getList()

      }else{
        //alert('요청 실패하였습니다. 잠시후 이용하세요.')
      }
    }

  },[])

  return (
      <DashboardWrapContainer index={8}>
        <SubNavigation list={ROUTER_MENU_LIST[8]}/>
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
