// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import React, {useEffect, useState} from 'react'
import {ResponsiveLine} from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveLine = ({data, max}) => {
  const [innerMax, setInnerMax] = useState<number>(100)
  useEffect(() => {
    console.log(max)
    setInnerMax(max)
  }, [max])

  return (<ResponsiveLine
    data={data}
    theme={{
      textColor: '#ffffff',
      axis: {
        ticks: {
          line: {
            stroke: '#777777'
          }
        }
      },
      grid: {
        line: {
          stroke: '#707070'
        }
      },
      tooltip: {
        container: {
          color: 'black'
        }
      }
    }}
    margin={{top: 50, right: 50, bottom: 50, left: 60}}
    xScale={{type: 'point'}}
    yScale={{type: 'linear', min: 0, max: max, stacked: true, reverse: false}}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Date',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}

    pointSize={10}
    pointColor={{theme: 'background'}}
    pointBorderWidth={2}
    pointBorderColor={{from: 'serieColor'}}
    pointLabelYOffset={-12}
    useMesh={true}
  />)
}
