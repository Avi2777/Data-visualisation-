import React, { useEffect, useState } from "react";
import LinkedIn_logo from '../assets/li_logo.png'
import {Link, useNavigate} from "react-router-dom";
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

const ApplicationCard = (props) => {
  const editPage = `/editApplication/${props.data.id}`


  const openCV = async () => {
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

  const sayHello = () => {
      console.log('hello')
  }
  return (
    <div className="w-2/3 bg-white p-5 pt-1 pb-2 rounded-lg">
      {/* TAGS */}
      <div className="flex gap-2 items-center p-2 pl-0">
        <BootcampType type={props.data.bootcamp.type}/>
        <ApplicationStatus status={props.data.status}/>
        <Bootcamptime time={props.data.time}/>
      </div>
      <div className="flex w-full py-1">
        <div className="flex grow items-center gap-5">
          <p className="font-bold text-2xl">{props.data.first_name} {props.data.last_name}</p>
          <ApplicantsCv cv={props.data.cv} function={openCV} />
          <ApplicantsLinkedIn link={props.data.linkedin_profile}/>
        </div>
        <div className="w-5/12 border-l-2 border-gray-300 flex-col pl-5 items-center">
          <div className="flex place-content-between"><p>Personal Interview</p> <InterviewStatus InterviewStatus={props.data.personal_passed}/> </div>
          <div className="flex place-content-between"><p>Technical Interview</p> <InterviewStatus InterviewStatus={props.data.technical_passed}/> </div>
          <div className="flex place-content-between"><p>Enrolled</p> <InterviewStatus status={props.data.status}/> </div>
        </div>
      </div>
      <div className="flex place-content-between pt-2">

        <Link to={editPage}><BsFillPencilFill className="w-4 h-4 border-solid"/></Link>
      </div>
    </div>
  )
}
export default ApplicationCard