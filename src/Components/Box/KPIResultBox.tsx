import React from 'react'
import Styled from 'styled-components'
import KPIBasicBox from './KPIBasicBox'

// KPI용 겉 메뉴박스

interface IProps {
  onCloseEvent: () => void
  data: number[]
}

const KPIResultBox = ({onCloseEvent, data}: IProps) => {

  return (
    <KPIBasicBox style={{padding: 16}}>
      <LeftBox>
        <p>비교대비 증감률</p>
        <button onClick={() => onCloseEvent()}>비교 종료</button>
      </LeftBox>
      <RightBox>
        <p>{(data[0] !== 0 && data[1] !== 0) ? Math.round(((data[0] - data[1]) / (data[0] + data[1])) * 1000) / 10 : 0}
          {/*<span>{data.increase ? '+' : '-'}</span>*/}
        </p>
      </RightBox>
    </KPIBasicBox>
  )
}

const LeftBox = Styled.div`
    position: relative;
    width: 50%;
    text-align: left;
    padding-top: 16px;
    &>p{
        font-size: 30px;
        font-weight: bold;
        font-family: NotoSansCJKkr;
    }
    &>button{
        position: absolute;
        bottom: 13px;
        left: 0;
    }
`

const RightBox = Styled.div`
    width: 50%;
    &:nth-child(2){
        padding-right: 60px;
        &>p{
            color: #19b9df;
            text-align: right;
            font-size: 128px;
            font-weight: bold;
            &>span{
                margin-left: 20px;
                font-size: 85px;
                vertical-align: bottom;
            }
        }
    }
`


export default KPIResultBox
