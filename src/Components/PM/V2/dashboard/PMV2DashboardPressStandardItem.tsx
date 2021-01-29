import React from 'react'
import FrequentlyLabel from '../../Frequently/FrequentlyLabel'
import Styled from 'styled-components'

interface Props {
  title: string
  value: string | number
  symbol: string
  color: string
}

const Container = Styled.div<any>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const TitleContainer = Styled.div<any>(() => ({
  width: 100
}))

const ValueContainer = Styled.div<any>(() => ({
  width: 232
}))

const SymbolContainer = Styled.div<any>(() => ({
  marginLeft: 8
}))

const PMV2DashboardPressStandardItem: React.FunctionComponent<Props> = ({ title, value, symbol, color }) => {
  return (
    <Container>
      <TitleContainer>
        <FrequentlyLabel text={title} size={16} color={color}/>
      </TitleContainer>
      <ValueContainer>
        <FrequentlyLabel text={value} size={40} textAlign={'right'} weight={'bold'} color={color}/>
      </ValueContainer>
      <SymbolContainer>
        <FrequentlyLabel text={symbol} size={20} color={color}/>
      </SymbolContainer>
    </Container>
  )
}


export default PMV2DashboardPressStandardItem
