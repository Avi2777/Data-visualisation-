import React, { useEffect, useState } from "react";
import LinkedIn_logo from '../assets/li_logo.png'
import { Link } from "react-router-dom";
import { baseurl } from "../store/baseurl";
import Axios from "axios";
import { BsFillPencilFill } from 'react-icons/bs';
import BootcampType from '../components/latestApplicationsCardComponents/bootcampType'
import ApplicationStatus from "./latestApplicationsCardComponents/applicationStatus";
import BootcampName from "./latestApplicationsCardComponents/bootcampName";
import ApplyDate from "./latestApplicationsCardComponents/applyDate";
import ApplicantsCv from "./latestApplicationsCardComponents/applicantsCv";
import ApplicantsLi from "./latestApplicationsCardComponents/applicantsLinkedIn";


const LatestApplicationsCard = (props) => {
 
  const editPage = `/editApplication/${props.data.id}`

  const openCV = async () => {
    console.log(props.data)
    const response = await Axios(
      `${baseurl}applications/loadCV/${props.data.id}`, {
        responseType: "blob",
      }
    )
    .then((response) => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
       const pdfWindow = window.open();
       pdfWindow.location.href = fileURL;            
    })
  }

  return (
    <div className="h-cardsHeight3 w-cardsWidth3 p-0 pt-2 m-0 flex flex-col shadow-lg rounded-lg items-center justify-start text-xs">
    {/* <BootcampType data={props}/> */}
    {/* <ApplicationStatus data={props}/> */}
    {/* <BootcampName data={props.data}/> */}
    {/* <ApplyDate data={props.data} /> */}
    {/* <ApplicantsCv data={props.data} />
    <ApplicantsLi data={props.data} /> */}
      <div className="p-2 px-14 mt-1 m-0 w-full h-1/6 flex justify-between items-end">
        <p>{props.data.status}</p>
        <p>{props.data.applied}</p>
      </div>
      <div className="p-2 px-14 m-0 w-full h-1/6 flex justify-between items-center bg-bootcampsNamesBackground">
        <p>{props.data.bootcamp.name}</p>
        <p>Bootcamp date: {props.data.bootcamp.start_date}</p>
      </div>

      <div className="p-2 px-8 m-0 flex flex-row w-full h-full bg-white rounded-bl-lg rounded-br-lg">



        <div className=" w-2/4 text-center ">
         <p>
          {props.data.first_name} {props.data.last_name}
         </p>
          <div className="flex flex-row justify-evenly items-center ">
            <Link to={editPage} ><p className="bg-gray-400 h-6 w-6 flex text-white rounded-3xl items-center justify-center">E</p> </Link>
            {/* CONDITIONAL RENDERING OF THE CV */}
            {/* {props.data.cv !== '' && props.data.cv !== null ? <p onClick={openCV} className="cursor-pointer bg-gray-400 h-6 w-6 flex text-white rounded-3xl items-center justify-center">CV</p> : ''} */}
            <p onClick={openCV} className="cursor-pointer bg-gray-400 h-6 w-6 flex text-white rounded-3xl items-center justify-center">CV</p>
            {/* CONDITIONAL RENDERING OF THE LINKEDIN-BUTTON */}
            {/* {props.data.linkedin_profile !== '' && props.data.linkedin_profile !== null ? <a href={props.data.linkedin_profile}><img className=" w-6 h-6" src={LinkedIn_logo} alt='LinkedIn Logo' /></a> : ''} */}
            <a href={props.data.linkedin_profile}><img className=" w-6 h-6" src={LinkedIn_logo} alt='LinkedIn Logo' /></a>
          </div>
        </div>
        <div className=" flex flex-col px-8 justify-evenly w-2/4 border-2 border-solid border-gray-400 rounded-md ">
          <div className="flex flex-row items-center justify-evenly ">
            <p>personal interview: </p>
            <input type='checkbox'></input>
          </div>
          <div className="flex flex-row items-center justify-evenly">
            <p>technical interview: </p>
            <input type='checkbox'></input>
          </div>
        </div>
        <div className="flex items-center justify-center w-6 pl-2">
          <BsFillPencilFill className="w-4 h-4 border-solid"/>
        </div>
      </div>
    </div>
  );
};

export default LatestApplicationsCard;
