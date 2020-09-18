import React, {useState} from "react";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import CmsStatistics from "./Statistics";
import {API_URLS as URLS_MAP} from "../../Api/pm/monitoring";
import MapBoard from "../../Components/Map/MapBoard";
import HeaderLive from "../../Components/Text/HeaderLive";


const CmsMonitoring: React.FunctionComponent = () => {
    const [statusFilter, setStatusFilter] = useState<string>('power');
    const [selectMachine, setSelectMachine] = useState<string>();
    const [selectComponent, setSelectComponent] = useState();

    return(
        <DashboardWrapContainer index={'monitoring'}>

            <InnerBodyContainer>
                <div style={{position:'relative'}}>
                    <HeaderLive title={'전력 모니터링'} isTurn={false}/>

                </div>

                {
                    statusFilter === 'power'
                        ? (<MapBoard
                            type={0}//0: 모니터링 1:통계/분석
                            url={URLS_MAP.power.monitoring}
                            mapType={"cms"}
                            autoRendering={true}
                            select={selectMachine}
                            item={selectComponent}
                            onChangeComponent={(e) => setSelectComponent(e)}
                            onChangeEvent={(e) => setSelectMachine(e)}
                        />)
                        // ? (<CmsPower />)
                        : (<CmsStatistics />)
                }
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default CmsMonitoring
