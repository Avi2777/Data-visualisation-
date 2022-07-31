import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

function AppsGraph(props) {
  const [requestedData, setRequestedData] = useState(props.filteredData);
  const [chartData, setChartData] = useState([]);
  const originalColors = ["#FDDB93", "#D68D96", "#819FB3", "#AFDAA3"];
  const [chartColors, setChartColors] = useState(originalColors);
  const [toggleValue, setValue] = useState(true);
  const [tickValues, setTickValues] = useState([])
  const [maxTickValue, setMaxTickValue] = useState(0)

  //checking the toggle value to show all or only filtered values
  useEffect(() => {
    const abortController = new AbortController();
    // setMaxTickValue(getTickValue(props.data) + 1);
    toggleValue
      ? setRequestedData(props.filteredData)
      : setRequestedData(props.data);
    toggleValue
      ? setChartData(getChartData(props.filteredData))
      : setChartData(getChartData(props.data));
    return () => {
      abortController.abort();
    }
  }, [props, toggleValue]);


  //function to convert API data into a format that can be used by Nivo Charts
  function getChartData(requestedData) {
    const data = [
      "part_time_bootcamps",
      "short_courses",
      "immersive_bootcamps",
      "total",
    ].map(function (item, index) {
      const courseNames = [
        "Part-time Bootcamps",
        "Short Courses",
        "Full-time Bootcamps",
        "Total Bootcamps",
      ];

      const monthData = [];
      for (const key in requestedData) {
        const obj = {
          x: `${requestedData[key].month} ${requestedData[key].year}`,
          y: requestedData[key][item],
        };
        monthData.push(obj);
      }
      return {
        id: courseNames[index],
        data: monthData,
      };
    });
    return data;
  }

  function getTickValue(data) {
    const tickValues = []
    for (const key in data) {
      tickValues.push(parseInt(data[key].total))}
    return (Math.max(...tickValues))
  }


  const data = getChartData(requestedData);

  //toggle component for filtering data

  const Switch = ({ isOn, handleToggle, onColor }) => {
    return (
      <div className="flex flex-row ml-10">
        <span className="text-s text-gray-900 px-3 justify-content">Total</span>
        <label className="relative flex items-center cursor-pointer ">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only peer "
            checked={isOn}
            onChange={handleToggle}
          />
          <div className="h-6 bg-gray-300 border-2 border-toggelButton rounded-full w-11  after:absolute after:left-0.5 after:bg-toggelButton after:border after:border-gray-200 after:h-5 after:w-5 after:shadow-sm after:rounded-full peer-checked:after:translate-x-full peer-checked:after:border-toggelButton  peer-checked:bg-backgroud peer-checked:border peer-checked:border-toggelButton after:transition-all after:duration-300"></div>
          
        </label>
        <span className="ml-2 text-s text-gray-900 ">Enrolled</span>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col h-full w-full p-4">
        <div className="flex flex-row w-full items-center justify-between p-6">
        <div className="flex font-bold text-xl">
        Distribution of Applications</div>
            <Switch
              isOn={toggleValue}
              handleToggle={() => setValue(!toggleValue)}
            />
        </div>
        {props === null && chartData === [] ? (
        <p>Loading...</p>
      ) : (
          <ResponsiveLine
            data={chartData}
            curve='monotoneX'
            blendMode='multiply'
            margin={{ top: 20, right: 80, bottom: 110, left: 80  }}
            colors={chartData.map((c, index) => chartColors[index])}
              lineWidth={0}
            xScale={{
              type: 'point',
            }}
            yScale={{
              type: 'linear',
              min: '0',
              max: '10',
              stacked: false,
              reverse: false
              }}
            // yFormat=' >-.2f'
            gridYValues={11}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 10,
              tickRotation: 0,
              tickValues: 11,
              format: (v) => {
                return v.substring(0, 3);
              }
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 10,
              tickRotation: 0,
              tickValues: 10
              // legend: 'students',
              // legendOffset: -40,
              // legendPosition: 'middle'
            }}
            pointSize={0}
            enableArea={true}
            enableGridX={false}
            areaOpacity={1}
            areaBlendMode={'normal'}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'row',
                justify: false,
                translateX: -20,
                translateY: 85,
                itemWidth: 130,
                itemHeight: 26,
                itemsSpacing: 14,
                symbolSize: 22,
                symbolShape: 'square',
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                toggleSerie: true,
                symbolBorderColor: 'black',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            useMesh={true}
            isInteractive={true}
            pointLabelYOffset={0}
            tooltip={({ point, color }) => {
              return (
                <div className="bg-background px-5 border-toggelButton-200 border shadow-lg rounded-sm text-gray-500 text-center"
                >
                  <p className="text-m font-semibold">{point.serieId}</p>

                  <p className="text-xl"> {point.data.y} </p>
                </div>
              );
            }}
            onMouseEnter={(point, event) => {
              //get index of selected chart and get corresponding color
              const selectedIndex = chartData.findIndex(
                (item) => item.id === point.serieId
              );
              const selectedColor = chartColors[selectedIndex];

              //create new array of only the selected chart
              const newSortedData = [];
              newSortedData.push(chartData[selectedIndex]);
              setChartData(newSortedData);

              // set chart color as the selected color
              setChartColors([selectedColor]);
            }}
            onMouseLeave={(point, event) => {
              //revert the data and chart colors to the original state
              setChartColors(originalColors);
              setChartData(data);
            }}
          />)}
        </div>

    </>
  );
}
export default AppsGraph;
