import React from 'react'
import Styled from "styled-components";


interface Props {
  info: {
    name: string
    pk: string
  }
  goToChartPage: (pk: string) => void
}

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  width: 30%;
  height: 30%;
  border: 1px solid rgba(255, 255, 255, .3);
  margin: 20px;
  border-radius: 8px;
  cursor:pointer;
`

const Title = Styled.h2`
  color: white;
  fontSize: 28;
`

const CustomIndexItem: React.FunctionComponent<Props> = ({ info, goToChartPage }) => {
  return (
      <Container onClick={() => goToChartPage(info.pk)}>
        <Title>{info.name}</Title>
      </Container>
  )
}

export default CustomIndexItem
