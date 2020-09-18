import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
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
