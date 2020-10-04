import React from "react";
import Styled from 'styled-components';

interface Props {
    title: string
    yearCompare: string
    yearPercent: number
    dayCompare: string
    dayPercent: number
    monthCompare: string
    monthPercent: number
    quarterCompare: string
    quarterPercent: number
}


const TripleKPIBox = ({title,yearCompare,yearPercent,dayCompare,dayPercent,monthCompare,monthPercent,quarterCompare,quarterPercent}:Props) => {

    return(
        <div>
            <KPIHeader>
                <p>{title}</p>
            </KPIHeader>
            <KPIBody>
                <KPIYear>
                    <p>{yearCompare}</p>
                    <div>
                        <span style={{color: yearPercent < 0 ? '#ff341a' : '#19b9df'}}>{yearPercent < 0 ? yearPercent : '+'+yearPercent}</span>
                        <p style={{color: yearPercent < 0 ? '#ff341a' : '#19b9df'}}>%</p>
                    </div>
                </KPIYear>
                <div>
                    <KPIDay>
                        <p>{dayCompare}</p>
                        <div>
                            <span style={{color: dayPercent < 0 ? '#ff341a' : '#19b9df'}}>{dayPercent < 0 ? dayPercent : '+'+dayPercent}</span>
                            <p style={{color: dayPercent < 0 ? '#ff341a' : '#19b9df'}}>%</p>
                        </div>
                    </KPIDay>
                    <KPIMonth>
                        <p>{monthCompare}</p>
                        <div>
                            <span style={{color: monthPercent < 0 ? '#ff341a' : '#19b9df'}}>{monthPercent < 0 ? monthPercent : '+'+monthPercent}</span>
                            <p style={{color: monthPercent < 0 ? '#ff341a' : '#19b9df'}}>%</p>
                        </div>
                    </KPIMonth>
                    <KPIQuarter>
                        <p>{quarterCompare}</p>
                        <div>
                            <span style={{color: quarterPercent < 0 ? '#ff341a' : '#19b9df'}}>{quarterPercent < 0 ? quarterPercent: '+'+quarterPercent }</span>
                            <p style={{color: quarterPercent < 0 ? '#ff341a' : '#19b9df'}}>%</p>
                        </div>
                    </KPIQuarter>
                </div>
            </KPIBody>
        </div>
    )
}

const KPIHeader = Styled.div`
  width: 100%;
  height: 45px;
  border-radius: 6px;
  background-color: #111319;
  p{  
      padding: 12px 0 12px 20px;
      font-family: NotoSansCJKkr;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
  }
`

const KPIBody = Styled.div`
  margin-top: 12px;
  margin-bottom: 36px;
  display: flex;
  flex-direction: row;
`

const KPIYear = Styled.div`
  margin-right: 12px;
  width: 630px;
  height: 510px;
  border-radius: 6px;
  background-color: #111319;
  p{
    text-align: left;
    padding: 10px 0 0 20px;
    font-family: NotoSansCJKkr;
    font-size: 20px;
    font-weight: bold;
    &:last-child{
      padding: 35px 0 0 0;
      font-family: NotoSansCJKkr;
      font-size: 85px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      color: #19b9df;
    }
  }
  div{
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    margin: 80px 32px 0 0;
    span{
      font-family: NotoSansCJKkr;
      font-size: 128px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      text-align: right;
      color: #19b9df;
    }
  }
`


const KPIDay = Styled.div`
  margin-right: 12px;
  width: 458px;
  height: 162px;
  border-radius: 6px;
  background-color: #111319;
  p{
    text-align: left;
    padding: 10px 0 0 20px;
    font-family: NotoSansCJKkr;
    font-size: 20px;
    font-weight: bold;
    &:last-child{
      padding: 20px 0 0 0;
      font-family: NotoSansCJKkr;
      font-size: 48px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      color: #19b9df;
    }
  }
  div{
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    margin: 30px 32px 0 0;
    span{
      font-family: NotoSansCJKkr;
      font-size: 72px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      text-align: right;
      color: #19b9df;
    }
  }
`

const KPIMonth = Styled.div`
  margin-top: 12px;
  width: 458px;
  height: 162px;
  border-radius: 6px;
  background-color: #111319;
  p{
    text-align: left;
    padding: 10px 0 0 20px;
    font-family: NotoSansCJKkr;
    font-size: 20px;
    font-weight: bold;
    &:last-child{
      padding: 20px 0 0 0;
      font-family: NotoSansCJKkr;
      font-size: 48px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      color: #19b9df;
    }
  }
  div{
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    margin: 30px 32px 0 0;
    span{
      font-family: NotoSansCJKkr;
      font-size: 72px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      text-align: right;
      color: #19b9df;
    }
  }
`

const KPIQuarter = Styled.div`
  margin-top: 12px;
  width: 458px;
  height: 162px;
  border-radius: 6px;
  background-color: #111319;
  p{
    text-align: left;
    padding: 10px 0 0 20px;
    font-family: NotoSansCJKkr;
    font-size: 20px;
    font-weight: bold;
    &:last-child{
      padding: 20px 0 0 0;
      font-family: NotoSansCJKkr;
      font-size: 48px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      color: #19b9df;
    }
  }
  div{
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
    margin: 30px 32px 0 0;
    span{
      font-family: NotoSansCJKkr;
      font-size: 72px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      text-align: right;
      color: #19b9df;
    }
  }
`

export default TripleKPIBox
