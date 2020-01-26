import React from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from 'react-with-firebase-auth';

import {BrowserRouter as Router} from 'react-router-dom';

import Input from '../components/input';
import Button from '../components/button';
import Anchor from '../components/anchor';
import Logo from '../components/logo';

const firebaseAppAuth = firebase.auth();
const database = firebase.database();

class Cadastro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email:"",
            password: "",
            list: [false],
        }
    }

    handleChange = (e, element) => {
        const newState = this.state;
        newState[element] = e.target.value;
        this.setState(newState);
    }

    handleClick = () => {
        const infos = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            list: this.state.list,
        }
        this.createUser(infos);
    }

    createUser = (infos) => {
        firebaseAppAuth.createUserWithEmailAndPassword(this.state.email,
            this.state.password)
            .then((resp) => {
                if(resp){
                    database.ref('/users/' + resp.user.uid).set(infos);
                    this.loginUser();
                }
            })
    }

    loginUser = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((resp) => {
                if(resp) {
                    let userId = firebaseAppAuth.currentUser.uid;
                    database.ref('/users/' + userId).once('value')
                    this.props.history.push('/home')
                }
            })
    }

    Redirect = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <Router>
                <div className="cadastro">
                    <Logo />
                    <Input getValue={(e) => this.handleChange((e), 'name')} type="text" name="Nome" />
                    <Input getValue={(e) => this.handleChange((e), 'email')} type="text" name="Email" />
                    <Input getValue={(e) => this.handleChange((e), 'password')} type="password" name="Senha" />
                    <Button style={{backgroundColor: "#69306D", fontWeight: 500}} onClick={this.handleClick} name="CADASTRAR" />
                    <Anchor style={{backgroundColor:"transparent", color: "#00695c", border: "none", boxShadow: "none", fontWeight: 700}} onClick={this.Redirect} name="CANCELAR" />
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Cadastro);
