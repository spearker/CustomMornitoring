import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/getToken';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';

// 금형 리스트
const DesignList = () => {

  const [list, setList] = useState<[]>([]);
  const [option, setOption] = useState(0);

  const optionList = [
    "등록순", "제조사 순", "제조번호 순", "제조스펙 순", "금형이름 순", "금형종류 순", "금형번호 순"
  ]
  const index = {
    manufacturer:'제조사',
    product_number:'제조번호',
    product_spec:'제조스펙',
    mold_name:'금형이름', 
    mold_label:'금형종류', 
    mold_code:'금형번호'
  }


  useEffect(()=>{

    setList(dataSet.designList); //TODO: 테스트용. 지울것.

    Axios.get('주소', { 'headers': { 'Authorization': getToken() } }) // BASE_URL + '주소'
    .then(function (res: any) {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
     
    });
    
    return;
  },[])

  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)

  },[])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
          <div style={{position:'relative'}}>
            <Header title={'금형 정보 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={setOption}/>
            </div>
          </div>

          <NormalTable indexList={index} keyName={'mold_code'} contents={list} onClickEvent={onClickModify}/>
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default DesignList;