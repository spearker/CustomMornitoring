import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, BG_COLOR_SUB, BG_COLOR, POINT_COLOR, TOKEN_NAME} from '../../Common/configset';
import IMG_MAP from '../../Assets/Images/img_map_readytime.png'
import IMG_TIME from '../../Assets/Images/img_timeline.png'
import IMG_KEY from '../../Assets/Images/img_time_key_error.png'
import { changeStatusToString } from '../../Common/statusFunctions';
import moment from 'moment';
import {getParameter, getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import ReactApexChart from "react-apexcharts";
import * as _ from 'lodash'
import NoDataCard from "../../Components/Card/NoDataCard";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";

const dummyData:IPressReadyTimeAnalysis = {
    manufacturer_code:'factory1',
    machine_name: '프레스 01',
    machine_ton: '1000ton',
    analyze:{
        power_off: 10,
        uptime: 42,
        downtime: {
            total: 48,
            error: 15,
            mold_change: 10,
        }
    }
}

const ChartInitOption = {
    chart: {
        width: "40%",
        type: 'pie',
    },
    labels: ["가동시간", "", "", "", "비가동시간"],
    colors: [POINT_COLOR, "rgba(98, 29, 167, .7 )", '#397485', '#ff341a', 'gray'],
    title: {
        style:{ color: 'white', fontSize: 20 },
        text: "Number of leads"
    },
    dataLabels: {
        style: {
          fontSize: 20,
        },
        formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
        }
    },
    legend: {
        show: false
    },
    stroke: {
        show: false,
        width: 2,
        dashArray: 0
    }
}

const MachineInitData = {
    manufacturer_code:'',
    machine_name: '',
    machine_ton: '',
    analyze:{
        power_off: 0,
        uptime: 0,
        downtime: {
            total: 0,
            error: 0,
            mold_change: 0,
        }
    }
}

const PMReadyTimeContainer = () => {
    const [series, setSeries] = useState<number[]>([])
    const [chartOption, setChartOption] = useState(ChartInitOption)

    const [selectMachine, setSelectMachine] = useState<string>('')

    const [machineData, setMachineData] = useState<IPressReadyTimeAnalysis>(MachineInitData);
    const [selectDate, setSelectDate] = useState<string>('')

    /**
     * getData()
     * 비가동 시간 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} data 요청 날짜
     * @returns X
     */
    const getData = useCallback(async()=>{

        const res = await getRequest('http://211.208.115.66:8299/api/v1/analysis/downtime?pk=' + getParameter('pk') + '&date=' + getParameter('date'), getToken(TOKEN_NAME))
        const analysis = dummyData.analyze

        let tmpChartOption = _.cloneDeep(chartOption)
        tmpChartOption.title.text = dummyData.machine_name;

        setMachineData(dummyData)
        setChartOption(tmpChartOption)

        setSeries([analysis.uptime, analysis.power_off, analysis.downtime.mold_change, analysis.downtime.error, analysis.downtime.total])
        // if(res === false){
        //     //TODO: 에러 처리
        // }else{
        //     if(res.status === 200){
        //         const data = res.results;
        //
        //     }else if(res.status === 1001 || res.data.status === 1002){
        //         //TODO:  아이디 존재 확인
        //     }else{
        //         //TODO:  기타 오류
        //     }
        // }
    },[selectMachine, machineData, series, chartOption]);

    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            <div style={{position:'relative', textAlign:'left', marginTop:48}}>

                <div style={{display:'inline-block', textAlign:'left'}}>
                    <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>비가동시간 분석</span>
                </div>
            </div>
            <MapFlexBox>
                <MapBox>
                    <div style={{width:100, height: 40,color: "black", backgroundColor: 'skyblue'}}
                        onClick={() => {
                            setSelectMachine('1')
                        }}
                    >프레스1</div>
                </MapBox>
            </MapFlexBox>
            {

                selectMachine ? <TimeLineBox>
                <div style={{flex: 1,width: "40%", marginLeft: 20, float: "left"}}>
                    <ReactApexChart options={chartOption} series={series} type="pie"/>
                </div>
                <div style={{flex: 1, float: "left"}}>
                    <CalendarDropdown type={"single"} select={selectDate} onClickEvent={(date) => setSelectDate(date)}></CalendarDropdown>
                    <ItemDataBox style={{marginTop: 50}}>
                        <InnerText>
                            <TitleText>가동시간</TitleText>
                            <ContentsText>{parseFloat(String(machineData.analyze.uptime)).toFixed(2)}%</ContentsText>
                        </InnerText>
                    </ItemDataBox>
                    <ItemDataBox>
                        <InnerText>
                            <TitleText>비가동시간</TitleText>
                            <ContentsText>{parseFloat(String(machineData.analyze.downtime.total)).toFixed(2)}%</ContentsText>
                        </InnerText>
                        <div style={{paddingTop: 40,  }}>
                            <table>
                                <tr>
                                    <td style={{width: 150}}>
                                        <div>
                                            <div style={{
                                                display: "inline-block",
                                                borderRadius: 8,
                                                width: 16,
                                                height: 16,
                                                backgroundColor: '#397485',
                                                float: "left",
                                                marginTop: 8,
                                                marginRight: 10,
                                            }}/>
                                            <p style={{fontSize: 20, fontWeight: 'bold'}}>금형교체주기</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p style={{fontSize: 20, fontWeight: 'bold'}}>{machineData.analyze.downtime.mold_change}%</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <div style={{
                                                display: "inline-block",
                                                borderRadius: 8,
                                                width: 16,
                                                height: 16,
                                                backgroundColor: '#ff341a',
                                                float: "left",
                                                marginTop: 8,
                                                marginRight: 10,
                                            }}/>
                                            <p style={{fontSize: 20, fontWeight: 'bold'}}>에러</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p style={{fontSize: 20, fontWeight: 'bold'}}>{machineData.analyze.downtime.error}</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </ItemDataBox>
                    <ItemDataBox style={{border: 0}}>
                        <InnerText>
                            <TitleText>전원 Off</TitleText>
                            <ContentsText>{parseFloat(String(machineData.analyze.power_off)).toFixed(2)}%</ContentsText>
                        </InnerText>
                    </ItemDataBox>
                </div>
            </TimeLineBox> : <NoDataCard contents={"기계를 선택해 주세요"} height={470}/>

            }
        </div>
    );
}

const MapFlexBox = Styled.div`
  display: flex;
  margin-top: 21px;
`

const MapBox = Styled.div`
  background-color: #17181c;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  width: 100%;
  margin-right: 20px;
  img{
    width: 100%;
  }

`

const TitleText = Styled.p`
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
`

const ContentsText = Styled.p`
    font-size: 60px;
    font-weight: bold;
`

const InnerText = Styled.div`
    float: left;
    width: 220px;
    display: inline-block;
    margin-top: 10px;
`

const TimeLineBox = Styled.div`
    background-color: #111319;
    padding: 14px 0 27px 0;
    height: 470px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 6px;
    p{
      text-align: left;
    }

`

const ItemDataBox = Styled.div`
    width: 500px;
    height: 140px;
    margin-left: 100px;
    border-bottom: 0.5px solid #707070;

`


export default PMReadyTimeContainer;
