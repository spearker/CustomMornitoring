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
import {IChartOption, IPressReadyTime} from "../../Common/@types";
import * as _ from 'lodash'
import NoDataCard from "../../Components/Card/NoDataCard";

const dummyData:IPressReadyTime = {
    manufacturer_code:'factory1',
    machine_name: '프레스 01',
    machine_ton: '1000ton',
    analyze:{
        power_off: 40,
        uptime: 30,
        downtime: {
            total: 20,
            error: 5,
            mold_change: 5,
        }
    }
}

const PMReadyTimeContainer = () => {
    const [series, setSeries] = useState<number[]>([])

    const [chartOption, setChartOption] = useState<IChartOption>({
        chart: {
            width: "40%",
            type: 'pie',
        },
        labels: ["가동시간", "", "", "", "비가동시간"],
        colors: [POINT_COLOR, '#ff341a', '#397485', "rgba(98, 29, 167, .7 )", 'gray'],
        title: {
            style:{ color: 'white', fontSize: 20 },
            text: "Number of leads"
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: false
        }
    })

    const [selectMachine, setSelectMachine] = useState<string>('')

    const [machineData, setMachineData] = useState<IPressReadyTime>({
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
    });

    /**
     * getData()
     * 비가동 시간 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} data 요청 날짜
     * @returns X
     */
    const getData = useCallback(async()=>{

        const res = await getRequest('http://61.101.55.224:9912/api/v1/analysis/downtime?pk=' + getParameter('pk') + '&date=' + getParameter('date'), getToken(TOKEN_NAME))
        const analysis = dummyData.analyze

        let tmpChartOption = _.cloneDeep(chartOption)
        tmpChartOption.title.text = dummyData.machine_name;

        setMachineData(dummyData)
        setChartOption(tmpChartOption)

        setSeries([analysis.uptime, analysis.downtime.error, analysis.downtime.mold_change, analysis.power_off, analysis.downtime.total])
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
                    <div style={{width:40, height: 40, backgroundColor: 'skyblue'}}
                        onClick={() => {
                            setSelectMachine('1')
                        }}
                    >프레스1</div>
                </MapBox>
            </MapFlexBox>
            {

                selectMachine ? <TimeLineBox>
                <div style={{width: 450, height: 450, marginLeft: 20, float: "left"}}>
                    <ReactApexChart options={chartOption} series={series} type="pie"/>
                </div>
                <div style={{width: 550, height: 450, float: "left"}}>
                    <div style={{width: 450, height: 140, marginLeft: 100}}>
                        <RunTimeBox>
                            <TitleText>가동시간</TitleText>
                            <ContentsText>{machineData.analyze.uptime}%</ContentsText>
                        </RunTimeBox>
                    </div>
                    <div style={{width: 450, height: 220, marginLeft: 100}}>
                        <RunTimeBox>
                            <TitleText>비가동시간</TitleText>
                            <ContentsText>{machineData.analyze.downtime.total}%</ContentsText>
                        </RunTimeBox>
                        <div style={{marginTop: 10, width: 450}}>
                            <ChartBottomData>
                                <div>
                                    <div style={{
                                        display: "inline-block",
                                        borderRadius: 10,
                                        width: 20,
                                        height: 20,
                                        backgroundColor: 'rgba(99, 15, 183, .83)',
                                        float: "left",
                                        marginTop: 5,
                                        marginRight: 10
                                    }}/>
                                    <p>전원 off</p>
                                </div>
                                <ItemDataBox>
                                    <p>{machineData.analyze.power_off}%</p>
                                </ItemDataBox>
                            </ChartBottomData>
                            <ChartBottomData style={{width: 150}}>
                                <div>
                                    <div style={{
                                        display: "inline-block",
                                        borderRadius: 10,
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#397485',
                                        float: "left",
                                        marginTop: 5,
                                        marginRight: 10
                                    }}/>
                                    <p>금형교체주기</p>
                                </div>
                                <ItemDataBox>
                                    <p>{machineData.analyze.downtime.mold_change}%</p>
                                </ItemDataBox>
                            </ChartBottomData>
                            <ChartBottomData>
                                <div>
                                    <div style={{
                                        display: "inline-block",
                                        borderRadius: 10,
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#ff341a',
                                        float: "left",
                                        marginTop: 5,
                                        marginRight: 10
                                    }}/>
                                    <p>에러</p>
                                </div>
                                <ItemDataBox>
                                    <p>{machineData.analyze.downtime.error}%</p>
                                </ItemDataBox>
                            </ChartBottomData>
                        </div>
                    </div>
                </div>
            </TimeLineBox> : <NoDataCard contents={"기계를 선택해 주세요"}/>

            }
        </div>
    );
}

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

const ChartBottomData = Styled.div`
    display: inline-block;
    width: 100px;
    float: left;
    margin-left: 20px;
`

const RunTimeBox = Styled.div`
    margin-top: 20px;
`

const TitleText = Styled.p`
    font-size: 20px;
    font-weight: bold;
`

const ContentsText = Styled.p`
    font-size: 60px;
    font-weight: bold;
`

const TimeLineBox = Styled.div`
    background-color: #111319;
    padding: 14px 19px 27px 14px;
    min-height: 370px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 6px;
    p{
      text-align: left;
    }
  
`

const ItemDataBox = Styled.div`
    width: 50px; 
    margin-left: 30px;
`

const MapFlexBox = Styled.div`
  display: flex;
  margin-top: 21px;
`

export default PMReadyTimeContainer;
