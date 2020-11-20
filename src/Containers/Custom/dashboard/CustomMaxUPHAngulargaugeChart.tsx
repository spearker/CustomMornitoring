import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
    width: 400,
}

interface Props {
    maxValue: number | undefined
    value: number | undefined
}

const CustomMaxUPHAngulargaugeChart: React.FunctionComponent<Props> = ({maxValue, value}) => {
    return (
        <div>
            <div>
                <p style={{textAlign: 'center', fontSize: 45, fontWeight: 'bold'}}>UPH</p>
            </div>
            <GaugeChart
                id="UPH-chart"
                colors={['rgba(255, 255, 255, .7)']}
                nrOfLevels={25}
                formatTextValue={() => ''}
                percent={value ? value / (maxValue ? maxValue : 100) : 0}
                needleColor={'rgba(255, 255, 255, 1)'}
                needleBaseColor={'rgba(255, 255, 255, 1)'}
                style={chartStyle}/>
            <p style={{textAlign: 'center', fontSize: 48, fontWeight: 'bold'}}>{value}</p>
        </div>
    )
}

export default CustomMaxUPHAngulargaugeChart
