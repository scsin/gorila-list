import React from 'react';

function Checkbox(props) {
    return(
        <label className="Checkbox">
            <input type="checkbox"></input>
            <span>{props.item}</span>
        </label>
    )
}

export default Checkbox;
