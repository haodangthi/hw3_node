import React from "react";
import { Button } from "../../components/Button";
export function Select(props) {
    return (
      <div className="card-action">
        <h4>Create a truck</h4>
        <div className="select">
          <select onChange={props.onChange}>
            <option>Sprinter</option>
            <option>Small Straight</option>
            <option>Large Straight</option>
          </select>
          <div className="select__arrow"></div>
        </div>
        <Button btnName="Create a truck" onClick={props.onClick} />{" "}
      </div>
    );
  }