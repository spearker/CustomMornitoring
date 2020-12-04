import React from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import 'react-day-picker/lib/style.css'

function getWeekDays(weekStart) {
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

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('month')
      .toDate(),
    to: moment(date)
      .endOf('month')
      .toDate(),
  }
}

const Test = () => {
  const [hoverRange, setHoverRange] = React.useState<any>(undefined)
  const [selectedDays, setSelectDay] = React.useState<any[]>([])
  const [daysAreSelected] = React.useState(selectedDays.length > 0)

  const [modifiers, setModifiers] = React.useState({
    hoverRange,
    selectedRange: daysAreSelected && {
      from: selectedDays[0],
      to: selectedDays[hoverRange.length - 1],
    },
  })

  const handleDayChange = date => {
    setSelectDay(getWeekDays(getWeekRange(date).from))
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
              to: selectedDays[6]
            },
            hoverRange
          }}
          modifiersStyles={{
            selectRange: {
              color: 'black',
              backgroundColor: '#fff7ba',
              borderTopColor: '#ffeb3b',
              borderBottomColor: '#ffeb3b',
              borderLeftColor: '#fff7ba',
              borderRightColor: '#fff7ba',
              borderRadius: 0
            },
            hoverRange: {
              backgroundColor: '#EFEFEF',
              borderRadius: 0
            }
          }}
        />
      </div>
    </div>
  )
}


export default Test
