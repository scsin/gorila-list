import React from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from 'react-with-firebase-auth';

import {BrowserRouter as Router} from 'react-router-dom';

import Input from '../components/input';
import Button from '../components/button';
import Checkbox from '../components/checkbox';
import Logo from '../components/logo';
import A from '../components/anchor';
import Icon from '../components/icon';
// import Title from '../components/title';

const firebaseAppAuth = firebase.auth();
const database = firebase.database();

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // name: "",
            item: "",
            items: [],
            listDB: [],
        }
    }

    componentDidMount() {
        database.ref('users/').on("value", snapshot => {
            const data = snapshot.val()
            const userId = firebaseAppAuth.currentUser.uid;
            const listItems =  data[userId].list
            // this.setState({name: data[userId].name})
            if (listItems !== undefined){
                this.setState({listDB: listItems, items: listItems})
            }
        })
    }

    handleChange = (e, element) => {
        const newState = this.state;
        newState[element] = e.target.value;
        this.setState(newState);
    }

    handleClick = () => {
        this.state.items.push(this.state.item)
        this.saveItem();
    }

    saveItem = () => {
        const userId = firebaseAppAuth.currentUser.uid;
        database.ref(`users/${userId}`).update({list: this.state.items});
    }

    LogOut = () => {
        firebaseAppAuth.signOut()
            .then(() => {
                this.props.history.push('/');
            })
    }

    RemoveItem = (e, index) => {
        e.preventDefault();
        const userId = firebaseAppAuth.currentUser.uid;
        database.ref('users/').child(userId).child('list').child(index).remove();
    }

    render() {
        return (
            <Router>
                <div className="home">
                    <Logo />
                    {/* <Title title={this.state.name} /> */}
                    <Button className="LogOut" onClick={this.LogOut} name="SAIR"></Button>
                    <Input getValue={(e) => this.handleChange((e), 'item')} typet="text" name="Adicione um item na lista" />
                    <Button onClick={this.handleClick} name="ADICIONAR" />
                    {/* TRANSFORMAR EM UMA FUNÇÃO */}
                    {this.state.listDB.map((item, index) => {
                        return (
                            <div>
                                <Checkbox key={index} item={item}></Checkbox>
                                <A key={'T' + index} onClick={(e) => this.RemoveItem(e, index)} name={<Icon />} />
                            </div>
                        )
                    })}
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Home);
