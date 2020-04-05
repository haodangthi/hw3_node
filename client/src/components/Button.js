import React, { Component } from "react";
export function Button(props) {
    return (
      <button
        className="btn waves-effect light-blue lighten-3 black-text"
       type="submit"
        name="action"
        onClick={props.onClick}
      
      >
        {props.btnName}
      </button>
    );
  }