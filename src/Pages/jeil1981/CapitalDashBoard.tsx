import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getCapacityTimeData} from "../../Api/pm/analysis";
import tempImage from "../../Assets/Images/temp_machine.png"
import NoDataCard from "../../Components/Card/NoDataCard";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import jeilpress1 from "../../Assets/Images/jeilpress1.jpeg"
import jeilpress2 from "../../Assets/Images/jeilpress2.jpeg"
import jeilpress3 from "../../Assets/Images/jeilpress3.jpeg"
import jeilpress4 from "../../Assets/Images/jeilpress4.jpeg"
import jeilpress5 from "../../Assets/Images/jeilpress5.jpeg"

const ChartInitOptions = {
    chart: {
        type: 'bar',
        toolbar: {
            tools: {
                download: false
            }
        },
        events: {
            click: function (chart, w, e) {
                console.log(chart, w, e)
            },
            beforeMount: (chartContext, config) => {
                console.log(chartContext, config)
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
            stops: [0, 90, 100]
        }
    },
    colors: ['#dd4bbe'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            formatter: (i) => {
                return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "개"
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

const pressDummyCapital = [
    [0,0,0,0,0,0,0,0,2200,2373,2469,2267,1028,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2300,2441,2450,2342,1138,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2100,2082,2120,2267,1104,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2500,2723,2639,2567,1308,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1900,2077,2259,1967,939,0,0,0,0,0,0,0,0,0,0,0]
]

const MachineInitData: IPressCapacity = {
    manufacturer_code:'',
    machine_name: '',
    machine_ton: '',
    analyze:{
        times: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
        productions: []
    }
}

const CapitalDashBoard = () => {
    const times: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    const [series, setSeries] = useState<{ name: string, data: number[], max: number }[]>([{name: "value1", data: MachineInitData.analyze.productions, max: 0}])
    const [pressList, setPressList] = useState<IPressMachineType[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('')
    const [index,setIndex] = useState<number>(0)
    const [machineData, setMachineData] = useState<IPressCapacity>(MachineInitData);

    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))

    const [max, setMax] = useState<number>(20000)

    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async()=>{

        setMachineData({"manufacturer_code":"P2007123","analyze":{"times":["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","24"],"productions":[0,2400,2376,2399,2367,2338,2221,1995,1813,1949,1894,1795,1896,1880,1720,1708,1741,1814,1973,1978,1914,1792,1412,0]},"machine_name":"테스트 프레스","machine_ton":"100"})

        let tmp: number[] = []
        times.map((v, i) => {
            let listIndex = ({"manufacturer_code":"P2007123","analyze":{"times":["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","24"],"productions":[0,2400,2376,2399,2367,2338,2221,1995,1813,1949,1894,1795,1896,1880,1720,1708,1741,1814,1973,1978,1914,1792,1412,0],"total_productions":43375},"machine_name":"테스트 프레스","machine_ton":100}).analyze.times.indexOf(v)
            if(listIndex !== -1){
                tmp.push(({"manufacturer_code":"P2007123","analyze":{"times":["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","24"],"productions":pressDummyCapital[index],"total_productions":43375},"machine_name":"테스트 프레스","machine_ton":100}).analyze.productions[listIndex])
            }else{
                tmp.push(0)
            }
        })
        console.log(tmp)

        let tmpMax = maxData(Math.max.apply(null, tmp))

        setSeries([{name: '생산량', data:tmp, max: tmpMax }])
    },[selectMachine, machineData, series, selectDate,index]);

    const getList = useCallback(async () => {
        // const tempUrl = `${API_URLS['pressList'].list}`
        // const resultData = await getCapacityTimeData(tempUrl);
        // console.log(resultData)
        setPressList([{"manufacturer_code":"P000001","pk":"v1_SIZL_machine_1_null_1","machine_name":"프레스 1호기","machine_ton":160,"machine_img":jeilpress1},{"manufacturer_code":"P000002","pk":"v1_SIZL_machine_2_null_1","machine_name":"프레스 2호기","machine_ton":80,"machine_img":jeilpress2},{"manufacturer_code":"P000003","pk":"v1_SIZL_machine_3_null_1","machine_name":"프레스 3호기","machine_ton":110,"machine_img":jeilpress3},{"manufacturer_code":"P000004","pk":"v1_SIZL_machine_4_null_1","machine_name":"프레스 4호기","machine_ton":45,"machine_img":jeilpress4},{"manufacturer_code":"P000005","pk":"v1_SIZL_machine_5_null_1","machine_name":"프레스 5호기","machine_ton":250,"machine_img":jeilpress5}])

    }, [])

    const maxData = (x) => {
        return (x%10000)?x-x%10000+10000:x+10000
    }

    useEffect(()=>{
        getList()
        // getData()
    },[])

    useEffect(()=>{
        getData()
    },[selectMachine, selectDate])

    useEffect(()=>{
        getData()
    },[index])

    return (
        <DashboardWrapContainer index={'analysis'}>
            <InnerBodyContainer>
        <div>
            <div style={{marginTop:42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: "bold", textAlign: "left"}}>프레스 생산량</p>
            </div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>프레스 선택</p>
                </div>
                {pressList !== undefined && pressList.length === 0 ? (<p style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가 없습니다. </p></p>) :
                    pressList.map((v, i) => {
                        console.log(series[0])
                        if(selectMachine === v.pk){
                            return(<ChartBorderMiniBox>
                                <div style={{width: 114, height: 100, marginLeft: 8, display: "inline-block", float: "left" , paddingTop: 10}}>
                                    <img src={v.machine_img ? v.machine_img : tempImage} style={{width: 114, height: 104, objectFit: 'cover'}}/>
                                </div>
                                <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 21}}>
                                    <p style={{fontWeight: 'bold', textAlign: "left"}}>{v.machine_name + "(" + v.machine_ton+"t)"}</p>
                                    <p style={{ textAlign: "left"}}>{v.manufacturer_code}</p>
                                </div>
                            </ChartBorderMiniBox>)
                        }else{
                            return(<ChartMiniBox onClick={() => {setSelectMachine(v.pk);setIndex(i)}}>
                                <div style={{width: 114, height: 100, marginLeft: 8, display: "inline-block", float: "left", paddingTop: 10}}>
                                    <img src={v.machine_img ? v.machine_img : tempImage} style={{width: 114, height: 104, objectFit: 'cover'}}/>
                                </div>
                                <div style={{width: 150,height: 100, float: 'left', display: "inline-block", marginTop: 10, marginLeft: 21}}>
                                    <p style={{fontWeight: 'bold', textAlign: "left"}}>{v.machine_name + "(" + v.machine_ton+"t)"}</p>
                                    <p style={{ textAlign: "left"}}>{v.manufacturer_code}</p>
                                </div>
                            </ChartMiniBox>)
                        }
                    })
                }
                {
                    machineData.machine_name !== '' && <div>

                    </div>
                }
            </ChartListBox>
            {
                selectMachine !== ''
                    ? <ChartDetailBox>
                        <div style={{marginTop: 25, paddingBottom: 23}}>
                            <div>
                                <div style={{float: "left", display: "inline-block"}}>
                                    <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>{machineData.machine_name}</p>
                                </div>
                                {/*<CalendarDropdown type={'single'} select={selectDate} onClickEvent={async (i) => setSelectDate(i)}></CalendarDropdown>*/}
                            </div>
                        </div>
                        <div style={{width: 640, height: 619, backgroundColor: '#111319', margin: 0, padding: 0, clear: 'both', marginTop: 20}}>
                            <ReactApexChart options={{
                                ...ChartInitOptions,
                                yaxis: {
                                    min: 0,
                                    max: Math.round(Math.max.apply(null, series[0].data)*1.1)+100,
                                    tickAmount: 25,
                                    labels:{
                                        formatter:(value,index) => {
                                            if(Math.round(value) === Math.round(Math.max.apply(null, series[0].data)*1.1)+100){
                                                return "(생산량)"
                                            }else{
                                                if(index%5 === 0){
                                                    return Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                }else{
                                                    return
                                                }
                                            }

                                        }
                                    }
                                }
                            }} series={series} type={'bar'} height={"98%"}></ReactApexChart>
                        </div>
                    </ChartDetailBox>
                    : <ChartDetailBox>
                        <NoDataCard contents={'기계를 선택해 주세요'} height={684} color={'#353b48'}/>
                    </ChartDetailBox>
            }
        </div>
            </InnerBodyContainer>
        </DashboardWrapContainer>
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
    overflow-y:scroll;
`

const ChartDetailBox = Styled.div`
    display: inline-block;
    width: 640px;
    height: 724px;
    padding: 0 25px 0 25px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
    margin-left: 20px;
    .apexcharts-tooltip{
        color: black;
    }
`

const ChartMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    margin-bottom: 20px;
    img{
        object-fit: resize;
    }
`

const ChartBorderMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    border: 4px solid #19b9df;
    margin-bottom: 20px; 
`

export default CapitalDashBoard
