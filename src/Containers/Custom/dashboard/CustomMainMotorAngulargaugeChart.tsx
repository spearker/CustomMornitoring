import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
  width: 350,
}

const CustomMainMotorAngulargaugeChart: React.FunctionComponent = () => {
  const [ percent, setPercent ] = React.useState(Number(Math.random().toFixed(1)));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPercent(Number(Math.random().toFixed(1)))
    }, 10000)

    return () => clearTimeout(interval)
  }, [ percent ])

  return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ textAlign: 'center', fontSize: 38, fontWeight: 'bold' }}>메인 모터 부하량</p>
        </div>
        <GaugeChart
            id="mainMotor-chart"
            nrOfLevels={25}
            percent={percent}
            needleColor={'#FFFFFF'}
            needleBaseColor={'#FFFFFF'}
            style={chartStyle}/>
      </div>
  )
}

export default CustomMainMotorAngulargaugeChart
