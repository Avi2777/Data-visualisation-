import React, {useEffect} from "react"
import { AiOutlineFileText } from "react-icons/ai";


const ApplicantsCv =(props)=>{

    return(
        <>
            { props.cv === undefined || props.cv === "" || props.cv === null  ?
            <div onClick={props.function} className="flex w-8 h-8 bg-gray-300 rounded text-white font-bold justify-center items-center border border-gray-400 cursor-not-allowed">
                <AiOutlineFileText/>
            </div>
                :
            <div onClick={props.function} className="flex w-8 h-8 bg-lime-500 rounded text-white font-bold justify-center items-center border border-lime-700 cursor-pointer">
                <AiOutlineFileText/>
            </div>}
        </>
    );
}

export default ApplicantsCv;