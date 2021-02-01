import React from 'react'
import Styled from 'styled-components'
import PMV2DragAndDropItem from '../../../../Components/PM/V2/PMV2DragAndDropItem'
import PMV2DashboardChart from '../../../../Components/PM/V2/dashboard/PMV2DashboardChart'
import { YOUDONG_PRESS_CUSTOM_TYPE } from '../../../../Common/@types/youdong'
import getYoodongDashboard from '../../../../Api/custom/getYoodongDashboard'
import Notiflix from 'notiflix'
import { useHistory } from 'react-router-dom'
import PMV2DashboardPressInfoHeader from '../../../../Components/PM/V2/dashboard/PMV2DashboardHeader'
import PMV2DashboardPressStandardContainer from './PMV2DashboardPressStandardContainer'
import PMV2DashboardPressContentHeader from './PMV2DashboardPressContentHeader'
import PMV2DashboardPressModalContainer from './PMV2DashboardPressModalContainer'
import moment from 'moment'
import getYoodongUPH from '../../../../Api/pm/v2/dashboard/getYoodongUPH'
import getSlideMotorLog from '../../../../Api/pm/v2/dashboard/getSlideMotorLog'
import getYoodongPressErrorLog from '../../../../Api/pm/v2/dashboard/getYoodongPressErrorLog'
import { PM_V2_PRESS_DROP_ITEM_KEY_NAMES, PM_V2_PRESS_SUB_ITEMS } from '../../../../Common/@types/pm_v2_press'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

interface Props {
  id: string
}

const Container = Styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  paddingTop: 0,
  width: '100%',
  height: '100%'
}))

const OptionContainer = Styled.div(() => ({
  width: '20%'
}))

const ChartContainer = Styled.div(() => ({
  width: '60%',
  height: 850,
  margin: '0 auto',
  backgroundColor: '#111622',
  paddingTop: 11,
  paddingBottom: 11,
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 6
}))


