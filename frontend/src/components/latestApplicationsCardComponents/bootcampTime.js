import React from "react"


const Bootcamptime =(props)=>{
    let base_styling = "border border-blue-100 flex items-center shadow-inner h-1/2"

    return (
        <>
            {props.time == "part-time" || props.time2 == true? <div className={base_styling + " bg-accepted"}><p className="text-xs px-2 text-white">PART-TIME</p></div> : '' }
            {props.time == "full-time" || props.time2 == false? <div className={base_styling + " bg-blue-300"}><p className="text-xs px-2 text-white">FULL-TIME</p></div> : '' }
        </>

    );
}

export default Bootcamptime;