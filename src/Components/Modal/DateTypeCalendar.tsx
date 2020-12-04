import React, {useState} from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import 'react-day-picker/lib/style.css'
import Modal from 'react-modal'

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
      .startOf(type)
      .toDate(),
    to: moment(date)
      .endOf(type)
      .toDate(),
  }
}

interface Props {
  type: 'day' | 'week' | 'month'
}

interface ISelectDate {
  from?: Date,
  to?: Date
}

const locale = 'ko'

const DateTypeCalendar = ({type}: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  const [hoverRange, setHoverRange] = React.useState<ISelectDate | undefined>(undefined)
  const [selectedDays, setSelectDay] = React.useState<Date[]>([])

  const handleDayChange = date => {
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

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0
          },
          overlay: {
            background: 'rgba(0,0,0,.6)',
            zIndex: 5
          }
        }}
      >
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
            modifiers={{
              selectRange: {
                from: selectedDays[0],
                to: selectedDays[selectedDays.length - 1]
              },
            }}
            modifiersStyles={{
              selectRange: {
                color: 'black',
                backgroundColor: '#fff7ba',
                borderLeftColor: '#fff7ba',
                borderRightColor: '#fff7ba',
                borderRadius: 0
              },
            }}
          />
        </div>
      </Modal>
    </div>
  )
}


export default DateTypeCalendar
