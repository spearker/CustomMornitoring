import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import Styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import ListRadioButton from '../../Components/Button/ListRadioButton'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import {API_URLS, getPowerList} from '../../Api/pm/statistics'
import NoDataCard from '../../Components/Card/NoDataCard'
import {usePopupDispatch} from '../../Context/PopupContext'

const chartOption = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: false
      }
    },
  },
  colors: ['#dd4bbe', '#5145c6', '#158bdc', '#fb9e70', '#08d05f', '#f65f61', '#d8bf00'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  xaxis: {
    tickAmount: 20
  },
  yaxis: {
    min: 0,
    tickAmount: 25,
    labels: {
      formatter: (value, index) => {
        if (index === 25) {
          return '(KW)'
        } else {
          return Math.round(value)
        }

      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.58,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'left',
    align: 'horizontal'
  },
  grid: {
    borderColor: '#42444b',
    xaxis: {lines: {show: true}},
    yaxis: {lines: {show: true}}
  },
  tooltip: {
    enable: false
  }

}

const PowerContainer = () => {
  const dispatchp = usePopupDispatch()

  const [data, setData] = useState<{ name: string, data: number[] }[]>()
  const [pk, setPk] = useState()

  const [selectDate, setSelectDate] = useState({
    start: moment().subtract(8, 'days').format('YYYY-MM-DD'),
    end: moment().subtract(1, 'days').format('YYYY-MM-DD')
  })
  const [selectType, setSelectType] = useState([true])
  const [labels, setLabels] = useState()

  // let chart = new ApexCharts(el,)

  useEffect(() => {
    dispatchp({
      type: 'CHANGE_MODE',
      data: {
        mode: 'pm',

      }
    })
  }, [])

  const getData = async () => {

    const tempUrl = `${API_URLS['power'].list}?startDate=${selectDate.start}&endDate=${selectDate.end}`
    const resultData = await getPowerList(tempUrl)
    console.log(resultData)
    setLabels(resultData.dates)

    let tempArray: any = {}
    let tmpArr: { name: string, data: number[] }[] = []

    resultData.press_logs?.map(index => {
      if (tempArray[index.press_name]) {
        tempArray = {...tempArray, [index.press_name]: [...tempArray[index.press_name], index.press_data]}
      } else {
        tempArray = {...tempArray, [index.press_name]: [index.press_data]}
      }
    })

    Object.keys(tempArray).map((v, i) => {
      tmpArr = [...tmpArr, {name: v, data: tempArray[v]}]
    })

    setData([...tmpArr])

  }

  useEffect(() => {
    getData()
  }, [selectDate])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>

        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>프레스 전력</span>
        </div>
      </div>
      {
        data.length !== 0 ?
          <BlackContainer>
            <div style={{marginTop: 25, height: 80}}>
              <div>
                <div className={'itemDiv'} style={{float: 'left', display: 'inline-block'}}>
                  <p style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>기간별 프레스 전력 비교</p>
                </div>
                <div style={{marginRight: 30, paddingTop: 25,}}>
                  <CalendarDropdown type={'range'} selectRange={selectDate}
                                    onClickEvent={(start, end) => setSelectDate({
                                      start: start,
                                      end: end ? end : ''
                                    })}/>
                  <ListRadioButton nameList={['일']} data={selectType} onClickEvent={(i) => {
                    if (i === 0) {
                      setSelectType([true, false])
                    } else {
                      setSelectType([false, true])
                    }
                  }}/>
                </div>
              </div>
            </div>
            <ReactApexChart options={{...chartOption, labels}} type={'area'} width={1100} height={620}
                            series={[...data]}/>
          </BlackContainer>
          :
          <div>
            <CalendarDropdown type={'range'} selectRange={selectDate}
                              onClickEvent={(start, end) => setSelectDate({
                                start: start,
                                end: end ? end : ''
                              })}/>
            <NoDataCard contents={'데이터가 없습니다.'} height={740}/>
          </div>
      }
    </div>
  )
}

const BlackContainer = Styled.div`
    width: 1100px;
    height: 740px;
    background-color: #111319;
    border-radius: 6px;
   
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
    .apexcharts-tooltip{
        color: black;
    }
`

export default PowerContainer
