import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import Styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import {API_URLS, getAbilityList} from '../../Api/pm/statistics'
import {API_URLS as URLS_MAP} from '../../Api/pm/map'
import MapBoard from '../../Components/Map/MapBoard'
import NoDataCard from '../../Components/Card/NoDataCard'

const chartOption = {
  chart: {
    height: 350,
    type: 'area',
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
  colors: ['#bfbfbf', 'rgba(25, 185, 223, 0.5)'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: ['straight', 'smooth'],
    dashArray: [0, 10],
    width: 2
  },
  yaxis: {
    tickAmount: 24,
    labels: {
      formatter: (value, index) => {
        if (index === 24) {
          return '(ton)'
        } else {
          if (value % 50 === 0) {
            return Math.floor(value)
          } else {
            return
          }
        }
      }
    },
    tooltip: {
      enable: false
    }
  },
  xaxis: {
    type: 'numeric',
    tickAmount: 24,
    max: 270,
    min: 90,
    // labels:{
    //     formatter: (value, timestamp, index) => {
    //
    //
    //         if(value === 360){
    //             return "(mm)"
    //         }else{
    //             if(index%2){
    //                 return Math.floor(value)
    //             }
    //             // if(value % 10 === 0){
    //             //     return Math.floor(value)
    //             // }else{
    //             //     return
    //             // }
    //         }
    //     }
    // },
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

const AbilityContainer = () => {
  const [data, setData] = React.useState<IPressAbilityData>({
    pressPk: '',
    pressName: '',
    x_degree: [],
    y_capacity: [],
    y_ton: []
  })
  const [pressName, setPressName] = React.useState('')
  const [series, setSeries] = React.useState([{type: 'line', data: [[0, 0]]}])
  const [loading, setLoading] = React.useState<boolean>(false)

  const [selectComponent, setSelectComponent] = useState<string>('')

  const [selectDate, setSelectDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD'))

  const getData = useCallback(async () => {
    setLoading(true)

    console.log('ap')

    const tempUrl = `${API_URLS['ability'].load}?pk=${selectComponent}&date=${selectDate}`
    const resultData = await getAbilityList(tempUrl)

    console.log(resultData)
    setData(resultData.results)

    let dummylineList: number[][] = []
    let dummyroundList: number[][] = []

    await resultData.x_degree.map((v, i) => {
      dummylineList.push([Number(v), Number(resultData.y_capacity[i])])
      return null
    })

    console.log(dummylineList)

    resultData.x_degree.map((v, i) => {
      dummyroundList.push([Number(v), Number(resultData.y_ton[i])])
      return null
    })

    setSeries([{type: 'line', data: dummylineList}, {type: 'area', data: dummyroundList}])
    setPressName(resultData.pressName)

    setLoading(false)
    // setSeries()

  }, [data, selectComponent, selectDate])

  useEffect(() => {
    if (selectComponent) {
      getData()
    }
  }, [selectComponent, selectDate])

  // useEffect(() => {
  //     const {Yaxis} = data.basic_ability;
  //     let tempSeries: number[][] = [[]];
  //     data.basic_ability.Xaxis.map((v, i) => {
  //         if (v) {
  //             tempSeries.push([v, Yaxis[i]])
  //         }
  //     });
  //     setSeries()
  // }, [data])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>

        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>프레스 능력</span>
        </div>
      </div>
      <MapBoard
        type={1}//0: 모니터링 1:통계/분석
        url={URLS_MAP.press.statics}
        select={selectComponent} //pk
        onChangeEvent={setSelectComponent}
      />
      {
        selectComponent
          ? !loading
          ? series
            ? <BlackContainer>
              <div>
                <div className={'itemDiv'} style={{float: 'left', display: 'inline-block'}}>
                  <p style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>{pressName}</p>
                </div>
                <div style={{marginRight: 30, paddingTop: 25,}}>
                  <CalendarDropdown type={'single'} select={selectDate}
                                    onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                </div>
              </div>
              <div style={{marginTop: 30}}>
                <ReactApexChart options={chartOption} type={'line'} height={400} series={series}/>
              </div>
            </BlackContainer>
            : <NoDataCard contents={'데이터를 불러오지 못했습니다.'} height={504}/>
          : <NoDataCard contents={'데이터를 불러오는 중입니다.'} height={504}/>
          : <NoDataCard contents={'프레스를 선택해주세요'} height={504}/>
      }

    </div>
  )
}

const BlackContainer = Styled.div`
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
`

export default AbilityContainer
