import React from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from 'react-with-firebase-auth';
import firebaseConfig from '../firebaseConfig/firebaseConfig'

import {BrowserRouter as Router} from 'react-router-dom';

import Input from '../components/input';
import Button from '../components/button';
import Anchor from '../components/anchor';
import Logo from '../components/logo';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const database = firebaseApp.database();

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

    loginUser = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then((resp) => {
                if(resp.code !== 'auth/invalid-email'){
                    let userId = firebaseAppAuth.currentUser.uid;
                    database.ref('/users/' + userId).once('value')
                    this.props.history.push("/home")
                } else {
                    alert('Coloque seu email e senha')
                }
            })
            .catch(error => {
                alert('Usuário não cadastrado')
                this.props.history.push('/')
            })
    }

    Redirect = () => {
        this.props.history.push('/cadastro')
    }

    render() {
        return (
            <Router>
                <div className="login">
                    <Logo />
                    <Input getValue={(e) => this.handleChange((e), 'email')} type="text" name="Email" />
                    <Input getValue={(e) => this.handleChange((e), 'senha')} type="password" name="Senha" />
                    <Button onClick={this.loginUser} name="ENTRAR" />
                    <Anchor onClick={this.Redirect} name="PRIMEIRO ACESSO? CADASTRE-SE" />
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Login);
