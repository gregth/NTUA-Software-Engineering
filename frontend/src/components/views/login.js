/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit () {
       const us = document.getElementById('username').value;
       const pass = document.getElementById('pwd').value;
       
       this.setState(() => ({ username: us, password: pass}));
        
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div>
                </div>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input id="username" name="username" class="form-control" type="text" required/>
                </div>

                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" name="password" class="form-control" id="pwd" required></input>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        );
  }
}

export default Login;
