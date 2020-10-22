import React, { useCallback, useEffect, useState } from 'react';
import { TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import 'react-dropdown/style.css'
import { getRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';

// 프래스 추천
const PressRecommend = () => {

  const [ list, setList ] = useState<[]>([]);
  const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);

  const index = {
    status: '장비상태',
    group: '라인',
    name: '장비명',
    spm: 'spm',
    angle: '앵글',
    current: '메인전류',
    loadtone: '로드톤',
    temperature: '온도',
    keycam_status: '키캠상태',
    motor_status: '모터상태',
    error: '에러',
    live_time: '가동시간',
    rest_time: '비가동시간'

  }

  /**
   * getData()
   * 모니터링 데이터 조회
   * @param {string} url 요청 주소
   * @returns X
   */
  const getData = useCallback(async () => {

    const res = await getRequest('http://192.168.0.46:8299/api/v1/monitoring/press', getToken(TOKEN_NAME))
    setIsFirstLoad(true)
    if (res === false) {
      //alert('서버에서 데이터를 받아올 수 없습니다.')

      window.location.href = "/dashboard"
    } else {
      if (res.status === 200) {
        const data = res.results;
        setList(data);

      } else {
        //alert('서버에서 데이터를 받아올 수 없습니다.')

        window.location.href = "/dashboard"
      }
    }
  }, [ list ]);

  useEffect(() => {
    if (!isFirstLoad) {
      //getData()
    }
  }, [])
  useEffect(() => {

  }, [])


  return (
      <DashboardWrapContainer index={6}>
        <SubNavigation list={ROUTER_MENU_LIST[6]}/>
        <InnerBodyContainer>
          <div style={{ position: 'relative' }}>

            <Header title={'프레스 추천 공정'}/>

          </div>

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

export default PressRecommend;
