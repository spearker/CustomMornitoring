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
import { getRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MANAGE, ROUTER_REGISTER } from '../../Common/routerset';
import SubHeader from '../../Components/Text/SubHeader';

// 서비스 문의
const ServiceDesk = () => {
  const [count1, setCount1] = useState(0)
  const increment1 = useCallback(() => { console.log('rander...');setCount1(c => c + 1)},[count1])
  const [str, setStr] = useState<string>('')
  const [count2, setCount2] = useState(0)
  const increment2 = () =>{ console.log('rander...2');setCount2(c => c + 1)}

  useEffect(()=>{

  
  },[])

  return (
      <DashboardWrapContainer>
      
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'서비스 문의'}/>
          </div>



          <div style={{textAlign:'left', paddingTop:28}}>
          <p style={{fontSize:19, color:POINT_COLOR}}>서비스 이용 및 A/S안내</p>
          <table style={{marginTop:6, marginBottom:24}}>
            <tbody>
              <tr>
                <td style={{minWidth:80}}>
                Phone
                </td>
                <td>
                032-0000-0000 (오전 8:30 - 오후 17:30)
                </td>
              </tr>
              <tr>
                <td>
                Fax
                </td>
                <td>
                032-0000-0000 
                </td>
              </tr>
              <tr>
                <td>
                Email
                </td>
                <td>
                smartfactory@sizl.co.kr
                </td>
              </tr>
            </tbody>
          </table>
          <br/>
          <p style={{fontSize:19, color:POINT_COLOR}}>기술협력 및 제휴 안내</p>
          <table style={{marginTop:6}}>
            <tbody>
              <tr>
                <td style={{minWidth:80}}>
                Phone
                </td>
                <td>
                032-0000-0000 (오전 10:00 - 오후 17:00)
                </td>
              </tr>
              <tr>
                <td>
                Fax
                </td>
                <td>
                032-0000-0000 
                </td>
              </tr>
              <tr>
                <td>
                Email
                </td>
                <td>
                partner@sizl.co.kr
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

export default ServiceDesk;