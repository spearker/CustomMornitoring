import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Container from '../../Containers/Maintenance/Mold';


const MoldMaintenance = () => {

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



export default MoldMaintenance;

