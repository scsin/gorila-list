import React from 'react';

function Button(props) {
    return (
        <div>
            <button className="waves-effect waves-light btn #00bfa5 teal accent-4 Butt" onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

export default Button;
