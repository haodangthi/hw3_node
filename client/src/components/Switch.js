
import React from "react";
export function Switch(props) {
    return (
      <div class="switch  isDriver">
        <label for="isDriver">
          I am a shipper
          <input id="isDriver" type="checkbox" onChange={props.onChange}/>
          <span class="lever"></span>I am a driver
        </label>
      </div>
    );
  }