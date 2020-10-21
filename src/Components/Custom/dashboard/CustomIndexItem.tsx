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
  width: 160px;
  height: 160px;
  margin: 32px;
  border-radius: 16px;
  cursor:pointer;
  background-color: rgba(255, 255, 255, .26);
  
   &:hover {
          background-image: linear-gradient(135deg, #00d1ff, #6821ff);
      }
`

const Title = Styled.h2`
  font-family: NanumGothic;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`

const CustomIndexItem: React.FunctionComponent<Props> = ({ info, goToChartPage }) => {
  return (
      <Container onClick={() => goToChartPage(info.pk)}>
        <Title>{info.name}</Title>
      </Container>
  )
}

export default CustomIndexItem
