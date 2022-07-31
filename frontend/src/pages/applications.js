import React, { useState, useEffect } from "react";
import { baseurl } from "../store/baseurl";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import CollapsableApplicationCard from "../components/collapsableApplicationCard";
import AppsGraph from "../components/applicationsGraph";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [start_date, setStartDate] = useState("");
  const [applied_date, setAppliedDate] = useState("");
  const [status, setStatus] = useState("");
  const [bootcamp_location, setBootcampLocation] = useState("");

  const [applicationsData, setLatestApplications] = useState([]);
  const [applicationsGraphData, setApplicationsGraphData] = useState([]);
  const [applicationsGraphDataFiltered, setApplicationsGraphDataFiltered] =
    useState([]);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    getLocations();
    getLatestApplications();
    getApplicationsGraphData();
    getApplicationsGraphDataFiltered();
    return () => {
      abortController.abort();
  }
  }, [start_date, status, bootcamp_location, applied_date]);

  const getLocations = async () => {
    const response = await Axios(`${baseurl}locations/all/`);
    setLocations(response.data);
  };

  const getLatestApplications = async () => {
    const bodyContent = {}
    function ifExists(name, data) {
      if (data === "") {
        return null
      } else {
        bodyContent[name] = data;
      }
    }
    ifExists("bootcamp_location", bootcamp_location);
    ifExists("start_date", start_date);
    ifExists("status", status);
    ifExists("applied", applied_date);

    const response = await Axios.post(
      `${baseurl}applications/filter/`,
     bodyContent
    );
    setLatestApplications((response.data));
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
    <div className="flex flex-col w-full p-2 h-full bg-background ">
      <div className="flex border my-1 bg-offwhite  rounded-xl h-cardsT font-bold shadow-lg">
        <form className="flex w-full h-full  items-center justify-between px-20">
          Filters:
          <div className="border-b-2">
          <label className="pr-1">
            Location:
          </label>
            <select
              className="bg-offwhite"
              name="bootcamp_location"
              value={bootcamp_location}
              onChange={(e) => setBootcampLocation(e.target.value)}
            >
              <option value="" key="">
                All
              </option>
              {locations.map(function (item) {
                return (
                  <option  value={item.location} key={item.id}>
                    {item.location}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="border-b-2 border-grey-900">
          <label  className="pr-1">
            Bootcamp start on or after:
          </label>
            <input

              className="bg-offwhite"
              name="start_date"
              type="date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="border-b-2 border-grey-900">
          <label  className="pr-1">
            Applied on or after:
          </label>
            <input

              className="bg-offwhite"
              name="applied_date"
              type="date"
              value={applied_date}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>

          <div className="border-b-2">
          <label className="pr-1">
            Status:
          </label>
            <select
              className="bg-offwhite"
              name="status"
              value={status}
              id="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="enrolled">Enrolled</option>
              <option value="serious">Serious</option>
              <option value="accepted">Accepted</option>
              <option value= "to_review" >To Review</option>
              <option value="dropped_out">Dropped Out</option>
              <option value="not_serious">Not Serious</option>
            </select>
            </div>
        </form>
      </div>

      <div className="flex  w-full  h-cardsF justify-center">
        <div className="flex h-full w-cardsWidth2 bg-offwhite shadow-lg rounded-lg">
          <AppsGraph
            data={applicationsGraphData}
            filteredData={applicationsGraphDataFiltered}
          />
        </div>
        
      </div>
      <div className="flex  w-full h-cardsFF justify-center pt-8 items-center">
        <div className="flex h-full w-cardsWidth2">
          <div className="grid grid-cols-3 h-full w-full gap-y-6 overflow-auto">
            {applicationsData.map((item) => (
              <CollapsableApplicationCard data={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
