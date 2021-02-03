import React from 'react'
import Styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import { YOUDONG_LOAD_MONITOR_DATA_TYPE } from '../../../../Common/@types/youdong'

const Container = Styled.div(() => ({
  width: '100%',
  height: '100%'
}))

const COLOR_LIST = [ '#3ad8c5', '#f86b00', '#2760ff', '#fbde00', '#8c29ff' ]

interface Props {
  color: number
  styles?: any
  propData: YOUDONG_LOAD_MONITOR_DATA_TYPE | undefined
  tonnage_limit: number
  overTonCheck: () => number | boolean
}

const ONLY_VIEW = [
  { data: [ 1 ], color: 'gray', name: '능률곡선' },
  { data: [ 0 ], color: '#fb9e70', name: 'Total' },
  { data: [ 0 ], color: '#3ad8c5', name: 'Ch1' },
  { data: [ 0 ], color: '#5145c6', name: 'Ch2' },
  { data: [ 0 ], color: '#b43788', name: '제품 평균 그래프' }
]


const PMV2DashboardChart: React.FunctionComponent<Props> = ({ color, propData, overTonCheck, tonnage_limit, styles }) => {
  const [ data, setData ] = React.useState<any>({
    capacity: [],
    y: {
      min: 0,
      max: 0
    },
    x: {
      min: 0,
      max: 0
    }
  })

  const [ options, setOptions ] = React.useState({
    series: ONLY_VIEW,
    colors: [ COLOR_LIST[color] ],
    grid: {
      show: false
    },
    tooltip: {
      enabled: true
    },
    chart: {
      type: 'area',
      // offsetY: 30,
      // offsetX: 150,
      toolbar: {
        show: false
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.7,
        opacityTo: 0.15,
        stops: [ 0, 70, 100 ]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      dashArray: 0,
      width: 1.8
    },
    markers: {
      size: 0,
      hover: {
        size: undefined
      }
    },
    xaxis: {
      show: true,
      position: 'bottom',
      rotateAlways: true,
      min: data.x.min,
      max: data.x.max,
      labels: {
        show: true,
        formatter: (value: number, _, index: number) => {
          return value
        },
        style: {
          fontSize: '14px',
          color: '#30dfdf'
        }
      },
      type: 'numeric',
      tickAmount: propData ? (data.x.max - data.x.min) / 10 : 1,
      axisBorder: {
        show: true
      }
    },
    yaxis: {
      show: true,
      opposite: true,
      type: 'numeric',
      tickAmount: overTonCheck() ? (data.y.max + 200) / 100 : data.y.max / 100,
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
          fontSize: '14px'
        }
      },
      axisBorder: {
        show: true,
        color: '#78909C'
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
      } ]
    }
  })

  React.useEffect(() => {
    setOptions({
      ...options,
      series: propData ? [
        { data: data.capacity, color: 'gray', name: '능률곡선' },
        { data: propData?.total_ton_point, color: '#fb9e70', name: 'Total' },
        { data: propData?.ch1_ton_point, color: '#3ad8c5', name: 'Ch1' },
        { data: propData?.ch2_ton_point, color: '#5145c6', name: 'Ch2' },
        { data: propData?.criteria_point, color: '#b43788', name: '제품 평균 그래프' }
      ] : ONLY_VIEW,
      xaxis: {
        ...options.xaxis,
        min: data.x.min,
        max: data.x.max,
        tickAmount: propData ? (data.x.max - data.x.min) / 10 : 1
      },
      yaxis: {
        ...options.yaxis,
        tickAmount: overTonCheck() ? (data.y.max + 200) / 100 : data.y.max / 100,
        min: data.y.min,
        max: overTonCheck() ? data.y.max + 200 : data.y.max
      },
      annotations: {
        yaxis: [ {
          ...options.annotations.yaxis[0],
          y: tonnage_limit
        } ]
      }
    })
  }, [ propData, data, tonnage_limit ])

  React.useEffect(() => {
    if (propData) {
      if (propData.capacity_point !== undefined) {
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
            max: Math.round(propData.y_axis_scope.to / 100) * 100
          }
        })
      }
    }
  }, [ tonnage_limit ])


  return (
    <Container>
      <ReactApexChart options={options} series={options.series} type="area"/>
    </Container>
  )
}

export default PMV2DashboardChart
