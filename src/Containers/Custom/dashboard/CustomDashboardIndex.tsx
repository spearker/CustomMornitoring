import React from 'react'
import CustomIndexItem from "../../../Components/Custom/dashboard/CustomIndexItem";
import Styled from "styled-components";
import { useHistory } from "react-router-dom";
import { getToken } from "../../../lib/tokenFunctions";
import { TOKEN_NAME } from "../../../Common/configset";
import { DASHBOARD } from "../../../Common/@types/youdong";

const dashboard: DASHBOARD[] = [
  {
    name: '대형 1번 프레스',
    pk: '1',
    url: 'custom/dashboard/loadton/1',
  },
  {
    name: '대형 2번 프레스',
    pk: '2',
    url: 'custom/dashboard/loadton/2',
  },
  {
    name: '대형 3번 프레스',
    pk: '3',
    url: 'custom/dashboard/loadton/3',
  },
  {
    name: '대형 4번 프레스',
    pk: '4',
    url: 'custom/dashboard/loadton/4',
  },
  {
    name: '대형 BL프레스',
    pk: '5',
    url: 'custom/dashboard/loadton/5',
  },
  {
    name: '에러로그',
    pk: 'errorLog',
    url: 'custom/dashboard/errorLog',
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

  const goToChartPage = React.useCallback((data: DASHBOARD) => {
    history.push(`/${data.url}`)
  }, [])

  const tokenCheck = () => {
    const token = getToken(TOKEN_NAME)

    if (token === null) {
      history.push('/login?type=dashboard')
    }

  }


  React.useEffect(() => {
    tokenCheck()
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
              dashboard.map((data) => <CustomIndexItem info={data} goToChartPage={goToChartPage} key={data.pk}/>)
            }
          </PressSelector>
        </div>
      </Container>
  )
}

export default CustomDashboardIndex
