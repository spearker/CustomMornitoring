import React, {useCallback, useEffect, useState} from 'react'
import moment from "moment";
import IMG_TIME from "../../Assets/Images/img_timeline.png";
import IMG_KEY from "../../Assets/Images/img_time_key_error.png";
import Styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import ListRadioButton from "../../Components/Button/ListRadioButton";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getPowerList} from "../../Api/pm/statistics";

const chartOption = {
    chart: {
        height: 350,
        type: 'area',
        toolbar: false,
    },
    colors: ['#dd4bbe', '#5145c6', '#158bdc', '#fb9e70', '#08d05f', '#f65f61', '#d8bf00'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    yaxis:{
        max: 500,
        min: 0,
        tickAmount: 25,
        labels: {
            formatter: (value) => {
                if(value === 500){
                    return "(KW)"
                }else{
                    if(value % 100 === 0){
                        return value
                    }else{
                        return
                    }
                }
            }
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.58,
            opacityTo: 0,
            stops: [0, 90, 100]
        }
    },
    legend:{
        position: 'bottom',
        horizontalAlign: "left",
        align: "horizontal"
    },
    grid:{
        borderColor: "#42444b",
        yaxis: {
            lines: {
                show: true
            }
        },
        xaxis: {
            lines: {
                show: true
            }
        }
    },
    tooltip: {
        enable:false
    }

}

const dummySeries= [
    {
        name: 'series1',
        data: [200, 240, 405, 340, 300, 385, 310, 280, 220,150, 400, 360, 200]
    },
    {
        name: 'series2',
        data: [200,  405, 340, 300, 385, 310,400, 280, 220,150, 360, 240, 200]
    },
    {
        name: 'series3',
        data: [200, 240, 405, 340, 450,380, 310, 280, 220,150, 400, 360, 200]
    },
    {
        name: 'series4',
        data: [200, 240, 405, 350, 300, 385, 310, 280, 220,150, 400, 360, 200]
    },
    {
        name: 'series5',
        data: [200, 240, 420, 340, 300, 385, 310, 280, 220,150, 400, 360, 200]
    }
]

const PowerContainer = () => {

    const [data, setData] = useState()
    const [pk, setPk] = useState()

    const [selectDate, setSelectDate] = useState({start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})
    const [selectType, setSelectType] = useState([true, false])

    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['power'].list}?startDate=${selectDate.start}&endDate=${selectDate.end}`
        const resultData = await getPowerList(`/v1/statistics/press/loadton?date=${selectDate.start}`);
        console.log(resultData)

    },[data, pk])

    useEffect(() => {
        getData()
    }, [selectDate])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>

                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>프레스 전력</span>
                </div>
            </div>
            <BlackContainer>
                <div style={{marginTop: 25, height: 80}}>
                    <div>
                        <div className={"itemDiv"} style={{float: "left", display: "inline-block"}}>
                            <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>기간별 프레스 전력 비교</p>
                        </div>
                        <div style={{marginRight: 30, paddingTop: 25, }}>
                            <CalendarDropdown type={'range'} selectRange={selectDate} onClickEvent={(start, end) => setSelectDate({start: start, end: end ? end : ''})}></CalendarDropdown>
                            <ListRadioButton nameList={["월", "일"]} data={selectType} onClickEvent={(i) => {
                                    if(i === 0){
                                        setSelectType([true,false])
                                    }else{
                                        setSelectType([false, true])
                                    }
                            }}/>
                        </div>
                    </div>
                </div>
                <ReactApexChart options={chartOption} type={'area'} height={620} series={dummySeries}/>
            </BlackContainer>
        </div>
    );
}

const BlackContainer = Styled.div`
    width: 1100px;
    height: 740px;
    background-color: #111319;
    border-radius: 6px;
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

export default PowerContainer
