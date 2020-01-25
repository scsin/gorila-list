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
            nome: "",
            email:"",
            senha: "",
            list: [],
        }
    }

    handleChange = (e, element) => {
        const newState = this.state;
        newState[element] = e.target.value;
        this.setState(newState);
    }

    handleClick = () => {
        const infos = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            list: this.state.list,
        }
        this.createUser(infos);
    }

    createUser = (infos) => {
        firebaseAppAuth.createUserWithEmailAndPassword(this.state.email,
            this.state.senha)
            .then((resp) => {
                this.props.history.push('/home')
                if(resp){
                    database.ref('/users/' + resp.user.uid).set(infos);
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
                    <Input getValue={(e) => this.handleChange((e), 'nome')} type="text" name="Nome" />
                    <Input getValue={(e) => this.handleChange((e), 'email')} type="text" name="Email" />
                    <Input getValue={(e) => this.handleChange((e), 'senha')} type="password" name="Senha" />
                    <Button style={{backgroundColor: "#69306D", fontWeight: 500}} onClick={this.handleClick} name="CADASTRAR" />
                    <Anchor style={{backgroundColor:"transparent", color: "#00695c", border: "none", boxShadow: "none", fontWeight: 700}} onClick={this.Redirect} name="CANCELAR" />
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Cadastro);
