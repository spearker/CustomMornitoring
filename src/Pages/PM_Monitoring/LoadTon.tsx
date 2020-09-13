import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {       ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import LoadTonCard from '../../Components/Card/LoadTonCard';
import CMSMonitoringTabs from '../../Components/Tabs/CMSMonitoringTabs';
import TEMP_IMG_1 from '../../Assets/Images/monitoring_loadton.png'
import {API_URLS, getLoadTonList} from "../../Api/pm/monitoring";
import {API_URLS as URLS_MAP, getMonitoringMapData} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";
import FactorySelector from "../../Components/Map/FactorySelector";
import NoDataCard from "../../Components/Card/NoDataCard";

// 로드톤 모니터링
const LoadtonMonitoring = () => {

    const [arrayType, setArrayType] = useState<number>(0); //['공장 모니터링' , '기계별 모니터링']
    const [list, setList] = useState<IPressLoadTonMonitoring>(); //['공장 모니터링' , '기계별 모니터링']

    const [selectComponent, setSelectComponent] = useState<string>('4EP99L_factory0');

    const [selectFactory, setSelectFactory] = useState<Factory>({pk: '', name: ''});

    const [facotories, setFactories]= useState<Factory[]>([]);

    const getFactoryData = useCallback(async ()=>{

        //onsole.log('factory get==' + dummy_factory2.length)
        //한번 지도 데이터 초기화
        //setComponents(dummy_map_data.components);
        //setMapData(dummy_map_data);
        //setSelectFactory({pk: '2', name: '공장 2'});
        //setFactories(dummy_factory)
        const results = await getMonitoringMapData(URLS_MAP.factory.list);
        console.log(results)
        setFactories(results);

        if(results.length <= 0){
            alert('조회 가능한 공장 데이터가 없습니다.')
            return;
        }else{
            setSelectFactory({pk: results[0].pk, name: results[0].name});
        }

    },[selectFactory, facotories]);

    useEffect(() => {
        getFactoryData()
    }, [])


    /**
     * getList()
     * 클러치 정보 불러오기
     */
    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['loadTon'].list}?factory=${selectFactory.pk}`
        const resultData = await getLoadTonList(tempUrl);
        console.log(resultData)
        setList(resultData);

    },[list, selectFactory])

    useEffect(() => {
        if(selectFactory.pk){
            getData();
            const interval = setInterval(() => { getData();  }, 3000)
            return () => {
                console.log('-- monitoring end -- ' )
                clearTimeout(interval);
                //setTimer(null)
            };
        }
    },[selectFactory])

    return (
        <DashboardWrapContainer index={'monitoring'}>

            <InnerBodyContainer>
                <div style={{position:'relative', marginBottom: 20}}>
                    <WrapBox>
                        <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>장비별 로드모니터</span>
                    </WrapBox>
                </div>
                <FactorySelector select={selectFactory} list={facotories} onChangeEvent={setSelectFactory} />
                {
                    selectFactory.pk !== ''
                        ? list
                            ? list.machines.length !== 0
                                ? <ItemBox>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                    {
                                        list && list.machines.map((item, index) => {
                                            return(<LoadTonCard color={index} propData={item}/>)
                                        })
                                    }
                                </div>
                            </ItemBox>
                            : <NoDataCard contents={"기계 정보가 없습니다."} height={886}/>
                        : <NoDataCard contents={"데이터를 불러오는 중입니다."} height={886}/>
                    : <NoDataCard contents={''} height={886}/>
                }

            </InnerBodyContainer>

        </DashboardWrapContainer>

    );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
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

export default LoadtonMonitoring;
