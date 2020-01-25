import React from 'react';

function Anchor(props) {
    return (
        <div>
            <a style={{backgroundColor:"transparent", color: "#00695c", border: "none", boxShadow: "none", fontWeight: 700}} className="waves-effect waves-light btn" onClick={props.onClick}>{props.name}</a>
        </div>
    )
}

export default Anchor;
