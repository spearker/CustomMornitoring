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
import {API_URLS as URLS_MAP} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";

const dummyData: IPressLoadTonMonitoring = {
    machines: [{
        machine_name: "press 01",
        capacity: 1000,
        total_loadton: 100,
        ch1_loadton: 40,
        ch2_loadton: 60,

        total_points: {
            Xaxis: [100],
            Yaxis: [],
        },
        ch1_points: {
            Xaxis: [],
            Yaxis: [],
        },
        ch2_points: {
            Xaxis: [],
            Yaxis: [],
        }
    }],
    factories: [],
    current_factory: ''
}

// 로드톤 모니터링
const LoadtonMonitoring = () => {

    const [arrayType, setArrayType] = useState<number>(0); //['공장 모니터링' , '기계별 모니터링']
    const [list, setList] = useState<IPressLoadTonMonitoring>(dummyData); //['공장 모니터링' , '기계별 모니터링']

    const [selectComponent, setSelectComponent] = useState<string>('4EP99L_factory0');

    /**
     * getList()
     * 클러치 정보 불러오기
     */
    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['loadTon'].list}?factory=${selectComponent}`
        const resultData = await getLoadTonList(tempUrl);
        console.log(resultData)
        setList(dummyData);

    },[list])

    useEffect(() => {
        getData()
    },[selectComponent])

    return (
        <DashboardWrapContainer index={'monitoring'}>
            <SubNavigation list={PM_MENU_LIST.monitoring}/>
            <InnerBodyContainer>
                <div style={{position:'relative'}}>
                    <WrapBox>
                        <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>장비별 로드모니터</span>
                    </WrapBox>
                </div>
                        <ItemBox>
                            <div style={{margin: 10}}>
                                <p style={{textAlign: "left", marginTop:10, fontSize: 20}}>1공장</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}>
                                {
                                    list.machines.map((item, index) => {
                                        return(<LoadTonCard title={item.machine_name} limit={item.capacity} color={index} propData={item}/>)
                                    })
                                }
                            </div>
                        </ItemBox>
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
