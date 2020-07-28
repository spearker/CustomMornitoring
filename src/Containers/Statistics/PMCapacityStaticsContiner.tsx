import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, BG_COLOR_SUB, BG_COLOR, POINT_COLOR, TOKEN_NAME} from '../../Common/configset';
import {getParameter, getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";

const dummyData = {
    manufacturer_code:'123-456-789',
    machine_name: '프레스 01',
    machine_ton: '1000ton',
    analyze:[0,0,0,0,10,30,70,100,100,150,130,90,80,40,20,10,5,3,1,0,0,0,0,0]
}

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

const MachineInitData = {
    manufacturer_code:'',
    machine_name: '',
    machine_ton: '',
    analyze:[0]
}

const PMCapacityStaticsContiner = () => {
    const [series, setSeries] = useState<object[]>([])

    const [chartOption, setChartOption] = useState(ChartInitOptions)

    const [selectMachine, setSelectMachine] = useState<string>('프레스 01')

    const [machineData, setMachineData] = useState<IPressCapacity>(MachineInitData);

    const [selectDate, setSelectDate] = useState<string>('')

    const [selectDateRange, setSelectDateRange] = useState<{ start: string, end: string }>({start: '', end: ''})

    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async()=>{
        const res = await getRequest('http://61.101.55.224:9912/api/v1/analysis/downtime?pk=' + getParameter('pk') + '&date=' + getParameter('date'), getToken(TOKEN_NAME))
        const analysis = dummyData.analyze

        // let tmpChartOption = _.cloneDeep(chartOption)
        // tmpChartOption.title.text = dummyData.machine_name;
        //
        setMachineData(dummyData)
        // setChartOption(tmpChartOption)

        setSeries([{data: [ ...analysis ]}])
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
                <p style={{fontSize: 22, fontWeight: "bold", textAlign: "left"}}>프레스 생산량</p>
            </div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>프레스 선택</p>
                </div>
                {
                    selectMachine === machineData.machine_name
                        ? <ChartBorderMiniBox>
                            <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 10}}>
                                <p style={{fontWeight: 'bold', textAlign: "left"}}>{machineData.machine_name + "(" + machineData.machine_ton+")"}</p>
                                <p style={{ textAlign: "left"}}>{machineData.manufacturer_code}</p>
                            </div>
                            <div style={{width: 160, height: 100, display: "inline-block", float: "left"}}>

                                <ReactApexChart options={{...ChartInitOptions,...ChartOptionMiniLable}} series={series} type={'bar'} height={130} width={180}/>
                            </div>
                        </ChartBorderMiniBox>
                        : <ChartMiniBox>
                            <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 10}}>
                                <p style={{fontWeight: 'bold', textAlign: "left"}}>{machineData.machine_name + "(" + machineData.machine_ton+")"}</p>
                                <p style={{ textAlign: "left"}}>{machineData.manufacturer_code}</p>
                            </div>
                            <div style={{width: 160, height: 100, display: "inline-block", float: "left"}}>
                                <ReactApexChart options={{...ChartInitOptions,...ChartOptionMiniLable}} series={series} type={'bar'} height={130} width={180}/>
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
                    <ReactApexChart options={{...ChartInitOptions,...ChartOptionDetailLable}} series={series} type={'bar'} height={"98%"}></ReactApexChart>
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
