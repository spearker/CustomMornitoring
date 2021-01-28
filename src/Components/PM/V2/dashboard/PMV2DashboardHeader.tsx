import React from 'react'
import Styled from 'styled-components'
import FrequentlyLabel from '../../Frequently/FrequentlyLabel'
import NAV_HOME from '../../../../Assets/Images/btn_nav_home.png'
import Style from 'styled-components'
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

const Home = Style.div`
  width: 48px;
  height: 48px;
   cursor: pointer;
  img{
    margin: 3px 5px;
    width: 29px;
    height: 29px;
  }
`

const PMV2DashboardHeader: React.FunctionComponent<Props> = ({ title }) => {
  const history = useHistory()

  return (
    <Container>
      <Home onClick={() => history.push('/dashboard')}>
        <img src={NAV_HOME} alt={'home'}/>
      </Home>
      <FrequentlyLabel text={title} size={26} weight={'bold'}/>
      <Home onClick={() => history.push('/dashboard')}>
        <img src={NAV_HOME} alt={'setting'}/>
      </Home>
    </Container>
  )
}

export default PMV2DashboardHeader
