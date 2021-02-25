import React from 'react'
import Style from 'styled-components'
import NAV_HOME from '../../../Assets/Images/btn_nav_home.png'
import {useHistory} from 'react-router-dom'
import NowTime from '../../Toggle/NowTime'

interface Props {
  title: string
  sameDistance?: boolean
}

const CustomDashboardHeader: React.FunctionComponent<Props> = ({title, sameDistance}) => {
  const history = useHistory()
  return (
    <div style={{
      display: 'flex',
      margin: '30px 60px 30px 60px',
      alignItems: 'center',
      justifyContent: 'space-between',
      width:'100%'
    }}>
      {/*<Home onClick={() => history.push('/dashboard')} style={{width: sameDistance ? 'calc(100%/3)' : '48px'}}>*/}
      {/*  <img src={NAV_HOME}/>*/}
      {/*</Home>*/}
      <div style={{}}></div>
      <Title style={{}}>{title}</Title>
      <Time
        style={{ textAlign: sameDistance ? 'right' : 'left'}}><NowTime/></Time>
    </div>
  )
}


const Title = Style.p`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.52px;
  text-align: center;
  color: white;
`

const Time = Style.p`
  width: 250px;
  height: 33px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #717c90;
`

export default CustomDashboardHeader
