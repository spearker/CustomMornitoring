import React from 'react'
import CustomIndexItem from "../../../Components/Custom/dashboard/CustomIndexItem";
import Styled from "styled-components";
import { useHistory } from "react-router-dom";

const dummy = [
  {
    name: '프레스 1호기',
    pk: '1'
  },
  {
    name: '프레스 2호기',
    pk: '2'
  },
  {
    name: '프레스 3호기',
    pk: '3'
  },
  {
    name: '프레스 4호기',
    pk: '4'
  },
  {
    name: '프레스 5호기',
    pk: '5'
  },
  {
    name: '커스텀',
    pk: '6'
  },
]

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap:wrap;
  align-items:center;
  width: 80%;
  margin: 0 auto;
  height: 100vh;
`

const CustomDashboardIndex: React.FunctionComponent = () => {
  const history = useHistory();

  const goToChartPage = React.useCallback((pk: string) => {
    history.push(`dashboard/loadton/${pk}`)
  }, [])

  return (
      <Container>
        {
          dummy.map((data) => <CustomIndexItem info={data} goToChartPage={goToChartPage} key={data.pk}/>)
        }
      </Container>
  )
}

export default CustomDashboardIndex
