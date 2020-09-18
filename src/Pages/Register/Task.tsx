import React, {useEffect} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';


// 작업 지시서 등록
const RegisterTask = () => {


  useEffect(()=>{


  },[])

  return (
      <DashboardWrapContainer>

        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'작업지시서 등록'}/>
          </div>

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

export default RegisterTask;
