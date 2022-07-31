import BootcampType from "./latestApplicationsCardComponents/bootcampType";
import ApplicationStatus from "./latestApplicationsCardComponents/applicationStatus";
import Bootcamptime from "./latestApplicationsCardComponents/bootcampTime";
import React, {useState, useEffect} from "react";
import ApplyDate from "./latestApplicationsCardComponents/applyDate";
import {BsArrowDownCircle, BsArrowUpCircle} from "react-icons/bs";
import InterviewStatus from "./latestApplicationsCardComponents/interviewStatus";
import ApplicantsCv from "./latestApplicationsCardComponents/applicantsCv";
import ApplicantsLinkedIn from "./latestApplicationsCardComponents/applicantsLinkedIn";
import Axios from "axios";
import {baseurl} from "../store/baseurl";
import {BsFillPencilFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import BootcampStartDate from "./latestApplicationsCardComponents/BootcampStartDate";

const CollapsableApplicationCard = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const editPage = `/editApplication/${props.data.id}`

    useEffect(() => {
        if (props.status === true) {
          setCollapsed(true)
        } 
      }, [props]);

    const openCV = async () => {
        const response = await Axios(
            `${baseurl}applications/loadCV/${props.data.id}`, {
                responseType: "blob",
            }
        )
            .then((response) => {
                //Create a Blob from the PDF Stream
                const file = new Blob([response.data], {type: "application/pdf"});
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                const pdfWindow = window.open();
                pdfWindow.location.href = fileURL;
            })
    }

    return (
        <div className="flex flex-col w-11/12 px-5 py-0 rounded-lg border-gray-200 border shadow-lg bg-offwhite justify-self-center ">
            <div className="h-14 flex flex-row justify-start items-center">
                <ApplicationStatus status={props.data.status}/>
                <BootcampType type={props.data.bootcamp.type} type2={props.data.bootcamp.bootcamp_type.name}/>
                <Bootcamptime time={props.data.time} time2={props.data.bootcamp.is_part_time}/>
            </div>
            <div className="flex justify-between mb-2  h-4 items-center py-1">
                <h1 className="font-bold  text-lg">{props.data.first_name} {props.data.last_name}</h1>
                <ApplyDate applied={props.data.applied}/>
                <BootcampStartDate start={props.data.bootcamp.start_date}/>
                <button onClick={() => setCollapsed(!collapsed)} className={props.status ? "border rounded-full border-black" : "hidden" }>{collapsed ? <BsArrowDownCircle className="w-6 h-6 color-blue-200"/> : <BsArrowUpCircle className="w-6 h-6 color-blue-200"/>}
                </button>
            </div>
            {/*<div className="flex justify-between pb-1">*/}
            {/*    */}
            {/*</div>*/}

            <div className={collapsed ? "hidden" : "flex flex-row  ease-linear border-t-2"}>
                <div className="flex place-items-center px-1 border-r-2 pr-5 " >
                    <Link to={editPage}><BsFillPencilFill className="w-6 h-6 "/></Link>
                </div>
                <div className="flex grow items-center gap-5 justify-center">
                    <ApplicantsCv cv={props.data.cv} function={openCV}/>
                    <ApplicantsLinkedIn link={props.data.linkedin_profile}/>
                </div>

                <div className="w-5/12 border-l-2 border-gray-300 flex-col pl-5 items-center">
                    <div className="flex place-content-between"><p>Personal Interview</p> <InterviewStatus
                        InterviewStatus={props.data.personal_passed}/></div>
                    <div className="flex place-content-between"><p>Technical Interview</p> <InterviewStatus
                        InterviewStatus={props.data.technical_passed}/></div>
                    <div className="flex place-content-between"><p>Enrolled</p> <InterviewStatus
                        status={props.data.status}/></div>
                </div>
            </div>


        </div>
    )
}

export default CollapsableApplicationCard