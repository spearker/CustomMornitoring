import React, { useEffect, useState } from 'react';
import Styled from "styled-components";
import Chart from "react-apexcharts";

interface IProps {
  color: number
  styles?: any
  propData: IPressLoadTonMachineData | undefined
}

const basicData = [
  { data: [ 1 ], color: 'gray', name: '능률곡선' },
  { data: [ 0 ], color: '#fb9e70', name: 'Total' },
  { data: [ 0 ], color: '#3ad8c5', name: 'Ch1' },
  { data: [ 0 ], color: '#5145c6', name: 'Ch2' }
]

// 로드톤 모니터링
const CustomLoadTon = ({ color, propData, styles }: IProps) => {
  const colorList = [ '#3ad8c5', '#f86b00', '#2760ff', '#fbde00', '#8c29ff' ]
  const [ datum, setDatum ] = useState([
    { data: propData?.capacity, color: 'gray', name: '능률곡선' },
    { data: propData?.total_ton, color: '#fb9e70', name: 'Total' },
    { data: propData?.ch1_ton, color: '#3ad8c5', name: 'Ch1' },
    { data: propData?.ch2_ton, color: '#5145c6', name: 'Ch2' }
  ]);

  useEffect(() => {
    setDatum([
      { data: propData?.capacity, color: 'gray', name: '능률곡선' },
      { data: propData?.total_ton, color: '#fb9e70', name: 'Total' },
      { data: propData?.ch1_ton, color: '#3ad8c5', name: 'Ch1' },
      { data: propData?.ch2_ton, color: '#5145c6', name: 'Ch2' }
    ])
  }, [ propData ])

  console.log('@@@@@@@@@@@@propData.capacity@@@@@', propData)

  const options = {
    series: propData ? datum : basicData,
    colors: [ colorList[color] ],
    grid: {
      show: false
    },
    chart: {
      type: 'area',
      height: 650,
      toolbar: {
        show: false,
      },
      events: {
        // beforeZoom: (e, { xaxis }) => {
        //   console.log(e, xaxis)
        //   if (xaxis.min < 0 || xaxis.max > 360) {
        //     return {
        //       xaxis: {
        //         min: 0,
        //         max: 360
        //       }
        //     }
        //   }
        // }
      },
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
        stops: [ 0, 90, 100 ]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    markers: {
      size: 0
    },
    xaxis: {
      show: true,
      position: 'bottom',
      rotateAlways: true,
      min: 120,
      max: 200,
      labels: {
        show: true,
        formatter: (value: number, _, index: number) => {
          return value
        }
      },
      type: 'numeric',
      tickAmount: 10,
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      show: true,
      opposite: true,
      type: 'numeric',
      tickAmount: propData ? Number(propData.capacity.length) / 10 : 10,
      axisTicks: {
        show: true
      },
      min: 0,
      labels: {
        show: true,
        formatter: (value) => {
          return Math.floor(value)
        }
      },
      axisBorder: {
        show: true,
        color: '#78909C',
      }
    },
    legend: {
      show: false
    },
    annotations: {
      yaxis: [ {
        // y: propData ? propData?.limited_ton : 0,
        y: propData ? propData.limited_ton : 0,
        borderColor: '#ff0000',
        borderWidth: 2, //limit 값으로 변
        label: {
          show: true,
          text: 'limit',
          style: {
            align: 'right',
            color: '#ff0000',
            background: 'rgba(0,0,0,0)'
          }
        }
      } ],
    },
  }

  return (
      <div>
        <div>
          <div style={{
            width: '98%',
            boxShadow: '1px 19px 55px -21px rgba(0,0,0,0.28);'
          }}>
            <CharBox>
              <Chart options={options} series={options.series} type="area" height={1250}/>
            </CharBox>
          </div>
        </div>
      </div>
  );
}

const CharBox = Styled.div`
    color: black !important;
    margin-left: 20px;
    border: 1px solid rgba(255, 255, 255, .3);
    width: 100%;
    border-radius: 8px;
`

const TitleText = Styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 20;
`


export default CustomLoadTon;
