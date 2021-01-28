import React from 'react'
import Styled from 'styled-components'
import FrequentlyLabel from '../../Frequently/FrequentlyLabel'
import NAV_HOME from '../../../../Assets/Images/btn_nav_home.png'
import Style from 'styled-components'
import { useHistory } from 'react-router-dom'
import PMV2DragAndDropItem from '../PMV2DragAndDropItem'
import PMV2DashboardChart from './PMV2DashboardChart'

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


const PMV2DashboardContent: React.FunctionComponent = () => {
  return (
    <Container>
      <OptionContainer>
        <PMV2DragAndDropItem type={'text'} title={'에러코드'} value={'자동화 인터록 이상\n에러내용 1234'} valueFontSize={30}/>
        <PMV2DragAndDropItem type={'text'} title={'메인모터 부하량'} value={'13.1'}/>
        <PMV2DragAndDropItem type={'text'} title={'슬라이드 모터 부하량'} value={'52.4'}/>
        <PMV2DragAndDropItem type={'text'} title={'SPM'} value={'54'} symbol={'SPM'}/>
      </OptionContainer>
      <ChartContainer>
        {/*<PMV2DashboardChart />*/}
      </ChartContainer>
      <OptionContainer>
        <PMV2DragAndDropItem type={'text'} title={'프레스 상태'} value={'진행'}/>
        <PMV2DragAndDropItem type={'text'} title={'전력량'} value={'15.3'} symbol={'kWh'}/>
        <PMV2DragAndDropItem type={'text'} title={'현재 생산량'} value={'9821'}/>
        <PMV2DragAndDropItem type={'text'} title={'UPH'} value={'500'} symbol={'UPH'}/>
      </OptionContainer>
    </Container>
  )
}

export default PMV2DashboardContent
