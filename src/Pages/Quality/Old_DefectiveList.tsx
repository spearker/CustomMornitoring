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
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, postRequest, getParameter } from '../../Common/requestFunctions';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import InfoTable from '../../Components/Table/InfoTable';
import { machineCodeToName } from '../../Common/codeTransferFunctions';

import { useHistory } from 'react-router-dom'
import DatePickerBox from '../../Components/Box/DatePickerBox';

//특정 재고의 불량 변동 이력
const Old_DefectiveList = () => {
  const history = useHistory();

  const [list, setList] = useState<IMaterial[]>([]);

  const optionList = [
    "등록순", "이름순", "재고순"
  ]
  const index = {
    name:'이름',
    code:'코드',
    amount:'수량',
    date:'발생 날짜',
    register:'담당자',


  }




  useEffect(()=>{


  },[])





  const onClickList = useCallback((id)=>{
    history.push(`/stock/update?pk=${id}`)


  },[])

  return (
      <DashboardWrapContainer index={9}>
        <SubNavigation list={ROUTER_MENU_LIST[9]}/>
        <InnerBodyContainer>
        <div style={{position:'relative'}}>
            <Header title={`불량 발생 이력`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <SmallButtonLink name="+ 불량 자재 등록" link="/inferior/register"/>

            </div>
          </div>
          <DatePickerBox setListEvent={setList} targetPk={getParameter('pk')} searchUrl={'http://192.168.0.14:8299/api/v1/stock/history/inferior?'}/>

          <InfoTable indexList={index} pkKey={'pk'} type={'stock'} onClickLinkUrl="/stock/view?pk=" contents={list} />

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}



export default Old_DefectiveList;
