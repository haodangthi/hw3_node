import React from "react";
import {LoadInput} from './LoadInput'
import { Button } from "../../components/Button";

export function CreateLoadForm(props) {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card ">
            <div className="card-content black-text">
              <h4>Create a Load</h4>
  
              <div className="row">
                <LoadInput id="width" label="Width" onChange={props.width} />
                <LoadInput id="length" label="Length" onChange={props.lenght} />
                <LoadInput id="height" label="Height" onChange={props.height} />
                <LoadInput
                  id="payload"
                  label="Payload"
                  onChange={props.payload}
                />
              </div>
            </div>
            <div className="card-action">
              <Button btnName="Create a load" onClick={props.onClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  