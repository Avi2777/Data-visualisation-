import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

function UpcomingBootcampsGraph(props) {
  //   const data = props.data;
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  const [tickValues, setTickValues] = useState([]);
  const [maxTickValue, setMaxTickValue] = useState(0);

  useEffect(() => {
    setData(props.data);
    setChartData(getChartData(props.data));
    setMaxTickValue(getTickValue(props.data) + 1);
  }, [props]);

  function getChartData(data) {
    const chartData = data.map(function (item, index) {
      // const legend = ["Name", "Enrolled", "Accepted", "Serious", "To Review", "Not Serious"]
      return {
        Name: item.name,
        Enrolled: item.applications.enrolled,
        Accepted: item.applications.accepted,
        Serious: item.applications.serious,
        "To Review": item.applications.to_review,
        "Not Serious": item.applications.not_serious,
      };
    });
    return chartData;
  }

  function getTickValue(data) {
    const tickValues = [];
    data.forEach((item) => tickValues.push(parseInt(item.applications.total)));
    return Math.max(...tickValues);
  }



  return (
    <div className="flex flex-col align-middle p-4 w-full">
      <div className="flex flex-col font-bold text-xl p-6">
        Bootcamps</div>
          {maxTickValue === 0 ? (
        <p>Loading...</p>
        ) : (
        <ResponsiveBar
          data={chartData}
          keys={["Not Serious", "To Review", "Serious", "Accepted", "Enrolled"]}
          indexBy="Name"
            margin={{
              top: 20, right: 140, bottom: 120, left: 80
            }}
          padding={0.7}
          valueScale={{ type: "linear" }}
          itemOpacity={1}
          indexScale={{ type: "band", round: true }}
          colors={["#D68D96", "#FDDB93", "#AFDAA3", "#7AB495", "#819FB3"]}
          borderColor={{
            from: "color",
            modifiers: [["darker", .6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 9,
            tickPadding: 7,
            tickRotation: -40,
            format: function (value) {
              return value.split(' ').slice(0,2).join(' ');
            }
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: 4,
          }}
          gridYValues={4}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          tooltip={({  id, value, color}) => {
            return (
                <div
                    style={{
                        background: 'black',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                        color,
                    }}
                >
                    <div className='p-3'>
                    <p>{id}:</p>
                    <p>{value}</p>
                    </div>
                </div>
            )
        }} 
          legends={[
            {
              dataFrom: "keys",
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 30,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 22,
              toggleSerie: true,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}

export default UpcomingBootcampsGraph;
