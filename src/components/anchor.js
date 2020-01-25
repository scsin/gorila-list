import React from 'react';

function Anchor(props) {
    return (
        <div>
            <a style={props.style} className="waves-effect waves-light btn" onClick={props.onClick}>{props.name}</a>
        </div>
    )
}

export default Anchor;
