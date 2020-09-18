import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';

// 레포트
const Reports = () => {


  useEffect(()=>{


  },[])

  return (
      <DashboardWrapContainer>

        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'레포트 '}/>
          </div>

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

export default Reports;
