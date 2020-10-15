import React, { useCallback, useEffect, useState } from 'react'
import { API_URLS, getLoadTonList } from "../../../Api/pm/monitoring";
import { API_URLS as URLS_MAP, getMonitoringMapData } from "../../../Api/pm/map";
import NoDataCard from "../../Card/NoDataCard";
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


  return (
      <React.Fragment>
        <InnerBodyContainer styles={{
          width: '100%',
          height: '100%',
          marginLeft: '0',
          marginRight: '0'
        }}>
          {/*<FactorySelector width={'100%'} select={selectFactory} list={facotories} onChangeEvent={setSelectFactory}/>*/}
          {
            selectFactory.pk !== ''
                ? list
                ? list.machines.length !== 0
                    ? <ItemBox>
                      <CustomLoadTon color={0} propData={list.machines[0]}
                                     styles={{ width: '100%' }}/>
                      <div style={{ width: '80%', marginLeft: 20 }}>
                        {
                          pressMonitoringList.length > 0 &&
                          <CustomMonitoringCard contents={pressMonitoringList[0]}
                                                optionList={pressMonitoringList[0].info_list.map((m) => {
                                                  return Number(m.title)
                                                })}/>
                        }

                      </div>
                      {/*{*/}
                      {/*  list && list.machines.map((item, index) => {*/}
                      {/*    return (<LoadTonCard color={index} propData={item}/>)*/}
                      {/*  })*/}
                      {/*}*/}
                    </ItemBox>
                    : <NoDataCard height={'100vh'} contents={"기계 정보가 없습니다."}/>
                : <NoDataCard height={'100vh'} contents={"데이터를 불러오는 중입니다."}/>
                : <NoDataCard height={'100vh'} contents={'데이터가 없습니다.'}/>
          }
        </InnerBodyContainer>
      </React.Fragment>
  )
}

const ItemBox = Styled.div`
    position: relative;
    width: 100%;
`


export default CustomDashboardLoadtonChart
