import { BiExpandAlt } from "react-icons/bi";
import BootcampPieChart from "./bootcampPieChart";
import React, { useState, useEffect } from "react";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsFillPencilFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const UpComingBootcampsCard2 = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const editPage = `/editBootcamp/${props.data.id}`;

  useEffect(() => {
    if (props.status === true) {
      setCollapsed(true);
    }
  }, [props]);

  return (
    <div className="flex flex-col h-full w-3/4 shadow-lg rounded-lg bg-offwhite border border-gray-200 items-center  justify-start ">
      <div className="flex h-24  px-5 w-full items-center border-b border to-black justify-between rounded-lg bg-offwhite ">
        <div className="flex place-items-center  text-black">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={props.status ? "mr-3" : "hidden"}
          >
            {collapsed ? (
              <BsArrowDownCircle className="w-6 h-6 color-blue-200" />
            ) : (
              <BsArrowUpCircle className="w-6 h-6 color-blue-200" />
            )}
          </button>
          <Link className={props.status ? "hidden" : "mr-3"} to={editPage}>
            <button onClick={() => setCollapsed(!collapsed)}>
              <BsFillPencilFill className="w-6 h-6 color-blue-200" />
            </button>
          </Link>
          <div className="flex h-1/3 justify-center font-bold  text-lg">
            <p>{props.data.name}</p>
          </div>
        </div>
        <div className="flex justify-between place-items-center w-1/3">
          <div className="flex h-1/3 w-1/4 justify-center font-bold text-lg ">
            <p>{props.data.bootcamp_location}</p>
          </div>
          <div className="flex flex-col h-1/3 w-3/4 justify-center place-items-center">
            <p className="font-bold text-md">Start:</p>
            <p>{props.data.start_date}</p>
          </div>
        </div>
      </div>

      <div className={collapsed ? "hidden" : "flex p-6 h-3/4 w-full "}>
        <BootcampPieChart data={props.data.applications} />
      </div>
    </div>
  );
};

export default UpComingBootcampsCard2;
