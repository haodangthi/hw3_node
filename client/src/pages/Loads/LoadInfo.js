import React, {useContext} from "react";
import { Button } from "../../components/Button";
import {Dimension} from "../Truck/Dimension"
import UserContext from "../../hooks/UserContext";
export function LoadInfo(props) {
  const isDriver=useContext(UserContext).isDriver;
    return (
      <div className="card-content">
        <div className="load-info">
          <Info infoTitle="Status:" infoDetail={props.info.status} />
          <Info infoTitle="State:" infoDetail={props.info.loadState} />
          <Info infoTitle="Payload:" infoDetail={props.info.payload} />
          <Info infoTitle="Date of creation:" infoDetail={props.info.date} />
          <Dimension infoTitle="Dimension:" infoDetail={props.info.dimension} />
          {isDriver?"":<Button
            btnName="Post"
            onClick={props.onClick.post}
          />}
            {isDriver?"":<Button btnName="Delete the load" onClick={props.onClick.delete} />}
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