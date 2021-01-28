import React from 'react'
import Styled from 'styled-components'
import PMV2DragAndDropItem from '../../../../Components/PM/V2/PMV2DragAndDropItem'
import PMV2DashboardChart from '../../../../Components/PM/V2/dashboard/PMV2DashboardChart'
import { YOUDONG_PRESS_CUSTOM_TYPE } from '../../../../Common/@types/youdong'
import getYoodongDashboard from '../../../../Api/custom/getYoodongDashboard'
import Notiflix from 'notiflix'
import { useHistory } from 'react-router-dom'
import PMV2DashboardHeader from '../../../../Components/PM/V2/dashboard/PMV2DashboardHeader'

interface Props {
  id: string
}

const Container = Styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  paddingTop: 0,
  width: '100%'
}))

const OptionContainer = Styled.div(() => ({
  width: '20%'
}))

const ChartContainer = Styled.div(() => ({
  width: '60%',
  margin: '0 auto'
}))


const PMV2DashboardContentContainer: React.FunctionComponent<Props> = ({ id }) => {
  const [ data, setData ] = React.useState<YOUDONG_PRESS_CUSTOM_TYPE>()
  const [ tonnageLimit, setTonnageLimit ] = React.useState<number>()
  const [ isFirst, setIsFirst ] = React.useState({
    loading: true,
    api: true
  })

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

  return (
    <div>
      <PMV2DashboardHeader title={pressData ? `${pressData.name} (${tonnageLimit})` : ''}/>
      <Container>
        <OptionContainer>
          <PMV2DragAndDropItem type={'text'} title={'에러코드'}
                               value={pressData ? pressData.error_code.code === '0' ? '-' : pressData.error_code.type : '-'}
                               valueFontSize={30} valueFontColor={errorCodeCSSStyle}/>
          <PMV2DragAndDropItem type={'guage'} title={'메인모터 부하량'} value={pressData && pressData.main_motor_current}/>
          <PMV2DragAndDropItem type={'guage'} title={'슬라이드 모터 부하량'} value={pressData && pressData.slide_motor_current}/>
          <PMV2DragAndDropItem type={'text'} title={'SPM'} value={pressData ? pressData.press_spm : '-'}
                               symbol={'SPM'}/>
        </OptionContainer>
        <ChartContainer>
          <PMV2DashboardChart color={0} propData={data && data.loadton_data} overTonCheck={overTonCheck}
                              tonnage_limit={tonnageLimit ? tonnageLimit : 0}/>
        </ChartContainer>
        <OptionContainer>
          <PMV2DragAndDropItem type={'text'} title={'프레스 상태'} value={pressData ? pressData.press_state : '-'}/>
          <PMV2DragAndDropItem type={'text'} title={'전력량'} value={pressData ? pressData.electric_power : '-'}
                               symbol={'kWh'}/>
          <PMV2DragAndDropItem type={'text'} title={'현재 생산량'} valueFontSize={29}
                               value={pressData ? pressData.preset_count + '/' + pressData.preset_limit_count : '-'}/>
          <PMV2DragAndDropItem type={'text'} title={'UPH'} value={pressData ? pressData.UPH : '-'} symbol={'UPH'}/>
        </OptionContainer>
      </Container>
    </div>
  )
}

export default PMV2DashboardContentContainer
