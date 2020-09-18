import React, {useEffect, useState} from 'react';
import Styled from "styled-components";
import Chart from "react-apexcharts";

interface power {
    percent: number
    ampere: number
}

interface dataType {
    today: power,
    yesterday: power
}

interface IProps {
    color: number
    propData: IPressLoadTonMachineData | undefined
}


// 로드톤 모니터링
const LoadTonCard = ({color, propData}: IProps) => {
    // const [series, setSeries] = useState([{
    //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // }])
    const colorList = ['#3ad8c5', '#f86b00', '#2760ff', '#fbde00', '#8c29ff']
    const [datum, setDatum] = useState([
        {data: propData?.capacity, color: 'gray', name: '능률곡선'},
        {data: propData?.total_ton, color: '#fb9e70', name: 'Total'},
        {data: propData?.ch1_ton, color: '#3ad8c5', name: 'Ch1'},
        {data: propData?.ch2_ton, color: '#5145c6', name: 'Ch2'}
    ]);

    useEffect(() => {
        setDatum([
            {data: propData?.capacity, color: 'gray', name: '능률곡선'},
            {data: propData?.total_ton, color: '#fb9e70', name: 'Total'},
            {data: propData?.ch1_ton, color: '#3ad8c5', name: 'Ch1'},
            {data: propData?.ch2_ton, color: '#5145c6', name: 'Ch2'}
        ])
    }, [propData])

    const options = {
        series: datum,
        colors: [colorList[color]],
        grid:{
          show: false
        },
        chart: {
            height: 170,
            type: 'area',
            toolbar: {
                    show: false,
            },
            // events : {
            //     beforeZoom : (e, {xaxis}) => {
            //         console.log(e, xaxis)
            //         if(xaxis.min < 0 || xaxis.max > 360){
            //             return {
            //                 xaxis: {
            //                     min: 0,
            //                     max: 360
            //                 }
            //             }
            //         }
            //     }
            // },
            // toolbar: {
            //     show: true,
            //     tools: {
            //         download: false,
            //         selection: true,
            //         zoom: false,
            //         zoomin: true,
            //         zoomout: true,
            //     }
            // },
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 0,
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
            min: 90,
            max: 230,
            labels:{
                show: false,
            },
            type: 'numeric',
            tickAmount: 360,
            axisBorder:{
                show: false
            }
        },
        yaxis: {
            show: false,
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
                y: propData?.limited_ton,
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

    return (
        <div style={{height: 403, width: 329, backgroundColor: '#f4f6fa', borderRadius: 6, margin: 13}}>
            <div style={{width: "100%", height: 92, backgroundColor: '#28aeae', borderTopRightRadius: 8, borderTopLeftRadius: 8}}>
                <div style={{paddingTop: 11, paddingLeft: 10}}>
                    <TitleText style={{fontSize: 25}}>{propData?.machine_name}</TitleText>
                    <TitleText style={{fontSize: 20}}>{Number(propData?.limited_ton).toFixed(2)}ton</TitleText>
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
                                <p style={{textAlign: 'right', marginRight: 20, fontWeight:"bold"}}>{Number(propData?.total_maxTon).toFixed(2)}t</p>
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: 23}}>
                                <p style={{textAlign: 'left', marginLeft: 20, fontSize: 13}}>CH1 (좌)</p>
                            </td>
                            <td style={{height: 23}}>
                                <RightBorderBox>
                                    <p style={{textAlign: 'right', fontWeight:"bold", marginRight: 15}}>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1)+' t' : '-'}</p>
                                </RightBorderBox>
                            </td>
                            <td style={{height: 23, borderLeft: 1, borderLeftWidth: 1}}>
                                <p style={{textAlign: 'left', marginLeft: 15, fontSize: 13}}>CH2 (우)</p>
                            </td>
                            <td style={{height: 23}}>
                                <p style={{textAlign: 'right', fontWeight:"bold", marginRight: 20}}>{propData?.ch2_maxTon ? Number(propData.ch2_maxTon).toFixed(1)+' t' : '-'}</p>
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
    fontSize: 15px;
`

const TitleText = Styled.p`
    text-align: center;
    font-weight: bold;
`

export default LoadTonCard;
