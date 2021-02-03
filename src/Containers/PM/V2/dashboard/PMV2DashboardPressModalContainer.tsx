import React from 'react'
import Modal from 'react-modal'
import Chart from 'react-apexcharts'
import CalendarDropdown from '../../../../Components/Dropdown/CalendarDropdown'
import { PM_V2_PRESS_DROP_ITEM_KEY_NAMES } from '../../../../Common/@types/pm_v2_press'
import FrequentlyLabel from '../../../../Components/PM/Frequently/FrequentlyLabel'
import closeImage from '../../../../Assets/Images/closeButton.png'

interface Props {
  isVisible: boolean
  type: PM_V2_PRESS_DROP_ITEM_KEY_NAMES
  onClose: () => void
  requestUPHInfo?: (date: string) => void
  requestErrorLog?: () => void
  requestSlideLog?: (date: string) => void
  title: string
  data?: any
  date?: string
}

const PMV2DashboardPressModalContainer: React.FunctionComponent<Props> = ({ isVisible, type, onClose, requestUPHInfo, requestErrorLog, requestSlideLog, title, data, date }) => {
  const [ options, setOptions ] = React.useState<any>()
  const [ maximumYresult, setMaximumYresult ] = React.useState<number>(0)

  React.useEffect(() => {
    if (type === 'uph') {
      const pathInfos = window.location.pathname.split('/')
      let yAxisResult = 600

      //유동 커스텀
      if (window.location.hostname === '222.99.47.91' && pathInfos[pathInfos.length - 1] === '4') {
        yAxisResult = 1000
      }

      setMaximumYresult(yAxisResult)
    }
  }, [ type ])

  React.useEffect(() => {
    if (type === 'uph') {
      (requestUPHInfo && date) && requestUPHInfo(date)
    } else if (type === 'error') {
      requestErrorLog && requestErrorLog()
    } else if (type === 'slideMotor') {
      (requestSlideLog && date) && requestSlideLog(date)
    }
  }, [ type ])

  React.useEffect(() => {
    if (type === 'uph') {
      setOptions({
        series: [
          {
            data: data.uph ? data.uph.uph : []
          }
        ],
        xaxis: {
          categories: data ? data.uph && data.uph.time ? data.uph.time : [] : [],
          min: data ? data.uph && data.uph.time.length > 0 ? data.uph.time[0] : 0 : 0,
          max: data ? data.uph && data.uph.time.length > 0 ? data.uph.time[data.uph.time.length - 1] : 24 : 24,
          show: true,
          labels: {
            show: true,
            formatter: (value: number, _, index: number) => {
              return value
            },
            style: {
              fontSize: '14px',
              color: '#30dfdf'
            }
          }
        },
        tooltip: {
          enabled: false
        },
        legend: {
          show: false
        },
        chart: {
          type: 'area',
          toolbar: {
            show: false
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [ 0, 80, 100 ]
          }
        },
        dataLabels: {
          enabled: true
        },
        markers: {
          size: 7
        },
        yaxis: {
          show: true,
          opposite: true,
          min: 0,
          max: maximumYresult,
          tickAmount: maximumYresult === 600 ? maximumYresult / 100 : 10,
          labels: {
            show: true,
            formatter: (value) => {
              return Math.floor(value)
            },
            style: {
              fontSize: '14px'
            }
          }
        }
      })
    } else if (type === 'slideMotor') {
      setOptions({
        series: [
          {
            data: data.slide ? data.slide.current_point : []
          }
        ],
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false
          }
          // datetimeUTC: false,
        },
        tooltip: {
          x: {
            format: 'dd.MM.yyyy HH:mm'
          }
        },
        stroke: {
          show: true,
          curve: 'stepline'
        },
        // tooltip: {
        //   enabled: false
        // },
        legend: {
          show: false
        },
        chart: {
          type: 'area',
          toolbar: {
            show: false
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [ 0, 80, 100 ]
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        }
      })
    }
  }, [ data.uph, data.slide, type, date, maximumYresult ])

  const typeIsChart = React.useMemo(() => (type === 'uph' || type === 'slideMotor'), [ type ])

  const errorContainer = () => {
    return (
      <div>
        <div style={{ display: 'flex', width: '100%', borderBottom: '1px solid white', paddingBottom: 6 }}>
          <div style={{ width: '30%' }}>
            <FrequentlyLabel text={'에러 발생 시간'} size={18}/>
          </div>
          <div style={{ width: '70%' }}>
            <FrequentlyLabel text={'에러 코드'} size={18}/>
          </div>
        </div>
        <div>
          {
            data.error && data.error.histories.map((element) => <div
              style={{ display: 'flex', width: '100%', marginTop: 4 }}>
              <div style={{ width: '30%' }}>
                <FrequentlyLabel text={element.created} size={16}/>
              </div>
              <div style={{ width: '70%' }}>
                <FrequentlyLabel text={element.type} size={16}/>
              </div>
            </div>)
          }
        </div>
      </div>
    )
  }


  const header = React.useMemo(() => {
    switch (type) {
      case 'error':
        return '에러코드 로그'
      case 'uph':
        return 'UPH 로그'
      case 'slideMotor':
        return '슬라이드 모터 부하량 로그'
      default:
        return ''
    }
  }, [ type ])

  const onChangeDate = (date: string) => {
    if (type === 'uph') {
      requestUPHInfo && requestUPHInfo(date)
    } else if (type === 'slideMotor') {
      requestSlideLog && requestSlideLog(date)
    }
  }

  const onViewContent = React.useMemo(() => {

    if ((type === 'uph' || type === 'slideMotor') && (typeof options === 'object' && options.series)) {
      return <React.Fragment>
        <div style={{ marginRight: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {type === 'uph' && <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 48 }}>
            <FrequentlyLabel text={'총 생산량'} size={20} weight={'bold'} containerStyles={{ paddingRight: 8 }}/>
            <FrequentlyLabel text={data ? data.uph ? data.uph.total_uph.toLocaleString() : '-' : '-'} size={36}
                             weight={'bold'}/>
          </div>}
          <CalendarDropdown type={'single'}
                            select={date}
                            toDayLimit
                            onClickEvent={onChangeDate}/>
        </div>
        <Chart options={options} series={options.series} type="area" width={'100%'} height={'85%'}/>
      </React.Fragment>
    } else if (type === 'error') {
      return errorContainer()
    }
  }, [ type, data, options ])

  return (
    <React.Fragment>
      {
        isVisible && <Modal
            isOpen={isVisible}
            style={{
              content: {
                border: 'none',
                borderRadius: 6,
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                height: '90%',
                padding: 0
              },
              overlay: {
                background: 'rgba(0,0,0,.6)',
                zIndex: 5
              }
            }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#353b48'
            // padding: type === 'uph' ? '10px 30px' : undefined,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '10%',
              padding: typeIsChart ? undefined : '10px 32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: typeIsChart ? 32 : undefined,
                width: typeIsChart ? '41%' : '50%'
              }}>
                <FrequentlyLabel text={header} size={36} containerStyles={{ paddingRight: 18 }} weight={'bold'}/>
                <FrequentlyLabel text={`(${title})`} size={24}/>
              </div>
              <div style={{
                width: typeIsChart ? '10%' : '50%',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: typeIsChart ? 32 : 16
              }}>
                <img style={{ width: 32, height: 32 }} src={closeImage} alt={'close'} onClick={onClose}/>
              </div>
            </div>
            <div style={{
              height: typeIsChart ? '90%' : undefined,
              backgroundColor: '#353b48',
              padding: typeIsChart ? undefined : '10px 32px'
            }}>
              {onViewContent}
            </div>
          </div>
        </Modal>
      }

    </React.Fragment>
  )
}

export default PMV2DashboardPressModalContainer
