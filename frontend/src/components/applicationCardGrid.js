import React, { useEffect, useState } from "react";
import LinkedIn_logo from '../assets/li_logo.png'
import { Link } from "react-router-dom";
import { baseurl } from "../store/baseurl";
import Axios from "axios";
import { BsFillPencilFill } from 'react-icons/bs';
import ApplicantsCv from "./latestApplicationsCardComponents/applicantsCv";
import ApplicantsLinkedIn from "./latestApplicationsCardComponents/applicantsLinkedIn";
import ApplyDate from "./latestApplicationsCardComponents/applyDate";
import BootcampType from "./latestApplicationsCardComponents/bootcampType";
import ApplicationStatus from "./latestApplicationsCardComponents/applicationStatus";
import Bootcamptime from "./latestApplicationsCardComponents/bootcampTime";
import InterviewStatus from "./latestApplicationsCardComponents/interviewStatus";

const ApplicationCardGrid = (props) => {
  const editPage = `/editApplication/${props.data.id}`

  const openCV = async () => {
    console.log('Hello')
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
    // <div className="flex border-blue-500 border-4 w-sixty ">
    <div className="flex flex-col w-forty p-6 bg-white rounded-lg ">
      {/* TAGS */}
      <div className="h-tenP flex flex-row justify-center items-center">
        <BootcampType type={props.data.bootcamp.type}/>
        <ApplicationStatus status={props.data.status}/>
        <Bootcamptime time={props.data.time}/>
      </div>
      <div className="flex justify-center h-1/5 items-center">
        <h1 className="font-bold text-4xl">{props.data.first_name} {props.data.last_name}</h1>
      </div>
      <div className="flex h-1/5 flex-row justify-evenly">
          <ApplicantsCv onClick={openCV} />
          <ApplicantsLinkedIn link={props.data.linkedin_profile}/>
      </div>
      <div className="flex h-2/5 justify-start border-2 border-gray ">
      <ul className="pl-4 list-disc w-full">
        <li><p>Personal Interview</p> <InterviewStatus InterviewStatus={props.data.personal_passed}/></li>
        <li><p>Technical Interview</p> <InterviewStatus InterviewStatus={props.data.technical_passed}/></li>
        <li><p>Enrolled</p> <InterviewStatus status={props.data.status}/></li>
      </ul>  
        
          
      </div>
      <div className="h-tenP flex justify-evenly">
        <ApplyDate applied={props.data.applied} />
        <BsFillPencilFill className="w-4 h-4"/>
      </div>

    </div>
    // </div>
  )
}
export default ApplicationCardGrid;