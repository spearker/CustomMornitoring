// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import React, {useEffect, useState} from 'react'
import {ResponsiveLine} from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const NewMyResponsiveLine = ({data, max}) => {
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
    margin={{top: 50, right: 50, bottom: 80, left: 60}}
    xScale={{type: 'point'}}
    yScale={{type: 'linear', min: 0, max: max, stacked: false, reverse: false}}
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
      legend: 'W',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    colors={{ scheme: 'paired' }}
    pointSize={10}
    pointColor={{theme: 'background'}}
    pointBorderWidth={2}
    pointBorderColor={{from: 'serieColor'}}
    pointLabelYOffset={-12}
    useMesh={true}
    enableSlices={'x'}
    legends={[
      {
        anchor: 'bottom-left',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 75,
        itemsSpacing: 20,
        itemDirection: 'left-to-right',
        itemWidth: 105,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
  ]}
  />)
}
