import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
import NoDataCard from '../../Components/Card/NoDataCard'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import {API_URLS as URLS_MAP} from '../../Api/pm/map'
import MapBoard from '../../Components/Map/MapBoard'
import {API_URLS, getAnalysisReadyTime} from '../../Api/pm/analysis'

const ChartInitOption = {
  chart: {
    width: '40%',
    type: 'pie',
    events: {
      click: (event, chartContext, config) => {
        console.log(event, chartContext, config)
      }
    }
  },
  labels: ['가동시간', '전원 Off', '금형교체주기', '에러', '비가동시간'],
  colors: [POINT_COLOR, 'rgba(98, 29, 167, .7 )', '#397485', '#ff341a', 'gray'],
  title: {
    style: {color: 'white', fontSize: 20},
    text: ''
  },
  dataLabels: {
    style: {
      fontSize: 20,
    },
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex]
      return [name, val.toFixed(1) + '%']
    }
  },
  legend: {
    show: false
  },
  stroke: {
    show: false,
    width: 2,
    dashArray: 0
  }
}

const MachineInitData = {
  manufacturer_code: '',
  machine_name: '',
  machine_ton: '',
  analyze: {
    power_off: 0,
    power_off_time: '',
    runtime: 0,
    runtime_time: '',
    downtime: {
      total: 0,
      total_time: '',
      error: 0,
      error_time: '',
      qdc: 0,
      qdc_time: ''
    }
  }
}

