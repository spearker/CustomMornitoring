import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import NewPowerContainer from "../../Containers/PM_Statistics/NewPower";


const NewPowerStatistics = () => {

    useEffect(()=>{

    },[])

    return (
        <DashboardWrapContainer index={'statistics'}>

            <InnerBodyContainer>
                <NewPowerContainer/>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    );
}




export default NewPowerStatistics;
