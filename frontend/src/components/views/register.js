/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck, faTimes, faHome, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';

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
       cookie.save('username', us, {path: '/'});
       this.setState(() => ({ first_name: fname, last_name: lname, username: us, password: pass, email: email, phone: number, birth_date: bdate}));        
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
    
    checkPasswordMatch() {
        var password = document.getElementById('pwd').value;
        try {
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
        catch (error) {
            return;
        }
    }
    
    render() {
        return(
            <div>
            <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
            <br/>
            <form id="register" onSubmit={() => this.handleSubmit()}>
                <div></div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="first_name">Όνομα:</label>
                    <input id="first_name" name="first_name" className="form_input" pattern="[A-Za-z]+" type="text" required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="last_name">Επίθετο:</label>
                    <input id="last_name" name="last_name" className="form_input" pattern="[A-Za-z]+" type="text" required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="email">Email:</label>
                    <input type="email" id="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form_input" required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="username">Username:</label>
                    <input id="username" name="username" className="form_input" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="pwd">Κωδικός:</label>
                    <input title="no special characters" type="password" name="password" className="form_input" pattern="[A-Za-z0-9]{8,16}" id="pwd" onKeyUp={() => this.checkPasswordMatch()} required></input>
                    <button type="eye" id="eye" onClick={this.showPassword}>
                        { this.state.show
                        ? <FontAwesomeIcon icon={faEye} />
                        : <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </button> 
                    
                </div>
                
                <div className="form-group">
                    <label id="label-form" htmlFor="pwd_repeat">Επαλήθευση Κωδικού:</label>
                    <input id="re_pass" name="re_pass" className="form_input" type="password" onInput={() => this.checkPasswordMatch()} required/>
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
                    <label id="label-form" htmlFor="birth_date">Ημερομηνία Γέννησης:</label>
                    <input type="date" id="birth_date" name="birth_date" className="form_input" max="2000-12-31" required/>
                </div>
                <div className="form-group">
                    <label id="label-form" htmlFor="phone">Κινητό Τηλέφωνο:</label>
                    <input type="tel" id="phone" title="69XXXXXXXX" pattern="69\d{8}" name="phone" className="form_input" required/>
                </div>
            </form>
            <button className="btn" type="submit" disabled={!this.state.ready} id="button1">Εγγραφή</button>
            </div>
        );
  }
}

export default Register;
