import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import {  Alert, Input, InputGroupAddon, Button, Form, InputGroup, 
        FormGroup, Label, Col, Container } from 'reactstrap';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';
import cookie from 'react-cookies';

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {message: null, show: true, checkPass: null, checkEmail: null, checkPhone: null, check_show: false, success: null, error: null, not_found: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this._isMounted = null;
    }
    
    componentDidMount() {
        try {
            var loggedin = Boolean(cookie.load('loggedin'));
            if (loggedin) {
                browserHistory.push('/');
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({success: null, error: null, not_found: null, message: null, error_message: null });
        const us = document.getElementById('register_username').value;
        const pass = document.getElementById('register_pwd').value;
        const fname = document.getElementById('register_first_name').value;
        const lname = document.getElementById('register_last_name').value;
        const email = document.getElementById('register_email').value;
        const bdate = document.getElementById('register_birth_date').value;
        const number = document.getElementById('register_phone').value;

        var body = {
            username: us,
            firstName: fname,
            lastName: lname,
            telephone: number,
            birthdate: bdate,
            password: pass,
            email 
        };
       
        console.log(body);
       
        const url = '/users';
        this._isMounted = await send_to_server(url, body);
        const answer = this._isMounted;
        
        try {
            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Not Found', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Not Authorized', not_found: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message: 'Error 403 - Forbidden', not_found: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message: 'Error 400 - Bad Request', not_found: true});
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
       
        browserHistory.push('/login');
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
        const phoneRex = /^69\d{8}|^2\d{9}$|^90\d{8}|^80\d{9}$$/g;
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
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
            
                <Container className="Register">
                <h2 align="center">Εγγραφή</h2>
                <hr></hr>
                <Form id="register" onSubmit={this.handleSubmit}>
                    <FormGroup check row>
                        <Label for="register_first_name" sm={3}>Όνομα:</Label>
                        <Col sm={6}>
                            <Input id="register_first_name" name="register_first_name" pattern="([^\u0000-\u007F]*[A-Za-z]*)+([/\w\.]?[\s]*[^\u0000-\u007F]*[A-Za-z]*)*" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_last_name" sm={3}>Επίθετο:</Label>
                        <Col sm={6}>
                            <Input id="register_last_name" name="register_last_name" pattern="([^\u0000-\u007F]*[A-Za-z]*)+([/\w\.]?[\s]*[^\u0000-\u007F]*[A-Za-z]*)*" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_email" sm={3}>Email:</Label>
                        <Col sm={6}>
                            <Input type="register_email" id="register_email" invalid={this.state.checkEmail===false} valid={this.state.checkEmail} onChange={() => this.validateEmail()} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_username" sm={3}>Username:</Label>
                        <Col sm={6}>
                            <Input id="register_username" name="register_username" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_pwd" sm={3}>Κωδικός:</Label>
                        <Col sm={6}>
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
                        <Label for="pwd_repeat" sm={6}>Επαλήθευση Κωδικού:</Label>
                        <Col sm={6}>
                            <Input  valid={this.state.checkPass} invalid={this.state.checkPass===false} id="register_re_pass" name="re_pass" type="password" onInput={() => this.checkPasswordMatch()} required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_birth_date" sm={6}>Ημερομηνία Γέννησης:</Label>
                        <Col sm={4}>
                            <Input type="date" id="register_birth_date" name="register_birth_date" max="2000-12-31" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label for="register_phone" sm={8}>Κινητό/Σταθερό Τηλέφωνο:</Label>
                        <Col sm={5}>
                            <Input type="tel" id="register_phone" name="register_phone" invalid={this.state.checkPhone===false} valid={this.state.checkPhone} onChange={() => this.validatePhone()}/>
                        </Col>
                    </FormGroup>
                    <hr></hr>
                    <div className="text-center">
                        <Button className="btn" type="submit">Εγγραφή</Button>
                    </div>
                </Form>
              </Container>
            </div>
        );
  }
}

export default Register;
