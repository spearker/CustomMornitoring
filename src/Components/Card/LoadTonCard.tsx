import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled from "styled-components";
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts'
import {dataSet} from "../../Common/dataset";

interface power {
    percent: number
    ampere: number
}

interface dataType {
    today: power,
    yesterday: power
}

interface IProps {
    title: string
    color: number
    limit: number
    propData: IPressLoadTonMachineData | undefined
}


// 로드톤 모니터링
const LoadTonCard = ({title, color, limit, propData}: IProps) => {
    // const [series, setSeries] = useState([{
    //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // }])
    const colorList = ['#3ad8c5', '#f86b00', '#2760ff', '#fbde00', '#8c29ff']
    const [datum, setDatum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0]);
    const options = {
        series: [{
            data: datum,
        }],
        colors: [colorList[color]],
        grid:{
          show: false
        },
        chart: {
            height: 170,
            type: 'area',
            // animations: {
            //     enabled: true,
            //     easing: 'linear',
            //     dynamicAnimation: {
            //         speed: 500
            //     }
            // },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 1
        },
        markers: {
            size: 0
        },
        xaxis: {
            show: false,
            labels:{
                show: false,
            },
            tickAmount: 10,
            range: 19,
            axisBorder:{
                show: false
            }
        },
        yaxis: {
            show: false,
            max: 300,
            min: 0,
            axisBorder:{
                show: true,
                color: '#78909C',
            }
        },
        legend: {
            show: false
        },
        annotations: {
            yaxis: [{
                y: 120,
                borderColor: '#ff0000',
                borderWidth: 2, //limit 값으로 변
                label: {
                    show: true,
                    text: 'limit',
                    style: {
                        align: 'left',
                        color: '#ff0000',
                        background: 'rgba(0,0,0,0)'
                    }
                }
            }],
        },
    }

    useEffect(() => {
        console.log(color)
        const interval = setInterval(() => {
            const num = Math.floor(Math.random()*5)
            // setDatum(datum => datum.slice(1, datum.length).concat(num))
            setDatum(dataSet.LoadTonChartData[num])
        }, 1000)
        return () => {
            clearInterval(interval)
        };
    }, [])

    return (
        <div style={{height: 403, width: 329, backgroundColor: '#f4f6fa', borderRadius: 6, margin: 13}}>
            <div style={{width: "100%", height: 92, backgroundColor: '#28aeae', borderTopRightRadius: 8, borderTopLeftRadius: 8}}>
                <div style={{paddingTop: 11, paddingLeft: 10}}>
                    <TitleText style={{fontSize: 25}}>{title}</TitleText>
                    <TitleText style={{fontSize: 20}}>{propData?.capacity}ton</TitleText>
                </div>
            </div>
            <div style={{width: "100%", height: 220, paddingLeft: 2, paddingRight: 3}}>
                <div style={{borderWidth: 1, borderColor: 'white'}}>
                    <CharBox>
                        <Chart options={options} series={options.series} type="area" height={220} />
                    </CharBox>
                </div>
            </div>
            <div style={{width: "100%", height: 96, backgroundColor: '#d1d1d1', borderBottomRightRadius: 8, borderBottomLeftRadius: 8, display: 'flex'}}>
                <div style={{width: "100%", borderRightWidth: 1, borderColor:'white'}}>
                    <table style={{width: "100%", fontSize: 20, marginTop: 20, color: "black"}}>
                        <tr>
                            <td colSpan={2} style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20}}>Total</p>
                            </td>
                            <td colSpan={2} style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'right', marginRight: 20, fontWeight:"bold"}}>{propData?.total_loadton}t</p>
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20}}>CH1 (좌)</p>
                            </td>
                            <td style={{height: 23}}>
                                <RightBorderBox>
                                    <p style={{textAlign: 'right', fontWeight:"bold", marginRight: 15}}>{propData?.ch1_loadton}t</p>
                                </RightBorderBox>
                            </td>
                            <td style={{height: 23, borderLeft: 1, borderLeftWidth: 1}}>
                                <p style={{textAlign: 'left', marginLeft: 15}}>CH2 (우)</p>
                            </td>
                            <td style={{height: 23}}>
                                <p style={{textAlign: 'right', fontWeight:"bold", marginRight: 20}}>{propData?.ch2_loadton}t</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    );
}

const CharBox = Styled.div`
    color: black !important;
    background-color: #111319;
    width: 324px;
    margin-top:1px;
`

const RightBorderBox = Styled.div`
    border-right: 1px solid black;
    border-color: #707070;
`

const TitleText = Styled.p`
    text-align: center;
    font-weight: bold;
`

export default LoadTonCard;
