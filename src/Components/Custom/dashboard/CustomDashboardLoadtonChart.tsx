import React, { useCallback, useEffect, useState } from 'react'
import { API_URLS, getLoadTonList } from "../../../Api/pm/monitoring";
import { API_URLS as URLS_MAP, getMonitoringMapData } from "../../../Api/pm/map";
import InnerBodyContainer from "../../../Containers/InnerBodyContainer";
import Styled from "styled-components";
import CustomLoadTon from "../loadton/CustomLoadTonCard";
import CustomMonitoringCard from "../loadton/CustomMonitoringCard";
import CustomMainMotorAngulargaugeChart from "../../../Containers/Custom/dashboard/CustomMainMotorAngulargaugeChart";
import CustomSlideMotorAngulargaugeChart from "../../../Containers/Custom/dashboard/CustomSlideMotorAngulargaugeChart";
import getYoudongDashboard from "../../../Api/custom/getYoudongDashboard";

const CustomDashboardLoadtonChart: React.FunctionComponent = () => {
  const [ list, setList ] = useState<IPressLoadTonMonitoring>(); //['공장 모니터링' , '기계별 모니터링']
  const [ pressMonitoringList, setPressMonitoringList ] = useState<any[]>([]);
  const [ selectFactory, setSelectFactory ] = useState<Factory>({ pk: '', name: '' });
  const [ facotories, setFactories ] = useState<Factory[]>([]);
  const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);


  useEffect(() => {
    const documentEvent: any = document
    documentEvent.body.style.zoom = .7;
    getFactoryData()
    getPressMonitoring()
    setIsFirstLoad(true)
  }, [])


  const getYoudongCustomDashboardData = async () => {
    const response = await getYoudongDashboard(1)

    console.log('getYoudongCustomDashboardData', response)
  }


  useEffect(() => {
    if (selectFactory.pk) {
      const interval = setInterval(() => {
        getData();
        getYoudongCustomDashboardData()
        getPressMonitoring()
      }, 3000)
      return () => {
        console.log('-- monitoring end -- ')
        clearTimeout(interval);
        //setTimer(null)
      };
    }
  }, [ selectFactory ])


  const getData = useCallback(async () => {
    const tempUrl = `${API_URLS['loadTon'].list}?factory=${selectFactory.pk}`
    const resultData = await getLoadTonList(tempUrl);
    console.log('resultData ', resultData)

    setList(resultData);

  }, [ list, selectFactory ])

  const getFactoryData = useCallback(async () => {
    const results = await getMonitoringMapData(URLS_MAP.factory.list);
    setFactories(results);

    if (results.length <= 0) {
      return;
    } else {
      setSelectFactory({ pk: results[0].pk, name: results[0].name });
    }

  }, [ selectFactory, facotories ]);


  const getPressMonitoring = useCallback(async () => {
    if (document.hidden) { // Opera 12.10 and Firefox 18 and later support
      console.log('-- hidden browser -- ')
      //setCount(999)
      return
    }
    const tempUrl = `${API_URLS['press'].monitoring}`
    const resultData = await getLoadTonList(tempUrl);
    console.log('getPressMonitoring', resultData)
    setIsFirstLoad(true)
    setPressMonitoringList(resultData)
  }, [ pressMonitoringList ])


  const Header = () => {
    return (
        <div style={{ paddingTop: 11, paddingLeft: 10, height: '5%', marginBottom: 20 }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TitleText
                style={{ fontSize: 32 }}>{list && list.machines[0]?.machine_name + `(${list.machines[0]?.limited_ton})`}</TitleText>
            {/*<TitleText style={{ fontSize: 20 }}>{Number(propData?.limited_ton)}ton</TitleText>*/}
          </div>
        </div>
    )
  }

  const standardInfo = () => {
    return (
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            width: '80%',
            marginBottom: 40
          }}>
            <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 32, fontWeight: 'bold' }}>Total</p>
            <TitleText
                style={{ fontSize: 58 }}>{list && list.machines[0].total_maxTon ? Number(list.machines[0].total_maxTon) + 't' : '0'}</TitleText>

          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            width: '80%',
            marginBottom: 50,
            opacity: .9
          }}>
            <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 32, fontWeight: 'bold' }}>일률</p>
            <TitleText>3492 kgf.m</TitleText>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            width: '80%',
            marginBottom: 60,
            opacity: .75
          }}>
            <div>
              <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 32, fontWeight: 'bold' }}>CH1 (좌)</p>
              <TitleText>{list && list.machines[0]?.ch1_maxTon ? Number(list.machines[0].ch1_maxTon) + ' t' : '-'}</TitleText>
            </div>
            <div>
              <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 32, fontWeight: 'bold' }}>CH1 (우)</p>
              <TitleText>{list && list.machines[0]?.ch1_maxTon ? Number(list.machines[0].ch1_maxTon) + ' t' : '-'}</TitleText>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            width: '80%',
            opacity: .75
          }}>
            <div>
              <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 32, fontWeight: 'bold' }}>CH2 (좌)</p>
              <TitleText>{list && list.machines[0]?.ch1_maxTon ? Number(list.machines[0].ch1_maxTon) + ' t' : '-'}</TitleText>
            </div>
            <div>
              <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 32, fontWeight: 'bold' }}>CH2 (우)</p>
              <TitleText>{list && list.machines[0]?.ch1_maxTon ? Number(list.machines[0].ch1_maxTon) + ' t' : '-'}</TitleText>
            </div>
          </div>
        </div>
    )
  }

  return (
      <React.Fragment>
        <InnerBodyContainer styles={{
          width: '100%',
          height: '100%',
          marginLeft: '0',
          marginRight: '0'
        }}>
          {Header()}
          {
            selectFactory.pk !== ''
            && <ItemBox>
              <div style={{ display: 'flex' }}>
                <div style={{
                  width: '15%',
                  border: '1px solid rgba(255, 255, 255, .3)',
                  borderRadius: 8,
                  paddingTop: 50,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 300, marginBottom: 40 }}>
                    <CustomMainMotorAngulargaugeChart/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 300, }}>
                    <CustomSlideMotorAngulargaugeChart/>
                  </div>
                </div>
                <div style={{ width: '68%' }}>
                  <CustomLoadTon color={0} propData={list ? list.machines[0] : undefined}
                                 styles={{ width: '100%', height: '50%' }}/>
                </div>
                <div style={{
                  width: '15%',
                  border: '1px solid rgba(255, 255, 255, .3)',
                  borderRadius: 8,
                  paddingTop: 50
                }}>
                  {standardInfo()}
                </div>
              </div>
              <div style={{ width: '98.3%' }}>
                <div style={{ width: '100%' }}>
                  {
                    pressMonitoringList &&
                    <React.Fragment>
                      <div style={{
                        width: "20%",
                        borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        display: 'flex',
                        position: 'absolute',
                        right: 0
                      }}>
                      </div>
                      <CustomMonitoringCard contents={pressMonitoringList.length > 0 && pressMonitoringList[0]}
                                            optionList={pressMonitoringList.length > 0 && pressMonitoringList[0].info_list.map((m) => {
                                              return Number(m.title)
                                            })}/>

                    </React.Fragment>
                  }
                </div>
              </div>
            </ItemBox>
          }
        </InnerBodyContainer>
      </React.Fragment>
  )
}

const ItemBox = Styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`

const TitleText = Styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 42px;
`

export default CustomDashboardLoadtonChart
