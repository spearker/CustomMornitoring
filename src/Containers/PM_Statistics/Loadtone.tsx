import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, BG_COLOR_SUB, BG_COLOR, POINT_COLOR, TOKEN_NAME} from '../../Common/configset';
import {getParameter, getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import ListRadioButton from "../../Components/Button/ListRadioButton";
import LoadtoneBox from "../../Components/Box/LoadtoneBox";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getPowerList} from "../../Api/pm/statistics";

const ChartInitOptions = {
    chart: {
        type: 'bar',
        toolbar: {
            tools: {
                download: false
            }
        },
        events: {
            click: function(chart, w, e) {
                console.log(chart, w, e)
            }
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '55%',
            distributed: false
        }
    },
    grid: {
        borderColor: '#42444b',
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            type: "vertical",
            shadeIntensity: 0,
            opacityFrom: 1,
            opacityTo: .20,
            stops:[0, 90, 100]
        }
    },
    colors: ['#dd4bbe'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
}

const ChartOptionDetailLable = {
    yaxis: {
        min: 0,
        max: 375,
        tickAmount: 25,
        labels:{
            formatter:(value) => {
                if(value===375){
                    return "(ton)"
                }else{
                    if(value%75===0){
                        return value
                    }
                }
            }
        }
    },
    xaxis: {
        categories: [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"
        ],
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    }
}

const  ChartOptionMiniLable= {
    yaxis: {
        min: 0,
        max: 250,
        labels:{
            show: false
        }
    },
    xaxis: {
        categories: [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"
        ],
        labels: {
            show: false,
            style: {
                fontSize: '12px'
            }
        }
    }
}


const MachineInitData: IPressLoadTonSatistics[] = []

const LoadtoneContiner = () => {
    const [series, setSeries] = useState<object[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('프레스 01')

    const [machineData, setMachineData] = useState<IPressLoadTonSatistics[]>(MachineInitData);

    const [selectDate, setSelectDate] = useState<string>('')

    const [selectDateRange, setSelectDateRange] = useState<{ start: string, end: string }>({start: '', end: ''})

    const [selectType, setSelectType] = useState([true, false, false])

    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async()=>{
        // const res = await getRequest('http://61.101.55.224:9912/api/v1/analysis/downtime?pk=' + getParameter('pk') + '&date=' + getParameter('date'), getToken(TOKEN_NAME))
        // const analysis = dummyData.analyze
        //
        // // let tmpChartOption = _.cloneDeep(chartOption)
        // // tmpChartOption.title.text = dummyData.machine_name;
        // //
        // // setChartOption(tmpChartOption)
        //
        // setSeries([{data: [ ...analysis ]}])
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
    },[selectMachine, machineData, series]);

    useEffect(()=>{
        getData().then(r =>
            console.log(r)
        )
    },[])

    return (
        <div>
            <div style={{marginTop:42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: "bold", textAlign: "left"}}>프레스 로드톤</p>
            </div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>프레스 선택</p>
                </div>
                {
                    machineData.map((v,i) => {
                        return(
                            <ChartMiniBox>
                                <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 10}}>
                                    <p style={{fontWeight: 'bold', textAlign: "left"}}>{v.pressName + "(" + v.max_ton+")"}</p>
                                    <p style={{ textAlign: "left"}}>{}</p>
                                </div>
                                <div style={{width: 160, height: 100, display: "inline-block", float: "left"}}>
                                    <ReactApexChart options={{...ChartInitOptions,...ChartOptionMiniLable}} series={series} type={'bar'} height={130} width={180}/>
                                </div>
                            </ChartMiniBox>
                        )
                    })

                }
            </ChartListBox>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{marginLeft: 20}}>
                    <LoadtoneBox title={'전일 로드톤'}>
                        <div style={{paddingTop: 25, paddingBottom: 27}}>
                            <BottomBox>
                                <div>
                                  <p>최소값</p>
                                  <p>141</p>
                                </div>
                            </BottomBox>
                            <BottomBox>
                                <div>
                                    <p>최대값</p>
                                    <p>151</p>
                                </div>
                            </BottomBox>
                        </div>
                    </LoadtoneBox>
                </div>
                <LoadtoneBox title={'금일 로드톤'}>
                    <div style={{paddingTop: 25, paddingBottom: 27}}>
                        <BottomBox>
                            <div>
                                <p>최소값</p>
                                <p>130</p>
                            </div>
                        </BottomBox>
                        <BottomBox>
                            <div>
                                <p>최대값</p>
                                <p>135</p>
                            </div>
                        </BottomBox>
                    </div>
                </LoadtoneBox>
            </div>
            <ChartDetailBox>
                <div style={{marginTop: 25, paddingBottom: 23}}>
                    <div>
                        <div style={{float: "left", display: "inline-block"}}>
                            <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>장비별 로드톤</p>
                        </div>
                        <CalendarDropdown type={'single'} select={selectDate} onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                        <ListRadioButton nameList={[ "년", "월", "일"]} data={selectType} onClickEvent={(i) => {
                            if(i === 0){
                                setSelectType([true, false, false])
                            } else if(i === 1){
                                setSelectType([false, true, false])
                            } else {
                                setSelectType([false, false, true])
                            }
                        }}/>
                    </div>
                </div>
                <div style={{width: 640, height: 419, backgroundColor: '#000000', margin: 0, padding: 0, clear: 'both', marginTop: 20}}>
                    <ReactApexChart options={{...ChartInitOptions,...ChartOptionDetailLable}} series={series} type={'area'} height={"98%"}></ReactApexChart>
                </div>
            </ChartDetailBox>
        </div>
    );
}

const ChartListBox = Styled.div`
    display: inline-block;
    width: 340px;
    height: 724px;
    padding: 0 21px 0 29px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
`

const ChartDetailBox = Styled.div`
    display: inline-block;
    width: 640px;
    height: 524px;
    padding: 0 25px 0 25px;
    background-color: #000000;
    border-radius: 6px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
`

const ChartMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
`

const ChartBorderMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    border: 4px solid #19b9df; 
`
const BottomBox = Styled.div`
    width: 164px;
    height: 78px;
    float: left;
    display: inline-block;
    &:first-child{
            border-right: 1px solid #ffffff;
            }
    p {
        font-size: 36px;
         &:first-child{
            font-size: 15px;
            }
    }
`

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    width: 1px;
    background-color: #ffffff;
`

export default LoadtoneContiner;