const PMV2DashboardContentContainer: React.FunctionComponent<Props> = ({ id }) => {
  const [ pressSubItems, setPressSubItems ] = React.useState<PM_V2_PRESS_SUB_ITEMS[]>()
  const [ data, setData ] = React.useState<YOUDONG_PRESS_CUSTOM_TYPE>()
  const [ tonnageLimit, setTonnageLimit ] = React.useState<number>()
  const [ detailData, setDetailData ] = React.useState({
    date: moment().format('YYYY-MM-DD'),
    uph: undefined,
    error: undefined,
    slide: undefined
  })
  const [ isFirst, setIsFirst ] = React.useState({
    loading: true,
    api: true
  })
  const [ modal, setModal ] = React.useState<{
    isVisible: boolean
    type: PM_V2_PRESS_DROP_ITEM_KEY_NAMES
  }>({
    isVisible: false,
    type: undefined
  })

  React.useEffect(() => {
    setPressSubItems([
      {
        type: 'text',
        keyName: 'error',
        title: '에러코드',
        value: '1',
        symbol: undefined,
        valueFontSize: 30,
        valueFontColor: errorCodeCSSStyle,
        onClick: onShowDetailInfo
      },
      {
        type: 'gauge',
        keyName: 'mainMotor',
        title: '메인모터 부하량',
        value: '2',
        symbol: 'A',
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: undefined
      },
      {
        type: 'gauge',
        keyName: 'slideMotor',
        title: '슬라이드 모터 부하량',
        value: '3',
        symbol: undefined,
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: onShowDetailInfo
      },
      {
        type: 'text',
        keyName: 'spm',
        title: 'SPM',
        value: '4',
        symbol: 'SPM',
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: undefined
      },
      {
        type: 'text',
        keyName: 'pressState',
        title: '프레스 상태',
        value: '5',
        symbol: undefined,
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: undefined
      },
      {
        type: 'text',
        keyName: 'electricPower',
        title: '전력량',
        value: '6',
        symbol: 'kWh',
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: undefined
      },
      {
        type: 'text',
        keyName: 'presetCount',
        title: '현재 생산량',
        value: '7',
        symbol: undefined,
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: undefined
      },
      {
        type: 'text',
        keyName: 'uph',
        title: 'UPH',
        value: '8',
        symbol: 'UPH',
        valueFontSize: undefined,
        valueFontColor: undefined,
        onClick: undefined
      }
    ])
  }, [])

  const history = useHistory()

  React.useEffect(() => {
    if (id) {
      const dashboard = setInterval(getYoudongCustomDashboardData, 1000)
      return () => {
        clearTimeout(dashboard)
      }
    }
  }, [ data ])

  const getYoudongCustomDashboardData = async () => {
    try {
      const response = await getYoodongDashboard(id, isFirst.api)

      if (response !== null) {
        if (response.status === 401) {
          return history.push('/login?type=back')
        } else if (response.status === 200) {

          setData(response.data)

          if (response.data.loadton_data.isAbnormal) {
            Notiflix.Notify.Warning('제품 평균 톤수보다 높습니다. ')
          }

          if (isFirst.api) {
            setTonnageLimit(response.data.loadton_data.tonnage_limit)

            setIsFirst({
              loading: false,
              api: false
            })
          }
        } else {
          setTimeout(() => {
            getYoudongCustomDashboardData()
          }, 1000)
        }
      }
    } catch (error) {
      console.log('catched error', error)
    }
  }


  const getUPHInformation = React.useCallback(async (date: string) => {
    const response = await getYoodongUPH(id, date)

    console.log(response)

    if (!!response && response.status === 200) {
      setDetailData({
        ...detailData,
        date,
        uph: response.data
      })
    }

  }, [ detailData ])

  const getErrorLog = async () => {
    const response = await getYoodongPressErrorLog(id)

    console.log('res', response)

    if (!!response && response.status === 200) {
      setDetailData({
        ...detailData,
        error: response.data
      })
    }
  }

  const getSlideLog = React.useCallback(async (date: string) => {
    const response = await getSlideMotorLog(id, date)

    if (!!response && response.status === 200) {
      console.log('response.data', response.data)

      setDetailData({
        ...detailData,
        date,
        slide: response.data
      })
    }
  }, [ detailData ])

  const overTonCheck = React.useCallback(() => {
    if (tonnageLimit) {
      if (data) {
        return data.loadton_data.total_ton > tonnageLimit ? tonnageLimit : 0
      } else {
        return false
      }
    } else {
      return false
    }
  }, [ data?.loadton_data, tonnageLimit ])

  const pressData = React.useMemo(() => {
    if (data && data.press_data) {
      return data.press_data
    } else {
      return false
    }
  }, [ data?.press_data ])

  const errorCodeCSSStyle = React.useMemo(() => {
    let color = 'white'

    if (data) {
      if (data.press_data.error_code.code !== '0')
        color = '#ed4337'
    }

    return color
  }, [ data?.press_data.error_code ])


  const onShowDetailInfo = React.useCallback((type: PM_V2_PRESS_DROP_ITEM_KEY_NAMES) => {
    setModal({
      isVisible: true,
      type
    })
  }, [])

  const onCloseModal = React.useCallback(() => {
    setModal({
      isVisible: false,
      type: undefined
    })
  }, [])

  const onDragEnd = (result) => {
    const { source, destination } = result

    console.log({
      source,
      destination
    })

    // dropped outside the list
    // if (!destination) {
    //   return
    // }

    if (source.droppableId === destination.droppableId) {
      // const items = reorder(
      //   this.getList(source.droppableId),
      //   source.index,
      //   destination.index
      // );
      //
      // let state = { items };
      //
      // if (source.droppableId === 'droppable2') {
      //   state = { selected: items };
      // }
      //
      // this.setState(state);
    } else {
      // const result = move(
      //   this.getList(source.droppableId),
      //   this.getList(destination.droppableId),
      //   source,
      //   destination
      // );
      //
      // this.setState({
      //   items: result.droppable,
      //   selected: result.droppable2
      // });
    }
  }

  const SubList = React.memo(function SubList({ list, start }: any) {
    return list && list.map((information: PM_V2_PRESS_SUB_ITEMS, index: number) => (
      <PMV2DragAndDropItem type={information.type} title={information.title} keyName={list.key}
                           index={index}
                           value={pressData ? pressData.error_code.code === '0' ? '-' : pressData.error_code.type : '-'}
                           valueFontSize={information.valueFontSize}
                           valueFontColor={information.valueFontColor}
                           onClick={information.onClick}/>
    ))
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <PMV2DashboardPressInfoHeader title={pressData ? `${pressData.name} (${tonnageLimit}t)` : ''}/>
        <Container>
          <OptionContainer>
            <Droppable droppableId="droppable-1">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {/*<SubList list={pressSubItems} start={0}/>*/}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </OptionContainer>
          <ChartContainer>
            <PMV2DashboardPressContentHeader data={pressData}/>
            <PMV2DashboardPressStandardContainer data={data?.loadton_data}/>
            <PMV2DashboardChart color={0} propData={data && data.loadton_data} overTonCheck={overTonCheck}
                                tonnage_limit={tonnageLimit ? tonnageLimit : 0}/>
          </ChartContainer>
          <OptionContainer>
            <Droppable droppableId="droppable-2">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <PMV2DragAndDropItem type={'text'} title={'프레스 상태'} value={pressData ? pressData.press_state : '-'}
                                       index={0}
                                       keyName={'pressState'}/>
                  <PMV2DragAndDropItem type={'text'} title={'전력량'} value={pressData ? pressData.electric_power : '-'}
                                       keyName={'electricPower'}
                                       index={1}
                                       symbol={'kWh'}/>
                  <PMV2DragAndDropItem type={'text'} title={'현재 생산량'} valueFontSize={29}
                                       index={2}
                                       keyName={'presetCount'}
                                       value={pressData ? pressData.preset_count + '/' + pressData.preset_limit_count : '-'}/>
                  <PMV2DragAndDropItem type={'text'} title={'UPH'} value={pressData ? pressData.UPH.toString() : '-'}
                                       index={3}
                                       keyName={'uph'}
                                       onClick={onShowDetailInfo}
                                       symbol={'UPH'}/>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </OptionContainer>
        </Container>
      </div>
      <PMV2DashboardPressModalContainer isVisible={modal.isVisible} type={modal.type} onClose={onCloseModal}
                                        requestUPHInfo={getUPHInformation}
                                        requestErrorLog={getErrorLog}
                                        requestSlideLog={getSlideLog}
                                        date={detailData.date}
                                        data={detailData}
                                        title={data?.press_data.name ? data.press_data.name : ''}/>t
    </DragDropContext>
  )
}

export default PMV2DashboardContentContainer
