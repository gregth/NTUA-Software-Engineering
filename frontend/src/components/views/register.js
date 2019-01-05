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
import { Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Col, InputGroupButton, FormFeedback, FormText } from 'reactstrap';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {show: true, checkPass: null, checkEmail: null, checkPhone: null, check_show: false, ready: false, first_name: '', last_name: '', username: '', password: '', email: '', phone: 0, birth_date: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.homepage = this.homepage.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
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
                this.setState(() => ({ checkPass: true}));
            }
            else if (password !== confirmPassword && confirmPassword !== "") {
                this.setState(() => ({ checkPass: false}));
            }
        }
        catch (error) {
            return;
        }
    }
    
    validateEmail() {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = null;
        const email = document.getElementById('email').value;
        if (emailRex.test(email)) {
          result = true;
        } 
        else {
          result = false;
        }
        this.setState({ checkEmail: result });
    }
    
    validatePhone() {
        const phoneRex = /^69\d{8}|^210\d{7}$/;
        var result = null;
        const phone = document.getElementById('phone').value;
        if (phoneRex.test(phone)) {
          result = true;
        } 
        else {
          result = false;
        }
        this.setState({ checkPhone: result });
    }
  
    render() {
        return(
            <div>
            <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>
            <br/>
            
            <Form onSubmit={() => this.handleSubmit()}>
                <div></div>
                <FormGroup check row>
                    <Label for="first_name" sm={3}>Όνομα:</Label>
                    <Col sm={3}>
                        <Input id="first_name" name="first_name" pattern="[A-Za-z]+" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label for="last_name" sm={3}>Επίθετο:</Label>
                    <Col sm={3}>
                        <Input id="last_name" name="last_name" pattern="[A-Za-z]+" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label for="email" sm={3}>Email:</Label>
                    <Col sm={3}>
                        <Input type="email" id="email" invalid={this.state.checkEmail===false} valid={this.state.checkEmail} onChange={() => this.validateEmail()} required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label for="username" sm={3}>Username:</Label>
                    <Col sm={3}>
                        <Input id="username" name="username" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label for="pwd" sm={3}>Κωδικός:</Label>
                    <Col sm={3}>
                        <InputGroup>
                            <Input title="no special characters" type="password" name="password" pattern="[A-Za-z0-9]{8,16}" id="pwd" onKeyUp={() => this.checkPasswordMatch()} required></Input>
                            <InputGroupAddon addonType="append">
                                <button type="eye" id="eye" onClick={this.showPassword}>
                                    { this.state.show
                                    ? <FontAwesomeIcon icon={faEye} />
                                    : <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                
                 <FormGroup check row>
                    <Label for="pwd_repeat" sm={3}>Επαλήθευση Κωδικού:</Label>
                    <Col sm={3}>
                        <Input  valid={this.state.checkPass} invalid={this.state.checkPass===false} id="re_pass" name="re_pass" type="password" onInput={() => this.checkPasswordMatch()} required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label for="birth_date" sm={3}>Ημερομηνία Γέννησης:</Label>
                    <Col sm={3}>
                        <Input type="date" id="birth_date" name="birth_date" max="2000-12-31" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label for="phone" sm={3}>Κινητό/Σταθερό Τηλέφωνο:</Label>
                    <Col sm={3}>
                        <Input type="tel" id="phone" name="phone" invalid={this.state.checkPhone===false} valid={this.state.checkPhone} onChange={() => this.validatePhone()} required/>
                    </Col>
                </FormGroup>
            </Form>
            <Button type="submit" disabled={!this.state.ready}>Εγγραφή</Button>
            </div>
        );
  }
}

export default Register;
