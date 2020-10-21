import React, { useEffect } from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB } from '../../../Common/configset'
import icCloudOn from '../../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../../Assets/Images/ic_monitoring_close.png'
import IC_DOWN from '../../../Assets/Images/ic_monitoring_open.png'
import { changeStatusToString } from '../../../Common/statusFunctions';
import { transferCodeToName } from '../../../Common/codeTransferFunctions';
import { YOUDONG_PRESS_DATA_TYPE } from "../../../Common/@types/youdong";

interface Props {
  contents?: YOUDONG_PRESS_DATA_TYPE | undefined,
  isOpen?: boolean,
  onClickEvent?: any
}

const NavDiv = Styled.div`
    display: flex;
    justify-content: center;
`

const CustomMonitoringCard = ({ contents, isOpen, onClickEvent }: Props) => {

  const Header = () => {
    return (
        <div>
          {
            HeaderItem('가동시간', '13:10:24')
          }
          {
            HeaderItem('비가동시간', '08:23:20')
          }
          {
            HeaderItem('가동율', '83%')
          }
        </div>
    )
  }

  const HeaderItem = (title: string, value: string) => {
    return (
        <div style={{ marginBottom: 70 }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <HeaderTitle>{title}</HeaderTitle>
          </div>
          <div style={{ textAlign: 'center' }}>
            <HeaderSubTitle>{value}</HeaderSubTitle>
          </div>
        </div>
    )
  }

  return (
      <WrapDiv>
        <NavDiv>
          {Header()}
        </NavDiv>
        <BodyDiv>
          {

            <CardDiv>
              <Title>SPM</Title>
              {/*<ValueText className="p-limits"*/}
              {/*           style={String(v.value).length > 3 ? { fontSize: 22 } : { fontSize: 27 }}>{v.value === '' ? '-' : v.title === 113 ? transferCodeToName('keycam', v.value) : v.value}</ValueText>*/}
              <p style={{
                fontSize: 12,
                marginBottom: 6,
                marginTop: 6
              }}>1234</p>
            </CardDiv>
          }

        </BodyDiv>
      </WrapDiv>
  );
}


const HeaderTitle = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 54px;
  font-weight: bold;
`

const HeaderSubTitle = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 48px;
  opacity: .7;
  font-weight: bold;
`


const Title = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 48px;
`

const WrapDiv = Styled.div`
   
`

const BodyDiv = Styled.div`
  margin-top: 50px;
`

const CardDiv = Styled.div`
`


export default CustomMonitoringCard;
