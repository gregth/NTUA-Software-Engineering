/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faKey, faHome, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';


class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {isOpen: false, show: true, username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.register = this.register.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    register() {
        browserHistory.push('/register');
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const us = document.getElementById('username').value;
        const pass = document.getElementById('pwd').value;

        this.setState(() => ({ username: us, password: pass}));   
        if (us === '' || pass === '') {
            document.getElementById("message").innerHTML = "Συμπληρώστε όλα τα πεδία";
        }
        else {
            document.getElementById("message").innerHTML = "";
        }

        cookie.save('username', us, {path: '/'});
        /*
        fetch('https://localhost:5000/login', {
                 method: 'POST',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                     token: 1234
                 },
                 body: JSON.stringify({
                     username: us,
                     password: pass
                 })
                 }).then((response) => response.json())
             .then((responseJson) => {
                 console.log(responseJson);
             })
             .catch((error) => {
                 console.error(error);
             });*/
         browserHistory.push('/search');
    }
    
    showPassword(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
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
            <div>
            <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
            <form id="login" onSubmit={this.handleSubmit}>
                <div></div>
                
                <br/>
                <div className="form-group">
                    <label id="label-form" htmlFor="username">
                        <FontAwesomeIcon icon={faUser} />
                        Username:
                    </label>
                    <input id="username" type="button" name="username" className="form-control" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="pwd">
                        <FontAwesomeIcon icon={faKey} />
                        Password:
                    </label>
                    <input title="8-16 no special characters" type="password" name="password" className="form-control" pattern="[A-Za-z0-9]{8,16}" id="pwd" required></input>
                    <button type="eye" id="eye" onClick={this.showPassword}>
                        { this.state.show
                        ? <FontAwesomeIcon icon={faEye} />
                        : <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </button> 
                </div>
                <span id="message"/><br/>
                <input className="btn" type="submit" id="button1" value="Σύνδεση"></input>
           </form>
           <button className="btn" type="button" id="button2" onClick={() => this.register()}>Εγγραφή</button>
           </div>
        );
  }
}

export default Login;
