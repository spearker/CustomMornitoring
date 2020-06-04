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

interface Props {
    title: string,
    color: number,
    propData: dataType | undefined
    limit: number
}


// 로드톤 모니터링
const LoadTonCard: React.FunctionComponent<Props> = ({title, color, propData, limit}) => {
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
            id: 'realtime',
            height: 170,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 500
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        // stroke: {
        //     curve: 'smooth'
        // },
        markers: {
            size: 0
        },
        xaxis: {
            show: false,
            tickAmount: 10,
            range: 19
        },
        yaxis: {
            show: false,
            max: 100,
            min: 0
        },
        legend: {
            show: false
        },
        annotations: {
            yaxis: [{
                y: limit,
                borderColor: '#ff0000',
                borderWidth: 3,
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
        <div style={{height: 320, width: 340, backgroundColor: '#191d27', borderRadius: 8, margin: 10}}>
            <div style={{width: "100%", height: 40, backgroundColor: '#28aeae', borderTopRightRadius: 8, borderTopLeftRadius: 8}}>
                <div style={{paddingTop: 8, paddingLeft: 10}}>
                    <p style={{textAlign: "left"}}>{title}</p>
                </div>
            </div>
            <div style={{width: "100%", height: 220}}>
                <div style={{borderWidth: 1, borderColor: 'white'}}>
                    <CharBox>
                        <Chart options={options} series={options.series} type="line" height={220} />
                    </CharBox>
                </div>
            </div>
            <div style={{width: "100%", height: 60, backgroundColor: '#717c90', borderBottomRightRadius: 8, borderBottomLeftRadius: 8, display: 'flex'}}>
                <div style={{width: "50%", borderRightWidth: 1, borderColor:'white'}}>
                    <table style={{width: "100%"}}>
                        <tr>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20, fontSize: 13}}>사용률</p>
                            </td>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'right', marginRight: 20, fontSize: 13}}>{propData?.today.percent} %</p>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20, fontSize: 13}}>전류량</p>
                            </td>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'right', marginRight: 20, fontSize: 13}}>{propData?.today.ampere} A</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{width: "50%"}}>
                    <table style={{width: "100%"}}>
                        <tr>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20, fontSize: 13}}>사용률</p>
                            </td>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'right', marginRight: 20, fontSize: 13}}>{propData?.yesterday.percent} %</p>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20, fontSize: 13}}>전류량</p>
                            </td>
                            <td style={{width: "50%", height: 23}}>
                                <p style={{textAlign: 'right', marginRight: 20, fontSize: 13}}>{propData?.yesterday.ampere} A</p>
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
`

export default LoadTonCard;
