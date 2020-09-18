import React, {useEffect, useState} from 'react';
import Styled from 'styled-components'
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts'

// 프래스 모니터링
const CmsStatistics : React.FunctionComponent = () => {
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);
    const [series, setSeries] = useState<object[]>([])
    const [selection, setSelection] = useState<string>()
    const [color, setColor] = useState<string[]>(['#717c90', "#25b4b4", "#fd6b00", "#2760ff", "#fc9b00"])

    useEffect(() => {
        setSeries(dataSet.cmsSeries)
        setIsFirstLoad(false)
    },[])

    /*
    * updateData
    * */
    const updateData = (timeline) =>  {
        setSelection(timeline)

        switch (timeline) {
            case 'day':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    ["2020-01-01",
                    "2020-01-02"]
                )
                break
            case 'month':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    ['2020-01-01', '2020-02-01']
                )
                break
            case 'year':
                ApexCharts.exec(
                    'area-datetime',
                    'zoomX',
                    ['2020-01-01', '2021-01-01']
                )
                break
            default:
        }

    }



    return(
            <div style={{ position: 'relative', marginTop: 13, display: 'flex'}}>
                  <div style={{backgroundColor: '#2b2c3b', width: 690,  paddingTop: 10, paddingBottom:10, borderRadius: 8}}>
                    <div style={{margin: 25}}>
                        <div style={{ marginBottom: 13, width: 250, textAlign: 'left'}}>
                            <p style={{fontFamily: 'NotoSansCJKkr-Bold', fontSize: 20}}>전체 전력 사용량</p>
                        </div>
                        <div>

                            <div style={{display: "flex"}}>
                                <div style={{flex: 1,borderRadius: 8, width: 300, height: 160, background: '#191d27', marginRight: 40}}>
                                    <div style={{
                                        width: "100%", height: 50, backgroundColor: '#3eb852',
                                        borderTopLeftRadius:8,
                                        borderTopRightRadius:8,
                                        lineHeight:3
                                    }}>
                                        <p style={{verticalAlign: 'middle'}}>전일 전체 사용량</p>
                                    </div>

                                    <div style={{width: "100%"}}>
                                        <table style={{width: "100%"}}>
                                            <tr>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'left', marginLeft: 20}}>사용률</p>
                                                </td>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'right', marginRight: 20}}>{dataSet.cmsPower.yesterday.percent} %</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'left', marginLeft: 20}}>전류량</p>
                                                </td>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'right', marginRight: 20}}>{dataSet.cmsPower.yesterday.ampere} A</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                                <div style={{flex: 1, borderRadius: 8, width: 300, height: 160, background: '#191d27'}}>
                                    <div style={{
                                        width: "100%", height: 50, backgroundColor: '#0d8bea',
                                        borderTopLeftRadius:8,
                                        borderTopRightRadius:8,
                                        lineHeight:3
                                    }}>
                                        <p>금일 전체 사용량</p>
                                    </div>

                                    <div style={{width: "100%"}}>
                                        <table style={{width: "100%"}}>
                                            <tr>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'left', marginLeft: 20}}>사용률</p>
                                                </td>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'right', marginRight: 20}}>{dataSet.cmsPower.today.percent} %</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'left', marginLeft: 20}}>전류량</p>
                                                </td>
                                                <td style={{width: "50%", height: 50}}>
                                                    <p style={{textAlign: 'right', marginRight: 20}}>{dataSet.cmsPower.today.ampere} A</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: 28, marginBottom: 10, width: 250, textAlign: 'left'}}>
                            <p style={{fontFamily: 'NotoSansCJKkr-Bold', fontSize: 20}}>장비별 전력 사용량</p>
                        </div>
                        <div style={{width: 640, height: 457, backgroundColor: '#191d27', borderRadius: 6, color: 'black !important', paddingTop: 30}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{marginLeft: 20}}>
                                    <p>2020.01.01</p>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 20}}>
                                    <button style={{ width: 40, height: 20, border: 0}} onClick={() => updateData('day')}>
                                        <p style={{textAlign: 'center'}}>일별</p>
                                    </button>
                                    <button style={{ width: 40, height: 20, border: 0, marginLeft: 10}} onClick={() => updateData('month')}>
                                        <p style={{textAlign: 'center'}}>월별</p>
                                    </button>
                                    <button style={{ width: 40, height: 20, border: 0, marginLeft: 10}} onClick={() => updateData('year')}>
                                        <p style={{textAlign: 'center'}}>년별</p>
                                    </button>
                                </div>
                            </div>
                            <CharBox>
                            <Chart
                                options={{
                                    chart: {
                                        id: 'area-datetime',
                                        type: 'area',
                                        toolbar: {
                                            show: false
                                        },
                                    },
                                    xaxis: {
                                        type: 'datetime',
                                        min: '2020-01-01',
                                        tickAmount: 12,
                                        labels: {
                                            style: {
                                                colors: "#ffffff",
                                                fontSize: 12,
                                            }
                                        }
                                    },
                                    yaxis: {
                                        max: 240,
                                        min: 0,
                                        tickAmount: 4,
                                        labels: {
                                            style: {
                                                colors: "#ffffff",
                                                fontSize: 12,
                                            }
                                        },
                                        axisTicks: {
                                            offsetY: 50
                                        }
                                    },
                                    annotations: {
                                        yaxis: [{
                                            y: dataSet.cmsPower.average,
                                            borderColor: '#30dfdf',
                                            borderWidth: 2,
                                            label: {
                                                show: true,
                                                text: '평균',
                                                style: {
                                                    color: '#30dfdf',
                                                    background: 'rgba(0,0,0,0)'
                                                }
                                            }
                                        }],
                                    },
                                    colors: ['#717c90', "#25b4b4", "#fd6b00", "#2760ff", "#fc9b00"],
                                    grid: {
                                        show: true,
                                        borderColor: "#a0a0a0",
                                        xaxis: {lines: {show: true}},
                                        yaxis: {lines: {show: true}}
                                    },
                                }}
                                width={595}
                                height={326}
                                series={series}
                                />
                            </CharBox>

                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: '#2b2c3b', width: 390, height: 783, paddingTop: 10, borderRadius: 8, marginLeft: 20}}>
                    <div style={{marginTop: 30, width: 150, fontSize: 20, marginLeft: 20, marginBottom: 10}}>
                        <p>현재 전력 사용량</p>
                    </div>

                    {
                        series.length > 0 &&
                        series.map((i: any, index) => {
                          return (
                          <div style={{width: 340, height: 120, borderRadius: 6, backgroundColor: '#191d27', marginBottom: 20, marginLeft: 20}}>
                              <div style={{display: "flex"}}>
                                  <div style={{width: 180, height: 120}}>
                                      <div>
                                          <p style={{marginTop: 10, fontSize: 15}}>{i.name ? i.name : ''}</p>
                                      </div>
                                      <div>
                                          <table style={{width: "100%"}}>
                                              <tr>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'left', marginLeft: 20, fontSize: 15}}>사용률</p>
                                                  </td>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'right', marginRight: 20, fontSize: 15}}>{i.percent} %</p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'left', marginLeft: 20, fontSize: 15}}>전류량</p>
                                                  </td>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'right', marginRight: 20, fontSize: 15}}>{i.ampere} A</p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </div>
                                  </div>
                                  <CharBox>
                                      <Chart
                                          options={{
                                              chart: {
                                                  id: 'area-datetime',
                                                  type: 'area',
                                                  toolbar: {
                                                      show: false
                                                  },
                                              },
                                              xaxis: {
                                                  type: 'datetime',
                                                  min: '2020-01-01',
                                                  tickAmount: 11,
                                                  labels: {
                                                      style: {
                                                          colors: "#ffffff",
                                                          fontSize: 5,
                                                      }
                                                  }

                                              },
                                              yaxis: {
                                                  max: 240,
                                                  min: 0,
                                                  tickAmount: 4,
                                                  labels: {
                                                      style: {
                                                          colors: "#ffffff",
                                                          fontSize: 5,
                                                      }
                                                  },
                                              },
                                              colors: [color[index]],
                                              grid: {
                                                  show: true,
                                                  borderColor: "#a0a0a0",
                                                  xaxis: {lines: {show: true}},
                                                  yaxis: {lines: {show: true}}
                                              },
                                              annotations: {
                                                  yaxis: [{
                                                      y: dataSet.cmsPower.average,
                                                      borderColor: '#30dfdf',
                                                      borderWidth: 2,

                                                      label: {
                                                          show: true,
                                                          style: {
                                                              color: '#30dfdf',
                                                              stroke:'rgba(0,0,0,0)',
                                                              strokeWidths: 0,
                                                              background: 'rgba(0,0,0,0)',
                                                              borderColor:'rgba(0,0,0,0)',
                                                          }
                                                      }
                                                  }],
                                              },

                                          }}
                                          width={160}
                                          height={110}
                                          series={[i]}
                                      />
                                  </CharBox>
                              </div>
                          </div>)
                        })
                    }
                </div>


            </div>
    )

}

const CharBox = Styled.div` 
    color: black !important;
`

export default CmsStatistics;
