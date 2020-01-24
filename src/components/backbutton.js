import React from 'react';
import { useHistory } from 'react-router-dom'

function BackButton({ children }, props) {
  let history = useHistory()
  return (
    <button type="button" onClick={() => history.goBack()}>
      {children}
      {props.name}
    </button>
  )
}

export default BackButton;
