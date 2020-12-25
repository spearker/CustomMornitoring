import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
    width: 400,
}

interface Props {
    value: number | undefined
}

const CustomSlideMotorAngulargaugeChart: React.FunctionComponent<Props> = ({value}) => {
    return (
        <div>
            <div style={{marginBottom: 20}}>
                <p style={{textAlign: 'center', fontSize: 45, fontWeight: 'bold'}}>슬라이더 모터 부하량</p>
            </div>
            <GaugeChart
                id="slide-chart"
                colors={['rgba(255, 255, 255, .7)']}
                nrOfLevels={25}
                formatTextValue={() => ''}
                percent={value ? value : 0}
                needleColor={'rgba(255, 255, 255, 1)'}
                needleBaseColor={'rgba(255, 255, 255, 1)'}
                style={chartStyle}/>
            <p style={{textAlign: 'center', fontSize: 48, fontWeight: 'bold'}}>{value}</p>
        </div>
    )
}

export default CustomSlideMotorAngulargaugeChart
