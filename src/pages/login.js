import React from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from 'react-with-firebase-auth';
import firebaseConfig from '../firebaseConfig/firebaseConfig'

import {BrowserRouter as Router, Route, Redirect, Link, useHistory} from 'react-router-dom';

// import Cadastro from '../pages/cadastro'
import Input from '../components/input';
import Button from '../components/button';
import A from '../components/a';
// import { userInfo } from 'os';
// import Title from '../components/title';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebase.auth();
const database = firebase.database();
// const history = useHistory();

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            senha: ""
        }
    }

    handleChange = (e, element) => {
        const newState = this.state;
        newState[element] = e.target.value;
        this.setState(newState);
    }

    handleClick = () => {
        const infos = {
            email: this.state.email,
            senha: this.state.senha
        }
        this.loginUser();
    }
    
    loginUser = () => {
        this.props.signInWithEmailAndPassword(this.state.email,
            this.state.senha)
            .then((resp) => {
                if(resp.code != 'auth/invalid-email'){
                    this.props.history.push("/home")
                    let userId = firebaseAppAuth.currentUser.uid;
                    database.ref('/users/' + userId).once('value')
                        .then(function (snapshot) {
                            let userEmail = (snapshot.val() && snapshot.val().email);
                        })
                }
            })
    }

    render() {
        return (
            <Router>
                <div className="login">
                    {/* <Logo className="logo-bq" height="200px" width="auto" /> */}
                    <Input getValue={(e) => this.handleChange((e), 'email')} typet="text" name="Email" />
                    <Input getValue={(e) => this.handleChange((e), 'senha')} typet="password" name="Senha" />
                    <Button style={{backgroundColor: "#69306D", fontWeight: 500}} onClick={this.handleClick} name="ENTRAR" />
                    <Link to="/cadastro"><A style={{backgroundColor:"transparent", color: "#00695c", border: "none", boxShadow: "none", fontWeight: 700}} name="PRIMEIRO ACESSO? CADASTRE-SE" /></Link>
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Login);
