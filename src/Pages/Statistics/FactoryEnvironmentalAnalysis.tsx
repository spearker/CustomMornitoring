import React from "react";
import Chart from 'react-apexcharts'
import moment from 'moment';
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import Container from "../../Containers/Statistics/FactoryEnvironmentalAnalysis"


const FactoryEnvironmentalAnalysis: React.FunctionComponent = () => {
    return(
        <DashboardWrapContainer index={15}>
            <SubNavigation list={ROUTER_MENU_LIST[15]}/>
            <InnerBodyContainer>
                <Container/>

            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default FactoryEnvironmentalAnalysis
