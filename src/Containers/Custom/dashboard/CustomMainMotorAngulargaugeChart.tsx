import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
  width: 400,
}

interface Props {
  value: number | undefined
}

const CustomMainMotorAngulargaugeChart: React.FunctionComponent<Props> = ({ value }) => {
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
          <p style={{
            textAlign: 'center', fontSize: 48, fontWeight: 'bold', fontFamily: 'NotoSansCJKkr',
          }}>메인 모터 부하량</p>
        </div>
        <GaugeChart
            id="mainMotor-chart"
            nrOfLevels={25}
            colors={[ 'rgba(255, 255, 255, .7)' ]}
            // percent={value ? Math.floor(value) / 100 : 0}
            value={percent}
            formatTextValue={(value) => value}
            needleColor={'#FFFFFF'}
            needleBaseColor={'#FFFFFF'}
            style={chartStyle}/>
      </div>
  )
}

export default CustomMainMotorAngulargaugeChart
