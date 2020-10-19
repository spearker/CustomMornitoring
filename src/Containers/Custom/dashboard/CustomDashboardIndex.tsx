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
  flex-direction: column;
  justify-content: center;
  align-items:center;
  width: 100%;
  height: 100vh;
`

const PressSelector = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap:wrap;
  align-items:center;
  margin-top: 100px;
`

const MainTitle = Styled.p`
  object-fit: contain;
  font-family: NanumGothic;
  font-size: 40px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`

const MainSub = Styled.p`
  object-fit: contain;
  opacity: 0.8;
  font-family: NanumGothic;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: center;
  color: #717c90;
`

const CustomDashboardIndex: React.FunctionComponent = () => {
  const history = useHistory();

  const goToChartPage = React.useCallback((pk: string) => {
    history.push(`/custom/dashboard/loadton/${pk}`)
  }, [])

  return (
      <Container>
        <div>
          <div>
            <MainTitle>안녕하세요.<br/><span style={{ fontWeight: 'bold' }}>SMART FACTORY SYSTEM</span>입니다.</MainTitle>
            <MainSub>프레스를 선택해 주세요.</MainSub>
          </div>
          <PressSelector>
            {
              dummy.map((data) => <CustomIndexItem info={data} goToChartPage={goToChartPage} key={data.pk}/>)
            }
          </PressSelector>
        </div>
      </Container>
  )
}

export default CustomDashboardIndex
