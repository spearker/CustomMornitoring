import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import Styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import {API_URLS, getAbilityList} from '../../Api/pm/analysis'
import {API_URLS as URLS_MAP} from '../../Api/pm/map'
import MapBoard from '../../Components/Map/MapBoard'
import NoDataCard from '../../Components/Card/NoDataCard'
import styled from 'styled-components'

const chartOption = {
  chart: {
    height: 350,
    type: 'area',
    events: {
      beforeZoom: (e, {xaxis}) => {
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
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: true,
        zoom: false,
        zoomin: true,
        zoomout: true,
      }
    },
  },
  colors: ['#ffffff', '#bfbfbf55'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: ['straight', 'smooth', 'straight', 'straight'],
    dashArray: [0, 0, 1, 15],
    width: 3
  },
  fill: {
    type: ['solid', 'gradient', 'gradient'],
    gradient: {
      type: 'vertical',
      shadeIntensity: 0,
      opacityFrom: 0.6,
      opacityTo: 0.1,
      inverseColors: true,
      stops: [0, 100]
    }
  },
  yaxis: {
    tickAmount: 12,
    labels: {
      formatter: (value, index) => {
        if (index === 12) {
          return '(sec)'
        } else {
          return Math.round(value)
        }
      }
    },
    tooltip: {
      enable: false
    }
  },
  xaxis: {
    tickAmount: 5,
    tooltip: {
      enable: false
    }
  },
  legend: {
    show: false
  },
  grid: {
    show: true,
    borderColor: '#42444b',
    yaxis: {
      lines: {
        show: true
      }
    },
    xaxis: {
      lines: {
        show: true
      }
    }
  },
  tooltip: {
    enable: false
  },

}

interface IError {
  error_number: number
  error_name: string
}

const ReadyTimeErrorAnalysisContainer = () => {
  const [data, setData] = React.useState<IPressAbilityData>({
    pressPk: '',
    pressName: '',
    excess_count: '',
    x_degree: [],
    y_capacity: [],
    y_ton: []
  })
  const [error, setError] = React.useState<IError>({error_number: -1, error_name: '모든 에러'})
  const [errorList, setErrorList] = React.useState<IError[]>()
  const [series, setSeries] = React.useState([{name: 'test', data: [0, 1, 2, 3, 4]}])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pressLoading, setPressLoading] = React.useState<boolean>(false)
  const [pressName, setPressName] = React.useState<string>('')
  const [labels, setLabels] = React.useState<string[]>([])
  const [dots, setDots] = React.useState<{ total: number, resolve: string }[]>([])

  const [selectComponent, setSelectComponent] = useState<string>('7HF45I_machine0')

  const [selectDate, setSelectDate] = useState<string>(moment().subtract(1, 'days').format('YYYY-MM-DD'))

  const getData = async () => {

    setLoading(true)
    setPressLoading(true)

    const tempUrl = `${API_URLS['error'].detail}?pk=${selectComponent}&date=${selectDate}&error=${error && error.error_number}`
    const resultData = await getAbilityList(tempUrl)
    console.log(resultData)

    if (resultData) {
      error.error_number === -1 && setErrorList([...resultData.errors])
      setDots([...resultData.charts.dots.reverse()])
      setLabels([...resultData.charts.xAxis.reverse()])
      let yaxisData = resultData.charts.yAxis.reverse().map((v) => {
        return Number(v)
      })
      setSeries([{...series[0], data: yaxisData}])
      setPressName(resultData.name)
    }

  }

  useEffect(() => {
    if (selectComponent) {
      getData()
    }
  }, [selectComponent, selectDate, error])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>

        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>비가동시간 분석</span>
        </div>
      </div>
      <MapBoard
        type={1}//0: 모니터링 1:통계/분석
        url={URLS_MAP.press.statics}
        select={selectComponent} //pk
        onChangeEvent={pressLoading ? undefined : setSelectComponent}
      />
      {
        // loading ? <NoDataCard contents={'데이터를 불러오는 중입니다...'} height={504}/> :
        //   selectComponent ?
        <BlackContainer>
          <div>
            <div className={'itemDiv'} style={{float: 'left', display: 'inline-block'}}>
              <p style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>{pressName} {error.error_name} 분석</p>
            </div>
            <div style={{marginRight: 30, paddingTop: 25,}}>
              <CalendarDropdown unLimit select={selectDate} onClickEvent={(date) => setSelectDate(date)}
                                type={'single'}/>
            </div>
          </div>
          <div className={'chartBox'}>
            <div style={{width: 750}}>
              {
                dots.length !== 0 && <ReactApexChart options={{
                  ...chartOption,
                  labels: labels,
                  tooltip: {
                    custom: function ({dataPointIndex}) {
                      console.log(dots)
                      return (
                        `<div style='width: 200px; height: 80px; background-color: white; display: flex; flex-direction: column; justify-content: center;'>
                                     <p>총 에러 발생 횟수 : ${Number(dots[dataPointIndex].total).toFixed(0)}</p>
                                     <p>에러 해결 시간 평균 : ${Number(dots[dataPointIndex].resolve).toFixed(2)}</p>
                                  </div>`
                      )
                    }
                  }
                }} type={'line'} height={400} series={series}/>
              }
            </div>
            <div style={{width: 330, padding: 10}}>
              <div style={{
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
                <div style={{
                  width: 200,
                  height: 50,
                  display: 'flex',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  border: '1px solid #b3b3b3'
                }} onClick={() => {
                  setError({error_number: -1, error_name: '모든 에러'})
                }}>
                  <p>모든 에러</p>
                </div>
                {
                  errorList && errorList.map(v => (
                    <div style={{
                      width: 200,
                      height: 50,
                      display: 'flex',
                      cursor: 'pointer',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      border: '1px solid #b3b3b3'
                    }} onClick={() => {
                      setError(v)
                    }}>
                      <p>{v.error_name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </BlackContainer>
        // : <NoDataCard contents={''} height={504}/>

      }
    </div>
  )
}

const BlackContainer = styled.div`
    width: 1100px;
    height: 504px;
    background-color: #111319;
    border-radius: 6px;
    margin-top: 20px;
    .itemDiv{
        height: 40px;
        width: 50%;
        p{
            font-size: 20px;
            font-weight: bold;
            padding-Top: 20px;
            text-Align: left;
            margin-left: 20px;
        }
    }
    .chartBox{
      display: flex;
      justify-content: flex-end;
      width: 1100px;
    }
    .apexcharts-tooltip{
        color: #000000;
    }
`

export default ReadyTimeErrorAnalysisContainer
