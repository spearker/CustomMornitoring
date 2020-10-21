import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
  width: 350,
}

interface Props {
  value: number | undefined
}

const CustomMainMotorAngulargaugeChart: React.FunctionComponent<Props> = ({ value }) => {
  console.log('value :)', value && Math.floor(value))
  return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ textAlign: 'center', fontSize: 54, fontWeight: 'bold' }}>메인 모터 부하량</p>
        </div>
        <GaugeChart
            id="mainMotor-chart"
            nrOfLevels={25}
            colors={[ 'rgba(255, 255, 255, .7)' ]}
            percent={value ? Math.floor(value) / 100 : 0}
            formatTextValue={(value) => value}
            needleColor={'#FFFFFF'}
            needleBaseColor={'#FFFFFF'}
            style={chartStyle}/>
      </div>
  )
}

export default CustomMainMotorAngulargaugeChart
