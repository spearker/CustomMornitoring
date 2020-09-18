import React, {useCallback, useEffect, useState} from 'react'
import moment from "moment";
import Styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getOilSupplyData} from "../../Api/pm/statistics";
import {API_URLS as URLS_MAP} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";
import NoDataCard from "../../Components/Card/NoDataCard";

const chartOption = {
    chart: {
        type: 'area',
        height: 350,
        toolbar: {
            show: true,
            tools: {
                download: false,
                selection: true,
                zoom: false,
                zoomin: true,
                zoomout: true,
            }
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'stepline',
        width: 2
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.35,
            opacityTo: 0,
        }
    },
    xaxis: {
        tickAmount: 10,
        labels: {
            formatter: (v, datatime, index) => {
                console.log(index)
                return v
            }
        }

    },
    grid:{
        borderColor: "#42444b",
        xaxis:{
            lines: {
                show: true
            }
        },
        yaxis:{
            lines: {
                show: true
            }
        }
    },
    yaxis: {
        min: 0,
        max: 3,
        tickAmount: 3,
        labels:{
            show: true,
            formatter: (value, index) => {
                if(index===3){
                    return
                }else if(index===0){
                    return
                }
                if(value === 1) {
                    return 'off'
                }else{
                    return 'on'
                }
            }
        },
    },
    legend: {
       show: false
    },
    tooltip: {
        enable:false
    }
}

const dummyData: IPressOilSupplyData = {
    pressPk:"dummyPK1",
    pressName: "프레스 01",
    insert_oil_time: {
        Xaxis: [0, 28, 29, 30, 1, 2, 3, 4, 0],
        Yaxis: [58, 55, 55, 60, 57, 58, 60, 55, 56 ],
    }
}

const OilSupplyContainer = () => {
    const [data, setData] = React.useState<IPressOilSupplyData>()
    const [date, setDate] = React.useState<string>(moment().format('YYYY-MM-DD'))

    const [selectComponent, setSelectComponent] = useState<string>('');

    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['oilSupply'].load}?pk=${selectComponent}&date=${date}`
        console.log(tempUrl)
        const resultData = await getOilSupplyData(tempUrl);
        let XaxisData = resultData.insert_oil_time.Xaxis

        XaxisData[XaxisData.length -1] = ("(일/day)")

       setData({
            ...resultData,
            insert_oil_time: {
                ...resultData.insert_oil_time,
                Xaxis: XaxisData
            }
        });

    },[data, selectComponent, date])


    useEffect(() => {
        getData()
    },[selectComponent, date])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>

                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>프레스 오일 공급</span>
                </div>
            </div>
            <MapBoard
                type={1}//0: 모니터링 1:통계/분석
                url={URLS_MAP.press.statics}
                select={selectComponent} //pk
                onChangeEvent={setSelectComponent}
            />
            {
                data
                    ?<BlackContainer>
                        <div style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div className={"itemDiv"} style={{float: "left", display: "inline-block"}}>
                                <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold', width: "50%"}}>{data.pressName} &nbsp; &nbsp; &nbsp; 평균 오일공급 시간</p>
                            </div>
                            <div style={{marginBottom: 30}}>
                                <CalendarDropdown select={date} type={'single'} onClickEvent={(e) => setDate(e)}/>
                            </div>
                        </div>
                        <ReactApexChart options={{...chartOption, labels: [...data.insert_oil_time.Xaxis]}} type={'area'} height={414} series={[{name: "data", data:data.insert_oil_time.Yaxis}]}/>
                    </BlackContainer>
                    : <NoDataCard contents={"기계를 선택해 주세요"} height={504}/>
            }
        </div>
    );
}

const BlackContainer = Styled.div`
    width: 1100px;
    height: 504px;
    background-color: #111319;
    border-radius: 6px;
    padding-left: 10px;
    margin-top: 20px;
    .itemDiv{
        height: 40px;
        width: 100%;
        p{
            font-size: 20px;
            font-weight: bold;
            padding-Top: 20px;
            text-Align: left;
        }
    }
    .apexcharts-tooltip{
        color: black;
    }
`

export default OilSupplyContainer
