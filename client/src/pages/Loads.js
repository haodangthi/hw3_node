import React, { Component, useState } from "react";
import { Button } from "../components/Form";


export function Load(props){
    // const[id,setId]=useState(props.loadData.id)
    // const[loadState,setLoadState]=useState(props.loadData.state)
    // const[status,setStatus]=useState(props.loadData.status)
    // const[created_by,setCreatedBy]=useState(props.loadData.created_by)
    // const[assigned_to,setAssignedTo]=useState(props.loadData.assigned_to)
    // const[date,setDate]=useState(props.loadData.date)
    // const[dimension,setDimension]=useState(props.loadData.dimension)
    // const[payload,setPayload]=useState(props.loadData.payload)

    

    return( 
    <div className="row">
    <div className="col s6 offset-s3">
      <div className="card">
        <div className="card-content grey lighten-4 black-text">
          <h5>Load</h5>
        </div>

        <div className="card-content">
          <div className="truck-info">
            {/* <LoadInfo
              info={status,loadState,payload,dimension,date}
              assignBtn={this.state.assignBtn}
              onClick={{
                changeStatus: this.changeTruckStatus,
                deleteTruck: this.deleteTruck
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  </div>)
}

function LoadInfo(props) {
    return (
      <div className="card-content">
        <div className="load-info">
          <Info infoTitle="Status:" infoDetail={props.info.status} />
          <Info infoTitle="State:" infoDetail={props.info.state} />
          <Info infoTitle="Payload:" infoDetail={props.info.payload} />
          <Info infoTitle="Date of creation:" infoDetail={props.info.date} />
          <Dimension infoTitle="Dimension:" infoDetail={props.info.dimension} />
          <Button
            btnName="Post"
            //onClick={props.onClick.changeStatus}
          />
          <Button
            btnName="Delete the load"
            //onClick={props.onClick.deleteTruck}
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

  function Dimension(props) {
    return (
      <h6>
        {props.infoTitle}
        <span className="truck-info__dimension">
          <span className="truck-info__width">{props.infoDetail.width}</span>x
          <span className="truck-info__length">{props.infoDetail.length}</span>x
          <span className="truck-info__height">{props.infoDetail.height}</span>
          {props.infoDetail.dimension}
        </span>
      </h6>
    );
  }