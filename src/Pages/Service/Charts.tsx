import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';

// 통계
const Charts = () => {


  useEffect(()=>{


  },[])

  return (
      <DashboardWrapContainer>

        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'통계'}/>
          </div>

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

export default Charts;
