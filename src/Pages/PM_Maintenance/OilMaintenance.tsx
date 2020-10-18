import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/PM_Maintenance/OilContainer';


const OilMaintenance = () => {

  useEffect(()=>{

  },[])

  return (
    <DashboardWrapContainer index={'maintenance'}>

        <InnerBodyContainer>
        <Container />



        </InnerBodyContainer>
      </DashboardWrapContainer>
  );
}




export default OilMaintenance;
