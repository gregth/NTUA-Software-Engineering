/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {show: true, check: null, check_show: false, ready: false, first_name: '', last_name: '', username: '', password: '', email: '', phone: 0, birth_date: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.homepage = this.homepage.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    handleSubmit () {
       const us = document.getElementById('username').value;
       const pass = document.getElementById('pwd').value;
       const fname = document.getElementById('first_name').value;
       const lname = document.getElementById('last_name').value;
       const email = document.getElementById('email').value;
       const bdate = document.getElementById('birth_date').value;
       const number = document.getElementById('phone').value;
       
       this.setState(() => ({ first_name: fname, last_name: lname, username: us, password: pass, email: email, phone: number, birth_date: bdate}));        
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
    
    checkPasswordMatch() {
        var password = document.getElementById('pwd').value;
        var confirmPassword = document.getElementById('re_pass').value;
        
        if (this.state.check !== null) {
          this.setState(() => ({ check_show: true}));  
        }
        
        if (password === confirmPassword && confirmPassword !== "") {
            this.setState(() => ({ check: true}));
        }
        else if (password !== confirmPassword && confirmPassword !== "") {
            this.setState(() => ({ check: false}));
        }
        
        if (password === confirmPassword) {
            this.setState( () => ({ready: true}));
            document.getElementById("message").innerHTML = "";
        }
        else {
            this.setState( () => ({ready: false}));
            document.getElementById("message").innerHTML = "Password must match";
        }
    }
    
    render() {
        return(
            <form id="register" onSubmit={() => this.handleSubmit()}>
                <div></div>
                <button id="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></button>
                <br/>
                <div class="form-group">
                    <label id="label-form" for="first_name">First Name:</label>
                    <input id="first_name" name="first_name" class="form-control" pattern="[A-Za-z]+" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label id="label-form" for="last_name">Last Name:</label>
                    <input id="last_name" name="last_name" class="form-control" pattern="[A-Za-z]+" type="text" required/>
                </div>
                <visibility/>
                <div class="form-group">
                    <label id="label-form" for="email">Email:</label>
                    <input type="email" id="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                </div>
                
                <div class="form-group">
                    <label id="label-form" for="username">Username:</label>
                    <input id="username" name="username" class="form-control" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label id="label-form" for="pwd">Password:</label>
                    <input title="no special characters" type="password" name="password" class="form-control" pattern="[A-Za-z0-9]{8,16}" id="pwd" onKeyUp={() => this.checkPasswordMatch()} required></input>
                    <button type="eye" id="eye" onClick={() => this.showPassword()}>
                        { this.state.show
                        ? <FontAwesomeIcon icon={faEye} />
                        : <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </button> 
                    
                </div>
                
                <div class="form-group">
                    <label id="label-form" for="pwd_repeat">Repeat Password:</label>
                    <input id="re_pass" name="re_pass" class="form-control" type="password" onInput={() => this.checkPasswordMatch()} required/>
                    { this.state.check_show
                    ? <span> 
                    { this.state.check
                        ? <FontAwesomeIcon id="check" icon={faCheck} />
                        : <FontAwesomeIcon id="error" icon={faTimes} />
                        }
                    </span>
                    : <span />
                    }
                </div>
                
                <div className="for-group">
                    <label id="label-form" for="birth_date">Date of Birth:</label>
                    <input type="date" id="birth_date" name="birth_date" class="form-control" max="2000-12-31" required/>
                </div>
                <div class="form-group">
                    <label id="label-form" for="phone">Enter your phone number:</label>
                    <input type="tel" id="phone" title="69XXXXXXXX" pattern="69\d{8}" name="phone" required/>
                </div>
                
                <button type="submit" disabled={!this.state.ready} id="button1">Register</button>
            </form>
        );
  }
}

export default Register;
