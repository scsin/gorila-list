import React from 'react';

function Checkbox(props) {
    return(
        <label>
            <input type="checkbox"></input>
            <span>{props.item}</span>
        </label>
    )
}

export default Checkbox;
