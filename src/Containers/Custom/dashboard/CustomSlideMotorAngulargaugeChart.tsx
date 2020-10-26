import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
  width: 400,
}

const CustomSlideMotorAngulargaugeChart: React.FunctionComponent = () => {


  return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ textAlign: 'center', fontSize: 38, fontWeight: 'bold' }}>슬라이더 부하량</p>
        </div>
        <GaugeChart
            id="slide-chart"
            colors={[ 'rgba(255, 255, 255, .7)' ]}
            nrOfLevels={25}
            percent={0}
            needleColor={'rgba(255, 255, 255, 1)'}
            needleBaseColor={'rgba(255, 255, 255, 1)'}
            style={chartStyle}/>
      </div>
  )
}

export default CustomSlideMotorAngulargaugeChart
