import React, { useEffect, useState } from 'react';
import Styled from "styled-components";
import Chart from "react-apexcharts";

interface power {
  percent: number
  ampere: number
}


interface IProps {
  color: number
  styles?: any
  propData: IPressLoadTonMachineData | undefined
}


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

  const options = {
    series: datum,
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
        beforeZoom: (e, { xaxis }) => {
          console.log(e, xaxis)
          if (xaxis.min < 0 || xaxis.max > 360) {
            return {
              xaxis: {
                min: 0,
                max: 360
              }
            }
          }
        }
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
      curve: 'straight',
      width: 1
    },
    markers: {
      size: 0
    },
    xaxis: {
      show: false,
      rotateAlways: true,
      min: 120,
      max: 200,
      labels: {
        show: false,
        formatter: (value: number, _, index: number) => {
          return value
        }
      },
      type: 'numeric',
      tickAmount: 360,
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      show: true,
      opposite: true,
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
        y: propData?.limited_ton,
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
          <div
              style={{ width: '90%', ...styles, display: 'flex' }}>
            <div style={{
              width: '80%',
              boxShadow: '1px 19px 55px -21px rgba(0,0,0,0.28);'
            }}>
              <CharBox>
                <Chart options={options} series={options.series} type="area" height={750}/>
              </CharBox>
            </div>
            <div style={{
              width: "20%",
              borderBottomRightRadius: 8,
              borderBottomLeftRadius: 8,
              display: 'flex',
              position: 'absolute',
              right: 0
            }}>
              <div style={{ width: "100%", borderRightWidth: 1, borderColor: 'white' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>Total</p>
                  <TitleText>{Number(propData?.total_maxTon).toFixed(2)}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>최소 각도</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>최대 각도</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH1 (좌)</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH1 (우)</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH2 (좌)</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH2 (우)</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                  width: '80%',
                  marginBottom: 40
                }}>
                  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>일률</p>
                  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>
                </div>
                {/*<div style={{*/}
                {/*  display: 'flex',*/}
                {/*  justifyContent: 'space-between',*/}
                {/*  alignItems: 'center',*/}
                {/*  margin: '0 auto',*/}
                {/*  width: '80%',*/}
                {/*  marginBottom: 40*/}
                {/*}}>*/}
                {/*  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH1 (우)</p>*/}
                {/*  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>*/}
                {/*</div>*/}
                {/*<div style={{*/}
                {/*  display: 'flex',*/}
                {/*  justifyContent: 'space-between',*/}
                {/*  alignItems: 'center',*/}
                {/*  margin: '0 auto',*/}
                {/*  width: '80%',*/}
                {/*  marginBottom: 40*/}
                {/*}}>*/}
                {/*  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH1 (우)</p>*/}
                {/*  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>*/}
                {/*</div>*/}
                {/*<div style={{*/}
                {/*  display: 'flex',*/}
                {/*  justifyContent: 'space-between',*/}
                {/*  alignItems: 'center',*/}
                {/*  margin: '0 auto',*/}
                {/*  width: '80%',*/}
                {/*  marginBottom: 40*/}
                {/*}}>*/}
                {/*  <p style={{ textAlign: 'left', marginLeft: 20, fontSize: 28 }}>CH1 (우)</p>*/}
                {/*  <TitleText>{propData?.ch1_maxTon ? Number(propData.ch1_maxTon).toFixed(1) + ' t' : '-'}</TitleText>*/}
                {/*</div>*/}
              </div>
            </div>
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
    font-size: 32px;
`


export default CustomLoadTon;
