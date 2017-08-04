import React from "react"
export default function Button(props) {
    return (
        <div>
            <input type="button"  value={props.value} name={props.name} onClick={props.onClick}/>
        </div>
    );
}