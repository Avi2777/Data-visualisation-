import React from "react"


const BootcampStartDate =(props)=>{
    
    return(
        <div>
            <p className="text-xs font-bold">Bootcamp starts {props.start}</p>
        </div>
    );
}

export default BootcampStartDate;