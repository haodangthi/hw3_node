import React from "react";
export function ProfileData(props) {
    return (
      <div className="card-action">
        <h6>
          Email: <span className="data__container">{props.data.email} </span>
        </h6>
  
        <h6>
          Assigned truck:{" "}
          <span className="data__container">{props.data.assignedTruck} </span>
        </h6>
      </div>
    );
  }
  
  