import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, POINT_COLOR_2,SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import {pressSt}from '../../Common/dummydataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST, PM_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, postRequest } from '../../Common/requestFunctions';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import InfoTable from '../../Components/Table/InfoTable';
import { machineCodeToName } from '../../Common/codeTransferFunctions';
import Chart from 'react-apexcharts'
import moment from 'moment';
import MonitoringDropdown from '../../Components/Dropdown/MonitoringDropdown';
import BasicBigDropdown from '../../Components/Dropdown/BasicBigDropdown';
import DotPagenation from "../../Components/Pagenation/DotPagenation";
import ReactShadowScroll from "react-shadow-scroll";

interface date {
    start?: string
    finish?: string
}

const PressStatistics = () => {
  const [list, setList] = useState<IBarcode[]>([]);
  const [option, setOption] = useState(0);
  const [keyword, setKeyword] = useState<string>('');
  const dateArray = ['','','','','','','','','','','',''];
  const monthArray = dateArray.map((v, i)=>{
    return(
      moment().subtract(i, 'month').format('MM')
    )
  }).reverse();

  const timeArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);
  const dayArray = dateArray.map((v, i)=>{
    return(
      moment().subtract(i, 'days').format('MM.DD')
    )
  }).reverse();

  const [series, setSeries] = useState<object[]>([])
  const [selection, setSelection] = useState<string>()
  const [color, setColor] = useState<string[]>(['#717c90', "#25b4b4", "#fd6b00", "#2760ff", "#fc9b00"])
    const [page, setPage] = useState<number>(1)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [date, setDate] = useState<date>({
        start: undefined,
        finish: undefined
    })

  useEffect(() => {
      if(optionList[option]){
        setSeries(pressSt.machine[0])
      }
      //setSeries(pressSt.cmsSeries)
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
                ["2020-05-01",
                "2020-06-02"]
            )
            break
        case 'month':
            ApexCharts.exec(
                'area-datetime',
                'zoomX',
                ['2020-05-01', '2020-06-01']
            )
            break
        case 'year':
            ApexCharts.exec(
                'area-datetime',
                'zoomX',
                ['2020-05-01', '2021-06-01']
            )
            break
        default:
    }

}

  const option_timeperproduce = {
    series: [
      {
        name: "Today",
        data: ['0','0','0','0','0','0','0','0','10','18','20','49','32','11','20','30','20','9','0','0','0','0','0','0','0']
      },
      {
        name: "Yesterday",
        data: ['0','0','0','0','0','0','0','0','8','11','19','34','27','8','27','30','15','11','10','0','0','0','0','0','0']
      }
    ],
    options: {
      chart: {
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [POINT_COLOR, POINT_COLOR_2+'97'],
      dataLabels: {
        enabled: true,
      },
      grid: {
        borderColor: '#e7e7e760',
        row: {
          colors: [BG_COLOR_SUB2, 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: timeArray,
        title: {
          text: 'time'
        }
      },
      yaxis: {
        title: {
          text: 'percent'
        },
        min: 0,
        max: 100
      },

    },

  }


  const option_price = {

    series: [{
      name: '',
      data: [62.9, 66.3, 67.3, 65.3, 69.2, 70.1, 70.3, 70.6, 72.2, 73.3, 74.3, 74.9]
    }],
    options: {
      chart: {
        type: 'area',

        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      labels:[62.9, 66.3, 67.3, 65.3, 69.2, 70.1, 70.3, 70.6, 72.2, 73.3, 74.3, 74.9],


      xaxis: {
        categories: monthArray,
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },


  };


  const optionList = [
    "SPM", "메인모터전류","슬라이드전류","생산량","VS","로드톤","온도","가동률",
  ]

    const setDateFunc = (key: string, dateItem: string) => {
      setDate({
          ...date,
          [key]: dateItem
      })
    }



  return (
      <DashboardWrapContainer index={'statistics'}>
        <SubNavigation list={PM_MENU_LIST.statistics}/>
        <InnerBodyContainer>
            <div style={{position:'relative', textAlign:'left', marginTop:48}}>

                <div style={{display:'inline-block', textAlign:'left'}}>
                  <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>프레스 통계</span>
                </div>
            </div>
            <div style={{width: "100%", height: 86, backgroundColor: '#353b48', marginTop: 20, borderRadius: 6, paddingTop: 14}}>
                <div style={{alignItems: "center", display: "flex", flexDirection: 'row', width: 1020, marginLeft: 'auto', marginRight: 'auto'}}>
                {
                    optionList.map((item, index) => {
                        if(index <= (6*page)-1 && index >= (6*page)-6){
                            return (
                                <div
                                    style={{
                                        width: 150, height: 32, backgroundColor: option === index ? '#19b9df' : '#b3b3b3', alignItems: 'center',
                                        borderRadius: 6, margin: 10
                                    }}
                                    onClick={() => setOption(index)}
                                >
                                    <div style={{width: "100%", color: 'black'}}>{item}</div>
                                </div>
                            )
                        }else{
                            return
                        }

                    })
                }
                </div>
                <DotPagenation stock={optionList.length%6 === 0 ? Math.floor(optionList.length/6) : Math.floor(optionList.length/6)+1} selected={page} onClickEvent={(e) => setPage(e)}></DotPagenation>
            </div>
            <div style={{ position: 'relative', marginTop: 13, display: 'flex'}}>
                  <div style={{backgroundColor: '#353b48', width: 690,  paddingTop: 10, paddingBottom:10, borderRadius: 8}}>
                    <div style={{margin: 25}}>

                        <div style={{marginTop: 28, marginBottom: 30, width: 640, textAlign: 'left', display: 'flex', justifyContent: 'space-between'}}>
                            <p style={{fontFamily: 'NotoSansCJKkr', fontWeight: 'bold', fontSize: 20}}>{optionList[option]} 통계</p>
                            <div style={{width: 290, height: 30, borderRadius: 6, backgroundColor: '#b3b3b3', display: 'flex', flexDirection: 'row'}}
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                <div style={{width: 60, paddingLeft: 10}}><p style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>통계기간</p></div>
                                <div style={{width: 180}}><p style={{fontSize: 15, color: 'black'}}>{
                                    date.start === ''
                                    ? date.start+"-"+date.finish
                                    : "기간을 선택해 주세요"
                                }</p></div>
                                <div style={{width: 40}}></div>
                            </div>
                        </div>
                        <div style={{width: 640, height: 457, backgroundColor: '#111319', borderRadius: 6, color: 'black !important', paddingTop: 30}}>

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
                                        min: '2020-05-25',
                                        tickAmount: 12,
                                        labels: {
                                            style: {
                                                colors: "#ffffff",
                                                fontSize: 12,
                                            }
                                        }
                                    },
                                    yaxis: {
                                        max: pressSt.total[option].ymax,
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
                                            y: pressSt.total[option].average,
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
                                width={640}
                                height={427}
                                series={pressSt.machine[option]}
                                />
                            </CharBox>

                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <span>기간 단위</span>
                            <form>
                                <input style={{margin: 10}} type={"radio"}/>분
                                <input style={{margin: 10}} type={"radio"}/>시
                                <input style={{margin: 10}} type={"radio"}/>일
                                <input style={{margin: 10}} type={"radio"}/>주
                                <input style={{margin: 10}} type={"radio"}/>월
                            </form>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: '#353b48', width: 390, height: 783, paddingTop: 10, borderRadius: 8, marginLeft: 20}}>
                    <ReactShadowScroll
                        scrollColor="#17181c"
                        scrollColorHover="#2A2D34"
                        shadow="0 2px 4px rgba(23, 24, 28, 0.2) inset, 0 -2px 4px rgba(0, 0, 0, 0.2) inset"
                    >

                    {
                           pressSt.machine[option].length > 0 &&
                           pressSt.machine[option].map((i: any, index) => {
                          return (
                          <div style={{width: 340, height: 120, borderRadius: 6, backgroundColor: '#111319', marginTop: 20, marginLeft: 20}}>
                              <div style={{display: "flex"}}>
                                  <div style={{width: 180, height: 120}}>
                                      <div>
                                          <p style={{marginTop: 10, fontSize: 15}}>{i.name ? i.name : ''}</p>
                                      </div>
                                      <div>
                                          <table style={{width: "100%"}}>
                                              <tr>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'left', marginLeft: 20, fontSize: 15}}>측정값</p>
                                                  </td>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'right', marginRight: 20, fontSize: 15}}>{i.value}</p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'left', marginLeft: 20, fontSize: 15}}>평균</p>
                                                  </td>
                                                  <td style={{width: "50%", height: 30}}>
                                                      <p style={{textAlign: 'right', marginRight: 20, fontSize: 15}}>{i.average}</p>
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
                                                  min: '2020-05-01',
                                                  tickAmount: 11,
                                                  labels: {
                                                      style: {
                                                          colors: "#ffffff",
                                                          fontSize: 5,
                                                      }
                                                  }

                                              },
                                              yaxis: {
                                                  max: pressSt.total[option].ymax,
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
                                                      y: pressSt.total[option].average,
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
                    </ReactShadowScroll>
                </div>


            </div>

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`

const ChartBox = Styled.div`

  flex: 1;
  background-color: ${BG_COLOR_SUB};
  text-align: left;
  margin-right: 16px;
  padding: 22px 24px 11px 11px;
  color: black !important;
  border-radius: 5px;
  -webkit-box-shadow: 1px 19px 55px -21px rgba(0,0,0,0.28); 
  -moz-box-shadow: 1px 19px 55px -21px rgba(0,0,0,0.28);
  box-shadow: 1px 19px 55px -21px rgba(0,0,0,0.28);
  

`

const ChartHeadText = Styled.p`
  margin-left: 18px;
  font-size: 18px;
  color: white;
`
const CharBox = Styled.div` 
    color: black !important;
`

export default PressStatistics;
