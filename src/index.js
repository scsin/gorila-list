import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios';

ReactDOM.render(<App />, document.getElementById('root'));

ServiceWorker.unregister();

const port = axios.create({baseURL: process.env.REACT_APP_GORILA_LIST})

export default port;
