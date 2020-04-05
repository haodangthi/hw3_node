import React from "react";

export function ProfileData(props) {
  return (
    <div className="card-action">
      <ProfileDataItem dataTitle="Email:" data={props.email} />
    </div>
  );
}

function ProfileDataItem(props) {
  return (
    <h6>
      {props.dataTitle} <span className="data__container">{props.data} </span>
    </h6>
  );
}
