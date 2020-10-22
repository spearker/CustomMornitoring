import React, { useEffect, useState } from 'react'
import InnerBodyContainer from "../../../Containers/InnerBodyContainer";
import Styled from "styled-components";
import CustomLoadTon from "../loadton/CustomLoadTonCard";
import CustomMainMotorAngulargaugeChart from "../../../Containers/Custom/dashboard/CustomMainMotorAngulargaugeChart";
import CustomSlideMotorAngulargaugeChart from "../../../Containers/Custom/dashboard/CustomSlideMotorAngulargaugeChart";
import getYoudongDashboard from "../../../Api/custom/getYoudongDashboard";
import { YOUDONG_PRESS_CUSTOM_TYPE } from "../../../Common/@types/youdong";
import CustomMonitoringCard from "../loadton/CustomMonitoringCard";
import CustomSPMMotorAngulargaugeChart from "../../../Containers/Custom/dashboard/CustomSPMMotorAngulargaugeChart";

interface Props {
  id: string
}

const CustomDashboardLoadtonChart: React.FunctionComponent<Props> = ({ id }) => {
  const [ data, setData ] = React.useState<YOUDONG_PRESS_CUSTOM_TYPE>();
  const [ init, setInit ] = React.useState<boolean>(true);

  const getYoudongCustomDashboardData = async () => {
    if (id) {
      try {

        const response = await getYoudongDashboard(id, init)

        if (init) {
          setInit(false)
        }

        setData(response)
      } catch (error) {
        console.log('catched error', error)
      }
    }
  }

  useEffect(() => {
    const documentEvent: any = document

    documentEvent.body.style.zoom = .7;
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      getYoudongCustomDashboardData().then(() => console.log('loaded data'))
    }, 2000)
    return () => {
      console.log('-- monitoring end -- ')
      clearTimeout(interval);
    }
  }, [ data ])

  const Header = () => {
    return (
        <div style={{ paddingTop: 50, paddingLeft: 10, marginBottom: 20 }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TitleText
                style={{ fontSize: 72 }}>{data ? data.press_data.machine_name + `(${data.press_data.tonnage_limit})` : '-'}</TitleText>
          </div>
        </div>
    )
  }

  const standardInfItem = (key: string, value: string, containerStyle?: object, fontValueStyle?: object, textColor?: string) => {
    return (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0 auto',
          width: '70%',
          opacity: .8,
          marginBottom: 5,
          ...containerStyle,
        }}>
          <p style={{
            textAlign: 'left',
            fontSize: 48,
            fontWeight: 'bold',
            color: textColor ? textColor : 'white'
          }}>{key}</p>
          <TitleText
              style={{
                fontSize: 60,
                ...fontValueStyle,
                color: textColor ? textColor : 'white'
              }}>{value}</TitleText>

        </div>
    )
  }

  const standardInfo = () => {
    return (
        <div style={{
          position: 'absolute',
          top: '25%',
          width: 800,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {standardInfItem('Total', data ? data?.loadton_data.total_ton + ' t' : '-', { opacity: .9 }, { fontSize: 72 }, 'white')}
          {standardInfItem('CH1 (좌)', data ? data.loadton_data.ch1_ton + ' t' : '-', {}, { fontSize: 48 }, 'white')}
          {standardInfItem('CH2 (우)', data ? data.loadton_data.ch2_ton + ' t' : '-', {}, { fontSize: 48 }, 'white')}
          {standardInfItem('일량', data ? data.loadton_data.press_power + ' kgf.m' : '-', {}, { fontSize: 38 })}
        </div>
    )
  }


  return (
      <React.Fragment>
        <InnerBodyContainer styles={{
          width: '100%',
          height: '100%',
          marginLeft: '0',
          marginRight: '0'
        }}>
          {Header()}
          <ItemBox>
            <div style={{ display: 'flex' }}>
              <div style={{
                width: '13%',
                paddingTop: 60,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  marginBottom: 60,
                  wordBreak: 'break-all'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Title>에러코드</Title>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <SubTitle>{data ? data?.press_data.error_code.type : '-'}</SubTitle>
                  </div>
                </div>
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 300,
                    marginTop: 50,
                    marginBottom: 100
                  }}>
                    <CustomMainMotorAngulargaugeChart value={data?.press_data.main_motor_current}/>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: 300, }}>
                    <CustomSlideMotorAngulargaugeChart value={data?.press_data.slide_motor_current}/>
                  </div>
                </div>
              </div>
              <div style={{
                width: '72%',
                // marginRight: 8,
                // boxShadow: 'rgba(255, 255, 255, 0.27) 0px 1px 7px 1px',
              }}>
                <CustomLoadTon color={0} propData={data ? data.loadton_data : undefined}
                               styles={{ width: '100%', height: '50%' }}
                               tonnage_limit={data ? data?.press_data.tonnage_limit : 0}/>
                {standardInfo()}
              </div>
              <div style={{ width: '13%', }}>
                <CustomMonitoringCard contents={data && data.press_data}/>
              </div>
            </div>
          </ItemBox>
        </InnerBodyContainer>
      </React.Fragment>
  )
}

const Title = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 48px;
  font-weight: bold;
`

const SubTitle = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 46px;
  opacity: .7;
  font-weight: bold;
`


const ItemBox = Styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`

const TitleText = Styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 42px;
`

export default CustomDashboardLoadtonChart
