import React from 'react';

function A(props) {
    return (
        <div>
            <a style={props.style} className="waves-effect waves-light btn" onClick={props.onClick}>{props.name}</a>
        </div>
    )
}

export default A;
