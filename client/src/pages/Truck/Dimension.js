import React from "react";
export function Dimension(props) {
    return (
      <h6>
        {props.infoTitle}
        <span className="truck-info__dimension">
          <span className="truck-info__width">{props.infoDetail.width}</span>x
          <span className="truck-info__length">{props.infoDetail.lenght}</span>x
          <span className="truck-info__height">{props.infoDetail.height}</span>
          {props.infoDetail.dimension}
        </span>
      </h6>
    );
  }
