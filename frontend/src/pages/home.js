import React, { useState, useEffect } from "react";
import Axios from "axios";
import { baseurl } from "../store/baseurl";
import AppsGraph from "../components/applicationsGraph";
import LatestApplicationsCard from "../components/latestApplicationsCard";
import ApplicationCardGrid from "../components/applicationCardGrid";
import UpComingBootcampsCard2 from "../components/upcomingBootcampsCard2";
import UpcomingBootcampsGraph from "../components/upcomingBootcampsGraph";
import MyResponsiveLine from "../components/testgraph";
import Footer from "../components/footer"
import CollapsableApplicationCard from "../components/collapsableApplicationCard";

const Home = () => {
  const [applicationsData, setLatestApplications] = useState([]);
  const [bootcampsData, setLatestBootcamps] = useState([]);
  const [applicationsGraphData, setApplicationsGraphData] = useState([]);
  const [applicationsGraphDataFiltered, setApplicationsGraphDataFiltered] =
    useState([]);

  const [numLatestApplications, setNumLatestApplications] = useState(100);
  const [numUpcomingBootcamps, setNumUpcomingBootcamps] = useState(100);

  // Axios.defaults.xsrfCookieName = 'csrftoken'
  // Axios.defaults.xsrfHeaderName = 'X-CSRFToken'

  useEffect(() => {
    const abortController = new AbortController();
    getLatestApplications();
    getLatestBootcamps();
    getApplicationsGraphData();
    getApplicationsGraphDataFiltered();
    return () => {
      abortController.abort();
    }
  }, []);

  const getLatestApplications = async () => {
    const response = await Axios(
      `${baseurl}applications/latest/${numLatestApplications}`
    );
    setLatestApplications(response.data);
  };

  const getLatestBootcamps = async () => {
    const response = await Axios(
      `${baseurl}bootcamps/upcoming/${numUpcomingBootcamps}`
    );
    setLatestBootcamps(response.data);
  };

  const getApplicationsGraphData = async () => {
    const response = await Axios.post(
      `${baseurl}applications/graph_data/dashboard/`
    );
    setApplicationsGraphData(response.data);
  };

  const getApplicationsGraphDataFiltered = async () => {
    const response = await Axios.post(
      `${baseurl}applications/graph_data/dashboard/`,
      { filtered: "1" }
    );
    setApplicationsGraphDataFiltered(response.data);
  };

  return (
    <div className="flex w-screen h-full">
      <div className="flex bg-background w-full h-full ">
        <div className="flex flex-col w-1/2 h-full  items-center ">
          <div className="flex h-1/2 w-cardsWidth3 justify-center items-center ">
            <div className="flex  w-full h-cardsHeight bg-offwhite shadow-lg rounded-lg ">
              <AppsGraph
                data={applicationsGraphData}
                filteredData={applicationsGraphDataFiltered}
              />
              {/* <MyResponsiveLine /> */}
            </div>
          </div>
          <div className="flex justify-center h-1/2 w-11/12 items-center ">
          <div className="flex flex-col gap-y-6  h-full w-full overflow-auto items-center justify-start">
          {/* Old flex display */}
          {/* <div className="flex flex-col gap-8 h-1/2 w-full justify-between overflow-auto items-center"> */}
          
            {applicationsData.slice(0, 20).map((item) => (
              <CollapsableApplicationCard data={item} key={item.id} status={true} />
            ))}
          </div>
          </div>
          
        </div>
        {/* <div
          className="flex w-full h-2/4 justify-start items-center mb-4
        "
        >
          <div className="flex flex-col h-full px-3 w-1/2  justify-evenly  items-center">
            {bootcampsData.slice(0,3).map((item) => ( */}

        <div className="flex flex-col w-1/2 h-full border-l-2 ">
          <div className="flex h-1/2 w-full items-center justify-center">
            <div className="flex w-cardsWidth3  h-cardsHeight bg-offwhite border border-gray-200  shadow-lg rounded-lg  ">
              <UpcomingBootcampsGraph data={bootcampsData} />
            </div>
          </div>
          <div className="flex  justify-center h-1/2 w-full items-center ">
          <div className="flex flex-col gap-y-6 h-full w-11/12 justify-between  items-center overflow-auto ">
            {bootcampsData.slice(0, 20).map((item) => (
              <UpComingBootcampsCard2 data={item} key={item.id} status={true}/>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
