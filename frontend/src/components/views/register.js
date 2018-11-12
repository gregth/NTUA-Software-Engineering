/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../../stylesheets/base.scss'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ready: false, first_name: '', last_name: '', username: '', password: '', email: '', phone: 0, birth_date: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
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
    
    show(text) {
        document.getElementById("message").innerHTML = text;
        var popup = document.getElementById("userpop");
        popup.classList.toggle("show");
    }
    
    clear() {
        document.getElementById("message").innerHTML = '';
        var popup = document.getElementById("userpop");
        popup.classList.toggle("none");
    }
    
    checkPasswordMatch() {
        var password = document.getElementById('pwd').value;
        var confirmPassword = document.getElementById('re_pass').value;
        
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
            <form onSubmit={() => this.handleSubmit()}>
                <div></div>
                <div class="form-group">
                    <label for="first_name">First Name:</label>
                    <input id="first_name" name="first_name" class="form-control" pattern="[A-Za-z]+" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label for="last_name">Last Name:</label>
                    <input id="last_name" name="last_name" class="form-control" pattern="[A-Za-z]+" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                </div>
                
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input id="username" name="username" class="form-control" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input title="no special characters" type="password" name="password" class="form-control" pattern="[A-Za-z0-9]{8,16}" id="pwd" onKeyUp={() => this.checkPasswordMatch()} required></input>
                    
                </div>
                
                <div class="form-group">
                    <label for="pwd_repeat">Repeat Password:</label>
                    <input id="re_pass" name="re_pass" class="form-control" type="password" onKeyUp={() => this.checkPasswordMatch()} required/>
                    <span id='message'></span>
                </div>
                
                <div class="form-group">
                    <label for="birth_date">Date of Birth:</label>
                    <input type="date" id="birth_date" name="birth_date" class="form-control" max="2000-12-31" required/>
                </div>
                <div class="form-group">
                    <label for="phone">Enter your phone number:</label>
                    <input type="tel" id="phone" title="69XXXXXXXX" pattern="69\d{8}" name="phone" required/>
                </div>
               
                <button type="submit" disabled={!this.state.ready} class="btn btn-default">Submit</button>
            </form>
        );
  }
}

export default Register;
