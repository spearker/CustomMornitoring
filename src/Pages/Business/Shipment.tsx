import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, MES_MENU_LIST } from '../../Common/routerset';
import Container from '../../Containers/Business/Shipment';
import Header from "../../Components/Text/Header";


const ShipmentBusiness = () => {

    return (
        <DashboardWrapContainer index={'business'}>
            <SubNavigation list={MES_MENU_LIST.business}/>
            <InnerBodyContainer>
                <Container/>



            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}



export default ShipmentBusiness;
