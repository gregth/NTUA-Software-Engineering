/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {show: true, username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit () {
       const us = document.getElementById('username').value;
       const pass = document.getElementById('pwd').value;
       
       this.setState(() => ({ username: us, password: pass}));        
    }
    
    showPassword() {
        var s = document.getElementById("pwd");
        
        if (s.type === "password") {
            s.type = "text";
             this.setState(() => ({ show: false}));
        } else {
            s.type = "password";
            this.setState(() => ({ show: true}));
        }
    }
    
    render() {
        return(
            <form id="login" onSubmit={() => this.handleSubmit()}>
                <div></div>
                
                <div class="form-group">
                    <label id="label-form" for="username">Username:</label>
                    <input id="username" name="username" class="form-control" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label id="label-form" for="pwd">Password:</label>
                    <input title="no special characters" type="password" name="password" class="form-control" pattern="[A-Za-z0-9]{8,16}" id="pwd" required></input>
                    <button type="eye" id="eye" onClick={() => this.showPassword()}>
                        { this.state.show
                        ? <FontAwesomeIcon icon={faEye} />
                        : <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </button> 
                </div>
                
                <button type="submit" id="button1">Login</button>
            </form>
        );
  }
}

export default Login;
