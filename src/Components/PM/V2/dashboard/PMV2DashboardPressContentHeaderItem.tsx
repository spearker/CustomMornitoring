import React from 'react'
import Styled from 'styled-components'
import FrequentlyLabel from '../../Frequently/FrequentlyLabel'

interface Props {
  title: string
  value: string | undefined
}

const Container = Styled.div<any>(() => ({
  width: '50%',
  display: 'flex'
}))

const PMV2DashboardPressContentHeaderItem: React.FunctionComponent<Props> = ({ title, value }) => {
  return (
    <Container>
      <FrequentlyLabel text={title} size={26}/>
      <FrequentlyLabel text={value ? value : ''} size={26}/>
    </Container>
  )
}


export default PMV2DashboardPressContentHeaderItem
