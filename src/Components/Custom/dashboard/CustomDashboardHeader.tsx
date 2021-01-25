import React from "react";
import Style from "styled-components"
import NAV_HOME from "../../../Assets/Images/btn_nav_home.png";
import moment from 'moment'
import {useHistory} from 'react-router-dom'

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
            justifyContent: 'space-between'
        }}>
            <Home onClick={() => history.push('/dashboard')} style={{width: sameDistance ? 'calc(100%/3)' : '48px'}}>
                <img src={NAV_HOME}/>
            </Home>
            <Title style={{width: sameDistance ? 'calc(100%/3)' : 'auto'}}>{title}</Title>
            <Time style={{width: sameDistance ? 'calc(100%/3)' : '250px', textAlign: sameDistance ? 'right' : 'left'}}>{moment().format("YYYY-MM-DD (dd) HH:mm:ss")}</Time>
        </div>
    )
}

const Home = Style.div`
  width: 48px;
  height: 48px;
   cursor: pointer;
  img{
    margin: 3px 5px;
    width: 38px;
    height: 38px;
  }
`

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
