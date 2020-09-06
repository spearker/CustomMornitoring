import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import ListKeyinMillingContainer from '../../Containers/ListKeyin/milling';
import ListKeyinMaterialContainer from '../../Containers/ListKeyin/material';
import ReadyTimeContainer from '../../Containers/Statistics/ReadyTimeContainer';
import ReadyTimeStatisticsContainer from "../../Containers/PM_Statistics/ReadyTimeStatisticsContiner";
import PowerContainer from "../../Containers/PM_Statistics/Power";


const PowerStatistics = () => {

    useEffect(()=>{

    },[])

    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <PowerContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}




export default PowerStatistics;
