import React from 'react'
import Styled from 'styled-components'
import PMV2DashboardPressStandardItem from '../../../../Components/PM/V2/dashboard/PMV2DashboardPressStandardItem'
import { YOUDONG_LOAD_MONITOR_DATA_TYPE } from '../../../../Common/@types/youdong'

interface Props {
  data?: YOUDONG_LOAD_MONITOR_DATA_TYPE | undefined
}

const Container = Styled.div<any>(() => ({
  position: 'absolute',
  width: 360,
  paddingTop: 24,
  paddingBottom: 24,
  paddingLeft: 16,
  paddingRight: 16,
  border: 'solid 0.5px #515155',
  borderRadius: 6,
  marginTop: 40,
  marginLeft: 14
}))

const PMV2DashboardPressStandardContainer: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <Container>
      <PMV2DashboardPressStandardItem title={'Total'} value={data ? Math.round(Number(data.total_ton) * 10) / 10 : '-'}
                                      symbol={'t'}/>
      <PMV2DashboardPressStandardItem title={'CH1 (좌)'} value={data ? Math.round(Number(data.ch1_ton) * 10) / 10 : '-'}
                                      symbol={'t'}/>
      <PMV2DashboardPressStandardItem title={'CH2 (우)'} value={data ? Math.round(Number(data.ch2_ton) * 10) / 10 : '-'}
                                      symbol={'t'}/>
      <PMV2DashboardPressStandardItem title={'일량'} value={data ? Math.round(Number(data.press_power) * 10) / 10 : '-'}
                                      symbol={'kgf.m'}/>
    </Container>
  )
}

export default PMV2DashboardPressStandardContainer
