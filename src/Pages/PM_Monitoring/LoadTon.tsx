import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import LoadTonCard from '../../Components/Card/LoadTonCard'
import {API_URLS, getLoadTonList, postLoadTonList} from '../../Api/pm/monitoring'
import {API_URLS as URLS_MAP, getMonitoringMapData} from '../../Api/pm/map'
import FactorySelector from '../../Components/Map/FactorySelector'
import NoDataCard from '../../Components/Card/NoDataCard'
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

interface PressInitData {
    machines: {
        pk: string,
        machine_name: string,
        limited_ton: string,
        capacity: number[],
    }[]
    degree: string[]
    factories: string[]
    current_factory: string
}

const initStartArray = new Array(150).fill(0)
const initEndArray = new Array(40).fill(0)

// 로드톤 모니터링
const LoadtonMonitoring = () => {

    const [arrayType, setArrayType] = useState<number>(0) //['공장 모니터링' , '기계별 모니터링']
    const [list, setList] = useState<IPressLoadTonMonitoring>() //['공장 모니터링' , '기계별 모니터링']

    const [initData, setInitData] = useState<PressInitData>()

    const [selectComponent, setSelectComponent] = useState<string>('4EP99L_factory0')

    const [selectFactory, setSelectFactory] = useState<Factory>({pk: '', name: ''})

    const [machineCount, setMachineCount] = useState<string[]>([])

    const [facotories, setFactories] = useState<Factory[]>([])

    const getFactoryData = useCallback(async () => {

        //onsole.log('factory get==' + dummy_factory2.length)
        //한번 지도 데이터 초기화
        //setComponents(dummy_map_data.components);
        //setMapData(dummy_map_data);
        //setSelectFactory({pk: '2', name: '공장 2'});
        //setFactories(dummy_factory)
        const results = await getMonitoringMapData(URLS_MAP.factory.list)
        setFactories(results)

        if (results.length <= 0) {
            // //alert('조회 가능한 공장 데이터가 없습니다.')
            return
        } else {
            setSelectFactory({pk: results[0].pk, name: results[0].name})
        }

    }, [selectFactory, facotories])

    useEffect(() => {
        getFactoryData()
    }, [])


    /**
     * getList()
     * 클러치 정보 불러오기
     */
    const getDataInit = async () => {
        const tempUrl = `${API_URLS['loadTon'].predata}?factory=${selectFactory.pk}`
        const resultData = await getLoadTonList(tempUrl)
        setInitData(resultData)
        const count = resultData.machines.map((value, index) => {
            return value.pk
        })
        setMachineCount([...count])
    }

    const getData = async () => {
        const tempUrl = `${API_URLS['loadTon'].list}`
        const resultData = await postLoadTonList(tempUrl, {pk: machineCount})

        const machines = resultData.machines.map((value, index) => {
            return {
                ...initData?.machines[index],
                ...value,
                ch1_ton: [...initStartArray, ...value.ch1_ton, ...initEndArray],
                ch2_ton: [...initStartArray, ...value.ch2_ton, ...initEndArray],
                total_ton: [...initStartArray, ...value.total_ton, ...initEndArray]
            }
        })

        setList({
            ...initData,
            current_factory: 0, degree: [], factories: [],
            machines: machines
        })
    }

    useEffect(() => {
        if (selectFactory.pk) {
            if (machineCount.length !== 0) {
                const interval = setInterval(() => {
                    getData()
                }, 3000)
                return () => {
                    clearTimeout(interval)
                    //setTimer(null)
                }
            }
        }
    }, [machineCount])

    useEffect(() => {
        if (selectFactory.pk) {
            getDataInit()
        }
    }, [selectFactory])

    return (
        <DashboardWrapContainer index={'monitoring'}>

            <InnerBodyContainer>
                <div style={{position: 'relative', marginBottom: 20}}>
                    <WrapBox>
                        <span className="p-bold" style={{fontSize: 20, marginRight: 18, marginLeft: 3}}>장비별 로드모니터</span>
                    </WrapBox>
                </div>
                <FactorySelector select={selectFactory} list={facotories} onChangeEvent={setSelectFactory}/>
                {
                    selectFactory.pk !== ''
                        ? list
                        ? machineCount.length !== 0
                            ? <ItemBox>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                    {
                                        list && list.machines.map((item, index) => {
                                            return (<LoadTonCard color={index} propData={item}/>)
                                        })
                                    }
                                </div>
                            </ItemBox>
                            : <NoDataCard contents={'기계 정보가 없습니다.'} height={886}/>
                        : <NoDataCard contents={'데이터를 불러오는 중입니다.'} height={886}/>
                        : <NoDataCard contents={'데이터가 없습니다.'} height={886}/>
                }

            </InnerBodyContainer>

        </DashboardWrapContainer>

    )
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 87px;
    position: relative;
    display: block;
    margin-bottom: 2px;
`

const ItemBox = Styled.div`
    position: relative;
    
    margin-top: 13px;
    width: 98%;
    height: 866px;
    background-color: #111319;
    border-radius: 8px;
    padding:10px;
`

export default LoadtonMonitoring
