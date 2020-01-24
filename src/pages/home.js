import React, { useState } from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import withFirebaseAuth from 'react-with-firebase-auth';

import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

import Input from '../components/input';
import Button from '../components/button';
import Checkbox from '../components/checkbox';

const firebaseAppAuth = firebase.auth();
const database = firebase.database();

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: "",
            items: [],
            listDB: [],
        }
    }

    componentDidMount() {
        database.ref('users/').on("value", snapshot => {
            const data = snapshot.val()
            const userId = firebaseAppAuth.currentUser.uid;
            const listItems = data[userId].list
            if (listItems != undefined){
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
        console.log(this.state.items)
        database.ref(`users/${userId}`).update({list: this.state.items});
    }

    render() {
        return (
            <Router>
                <div className="home">
                    <Input getValue={(e) => this.handleChange((e), 'item')} typet="text" name="Adicione um item na lista" />
                    <Button style={{backgroundColor: "#69306D", fontWeight: 500}} onClick={this.handleClick} name="ADICIONAR" />
                    {this.state.listDB.map((item, index) => {
                        return (<Checkbox key={index} item={item}></Checkbox>)
                    })}
                </div>
            </Router>
        )
    }
}

export default withFirebaseAuth({firebaseAppAuth})(Home);
