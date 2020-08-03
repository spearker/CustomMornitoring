import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, BG_COLOR_SUB, BG_COLOR, POINT_COLOR, TOKEN_NAME} from '../../Common/configset';
import {getParameter, getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getCapacityTimeData} from "../../Api/pm/statistics";

import tempImage from "../../Assets/Images/temp_machine.png"

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
        max: 250,
        tickAmount: 25,
        labels:{
            formatter:(value) => {
                if(value===250){
                    return "(생산량)"
                }else{
                    if(value%50===0){
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
        labels: {
            show: false,
            style: {
                fontSize: '12px'
            }
        }
    }
}

const MachineInitData: IPressCapacity = {
    manufacturer_code:'',
    machine_name: '',
    machine_ton: '',
    analyze:{
        times: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        productions: [1,2,3,4,5,6,7,8,9,10]
    }
}

const PMCapacityStaticsContiner = () => {
    const [series, setSeries] = useState<object[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('프레스 01')

    const [machineData, setMachineData] = useState<IPressCapacity>(MachineInitData);

    const [selectDate, setSelectDate] = useState<string>('')
    const [pk, setPK] = useState<string>('v1_SEAIN_machine_1_null_1')

    const [selectDateRange, setSelectDateRange] = useState<{ start: string, end: string }>({start: '', end: ''})

    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async()=>{
        const tempUrl = `${API_URLS['capacity'].load}?pk=${pk}&date=${selectDate}`
        const resultData = await getCapacityTimeData(tempUrl);
    },[selectMachine, machineData, series]);

    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            <div style={{marginTop:42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: "bold", textAlign: "left"}}>프레스 생산량</p>
            </div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>프레스 선택</p>
                </div>
                {
                    selectMachine === pk
                        ? <ChartBorderMiniBox>
                            <div style={{width: 114, height: 100, marginLeft: 8, display: "inline-block", float: "left"}}>
                                <img src={tempImage} style={{width: 114, }}/>
                            </div>
                            <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 21}}>
                                <p style={{fontWeight: 'bold', textAlign: "left"}}>{machineData.machine_name + "(" + machineData.machine_ton+")"}</p>
                                <p style={{ textAlign: "left"}}>{machineData.manufacturer_code}</p>
                            </div>
                        </ChartBorderMiniBox>
                        : <ChartMiniBox>
                            <div style={{width: 114, height: 100, marginLeft: 8, display: "inline-block", float: "left"}}>
                                <img src={tempImage} style={{width: 114, }}/>
                            </div>
                            <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 21}}>
                                <p style={{fontWeight: 'bold', textAlign: "left"}}>{machineData.machine_name + "(" + machineData.machine_ton+")"}</p>
                                <p style={{ textAlign: "left"}}>{machineData.manufacturer_code}</p>
                            </div>
                        </ChartMiniBox>
                }
            </ChartListBox>
            <ChartDetailBox>
                <div style={{marginTop: 25, paddingBottom: 23}}>
                    <div>
                        <div style={{float: "left", display: "inline-block"}}>
                            <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>{machineData.machine_name}</p>
                        </div>
                        <CalendarDropdown type={'single'} select={selectDate} onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                    </div>
                </div>
                <div style={{width: 640, height: 619, backgroundColor: '#111319', margin: 0, padding: 0, clear: 'both', marginTop: 20}}>
                    <ReactApexChart options={{...ChartInitOptions,...ChartOptionDetailLable,}} series={series} type={'bar'} height={"98%"}></ReactApexChart>
                </div>
            </ChartDetailBox>
        </div>
    );
}

const ChartListBox = styled.div`
    display: inline-block;
    width: 340px;
    height: 724px;
    padding: 0 21px 0 29px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
`

const ChartDetailBox = styled.div`
    display: inline-block;
    width: 640px;
    height: 724px;
    padding: 0 25px 0 25px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
    margin-left: 20px;
`

const ChartMiniBox = styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
`

const ChartBorderMiniBox = styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    border: 4px solid #19b9df; 
`

export default PMCapacityStaticsContiner;
