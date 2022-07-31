import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './../tailwind.config.js'
// const twFullConfig = resolveConfig(tailwindConfig)

function BootcampPieChart(props) {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setData(props.data);
    setChartData(getChartData(props.data));
  }, [props]);

  function getChartData(requestedData) {
    const data = [
      "Serious",
      "Not Serious",
      "Accepted",
      "Enrolled",
      "To Review",
      "Dropped Out",
    ];

    const allColors = {
      enrolled: "#819FB3",
      serious: "#AFDAA3",
      accepted: "#7AB495",
      dropped_out: "#996D99",
      not_serious: "#D68D96",
      to_review: "#FDDB93",
      total: "#000000",
    };

    const chartData = [];
    for (const [index, [key, value]] of Object.entries(
      Object.entries(requestedData)
    )) {
      if (key === "total" || key === "else") {
      } else {
        chartData.push({
          id: data[index],
          value: value,
          color: allColors[key],
        });
      }
    }
    return chartData;
  }

  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0;
    dataWithArc.forEach((datum) => {
      total += datum.value;
    });

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "52px",
          fontWeight: 500,
        }}
      >
        {total}
      </text>
    );
  };

  return (
    <div className="h-full w-full m-0 p-0">
      <ResponsivePie
        data={chartData}
        margin={{
          top: 200,
          bottom: 200,
          right: 100,
          left: 400,
        }}
        valueFormat=" >-"
        innerRadius={0.6}
        padAngle={0.7}
        // cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        // arcLabelsTextColor={{
        //     from: 'color',
        //     modifiers: [
        //         [
        //             'darker',
        //             2
        //         ]
        //     ]
        // }}
        legends={[
          {
            data: chartData.map((item, index) => {
              return {
                color: item.color,
                id: item.id,
                label: item.id,
              };
            }),
            anchor: "bottom",
            direction: "column",
            toggleSerie: true,
            justify: false,
            translateX: -350,
            translateY: 170,
            itemWidth: 108,
            itemHeight: 30,
            itemsSpacing: 0,
            symbolSize: 22,
            itemDirection: "left-to-right",
            text: {
              fontSize: "25px",
            },
          },
          {
            data: chartData.map((item, index) => {
              return {
                color: item.color,
                id: item.id,
                label: item.value,
              };
            }),
            anchor: "bottom",
            direction: "column",
            toggleSerie: true,
            justify: false,
            translateX: -220,
            translateY: 170,
            itemWidth: 108,
            itemHeight: 30,
            itemsSpacing: 0,
            symbolSize: 0,
            itemDirection: "left-to-right",
          },
        ]}
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          CenteredMetric,
        ]}
      />
    </div>
  );
}
export default BootcampPieChart;
