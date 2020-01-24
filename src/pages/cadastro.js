import React from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from 'react-with-firebase-auth';
// import firebaseConfig from '../firebaseConfig/firebaseConfig'

import {BrowserRouter as Router, Route, Redirect, Link, useHistory} from 'react-router-dom';

// import Logo from '../image';
import BackButton from '../components/backbutton';
import Input from '../components/input';
import Button from '../components/button';
import A from '../components/a';
// import Title from '../components/title';

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebase.auth();
const database = firebase.database();


class Cadastro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nome: "",
            email:"",
            senha: "",
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
        this.createUser(infos);
    }
    
    createUser = (infos) => {
        firebaseAppAuth.createUserWithEmailAndPassword(this.state.email,
            this.state.senha)
            .then((resp) => {
                if(resp){
                    database.ref('/users/' + resp.user.uid).set(infos);
                }
            })
    }

    render() {
        return (
            <Router>
                <div className="cadastro">
                    {/* <Logo className="logo-bq" height="200px" width="auto" /> */}
                    <Input getValue={(e) => this.handleChange((e), 'nome')} typet="text" name="Nome" />
                    <Input getValue={(e) => this.handleChange((e), 'email')} typet="text" name="Email" />
                    <Input getValue={(e) => this.handleChange((e), 'senha')} typet="password" name="Senha" />
                    <Link to="/home"><Button style={{backgroundColor: "#69306D", fontWeight: 500}} onClick={this.handleClick} name="CADASTRAR" /></Link>
                    <Link to="/"><Button style={{backgroundColor: "#69306D", fontWeight: 500}} onClick="/" name="CANCELAR" /></Link>
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Cadastro);
