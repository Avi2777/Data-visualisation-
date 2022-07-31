import React from "react"
import { BsFillCheckCircleFill, BsFillXOctagonFill, BsFillQuestionCircleFill} from 'react-icons/bs'




const InterviewStatus =(props)=>{
    
    return(
        <div className="flex items-center">
           {props.InterviewStatus === true && props.status === undefined ? <BsFillCheckCircleFill color="green"/> : ''}
           {props.InterviewStatus === false && props.status === undefined ? <BsFillXOctagonFill color="red"/> : ''}
            {props.InterviewStatus === null && props.status === undefined ? <BsFillQuestionCircleFill color="gray" /> : ''}
            {props.InterviewStatus === undefined && props.status === 'enrolled' ? <BsFillCheckCircleFill color="green" /> : ''}
            {props.InterviewStatus === undefined && props.status === 'dropped_out' ? <BsFillXOctagonFill color="red"/> : ''}
            {props.InterviewStatus === undefined && props.status !== 'enrolled' && props.status !== 'dropped_out' ? <BsFillQuestionCircleFill color="gray" /> : ''}
        </div>

    );
}

export default InterviewStatus;