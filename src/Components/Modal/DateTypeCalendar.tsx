import React, {useState} from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import 'react-day-picker/lib/style.css'
import Modal from 'react-modal'
import IcDown from '../../Assets/Images/ic_reply_down.png'
import Calendar from 'react-calendar'
import Styled from 'styled-components'
import useOnclickOutside from 'react-cool-onclickoutside'

const WEEKDAYS_SHORT = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
}
const MONTHS = {
  ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
}

const WEEKDAYS_LONG = {
  ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
}

const FIRST_DAY_OF_WEEK = {
  ko: 1
}
// Translate aria-labels
const LABELS = {
  ko: {nextMonth: '다음달', previousMonth: '이전달'},
}

const getWeekDays = (weekStart) => {
  const days = [weekStart]
  for(let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    )
  }
  return days
}

const getMonthDays = (monthStart) => {
  const days: Date[] = []
  for(let i = 0; i < moment(monthStart).daysInMonth(); i += 1) {
    days.push(
      moment(monthStart).startOf('month')
        .add(i, 'days')
        .toDate()
    )
  }
  return days
}

const getRange = (date, type: 'month' | 'week') => {
  return {
    from: moment(date)
      .startOf(type === 'week' ? 'isoWeek' : type)
      .toDate(),
    to: moment(date)
      .endOf(type === 'week' ? 'isoWeek' : type)
      .toDate(),
  }
}

interface Props {
  type: 'day' | 'week' | 'month'
  selectDate?: Date
  selectDates?: ISelectDate
  onChangeSelectDate?: (v: any, type: 'day' | 'week' | 'month') => void
}

interface ISelectDate {
  from: Date,
  to: Date
}

const locale = 'ko'

const DateTypeCalendar = ({type, selectDate, selectDates, onChangeSelectDate}: Props) => {
  const [hoverRange, setHoverRange] = React.useState<ISelectDate | undefined>(undefined)
  const [selectedDays, setSelectDay] = React.useState<Date[]>([])

  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const ref = useOnclickOutside(() => {
    setIsOpen(false)
  })

  const handleDayChange = (date, modifiers) => {
    console.log(modifiers)
    if (modifiers.disabled || modifiers.today) {
      return
    }

    if (type === 'day') {
      setSelectDay([moment(date).toDate()])
    } else if (type === 'week') {
      setSelectDay(getWeekDays(getRange(date, 'week').from))
    } else if (type === 'month') {
      setSelectDay(getMonthDays(getRange(date, 'month').from))
    }
  }

  const handleDayEnter = date => {
    setHoverRange(getRange(date, 'week'))
  }

  const handleDayLeave = () => {
    setHoverRange(undefined)
  }

  const handleWeekClick = (weekNumber, days, e) => {
    setSelectDay(days)
  }

  React.useEffect(() => {
    if (type === 'day') {
      let today = moment(selectDate).toDate()
      setSelectDay([today])
    } else if (type === 'week') {
      setSelectDay(getWeekDays(selectDates && selectDates.from))
    } else if (type === 'month') {
      setSelectDay(getMonthDays(selectDates && selectDates.from))
    }
  }, [selectDate, selectDates, type])

  React.useEffect(() => {
  }, [selectedDays])
  

  return (
    <DropBoxContainer ref={ref}>
      <BoxWrap onClick={() => setIsOpen(!isOpen)}>
        <p className="p-bold" onClick={() => {
          setIsOpen(true)
        }} style={{display: 'inline-block', marginRight: 10}}>
          날짜 선택 &nbsp;
          {
            type === 'day'
              ? moment(selectedDays[0]).format('YYYY.MM.DD')
              : type === 'week'
              ? `${moment(selectedDays[0]).format('YYYY.MM.DD')} ~ ${moment(selectedDays[6]).format('YYYY.MM.DD')}`
              : moment(selectedDays[0]).format('YYYY.MM')
          }
        </p>
        <img src={IcDown} onClick={() => {
          setIsOpen(true)
        }} style={{width: 14, height: 14}}/>
      </BoxWrap>
      {
        isOpen &&
        <InnerBoxWrap>
            <BoxWrap style={{backgroundColor: 'white', flexDirection: 'row', display: 'flex'}}>
                <div style={{display: 'inline-block', float: 'left', flex: 1, marginRight: 20}}>
                    <div className="SelectedWeekExample">
                        <DayPicker
                            locale={locale}
                            months={MONTHS[locale]}
                            weekdaysLong={WEEKDAYS_LONG[locale]}
                            weekdaysShort={WEEKDAYS_SHORT[locale]}
                            firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
                            labels={LABELS[locale]}
                            selectedDays={selectedDays}
                            onDayClick={handleDayChange}
                            onDayMouseEnter={handleDayEnter}
                            onDayMouseLeave={handleDayLeave}
                            onWeekClick={handleWeekClick}
                            modifiers={
                              type === 'day'
                                ? {
                                  selectRange: selectedDays[0],
                                }
                                : {
                                  selectRange: {
                                    from: selectedDays[0],
                                    to: selectedDays[selectedDays.length - 1]
                                  },
                                }
                            }
                            disabledDays={(date) => {
                              if (type === 'day') {
                                return moment().toDate() <= date
                              } else if (type === 'week') {
                                return moment().startOf('isoWeek').toDate() <= date
                              } else if (type === 'month') {
                                return moment().startOf('month').toDate() <= date
                              }
                              return false
                            }}
                            modifiersStyles={
                              type === 'day' ?
                                {
                                  selectRange: {
                                    color: 'black',
                                    backgroundColor: '#fff7ba',
                                    borderLeftColor: '#fff7ba',
                                    borderRightColor: '#fff7ba',
                                    borderRadius: 0
                                  },
                                }
                                : {
                                  selectRange: {
                                    color: 'black',
                                    backgroundColor: '#fff7ba',
                                    borderLeftColor: '#fff7ba',
                                    borderRightColor: '#fff7ba',
                                    borderRadius: 0
                                  },
                                }
                            }
                        />
                    </div>
                </div>
            </BoxWrap>
        </InnerBoxWrap>
      }
    </DropBoxContainer>
  )
}

const DropBoxContainer = Styled.div`
    margin-left:10px; min-width: 100px;
    position:relative;
    display: inline-block;
    z-index:100;
`

const BoxWrap = Styled.button`
    padding: 0 8px 0 8px;
    border-radius: 5px;
    color: black;
    min-width: 100px;
    background-color: #b3b3b3;
    border: none;
    font-weight: bold;
    text-align: center;
    font-size: 13px;
    img {
    width: 14px;
    height: 14px;
    }
    .react-calendar{
        border: 0;
    }
`

const InnerBoxWrap = Styled.div`
    position: absolute;
    top: 0;
    left:0;
    text-align: left;
    margin-top: 32px;
`


export default DateTypeCalendar