const PMReadyTimeContainer = () => {
  const [series, setSeries] = useState<number[]>([])
  const [chartOption, setChartOption] = useState(ChartInitOption)

  const [selectComponent, setSelectComponent] = useState<string>('')

  const [machineData, setMachineData] = useState<IPressReadyTimeAnalysis>()

  const [selectDate, setSelectDate] = useState<string>(moment().subtract(1, 'days').format('YYYY-MM-DD'))

  /**
   * getData()
   * 비가동 시간 분석 데이터 로드
   * @param {string} pk 프레스 pk
   * @param {string} data 요청 날짜
   * @returns X
   */
  const getData = useCallback(async () => {
    const tempUrl = `${API_URLS['readyTime'].load}?pk=${selectComponent}&date=${selectDate}`
    const resultData = await getAnalysisReadyTime(tempUrl)

    if (typeof resultData.analyze.downtime.qdc !== 'number') {
      // //alert('[SERVER ERROR] qdc time error')
      return
    }


    setSeries([
      resultData.analyze.runtime,
      resultData.analyze.power_off,
      resultData.analyze.downtime.qdc,
      resultData.analyze.downtime.error,
      resultData.analyze.downtime.total - (resultData.analyze.downtime.qdc + resultData.analyze.downtime.error)
    ])
    // resultData.analyze.downtime.total - (resultData.analyze.downtime.qdc + resultData.analyze.downtime.error)])
    setMachineData(resultData)
  }, [machineData, series, chartOption, selectComponent, selectDate])

  useEffect(() => {
    if (selectComponent !== '') {
      getData()
    }
  }, [selectComponent, selectDate])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>

        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 20}}>
          <span style={{fontSize: 20, fontWeight: 'bold', marginRight: 18, marginLeft: 3}}>비가동시간 통계</span>
        </div>
      </div>
      <MapBoard
        type={1}//0: 모니터링 1:통계/분석
        url={URLS_MAP.press.statics}
        select={selectComponent} //pk
        onChangeEvent={setSelectComponent}
      />
      {
        selectComponent ? machineData ? machineData.analyze.power_on_time === '00:00:00' ? <TimeLineBox>
            <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{width: '49%'}}>
                <p style={{paddingLeft: 20}}>{machineData.machine_name}</p>
              </div>
              <div style={{width: '50%', marginRight: 10, flexDirection: 'row', display: 'flex'}}>
                <p style={{
                  marginLeft: 20,
                  width: '60%',
                  fontSize: 12,
                  textAlign: 'right',
                  verticalAlign: 'center',
                  marginTop: 5
                }}>오차범위
                  ±0.03%</p>
                <CalendarDropdown type={'single'} select={selectDate}
                                  onClickEvent={(date) => setSelectDate(date)}/>
              </div>
            </div>
            <div style={{
              color: '#666d79',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <p>해당 일자에 가동되지 않은 기계입니다.</p>
            </div>
          </TimeLineBox> : <TimeLineBox>
            <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{width: '49%'}}>
                <p style={{paddingLeft: 20}}>{machineData.machine_name}</p>
              </div>
              <div style={{width: '50%', marginRight: 10, flexDirection: 'row', display: 'flex'}}>
                <p style={{
                  marginLeft: 20,
                  width: '60%',
                  fontSize: 12,
                  textAlign: 'right',
                  verticalAlign: 'center',
                  marginTop: 5
                }}>오차범위
                  ±0.03%</p>
                <CalendarDropdown type={'single'} select={selectDate}
                                  onClickEvent={(date) => setSelectDate(date)}/>
              </div>
            </div>
            <div style={{flex: 1, width: '40%', marginLeft: 20, float: 'left'}}>
              <ReactApexChart options={chartOption} series={series} type="pie"/>
            </div>
            <div style={{flex: 1, float: 'left', marginBottom: 10}}>
              <ItemDataBox>
                <InnerText>
                  <div style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    backgroundColor: POINT_COLOR,
                    float: 'left',
                    marginTop: 8,
                    marginRight: 10,
                  }}/>
                  <TitleText>가동시간</TitleText>
                  <ContentsText>{parseFloat(String(machineData.analyze.runtime)).toFixed(2)}%</ContentsText>
                  <ContentsTime>{machineData.analyze.runtime_time}</ContentsTime>
                </InnerText>
                <div style={{paddingTop: 20,}}>
                  <table style={{height: '100%'}}>
                    <tr>
                      <td style={{width: 85}}>
                        <div>
                          <p style={{fontSize: 20, fontWeight: 'bold'}}>시작 시간</p>
                        </div>
                      </td>
                      <td>
                        <p style={{
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}>{machineData.analyze.powered_on_at}</p>
                      </td>
                    </tr>
                    <tr style={{height: 30}}></tr>
                    <tr>
                      <td>
                        <div>
                          <p style={{fontSize: 20, fontWeight: 'bold'}}>종료 시간</p>
                        </div>
                      </td>
                      <td>
                        <p style={{
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}>{machineData.analyze.powered_off_at}</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </ItemDataBox>
              <ItemDataBox>
                <InnerText>
                  <div style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    backgroundColor: 'grey',
                    float: 'left',
                    marginTop: 8,
                    marginRight: 10,
                  }}/>
                  <TitleText>비가동시간</TitleText>
                  <ContentsText>{parseFloat(String(machineData.analyze.downtime.total)).toFixed(2)}%</ContentsText>
                  <ContentsTime>{machineData.analyze.downtime.total_time}</ContentsTime>
                </InnerText>
                <div style={{paddingTop: 20,}}>
                  <table style={{height: '100%'}}>
                    <tr>
                      <td style={{width: 150}}>
                        <div>
                          <div style={{
                            display: 'inline-block',
                            borderRadius: 8,
                            width: 16,
                            height: 16,
                            backgroundColor: '#397485',
                            float: 'left',
                            marginTop: 8,
                            marginRight: 10,
                          }}/>
                          <p style={{fontSize: 20, fontWeight: 'bold'}}>금형교체주기</p>
                        </div>
                      </td>
                      <td>
                        <p style={{
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}>{machineData.analyze.downtime.qdc.toFixed(2)}%</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>{machineData.analyze.downtime.qdc_time}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <div style={{
                            display: 'inline-block',
                            borderRadius: 8,
                            width: 16,
                            height: 16,
                            backgroundColor: '#ff341a',
                            float: 'left',
                            marginTop: 8,
                            marginRight: 10,
                          }}/>
                          <p style={{fontSize: 20, fontWeight: 'bold'}}>에러</p>
                        </div>
                      </td>
                      <td>
                        <p style={{
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}>{machineData.analyze.downtime.error.toFixed(2)}%</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>{machineData.analyze.downtime.error_time}</td>
                    </tr>
                  </table>
                </div>
              </ItemDataBox>
              <ItemDataBox style={{border: 0}}>
                <InnerText>
                  <div style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    backgroundColor: 'rgba(98, 29, 167, .7 )',
                    float: 'left',
                    marginTop: 8,
                    marginRight: 10,
                  }}/>
                  <TitleText>전원 Off</TitleText>
                  <ContentsText>{parseFloat(String(machineData.analyze.power_off)).toFixed(2)}%</ContentsText>
                  <ContentsTime>{machineData.analyze.power_off_time}</ContentsTime>
                </InnerText>
                <InnerText>
                  <div style={{
                    display: 'inline-block',
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    backgroundColor: 'rgb(255,255,255 )',
                    float: 'left',
                    marginTop: 8,
                    marginRight: 10,
                  }}/>
                  <TitleText>총 작동시간</TitleText>
                  <ContentsText>{machineData.analyze.power_on_time}</ContentsText>
                </InnerText>
              </ItemDataBox>
            </div>
          </TimeLineBox> : <NoDataCard contents={'데이터를 불러오지 못했습니다.'} height={470}/> :
          <NoDataCard contents={'기계를 선택해 주세요'} height={470}/>

      }
    </div>
  )
}

const MapFlexBox = Styled.div`
  display: flex;
  margin-top: 21px;
`

const MapBox = Styled.div`
  background-color: #17181c;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  width: 100%;
  margin-right: 20px;
  img{
    width: 100%;
  }

`

const TitleText = Styled.p`
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
`

const ContentsText = Styled.p`
    text-align: center;
    font-size: 50px;
    font-weight: bold;
`

const ContentsTime = Styled.p`
    margin-left: 5px;
    font-size: 20px;
    font-weight: bold;
`

const InnerText = Styled.div`
    float: left;
    width: 220px;
    height: 100px;
    display: inline-block;
`

const TimeLineBox = Styled.div`
    background-color: #111319;
    padding: 14px 0 27px 0;
    height: 520px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 6px;
    p{
      text-align: left;
    }

`

const ItemDataBox = Styled.div`
    width: 500px;
    height: 160px;
    margin-left: 100px;
    border-bottom: 0.5px solid #707070;
    margin-top:8px;
`


export default PMReadyTimeContainer
