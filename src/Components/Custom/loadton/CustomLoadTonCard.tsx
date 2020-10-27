import React, { useEffect, useState } from 'react';
import Styled from "styled-components";
import Chart from "react-apexcharts";
import { YOUDONG_LOAD_MONITOR_DATA_TYPE } from "../../../Common/@types/youdong";

interface IProps {
  color: number
  styles?: any
  propData: YOUDONG_LOAD_MONITOR_DATA_TYPE | undefined
  tonnage_limit: number
  overTonCheck: () => number | boolean
}

const basicData = [
  { data: [ 1 ], color: 'gray', name: '능률곡선' },
  { data: [ 0 ], color: '#fb9e70', name: 'Total' },
  { data: [ 0 ], color: '#3ad8c5', name: 'Ch1' },
  { data: [ 0 ], color: '#5145c6', name: 'Ch2' }
]

// 로드톤 모니터링
const CustomLoadTon = ({ color, propData, overTonCheck, tonnage_limit, styles }: IProps) => {
  const [ data, setData ] = useState<any>({
    capacity: [],
    y: {
      min: 0,
      max: 0
    },
    x: {
      min: 0,
      max: 0
    }
  });

  useEffect(() => {
    console.log('propData@@@@@@@@@@@@@@@@@@propData')

    if (propData) {
      setData({
        ...data,
        capacity: propData.capacity_point,
        x: {
          ...data.x,
          min: Math.floor(propData.x_axis_scope.from / 10) * 10,
          max: Math.round(propData.x_axis_scope.to / 10) * 10
        },
        y: {
          ...data.y,
          min: propData.y_axis_scope.from,
          max: propData.y_axis_scope.to
        }
      })
    }
  }, [ tonnage_limit ])


  const colorList = [ '#3ad8c5', '#f86b00', '#2760ff', '#fbde00', '#8c29ff' ]
  const [ datum, setDatum ] = useState([
    { data: data.capacity, color: 'gray', name: '능률곡선' },
    { data: propData?.total_ton_point, color: '#fb9e70', name: 'Total' },
    { data: propData?.ch1_ton_point, color: '#3ad8c5', name: 'Ch1' },
    { data: propData?.ch2_ton_point, color: '#5145c6', name: 'Ch2' }
  ]);
  useEffect(() => {
    setDatum([
      { data: data.capacity, color: 'gray', name: '능률곡선' },
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
      offsetX: 150,
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
        stops: [ 0, 70, 100 ]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    markers: {
      size: 0
    },
    xaxis: {
      show: true,
      position: 'bottom',
      rotateAlways: true,
      min: data.x.min,
      max: data.x.max,
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
      tickAmount: propData ? (data.x.max - data.x.min) / 10 : 1,
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
      min: data.y.min,
      max: overTonCheck() ? data.y.max + 200 : data.y.max,
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
        width: '100%',
      }}>
        <CharBox>
          <Chart options={options} series={options.series} type="area" width={'90%'} height={'auto'}/>
        </CharBox>
      </div>
  )
}

const CharBox = Styled.div`
    color: black !important;
    width: 100%;
`


export default CustomLoadTon;
