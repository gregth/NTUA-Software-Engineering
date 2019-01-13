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
import { Alert, NavbarBrand, Navbar, Nav, NavItem, NavLink, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Col } from 'reactstrap';
import {send_to_server} from '../communication/send';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {isOpen: false, need_login: null, show: true, success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.register = this.register.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    componentDidMount() {
        try {
            this.setState({need_login: Boolean(cookie.load('need_login'))});
            var loggedin = Boolean(cookie.load('loggedin'));
            if (loggedin) {
                browserHistory.push('/search');
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    
    register() {
        browserHistory.push('/register');
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({success: null, error: null, need_login: null, not_found: null});
        const username = document.getElementById('username').value;
        const password = document.getElementById('pwd').value;

        var body = { 
            username,
            password
        };
        
        console.log(body);
        const url = 'http://localhost:3002/login';
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
        
        cookie.save('username', username, {path: '/'});
        cookie.save('loggedin', true, {path: '/'});
        cookie.remove('need_login', {path: '/'});
        
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
                <Navbar color="faded" light>
                <NavbarBrand><img src={"/public/logo_transparent.png"} width="150px" onClick={() => this.homepage()}/></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => this.register()}>Εγγραφή</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                
                <Alert color="danger" isOpen={this.state.need_login===true}>Απαιτείται σύνδεση.</Alert>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                <Alert color="danger" isOpen={this.state.not_found===true}>Λάθος όνομα χρήστη ή κωδικός.</Alert>
                
                <Form id="login" onSubmit={this.handleSubmit}>
                    <FormGroup check row>
                        <Label for="username" sm={3}>
                            <FontAwesomeIcon icon={faUser} /> {' '}
                            Όνομα Χρήστη:
                        </Label>
                        <Col sm={3}>
                            <Input id="username" type="text" name="username" pattern="[A-Za-z0-9_]+" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="pwd" sm={3}>
                            <FontAwesomeIcon icon={faKey} />{' '}
                            Κωδικός:
                        </Label>
                            <Col sm={3}>
                                <InputGroup>
                                    <Input type="password" name="password" pattern="[A-Za-z0-9]{8,}" id="pwd" required></Input>
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
                    <Button type="submit" id="button1">Σύνδεση</Button>
               </Form>
               
           </div>
        );
  }
}

export default Login;
