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
import BasicListContainer from '../../Containers/Basic/BasicListContainer';

// 리스트 페이지
const BasicMachineList = ({match}: any) => {

  const { id } = match.params;

 
  return (
      <DashboardWrapContainer index={'basic'}>
        <SubNavigation list={MES_MENU_LIST.basic}/>
        <InnerBodyContainer>     
          <BasicListContainer type={id}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}



export default BasicMachineList;

