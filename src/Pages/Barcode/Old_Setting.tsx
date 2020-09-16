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
import {  ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest } from '../../Common/requestFunctions';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';


const BarCodeSetting = () => {

  const [list, setList] = useState<IMold[]>([]);
  const [option, setOption] = useState(0);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(()=>{


  },[])


  return (
      <DashboardWrapContainer index={0}>
        <SubNavigation list={ROUTER_MENU_LIST[0]}/>
        <InnerBodyContainer>
        <div style={{position:'relative'}}>
            <Header title={`바코드 기본 규칙 등록`}/>
        </div>
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


export default BarCodeSetting;
