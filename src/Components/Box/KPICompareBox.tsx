import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import DateTypeCalendar from '../Modal/DateTypeCalendar'
import moment from 'moment'

// KPI
interface IProps {
  data: { number: number, increase: boolean }
  type: 'month' | 'week' | 'day'
  setType?: (type: 'month' | 'week' | 'day') => void
}

const KPICompareBox = ({data, type, setType}: IProps) => {
  const [startDate, setStartDate] = useState<string>('2020-12-04')
  const [endDate, setEndDate] = useState<string>('2020-12-11')

  const [selectDate, setSelectDate] = useState<{ from: Date, to: Date } | Date>(moment().subtract(1, 'days').toDate())

  React.useEffect(() => {
    // if (type === 'day') {
    //
    // } else if () {
    // }
    // setSelectDate()
  }, [type])

  return (
    <Container>
      <div>
        <FlexBox>
          <DateTypeCalendar type={type}/>
          {
            setType !== undefined &&
            <div style={{marginTop: 8}}>
                <input type="radio" id="day" name="type"
                       checked={type === 'day' ? true : false}
                       onClick={() => {
                         setType('day')
                       }}/>
                <label htmlFor="day"><span style={{marginLeft: 25}}>일</span></label>

                <input type="radio" id="week" name="type"
                       checked={type === 'week' ? true : false}
                       onClick={() => {
                         setType('week')
                       }}/>
                <label htmlFor="week"><span style={{marginLeft: 25}}>주</span></label>

                <input type="radio" id="month" name="type"
                       checked={type === 'month' ? true : false}
                       onClick={() => {
                         setType('month')
                       }}/>
                <label htmlFor="month"><span style={{marginLeft: 25}}>월</span></label>
            </div>
          }
        </FlexBox>
        <div>
          {type === 'week' ? `${startDate} ~ ${endDate}` : startDate}
        </div>
      </div>
      <div>
        <p>{data.number}<span>{data.increase ? '+' : '-'}</span></p>
      </div>
    </Container>
  )
}

const Container = Styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 224px;
    padding: 16px;
    background-color: #111319;
    border-radius: 0px 0px 6px 6px;
    margin-bottom: 8px;
    box-sizing: border-box;
    *{box-sizing: border-box;}
    &>div{
        width: 50%;
        &:first-child{
            position: relative;
            &>div{
                &:nth-child(2){
                    position: absolute;
                    bottom: 29px;
                    left: 0;
                    font-size: 30px;
                    font-weight: bold;
                }
            }
        }
        &:nth-child(2){
            padding-right: 60px;
            &>p{
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
    }
`

const FlexBox = Styled.div`
    display: flex;
    &>div{
        &:first-child{
            margin-right: 24px;
            cursor: pointer;
            // 달력 붙이면 지우기(시작)
            border-radius: 6px;
            background-color: #b3b3b3;
            color: #111319;
            padding: 4px 12px;
            font-size: 15px;
            font-weight: bold;
            // 달력 붙이면 지우기(끝)
        }
        &:nth-child(2){
            &>input{
                cursor: pointer;
            }
            &>label{
                cursor: pointer;
                margin-right: 32px;
                &>span{
                    margin: 0 0 0 8px;
                    opacity: 0.7;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
    }
`

export default KPICompareBox
