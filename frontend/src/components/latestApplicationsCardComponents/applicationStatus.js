import React, { useEffect } from "react"


const ApplicationStatus =(props)=>{
    let base_styling = "border border-gray-200 flex items-center shadow-inner h-1/2"

    return (
        <>
            {props.status == null ? <div className={base_styling + " bg-gray-400"}><p className="text-xs px-2 text-white">TO REVIEW</p></div> : '' }
            {props.status == "not_serious"? <div className={base_styling + " bg-yellow-400"}><p className="text-xs px-2 text-white">NOT SERIOUS</p></div> : '' }
            {props.status == "serious"? <div className={base_styling + " bg-serious"}><p className="text-xs px-2 text-white">SERIOUS</p></div> : '' }
            {props.status == "accepted"? <div className={base_styling + " bg-accepted"}><p className="text-xs px-2 text-white">ACCEPTED</p></div> : '' }
            {props.status == "enrolled"? <div className={base_styling + " bg-enrolled"}><p className="text-xs px-2 text-white">ENROLLED</p></div> : '' }
            {props.status == "dropped_out"? <div className={base_styling + " bg-dropped_out"}><p className="text-xs px-2 text-white">DROPPED OUT</p></div> : '' }
            {props.status == "graduated"? <div className={base_styling + " bg-amber-400"}><p className="text-xs px-2 text-white">GRADUATED</p></div> : '' }
            {props.status == "found_job"? <div className={base_styling + " bg-found_job"}><p className="text-xs px-2 text-white">FOUND JOB</p></div> : '' }
        </>
    );
}

export default ApplicationStatus;