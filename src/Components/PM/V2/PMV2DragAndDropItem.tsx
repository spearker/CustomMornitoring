import React from 'react'
import FrequentlyLabel from '../Frequently/FrequentlyLabel'
import Styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import { PM_V2_PRESS_DROP_ITEM_KEY_NAMES, PM_V2_PRESS_SUB_ITEMS } from '../../../Common/@types/pm_v2_press'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  data: PM_V2_PRESS_SUB_ITEMS
  index: number
}

const Container = Styled.div(() => ({
  width: 296,
  height: 185,
  backgroundColor: 'rgba(17, 19, 25,.5)',
  borderRadius: 6,
  padding: '13px 16px',
  margin: '0 auto',
  marginBottom: 8
}))

const ValueContent = Styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}))

const gauge = {
  series: [ 0 ],
  options: {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            fontSize: 20,
            fontFamily: 'NotoSansCJKkr',
            fontWeight: 'bold',
            color: '#FFFFFF'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [ 0, 50, 53, 91 ]
      }
    },
    labels: [ 'Average Results' ]
  }
}

const PMV2DragAndDropItem: React.FunctionComponent<Props> = ({ data, index }) => {
  const [ apexSetting, setApexSetting ] = React.useState(gauge)


  React.useEffect(() => {
    if (data.type === 'gauge') {
      setApexSetting({
        ...apexSetting,
        series: [ Number(data.value) ]
      })
    }
  }, [ data.value, data.type ])

  const TextTypeView = React.useMemo(() => {
    return (
      <div>
        <div>
          <FrequentlyLabel text={data.value ? data.value : ''} size={data.valueFontSize ? data.valueFontSize : 60}
                           textAlign={'center'}
                           color={data.valueFontColor}
                           weight={'bold'}
                           fontFamily={'NotoSansCJKkr'}/>
        </div>
        <div>
          <FrequentlyLabel text={data.symbol} size={20} textAlign={'center'} fontFamily={'NotoSansCJKkr'} weight={200}/>
        </div>
      </div>
    )
  }, [ data.type, apexSetting, data.value ])

  const GuageTypeView = React.useMemo(() => {
    return (
      <div>
        <ReactApexChart options={apexSetting.options} series={apexSetting.series} type="radialBar"/>
      </div>
    )
  }, [ data.type, apexSetting, data.value ])


  return (
    <Draggable draggableId={data.keyName} index={index}>
      {provided =>
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <FrequentlyLabel text={data.title} size={20} fontFamily={'NotoSansCJKkr'}/>
          </div>
          <ValueContent>
            {
              data.type === 'text' ? TextTypeView : GuageTypeView
            }
          </ValueContent>
        </Container>
      }
    </Draggable>
  )
}

export default PMV2DragAndDropItem
