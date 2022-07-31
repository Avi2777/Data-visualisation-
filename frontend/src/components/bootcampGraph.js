import React, { useState, useEffect } from "react";
import { baseurl } from "../store/baseurl";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BootcampGraph(props) {
  const data = props.bootcamps;

  console.log(data);

  function getChartData(array) {
    const newArr = data.map(function (item, index) {
      const applicationsArray = item.applications.map(function (item) {
        return item.status;
      });

      console.log(applicationsArray);
      return {
        name: item.name,
        location: item.bootcamp_location,
        start_date: item.start_date,
        enrolled: applicationsArray.filter((x) => x == "enrolled").length,
        serious: applicationsArray.filter((x) => x == "serious").length,
        not_serious: applicationsArray.filter((x) => x == "not_serious").length,
      };
    });
    return newArr;
  }

  const chartData = getChartData(data);

  console.log(chartData);

  return (
    <ResponsiveContainer width={"99%"} height={300}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="enrolled" stackId="a" fill="#8884d8" />
        <Bar dataKey="serious" stackId="a" fill="#82ca9d" />
        <Bar dataKey="not_serious" stackId="a" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BootcampGraph;
