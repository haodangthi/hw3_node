import React  from "react";
import { Button } from "../../components/Button";
import {Dimension} from "../Truck/Dimension"
export function LoadInfo(props) {
    return (
      <div className="card-content">
        <div className="load-info">
          <Info infoTitle="Status:" infoDetail={props.info.status} />
          <Info infoTitle="State:" infoDetail={props.info.loadState} />
          <Info infoTitle="Payload:" infoDetail={props.info.payload} />
          <Info infoTitle="Date of creation:" infoDetail={props.info.date} />
          <Dimension infoTitle="Dimension:" infoDetail={props.info.dimension} />
          <Button
            btnName="Post"
            onClick={props.onClick.post}
          />
          <Button btnName="Delete the load" onClick={props.onClick.delete} />
        </div>
      </div>
    );
  }
  

  function Info(props) {
    return (
      <h6>
        {props.infoTitle}
        <span>{props.infoDetail}</span>
      </h6>
    );
  }