import React, {useCallback, useEffect, useState} from 'react'
import moment from "moment";
import Styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getAbilityList} from "../../Api/pm/statistics";
import {API_URLS as URLS_MAP} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";

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
        Xaxis: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 120],
        Yaxis: [210, 210, 110, 60, 55, 50, 45, 43, 42, 41, 40, 39],
    },
    avg_ability: {
        Xaxis: [1,7,13],
        Yaxis: [0 ,150,0],
    },
    max_tone: "50"
}

const AbilityContainer = () => {
    const [data, setData] = React.useState<IPressAbilityData>(dummyData)
    const [pk, setPk] = React.useState("v1_JNHPRESS_machine_5_null_1")
    const [series, setSeries] = React.useState([{type: 'line', data: [[0,0]]}])

    const [selectComponent, setSelectComponent] = useState<string>('');

    const [selectDate, setSelectDate] = useState(moment().format("YYYY-MM-DD"))

    const getData = useCallback(async ()=>{

        const tempUrl = `${API_URLS['ability'].load}?pk=${pk}&date=${selectDate}`
        // const resultData = await getAbilityList(tempUrl);

        console.log(data)
        setData(dummyData);

        let dummylineList: number[][] = []
        let dummyroundList: number[][] = []

        dummyData.basic_ability.Xaxis.map((v,i) => {
            dummylineList.push([v, dummyData.basic_ability.Yaxis[i]])
        })

        dummyData.avg_ability.Xaxis.map((v, i) => {
            dummyroundList.push([v, dummyData.avg_ability.Yaxis[i]])
        })

        setSeries([{type: 'line', data: dummylineList}, {type: 'area', data: dummyroundList}])

        // setSeries()

    },[data, pk])

    useEffect(() => {
        getData()
    }, [])

    // useEffect(() => {
    //     const {Yaxis} = data.basic_ability;
    //     let tempSeries: number[][] = [[]];
    //     data.basic_ability.Xaxis.map((v, i) => {
    //         if (v) {
    //             tempSeries.push([v, Yaxis[i]])
    //         }
    //     });
    //     setSeries()
    // }, [data])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>

                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>프레스 능력</span>
                </div>
            </div>
            <MapBoard
                type={1}//0: 모니터링 1:통계/분석
                url={URLS_MAP.press.statics}
                select={selectComponent} //pk
                onChangeEvent={setSelectComponent}
            />
            <BlackContainer>
                <div>
                    <div className={"itemDiv"} style={{float: "left", display: "inline-block"}}>
                        <p style={{textAlign: "left", fontSize: 20, fontWeight:'bold'}}>프레스 01</p>
                    </div>
                    <div style={{marginRight: 30, paddingTop: 25, }}>
                        <CalendarDropdown type={'single'} select={selectDate} onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                    </div>
                </div>
                <ReactApexChart options={chartOption} type={'line'} height={400} series={series}/>
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
