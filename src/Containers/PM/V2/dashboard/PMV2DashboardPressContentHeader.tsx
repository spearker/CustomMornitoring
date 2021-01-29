import React from 'react'
import Styled from 'styled-components'
import PMV2DashboardPressContentHeaderItem
  from '../../../../Components/PM/V2/dashboard/PMV2DashboardPressContentHeaderItem'
import { YOUDONG_PRESS_DATA_TYPE } from '../../../../Common/@types/youdong'

interface Props {
  data: YOUDONG_PRESS_DATA_TYPE | false
}

const Container = Styled.div<any>(() => ({
  backgroundColor: '#111622',
  display: 'flex',
  paddingBottom: 32
}))

const PMV2DashboardPressContentHeader: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <Container>
      <PMV2DashboardPressContentHeaderItem title={'금형명: '} value={data ? data.mold_name : '-'}/>
      <PMV2DashboardPressContentHeaderItem title={'품목명: '} value={data ? data.material_name : '-'}/>
    </Container>
  )
}


export default PMV2DashboardPressContentHeader
