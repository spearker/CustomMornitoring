import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import DateTypeCalendar from '../Modal/DateTypeCalendar'
import moment from 'moment'

// KPI
interface IProps {
  // data: { number: number, increase: boolean }
  type: 'month' | 'week' | 'day'
  setType?: (type: 'month' | 'week' | 'day') => void
  getData?: (from: Date, to: Date) => Promise<number>
}

const KPICompareBox = ({type, setType, getData}: IProps) => {
  const [data, setData] = useState<{ number: number, increase: boolean }>({number: 500, increase: false})

  const [selectDate, setSelectDate] = useState<Date>(moment().subtract(1, 'days').toDate())
  const [selectDates, setSelectDates] = useState<{ from: Date, to: Date }>({
    from: moment().subtract(2, 'day').toDate(),
    to: moment().subtract(1, 'day').toDate(),
  })

  useEffect(() => {
    if (getData) {
      if (type === 'day') {
        getData(selectDate, selectDate).then((ratio) => {
          setData({number: ratio, increase: false})
        })
      } else {
        getData(selectDates.from, selectDates.to).then((ratio) => {
          setData({number: ratio, increase: false})
        })
      }
    }
  }, [type, selectDate, selectDates])

  React.useEffect(() => {
    if (type === 'day') {
      setSelectDate(moment().subtract(1, 'days').toDate())
    } else if (type === 'week') {
      const nowDate = moment().subtract(7, 'days')
      setSelectDates({
        from: nowDate.startOf('isoWeek').toDate(),
        to: nowDate.endOf('isoWeek').toDate()
      })
    } else if (type === 'month') {
      const nowDate = moment().subtract(1, 'month')
      setSelectDates({
        from: nowDate.startOf('month').toDate(),
        to: nowDate.endOf('month').toDate()
      })
    }

  }, [type])

  return (
    <Container>
      <div>
        <FlexBox>
          <DateTypeCalendar type={type} selectDate={selectDate} selectDates={selectDates}
                            onChangeSelectDate={(v, type) => {
                              if (type === 'day') {
                                setSelectDate(v)
                              } else {
                                setSelectDates(v)
                              }
                            }}/>
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
          {
            type === 'week'
              ? `${moment(selectDates.from).format('yyyy.MM.DD')} ~ ${moment(selectDates.to).format('yyyy.MM.DD')}`
              : type === 'month'
              ? moment(selectDates.from).format('yyyy.MM')
              : moment(selectDate).format('yyyy.MM.DD')}
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
