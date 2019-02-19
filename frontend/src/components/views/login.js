import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faKey, faHome, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import { Alert, Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Container, Col } from 'reactstrap';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {message: null, isOpen: false, show: true, success: null, error: null, not_found: null, error_message: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this._isMounted = null;
    }
    
    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({success: null, error: null,  not_found: null, message: null});
        const username = document.getElementById('username').value;
        const password = document.getElementById('pwd').value;

        var body = { 
            username,
            password
        };
        
        const url = 'http://localhost:3002/login';
        this._isMounted = await send_to_server(url, body);
        const answer = this._isMounted;
        
        try {
            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Το αίτημα δεν ήταν επιτυχές', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Λάθος στοιχεία χρήστη', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Απαιτείται σύνδεση', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Μη έγκυρες παράμετροι αιτήματος.', not_found: true});
                return;
            }
            else {
                this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
        
        var token = answer.headers['XOBSERVATORY-AUTH'];
        cookie.save('token', token, {path: '/'});
        cookie.save('username', username, {path: '/'});
        cookie.save('loggedin', true, {path: '/'});
        
        browserHistory.push('/');
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
                <NavBarClass/>
                
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
                <Container className="Login">
                    <h2 align="center">Σύνδεση</h2>
                    <hr></hr>
                    <Form id="login" onSubmit={this.handleSubmit}>
                        <FormGroup check row>
                            <Label for="username" sm={3}> <FontAwesomeIcon icon={faUser} /> {' '} Όνομα Χρήστη: </Label>
                            <Col sm={3}>
                                <Input id="username" name="username" pattern="[A-Za-z0-9_]+" type="text" required/>
                            </Col>
                        </FormGroup>

                        <FormGroup check row>
                            <Label for="pwd" sm={3}>
                                <FontAwesomeIcon icon={faKey} />{' '} Κωδικός:</Label>
                                <Col sm={8}>
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
                        <hr></hr>
                        <div className="text-center">
                            <Button className="btn" type="submit">Σύνδεση</Button>
                        </div>
                   </Form>
               </Container>
           </div>
        );
  }
}

export default Login;
