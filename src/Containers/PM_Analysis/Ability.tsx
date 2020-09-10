import React, {useCallback, useEffect, useState} from 'react'
import moment from "moment";
import Styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";
import {API_URLS, getAbilityList} from "../../Api/pm/analysis";
import {API_URLS as URLS_MAP} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";

const chartOption = {
    chart: {
        height: 350,
        type: 'area',
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
    colors: ['#ffffff', '#bfbfbf55'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: ['straight', "smooth", 'straight', 'straight'],
        dashArray: [0, 0, 10, 10],
        width: 3
    },
    fill:{
        type: ['solid', 'solid','gradient', 'gradient'],
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
        }
    },
    yaxis:{
        tickAmount: 24,
        labels:{
            formatter: (value, index) => {
                if(index === 24){
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
        max: 300,
        min: 90,
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

const AbilityContainer = () => {
    const [data, setData] = React.useState<IPressAbilityData>({
        pressPk: '',
        pressName: '',
        excess_count: '',
        x_degree: [],
        y_capacity: [],
        y_ton: []
    })
    const [pk, setPk] = React.useState()
    const [series, setSeries] = React.useState([{name: 'basic', type: 'line', data: [[0,0]]}])

    const [selectComponent, setSelectComponent] = useState<string>('');

    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
    })

    const getData = useCallback(async ()=>{

        console.log('ap')

        const tempUrl = `${API_URLS['ability'].load}?pk=${selectComponent}&fromDate=${selectDateRange.start}&toDate=${selectDateRange.end}`
        const resultData = await getAbilityList(tempUrl);

        console.log(resultData)
        setData(resultData);

        let dummylineList: number[][] = []
        let dummyroundList: { type: string, name: string, data: number[][], color?: string }[] = []

        resultData.x_degree.map((v,i) => {
            console.log(v)
            dummylineList.push([Number(v), Number(resultData.y_capacity[i])])
            return null
        })

        console.log(dummylineList)
        resultData.info_list.map((v, i) => {
            let dummyroundListTmp: number[][] = []
            let errorList: number[][] = []
            resultData.x_degree.map((v, j) => {
                dummyroundListTmp.push([Number(v), Number(resultData.info_list[i].y_ton[j])])
                return null
            })
            dummyroundList.push({type: 'area', data: dummyroundListTmp, name: v.date, color: v.excess_status === "0" ? 'rgba(25, 185, 223, 0.5)' : 'rgba(255, 0, 0, 0.5)' })
        })

        setSeries([{type: 'line', name: 'data', data: [[]]}, {name: 'basic', type: 'line', data: dummylineList}, ...dummyroundList])

        // setSeries()

    },[data, selectComponent, selectDateRange])

    useEffect(() => {
        if(selectComponent){
            getData()
        }
    }, [selectComponent, selectDateRange])

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
                        <p style={{textAlign: "left", fontSize: 13, fontWeight:'bold', color: 'red'}}>능력선도 초과 횟수 : {data.excess_count ? data.excess_count : 0}회</p>
                    </div>
                    <div style={{marginRight: 30, paddingTop: 25, }}>
                        <CalendarDropdown selectRange={selectDateRange} onClickEvent={(start, end) => {
                            setSelectDateRange({start, end: !end ? selectDateRange.end : end})
                        }} type={'range'}/>
                    </div>
                </div>
                <div style={{marginTop: 60}}>
                    <ReactApexChart options={chartOption} type={'line'} height={400} series={series}/>
                </div>
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
    .apexcharts-tooltip{
        color: #000000;
    }
`

export default AbilityContainer
