import React from 'react';

function Input(props){
    return(
        <div>
            <form>
                <input type={props.type} className="Input" onChange={props.getValue} placeholder={props.name}></input>
            </form>
        </div>
    )
}

export default Input;
