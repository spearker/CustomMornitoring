import React, {useState} from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {      ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import CMSMonitoringTabs from "../../Components/Tabs/CMSMonitoringTabs";
import CmsStatistics from "./Statistics";
import CmsPower from "./Power";


const CmsMonitoring: React.FunctionComponent = () => {
    const [statusFilter, setStatusFilter] = useState<string>('power');

    return(
        <DashboardWrapContainer index={13}>
        <SubNavigation list={ROUTER_MENU_LIST[13]}/>
            <InnerBodyContainer>

                {
                    statusFilter === 'power'
                        ? (<CmsPower />)
                        : (<CmsStatistics />)
                }
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CmsMonitoring
