import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, MES_MENU_LIST } from '../../Common/routerset';
import Container from '../../Containers/Customer/Customer';
import Header from "../../Components/Text/Header";


const CurrentCustomer = () => {

    return (
        <DashboardWrapContainer index={'customer'}>
            <InnerBodyContainer>
                <Container/>



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default CurrentCustomer;
