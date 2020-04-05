import React from "react";

export function LoadInput(props) {
    return (
      <div class="input-field col s8">
        <input id={props.id} type="text" onChange={props.onChange} />
        <label for={props.id}>{props.label}</label>
      </div>
    );
  }