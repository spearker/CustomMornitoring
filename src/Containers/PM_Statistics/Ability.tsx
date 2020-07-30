import React, {useCallback, useState} from 'react'
import moment from "moment";
import IMG_TIME from "../../Assets/Images/img_timeline.png";
import IMG_KEY from "../../Assets/Images/img_time_key_error.png";
import Styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import ListRadioButton from "../../Components/Button/ListRadioButton";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getAbilityList} from "../../Api/pm/statistics";

const chartOption = {
    chart: {
        height: 350,
        type: 'area',
        toolbar: false,
    },
    colors: ['#bfbfbf', 'rgba(25, 185, 223, 0.5)'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: ['straight', "smooth"],
        dashArray: [0, 10],
        width: 2
    },
    yaxis:{
        max: 240,
        min: 0,
        tickAmount: 24,
        labels:{
            formatter: (value, timestamp, index) => {
                if(value === 240){
                    return "(ton)"
                }else{
                    if(value % 50 === 0){
                        return Math.floor(value)
                    }else{
                        return
                    }
                }
            }
        },
        tooltip: {
            enable: false
        }
    },
    xaxis: {
        type: 'numeric',
        tickAmount: 24,
        labels:{
            formatter: (value, timestamp, index) => {
                if(value === 120){
                    return "(mm)"
                }else{
                    if(value % 10 === 0){
                        return Math.floor(value)
                    }else{
                        return
                    }
                }
            }
        },
        tooltip: {
            enable: false
        }
    },
    legend:{
        show: false
    },
    grid:{
        show: true,
        borderColor:'#42444b',
        yaxis: {
            lines:{
                show: true
            }
        },
        xaxis: {
            lines:{
                show: true
            }
        }
    },
    tooltip: {
        enable:false
    },

}

const dummyData: IPressAbilityData = {
    pressPk:"pk01",
    basic_ability: {
        Xaxis: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        Yaxis: [210, 210, 105, 60, 50, 45, 43, 43, 42, 41, 40, 40, 40],
    },
    avg_ability: {
        Xaxis: [1,2,3],
        Yaxis: [0,210,0],
    },
    max_tone: "50"
}

const AbilityContainer = () => {
    const [data, setData] = React.useState<IPressAbilityData>(dummyData)
    const [pk, setPk] = React.useState()

    const [selectDate, setSelectDate] = useState(moment().format("YYYY-MM-DD"))

    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['ability'].load}?pk=${pk}&date=${selectDate}`
        const resultData = await getAbilityList(tempUrl);
        setData(dummyData);

    },[data, pk])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>

                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>프레스 능력</span>
                </div>
            </div>
            <MapFlexBox>
                <MapBox>
                    <div style={{width:100, height: 40,color: "black", backgroundColor: 'skyblue'}}
                         onClick={() => {

                         }}
                    >프레스1</div>
                </MapBox>
            </MapFlexBox>
            <BlackContainer>
                <div>
                    <div className={"itemDiv"} style={{float: "left", display: "inline-block"}}>
                        <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>프레스 01</p>
                    </div>
                    <div style={{marginRight: 30, paddingTop: 25, }}>
                        <CalendarDropdown type={'single'} select={selectDate} onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                    </div>
                </div>
                <ReactApexChart options={chartOption} type={'line'} height={400} series={[
                    {type: 'line', data: [[0,210], [5,210], [10,110], [15,60], [20,55], [25, 50], [30, 45], [35, 43], [40, 42], [45,41],[50,40],[120,39]]},
                    {type: 'area', data: [[1, 0], [7, 150], [13, 0]]}
                ]}/>
            </BlackContainer>
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

export default AbilityContainer
