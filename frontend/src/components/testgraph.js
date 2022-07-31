import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    "id": "japan",
    "color": "hsl(191, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 187
      },
      {
        "x": "helicopter",
        "y": 253
      },
      {
        "x": "boat",
        "y": 117
      },
      {
        "x": "train",
        "y": 219
      },
      {
        "x": "subway",
        "y": 23
      },
      {
        "x": "bus",
        "y": 211
      },
      {
        "x": "car",
        "y": 136
      },
      {
        "x": "moto",
        "y": 137
      },
      {
        "x": "bicycle",
        "y": 102
      },
      {
        "x": "horse",
        "y": 177
      },
      {
        "x": "skateboard",
        "y": 296
      },
      {
        "x": "others",
        "y": 61
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(8, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 23
      },
      {
        "x": "helicopter",
        "y": 110
      },
      {
        "x": "boat",
        "y": 246
      },
      {
        "x": "train",
        "y": 174
      },
      {
        "x": "subway",
        "y": 103
      },
      {
        "x": "bus",
        "y": 49
      },
      {
        "x": "car",
        "y": 114
      },
      {
        "x": "moto",
        "y": 248
      },
      {
        "x": "bicycle",
        "y": 48
      },
      {
        "x": "horse",
        "y": 69
      },
      {
        "x": "skateboard",
        "y": 213
      },
      {
        "x": "others",
        "y": 269
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(170, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 238
      },
      {
        "x": "helicopter",
        "y": 194
      },
      {
        "x": "boat",
        "y": 130
      },
      {
        "x": "train",
        "y": 138
      },
      {
        "x": "subway",
        "y": 174
      },
      {
        "x": "bus",
        "y": 11
      },
      {
        "x": "car",
        "y": 267
      },
      {
        "x": "moto",
        "y": 208
      },
      {
        "x": "bicycle",
        "y": 203
      },
      {
        "x": "horse",
        "y": 268
      },
      {
        "x": "skateboard",
        "y": 121
      },
      {
        "x": "others",
        "y": 172
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(245, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 271
      },
      {
        "x": "helicopter",
        "y": 58
      },
      {
        "x": "boat",
        "y": 114
      },
      {
        "x": "train",
        "y": 56
      },
      {
        "x": "subway",
        "y": 259
      },
      {
        "x": "bus",
        "y": 116
      },
      {
        "x": "car",
        "y": 224
      },
      {
        "x": "moto",
        "y": 111
      },
      {
        "x": "bicycle",
        "y": 60
      },
      {
        "x": "horse",
        "y": 19
      },
      {
        "x": "skateboard",
        "y": 95
      },
      {
        "x": "others",
        "y": 17
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(172, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 68
      },
      {
        "x": "helicopter",
        "y": 9
      },
      {
        "x": "boat",
        "y": 145
      },
      {
        "x": "train",
        "y": 57
      },
      {
        "x": "subway",
        "y": 209
      },
      {
        "x": "bus",
        "y": 259
      },
      {
        "x": "car",
        "y": 129
      },
      {
        "x": "moto",
        "y": 13
      },
      {
        "x": "bicycle",
        "y": 59
      },
      {
        "x": "horse",
        "y": 129
      },
      {
        "x": "skateboard",
        "y": 64
      },
      {
        "x": "others",
        "y": 174
      }
    ]
  }
]

const MyResponsiveLine = () => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
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
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaBlendMode="multiply"
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
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
    />
)

export default MyResponsiveLine;