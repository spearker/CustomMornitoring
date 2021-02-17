import React from 'react'
import moment from 'moment'

const NowTime = () => {
  const [nowTime, setNowTime] = React.useState<string>(moment().format('YYYY-MM-DD (dd) HH:mm:ss'))

  React.useEffect(() => {
    const now = setInterval(() => {
      console.log('GOING')
      setNowTime(moment().format('YYYY-MM-DD (dd) HH:mm:ss'))
    }, 1000)

    return () => {
      clearInterval(now)
    }
  }, [])

  return <span>{nowTime}</span>
}

export default NowTime
