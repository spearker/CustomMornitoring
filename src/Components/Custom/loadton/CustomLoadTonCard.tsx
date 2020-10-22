import React, { useEffect, useState } from 'react';
import Styled from "styled-components";
import Chart from "react-apexcharts";
import { YOUDONG_LOAD_MONITOR_DATA_TYPE } from "../../../Common/@types/youdong";

interface IProps {
  color: number
  styles?: any
  propData: YOUDONG_LOAD_MONITOR_DATA_TYPE | undefined
  tonnage_limit: number
}

const basicData = [
  { data: [ 1 ], color: 'gray', name: '능률곡선' },
  { data: [ 0 ], color: '#fb9e70', name: 'Total' },
  { data: [ 0 ], color: '#3ad8c5', name: 'Ch1' },
  { data: [ 0 ], color: '#5145c6', name: 'Ch2' }
]

// 로드톤 모니터링
const CustomLoadTon = ({ color, propData, tonnage_limit, styles }: IProps) => {
  const colorList = [ '#3ad8c5', '#f86b00', '#2760ff', '#fbde00', '#8c29ff' ]
  const [ datum, setDatum ] = useState([
    { data: propData?.capacity_point, color: 'gray', name: '능률곡선' },
    { data: propData?.total_ton_point, color: '#fb9e70', name: 'Total' },
    { data: propData?.ch1_ton_point, color: '#3ad8c5', name: 'Ch1' },
    { data: propData?.ch2_ton_point, color: '#5145c6', name: 'Ch2' }
  ]);
  useEffect(() => {
    setDatum([
      { data: propData?.capacity_point, color: 'gray', name: '능률곡선' },
      { data: propData?.total_ton_point, color: '#fb9e70', name: 'Total' },
      { data: propData?.ch1_ton_point, color: '#3ad8c5', name: 'Ch1' },
      { data: propData?.ch2_ton_point, color: '#5145c6', name: 'Ch2' }
    ])
  }, [ propData ])

  const options = {
    series: propData ? datum : basicData,
    colors: [ colorList[color] ],
    grid: {
      show: false
    },
    chart: {
      type: 'area',
      offsetY: 30,
      toolbar: {
        show: false,
      },
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
      width: 2
    },
    markers: {
      size: 0
    },
    xaxis: {
      show: true,
      position: 'bottom',
      rotateAlways: true,
      min: propData ? propData.x_axis_scope.from : 0,
      max: propData ? propData.x_axis_scope.to : 0,
      labels: {
        show: true,
        offsetY: 10,
        formatter: (value: number, _, index: number) => {
          return value
        },
        style: {
          fontSize: '32px',
          color: '#30dfdf',
        }
      },
      type: 'numeric',
      tickAmount: propData ? 10 : 1,
      axisBorder: {
        show: true,
      }
    },
    yaxis: {
      show: true,
      opposite: true,
      type: 'numeric',
      tickAmount: tonnage_limit / 100,
      axisTicks: {
        show: true
      },
      min: propData ? propData?.y_axis_scope.from : 0,
      max: propData ? propData?.y_axis_scope.to : 0,
      labels: {
        show: true,
        formatter: (value) => {
          return Math.floor(value)
        },
        style: {
          fontSize: '36px',
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
        y: tonnage_limit,
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
      } ],
    },
  }

  return (
      <div style={{
        width: '98%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <CharBox>
          <Chart options={options} series={options.series} type="area" width={'75%'} height={'auto'}/>
        </CharBox>
      </div>
  )
}

const CharBox = Styled.div`
    color: black !important;
    margin-left: 20px;
    width: 100%;
`


export default CustomLoadTon;
