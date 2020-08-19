import React, {useCallback, useEffect, useState} from 'react'
import moment from "moment";
import IMG_TIME from "../../Assets/Images/img_timeline.png";
import IMG_KEY from "../../Assets/Images/img_time_key_error.png";
import Styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import ListRadioButton from "../../Components/Button/ListRadioButton";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getAbilityList, getOilSupplyData} from "../../Api/pm/statistics";
import {API_URLS as URLS_MAP} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";
import NoDataCard from "../../Components/Card/NoDataCard";

const chartOption = {
    chart: {
        type: 'area',
        height: 350,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
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
        max: 120,
        tickAmount: 24,
        labels:{
            show: true,
            formatter: (value) => {
                if(value > 60) {
                    return
                }else{
                    if(value % 10 === 0){
                        return Math.floor(value)
                    }else{
                        return
                    }
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
    const [pk, setPk] = React.useState('v1_JNHPRESS_machine_5_null_1')

    const [selectComponent, setSelectComponent] = useState<string>('');

    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['oilSupply'].load}?pk=${selectComponent}`
        const resultData = await getOilSupplyData(tempUrl);
        console.log(resultData)
        setData(resultData);

    },[data, pk, selectComponent])


    useEffect(() => {
        getData()
    },[selectComponent])

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
                        <div style={{height: 60}}>
                            <div className={"itemDiv"} style={{float: "left", display: "inline-block"}}>
                                <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold', width: "50%"}}>{data.pressName} &nbsp; &nbsp; &nbsp; 평균 오일공급 시간</p>
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
    margin-top: 20px;
    .itemDiv{
        height: 40px;
        width: 50%;
        p{
            font-size: 20px;
            font-weight: bold;
            padding-Top: 20px;
            text-Align: left;
            margin-left: 20px;
        }
    }
`

export default OilSupplyContainer
