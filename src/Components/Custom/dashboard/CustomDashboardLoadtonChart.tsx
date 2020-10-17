import React, { useCallback, useEffect, useState } from 'react'
import { API_URLS, getLoadTonList } from "../../../Api/pm/monitoring";
import { API_URLS as URLS_MAP, getMonitoringMapData } from "../../../Api/pm/map";
import InnerBodyContainer from "../../../Containers/InnerBodyContainer";
import Styled from "styled-components";
import CustomLoadTon from "../loadton/CustomLoadTonCard";
import CustomMonitoringCard from "../loadton/CustomMonitoringCard";

const CustomDashboardLoadtonChart: React.FunctionComponent = () => {
  const [ list, setList ] = useState<IPressLoadTonMonitoring>(); //['공장 모니터링' , '기계별 모니터링']
  const [ pressMonitoringList, setPressMonitoringList ] = useState<any[]>([]);
  const [ selectFactory, setSelectFactory ] = useState<Factory>({ pk: '', name: '' });
  const [ facotories, setFactories ] = useState<Factory[]>([]);
  const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);

  useEffect(() => {
    getFactoryData()
    getPressMonitoring()
    setIsFirstLoad(true)
  }, [])


  useEffect(() => {
    if (selectFactory.pk) {
      const interval = setInterval(() => {
        getData();
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
            <TitleText style={{ fontSize: 32 }}>{list && list.machines[0]?.machine_name}</TitleText>
            {/*<TitleText style={{ fontSize: 20 }}>{Number(propData?.limited_ton).toFixed(2)}ton</TitleText>*/}
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
              <CustomLoadTon color={0} propData={list ? list.machines[0] : undefined}
                             styles={{ width: '100%' }}/>
              <div style={{ width: '80%', marginLeft: 20 }}>
                {

                  <CustomMonitoringCard contents={pressMonitoringList.length > 0 && pressMonitoringList[0]}
                                        optionList={pressMonitoringList.length > 0 && pressMonitoringList[0].info_list.map((m) => {
                                          return Number(m.title)
                                        })}/>
                }

              </div>
            </ItemBox>
          }
        </InnerBodyContainer>
      </React.Fragment>
  )
}

const ItemBox = Styled.div`
    position: relative;
    width: 100%;
`

const TitleText = Styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 32px;
`

export default CustomDashboardLoadtonChart
