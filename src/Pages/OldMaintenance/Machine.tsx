import React, {useState} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import TEMP_IMG_1 from '../../Assets/Dummy/repair_manage.svg'

import {useHistory} from 'react-router-dom';
import {ROUTER_MENU_LIST} from '../../Common/routerset';

// 기계보전관리
const MachineManageMaintenance = ({ match }) => {

  const [list, setList] = useState<IMonitoringList[]>([]);
  const history = useHistory();
  const { id } = match.params;

  return (
      <DashboardWrapContainer index={5}>
        <SubNavigation list={ROUTER_MENU_LIST[5]}/>
        <InnerBodyContainer>
        <div style={{position:'relative'}}>
            <Header title={`기계 보전 관리`}/>

          </div>

          <WrapBox>

              <img src={TEMP_IMG_1} />

          </WrapBox>

        </InnerBodyContainer>

      </DashboardWrapContainer>

  );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
    position: relative;
    display: block;
    margin-bottom: 2px;
    img{
      width: 100%;
    }
`

export default MachineManageMaintenance;
