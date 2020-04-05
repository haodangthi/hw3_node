import React from "react";
import {Dimension} from './Dimension'
import { Button } from "../../components/Button";
export function TruckInfo(props) {
    return (
      <div className="card-content">
        <div className="truck-info">
          <Info infoTitle="Status:" infoDetail={props.info.status} />
          <Info infoTitle="Truck Type:" infoDetail={props.info.truckType} />
          <Info infoTitle="Payload:" infoDetail={props.info.payload} />
          <Info infoTitle="Date of creation:" infoDetail={props.info.date} />
          <Dimension infoTitle="Dimension:" infoDetail={props.info.dimension} />
          <Button
            btnName={props.assignBtn}
            onClick={props.onClick.changeStatus}
          />
          <Button
            btnName="Delete the truck"
            onClick={props.onClick.deleteTruck}
          />
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
  