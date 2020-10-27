import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
  width: 400,
}

interface Props {
  value: number | undefined
}

const CustomSPMMotorAngulargaugeChart: React.FunctionComponent<Props> = ({ value }) => {
  return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ textAlign: 'center', fontSize: 48, fontWeight: 'bold' }}>SPM</p>
        </div>
        <GaugeChart
            id="spm-chart"
            colors={[ 'rgba(255, 255, 255, .7)' ]}
            nrOfLevels={25}
            percent={value ? value : 0}
            formatTextValue={(value) => value}
            needleColor={'rgba(255, 255, 255, 1)'}
            needleBaseColor={'rgba(255, 255, 255, 1)'}
            style={chartStyle}/>
      </div>
  )
}

export default CustomSPMMotorAngulargaugeChart
