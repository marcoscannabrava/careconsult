import React from "react";

const CustomEvent = (event) =>{
    return(
        <div>
            <span>{event.title}</span>
            <span className="rbc-trash">X</span>
        </div>
    )
}

export default CustomEvent;