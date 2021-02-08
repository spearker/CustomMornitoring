import React from 'react'
import Styled from 'styled-components'
import FrequentlyLabel from '../../Frequently/FrequentlyLabel'
import NAV_HOME from '../../../../Assets/Images/btn_nav_home.png'
import setting from '../../../../Assets/Images/setting.png'
import { useHistory } from 'react-router-dom'

interface Props {
  title: string
}

const Container = Styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  paddingBottom: 0
}))


const PMV2DashboardPressInfoHeader: React.FunctionComponent<Props> = ({ title }) => {
  const history = useHistory()

  return (
    <Container>
      <img src={NAV_HOME} width={25.8} height={25.3} alt={'home'} onClick={() => history.push('/dashboard')}/>
      <FrequentlyLabel text={title} size={26} weight={'bold'}/>
      <img src={setting} width={28} height={28} alt={'setting'}
           onClick={() => history.push('/pm/v2/dashboard/press/select/info')}/>
    </Container>
  )
}

export default PMV2DashboardPressInfoHeader
