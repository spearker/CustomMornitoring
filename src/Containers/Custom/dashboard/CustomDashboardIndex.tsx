import React, {useState} from 'react'
import CustomIndexItem from '../../../Components/Custom/dashboard/CustomIndexItem'
import Styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {getToken} from '../../../lib/tokenFunctions'
import {TOKEN_NAME} from '../../../Common/configset'
import {DASHBOARD} from '../../../Common/@types/youdong'
import getYoodongPressList from '../../../Api/custom/getYoodongPressList'

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

const errorLog: DASHBOARD = {
    iotProtocolKey: '',
    name: '에러 로그',
    pk: ''
}

const rotateDashboard: DASHBOARD = {
    iotProtocolKey: '',
    name: '자동 화면 전환\n대시보드',
    pk: ''
}

const CustomDashboardIndex: React.FunctionComponent = () => {
    const [state, setState] = React.useState<DASHBOARD[]>()
    const history = useHistory()

    const goToChartPage = React.useCallback((data: DASHBOARD) => {
        try {
            const id = data.pk.split('machine')[1]
            history.push(`/custom/dashboard/loadton/${id}`)
        } catch (error) {
            alert('response error')
        }
    }, [])


    const tokenCheck = () => {
        const token = getToken(TOKEN_NAME)

        if (token === null) {
            history.push('/login?type=dashboard')
        }
    }


    const getPressList = async () => {
        const response = await getYoodongPressList()

        if (response !== null && response) {
            if (response.status === 401) {
                return history.push('/login?type=back')
            } else if (response.status === 200) {

                setState(response.data)
            }
        }
    }

    React.useEffect(() => {
        tokenCheck()
        getPressList().then(() => console.log('successful load'))
        const documentEvent: any = document
        documentEvent.body.style.zoom = 1.0;
    }, [])

    return (
        <Container>
            <div>
                <div>
                    <MainTitle>안녕하세요.<br/><span
                        style={{fontWeight: 'bold'}}>SMART FACTORY SYSTEM</span>입니다.</MainTitle>
                    <MainSub>프레스를 선택해 주세요.</MainSub>
                </div>
                <PressSelector>
                    {
                        state && state.map((data) => <CustomIndexItem info={data} goToChartPage={goToChartPage}
                                                                      key={data.pk}/>)
                    }
                    <CustomIndexItem info={errorLog} goToChartPage={() => history.push('/custom/dashboard/errorLog')}/>
                    <CustomIndexItem info={rotateDashboard}
                                     goToChartPage={() => history.push('/custom/dashboard/rotate')}/>
                </PressSelector>
            </div>
        </Container>
    )
}

export default CustomDashboardIndex
