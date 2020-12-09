import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import DateTypeCalendar from '../Modal/DateTypeCalendar'
import moment from 'moment'
import ProductionPickerModal from '../Modal/ProductionPickerModal'

// KPI
interface IProps {
  // data: { number: number, increase: boolean }
  type: 'month' | 'week' | 'day'
  setType?: (type: 'month' | 'week' | 'day') => void
  getData?: (from: Date, to: Date, index: number, pk?: string) => Promise<any>
  index?: number
  value?: any
  subTitleList?: { total?: string, comply?: string, error?: string }
}

const KPICompareBox = ({type, setType, getData, index, value, subTitleList}: IProps) => {
  const [data, setData] = useState<any>({})

  const [selectDate, setSelectDate] = useState<Date>(moment().subtract(1, 'days').toDate())
  const [selectDates, setSelectDates] = useState<{ from: Date, to: Date }>({
    from: moment().subtract(2, 'day').toDate(),
    to: moment().subtract(1, 'day').toDate(),
  })

  const [selectMaterial, setSelectMaterial] = useState<{ name: string, pk: string }>()

  useEffect(() => {
    if (value.api !== 'manufacturing_leadTime_reduced_rate') {
      if (getData) {
        if (type === 'day') {
          getData(selectDate, selectDate, index ? index : 0).then((ratio) => {
            setData(ratio)
          })
        } else {
          getData(selectDates.from, selectDates.to, index ? index : 0).then((ratio) => {
            setData(ratio)
          })
        }
      }
    }
  }, [type, selectDate, selectDates, value])

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

  React.useEffect(() => {
    if (selectMaterial && index !== undefined) {
      getData && getData(selectDate, selectDate, index, selectMaterial.pk).then((ratio) => {
        setData(ratio)
      })
    }
  }, [selectMaterial])

  return (
    <Container>
      <div>

        {
          value.api !== 'manufacturing_leadTime_reduced_rate' ? <React.Fragment>
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
                             checked={type === 'day'}
                             onClick={() => {
                               setType('day')
                             }}/>
                      <label htmlFor="day"><span style={{marginLeft: 25}}>일</span></label>

                      <input type="radio" id="week" name="type"
                             checked={type === 'week'}
                             onClick={() => {
                               setType('week')
                             }}/>
                      <label htmlFor="week"><span style={{marginLeft: 25}}>주</span></label>

                      <input type="radio" id="month" name="type"
                             checked={type === 'month'}
                             onClick={() => {
                               setType('month')
                             }}/>
                      <label htmlFor="month"><span style={{marginLeft: 25}}>월</span></label>
                  </div>
                }
              </FlexBox>
            </React.Fragment>
            : <React.Fragment>
              <div style={{width: 371}}>
                {
                  <ProductionPickerModal filter={30} innerWidth={371} onClickEvent={(e) => {
                    setSelectMaterial(e)
                  }}
                                         select={{name: selectMaterial?.name, pk: selectMaterial?.pk}}
                                         text={'품목을 선택해주세요'}/>
                }
              </div>
            </React.Fragment>
        }

        <div style={{display: 'flex', justifyContent: 'row'}}>
          {
            Object.keys(data).map((v) => {
              if (v === 'data') {
                return
              }
              return (
                <div style={{height: 65, width: 160, marginRight: 16}}>
                  <div style={{width: 112, height: 20}}>
                    <p style={{fontSize: 14}}>{subTitleList && subTitleList[v]}</p>
                  </div>
                  <div style={{width: 160, height: 41}}>
                    <p style={{
                      textAlign: 'right',
                      fontSize: 20
                    }}>{!isNaN(Number(data[v])) ? Math.round(Number(data[v]) * 10) / 10 : data[v]}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div>
        <p>{
          !isNaN(Number(data.data)) ? Math.round(Number(data.data) * 10) / 10 : data.data
        }
          {/*<span>{'(가동률)'}</span>*/}
        </p>
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
                    font-size: 30px;
                    vertical-align: bottom;
                    margin-bottom: 30px;
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
