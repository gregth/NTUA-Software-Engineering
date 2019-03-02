import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, DropdownMenu, DropdownToggle, Dropdown, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,} from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import {send_to_server} from '../communication/send';

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {success: null, error: null, not_found: null, dropdownOpen: false, message: null, error_message: null};
        this.logoff = this.logoff.bind(this);  
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this._isMounted = null;
    }
    
    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    close () {
        this.setState({error: false, not_found: false});
    }
    
    async logoff () {
        this.setState({ error: null, success: null, not_found: null, error_message: null, message: null });
        
        const url = '/logout';
        const answer = await send_to_server(url);
        
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

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
        
        cookie.remove('token', {path: '/'});
        cookie.remove('username', { path: '/' });
        cookie.remove('loggedin', { path: '/' });
        cookie.remove('need_login', { path: '/' });
        browserHistory.push('/');
    }
    
    render() {
        return ( 
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle>
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> {cookie.load('username')}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={() => this.logoff()}>
                            Αποσύνδεση
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal isOpen={this.state.error || this.state.not_found} toggle={this.close} className={this.props.className}>
                    <ModalHeader>Πρόβλημα</ModalHeader>
                    <ModalBody>
                        <Alert color="danger" isOpen={this.state.error}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                        <Alert color="danger" isOpen={this.state.not_found}>Η αποσύνδεση δεν ήταν επιτυχής. {this.state.message}</Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.close}>Κλείσιμο</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};

export default Settings;
