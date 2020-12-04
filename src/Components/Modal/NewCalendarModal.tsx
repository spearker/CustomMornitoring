import React, {useState} from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import 'react-day-picker/lib/style.css'
import Modal from 'react-modal'

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

const getWeekRange = (date) => {
  return {
    from: moment(date)
      .startOf('week')
      .toDate(),
    to: moment(date)
      .endOf('week')
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

const NewCalendarModal = ({type}: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  const [hoverRange, setHoverRange] = React.useState<ISelectDate | undefined>(undefined)
  const [selectedDays, setSelectDay] = React.useState<Date[]>([])
  const [daysAreSelected] = React.useState(selectedDays.length > 0)

  const handleDayChange = date => {
    if (type === 'day') {
      setSelectDay([moment(date).toDate()])
    } else if (type === 'week') {
      setSelectDay(getWeekDays(getWeekRange(date).from))
    } else if (type === 'month') {
      setSelectDay(getMonthDays(getWeekRange(date).from))
    }
  }

  const handleDayEnter = date => {
    setHoverRange(getWeekRange(date))
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
              // hoverRange: {
              //   backgroundColor: '#EFEFEF',
              //   borderRadius: 0
              // }
            }}
          />
        </div>
      </Modal>
    </div>
  )
}


export default NewCalendarModal
