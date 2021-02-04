import React, {useEffect} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB} from '../../../Common/configset'
import icCloudOn from '../../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../../Assets/Images/ic_monitoring_close.png'
import IC_DOWN from '../../../Assets/Images/ic_monitoring_open.png'
import {changeStatusToString} from '../../../Common/statusFunctions'
import {transferCodeToName} from '../../../Common/codeTransferFunctions'
import {YOUDONG_PRESS_DATA_TYPE} from '../../../Common/@types/youdong'
import autoCustomType from '../../../AutoCustomSetting/autoCustomConfig'

interface Props {
  contents?: YOUDONG_PRESS_DATA_TYPE | undefined,
  isOpen?: boolean,
  onClickEvent?: any
}

const CustomAnalysisMonitoringCard = ({contents, isOpen, onClickEvent}: Props) => {
  const Item = (title: string, value: string) => {
    return (
      <div style={{
        marginBottom: 150,
        wordBreak: 'break-all'
      }}>
        <div style={{textAlign: 'center', marginBottom: 20}}>
          <HeaderTitle>{title}</HeaderTitle>
        </div>
        <div style={{textAlign: 'center'}}>
          <HeaderSubTitle>{value}</HeaderSubTitle>
        </div>
      </div>
    )
  }

  return (
    <WrapDiv>
      <BodyDiv>
        {
          <CardDiv>
            {/*{Item('프레스 코드', contents ? contents?.press_code : '-')}*/}
            {Item('프레스 상태', contents ? autoCustomType() === 'jaeil_js_trans' && (contents?.press_state === '전원 OFF') ? '계획정지' : contents?.press_state : '-')}
            {Item('전력량', contents ? contents?.electric_power + ' kWh' : '-')}
            {Item('현재 생산량', contents ? contents?.preset_count + '/' + contents?.preset_limit_count : ' - ')}
            {Item('남은 시간', contents ? contents?.ETC !== '-1' ? contents?.ETC : '∞' : '-')}
            {/*{Item('에러코드', contents ? contents?.error_code : '-')}*/}
          </CardDiv>
        }

      </BodyDiv>
    </WrapDiv>
  )
}


const HeaderTitle = Styled.span`
                font-family: NotoSansCJKkr;
                font-size: 48px;
                font-weight: bold;
                `

const HeaderSubTitle = Styled.span`
                font-family: NotoSansCJKkr;
                font-size: 48px;
                opacity: .7;
                font-weight: bold;
                `

const WrapDiv = Styled.div`

                `

const BodyDiv = Styled.div`
                margin-top: 50px;
                `

const CardDiv = Styled.div`
                `


export default CustomAnalysisMonitoringCard

