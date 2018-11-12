/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {first_name: '', last_name: '', username: '', password: '', email: '', phone: 0, address: '', number: 0, post_code: 0, country: '', birth_date: ''};
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
                    <label for="first_name">First Name:</label>
                    <input id="first_name" name="first_name" class="form-control" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label for="last_name">Last Name:</label>
                    <input id="last_name" name="last_name" class="form-control" type="text" required/>
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" size="30" required/>
                </div>
                
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input id="username" name="username" class="form-control" type="text" required/>
                </div>

                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" name="password" class="form-control" id="pwd" required></input>
                </div>
                
                <div class="form-group">
                    <label for="pwd_repeat">Repeat Password:</label>
                    <input id="re_pass" name="re_pass" class="form-control" type="password" required/>
                </div>
                
                <div class="form-group">
                    <label for="birth_date">Date of Birth:</label>
                    <input type="date" id="birth_date" name="birth_date" class="form-control"  required/>
                </div>
                
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        );
  }
}

export default Register;
