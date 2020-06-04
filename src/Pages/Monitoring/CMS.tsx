import React, {useState} from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MONITORING, ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import CMSMonitoringTabs from "../../Components/Tabs/CMSMonitoringTabs";
import CmsStatistics from "./Statistics";
import CmsPower from "./Power";


const CmsMonitoring: React.FunctionComponent = () => {
    const [statusFilter, setStatusFilter] = useState<string>('power');

    return(
        <DashboardWrapContainer index={11}>
        <SubNavigation list={ROUTER_MENU_LIST[11]}/>
            <InnerBodyContainer>
                <div style={{position:'relative', width: 250}}>
                    <CMSMonitoringTabs contents={
                        [{title:'공장 전류 현황', value:statusFilter === 'power' ? 'active' : 'all', action: 'power'},
                            {title:'통계·분석', value:statusFilter === 'total' ? 'active' : 'all', action: 'total'}
                        ]} onClickEvent={setStatusFilter} />
                </div>
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
