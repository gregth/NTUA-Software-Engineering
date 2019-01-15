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
import { Navbar, Nav, NavItem, NavbarBrand, NavLink, Alert, Input, InputGroupAddon, Button, Form, InputGroup, 
        FormGroup, Label, Col, Container, InputGroupButton, FormFeedback, FormText } from 'reactstrap';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {show: true, checkPass: null, checkEmail: null, checkPhone: null, check_show: false, success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
    }
    
    componentDidMount() {
         try {
            cookie.remove('need_login', {path: '/'});
            var loggedin = Boolean(cookie.load('loggedin'));
            if (loggedin) {
                browserHistory.push('/search');
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({success: null, error: null, not_found: null});
        const us = document.getElementById('register_username').value;
        const pass = document.getElementById('register_pwd').value;
        const fname = document.getElementById('register_first_name').value;
        const lname = document.getElementById('register_last_name').value;
        const email = document.getElementById('register_email').value;
        const bdate = document.getElementById('register_birth_date').value;
        const number = document.getElementById('register_phone').value;

        var body = {
            username: us,
            first_name: fname,
            last_name: lname,
            telephone: number,
            birthdate: bdate,
            password: pass,
            email 
        };
       
        console.log(body);
       
        const url = 'http://localhost:3002/users';
        const answer = await send_to_server(url, body);
        
        if (answer === 'error') {
            this.setState({error: true});
            return;
        }
        
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({not_found: true});
            return;
        }
       
        cookie.save('username', us, {path: '/'});
        cookie.save('loggedin', true, {path: '/'});
        cookie.remove('need_login', {path: '/'});
        browserHistory.push('/search');
    }
    
    showPassword(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        var s = document.getElementById("register_pwd");
        
        if (s.type === "password") {
            s.type = "text";
             this.setState(() => ({ show: false}));
        } else {
            s.type = "password";
            this.setState(() => ({ show: true}));
        }
    }
    
    checkPasswordMatch() {
        var password = document.getElementById('register_pwd').value;
        try {
            var confirmPassword = document.getElementById('register_re_pass').value;
        
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
        const email = document.getElementById('register_email').value;
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
        const phone = document.getElementById('register_phone').value;
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
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
            
                <Container className="Register">
                <h2 align="center">Εγγραφή</h2>
                <Form id="register" onSubmit={this.handleSubmit}>
                    <FormGroup check row>
                        <Label for="register_first_name" sm={3}>Όνομα:</Label>
                        <Col sm={3}>
                            <Input id="register_first_name" name="register_first_name" pattern="([^\u0000-\u007F]*[A-Za-z]*)+([/\w\.]?[\s]*[^\u0000-\u007F]*[A-Za-z]*)*" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_last_name" sm={3}>Επίθετο:</Label>
                        <Col sm={3}>
                            <Input id="register_last_name" name="register_last_name" pattern="([^\u0000-\u007F]*[A-Za-z]*)+([/\w\.]?[\s]*[^\u0000-\u007F]*[A-Za-z]*)*" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_email" sm={3}>Email:</Label>
                        <Col sm={3}>
                            <Input type="register_email" id="register_email" invalid={this.state.checkEmail===false} valid={this.state.checkEmail} onChange={() => this.validateEmail()} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_username" sm={3}>Username:</Label>
                        <Col sm={3}>
                            <Input id="register_username" name="register_username" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_pwd" sm={3}>Κωδικός:</Label>
                        <Col sm={8}>
                            <InputGroup>
                                <Input title="no special characters" type="password" name="register_pwd" pattern="[A-Za-z0-9]{8,}" id="register_pwd" onKeyUp={() => this.checkPasswordMatch()} required></Input>
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
                            <Input  valid={this.state.checkPass} invalid={this.state.checkPass===false} id="register_re_pass" name="re_pass" type="password" onInput={() => this.checkPasswordMatch()} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_birth_date" sm={3}>Ημερομηνία Γέννησης:</Label>
                        <Col sm={3}>
                            <Input type="date" id="register_birth_date" name="register_birth_date" max="2000-12-31" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_phone" sm={3}>Κινητό/Σταθερό Τηλέφωνο:</Label>
                        <Col sm={3}>
                            <Input type="tel" id="register_phone" name="register_phone" invalid={this.state.checkPhone===false} valid={this.state.checkPhone} onChange={() => this.validatePhone()} required/>
                        </Col>
                    </FormGroup>
                    <hr></hr>
                    <Button type="submit">Εγγραφή</Button>
                </Form>
              </Container>
            </div>
        );
  }
}

export default Register;
