import React, {useState} from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {PM_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import CmsStatistics from "./Statistics";
import CmsPower from "./Power";
import {API_URLS as URLS_MAP} from "../../Api/pm/monitoring";
import MapBoard from "../../Components/Map/MapBoard";


const CmsMonitoring: React.FunctionComponent = () => {
    const [statusFilter, setStatusFilter] = useState<string>('power');

    return(
        <DashboardWrapContainer index={'monitoring'}>

            <InnerBodyContainer>

                {
                    statusFilter === 'power'
                        ? (<MapBoard
                            type={0}//0: 모니터링 1:통계/분석
                            url={URLS_MAP.power.monitoring}
                            mapType={"cms"}
                            autoRendering={true}
                        />)
                        // ? (<CmsPower />)
                        : (<CmsStatistics />)
                }
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CmsMonitoring
