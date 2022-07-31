import React from "react";
import LinkedIn_logo from "../assets/li_logo.png";

const LatestApplicationsCard2 = (props) => {
  return (
    <div className="h-cardsHeight4 w-1/6  p-10  flex flex-col bg-white shadow-lg rounded-lg items-center justify-start text-xs">
      <div className="p-2 px-14 m-0 w-full h-1/6 flex justify-between border-2">
        <p>{props.data.status}</p>
        <p>{props.data.applied}</p>
      </div>
      <div className="p-2 px-14 m-0 w-full h-1/6 flex justify-between items-center">
        <p>{props.data.bootcamp.name}</p>
        <p>Bootcamp date: {props.data.bootcamp.start_date}</p>
      </div>

      <div className="p-2 px-8 m-0 flex flex-row w-full h-full">
        <div className=" w-2/4 text-center">
          <p>
            {props.data.first_name} {props.data.last_name}
          </p>
          <div className="flex flex-row justify-evenly items-center ">
            <p className="bg-gray-400 h-6 w-6 flex text-white rounded-3xl items-center justify-center">
              CV
            </p>
            <img
              className=" w-6 h-6"
              src={LinkedIn_logo}
              alt="LinkedIn Logo"
            ></img>
          </div>
        </div>
        <div className=" flex flex-col px-8 justify-evenly w-2/4 ">
          <div className="flex flex-row items-center justify-evenly">
            <p>personal interview: </p>
            <input type="checkbox"></input>
          </div>
          <div className="flex flex-row items-center justify-evenly">
            <p>technical interview: </p>
            <input type="checkbox"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestApplicationsCard2;
