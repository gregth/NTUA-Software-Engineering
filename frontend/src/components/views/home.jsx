import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class Home extends Component {
    
    componentDidMount() {
      browserHistory.push('/');
    }

    Login() {
        browserHistory.push('/login');
    }
        
    Admin() {
        browserHistory.push('/admin');
    }
    
    Register() {
        browserHistory.push('/register');
    }
    
    Visitor() {
        browserHistory.push('/visitor');
    }

    render() {
      return (
        <div> 
            <h1> Welcome! </h1>
            <button onClick={() => this.Login()}>Log in</button>
            <button onClick={() => this.Register()}>Register</button>
            <button onClick={() => this.Visitor()}>Visitor</button>
            <button onClick={() => this.Admin()}>Admin</button>
        </div>

          );
    }
}