import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import Container from '../../Containers/PM_Statistics/Error';
import Header from "../../Components/Text/Header";


const ErrorStatistics = ({match}:any) => {

    const { id } = match.params;

    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <Container/>



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default ErrorStatistics;
