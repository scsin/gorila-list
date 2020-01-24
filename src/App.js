import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
          
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></script>

          <link href="https://fonts.googleapis.com/css?family=Flamenco&display=swap" rel="stylesheet" />

          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/home" component={Home} />
          </Switch>

        </header>
      </div>
    </Router>
  );
}

export default App;
