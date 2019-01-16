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
    this.state = {success: null, error: null, not_found: null, dropdownOpen: false};
    this.logoff = this.logoff.bind(this);        
    this.delete = this.delete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
    
    close () {
        this.setState({error: false, not_found: false});
    }
    
    delete () {
        //TODO 
        cookie.remove('loggedin', { path: '/' });
        cookie.remove('username', { path: '/' });
        cookie.remove('token', {path: '/'});
        cookie.remove('need_login', { path: '/' });
        browserHistory.push('/');
    }
    
    async logoff () {
        const url = 'http://localhost:3002/logout';
        const answer = await send_to_server(url);
        
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
                        <DropdownItem onClick={() => this.delete()}>
                            Απενεργοποίηση Λογαριασμού
                        </DropdownItem>
                        <DropdownItem onClick={() => this.logoff()}>
                            Αποσύνδεση
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal isOpen={this.state.error || this.state.not_found} toggle={this.close} className={this.props.className}>
                    <ModalHeader>Πρόβλημα</ModalHeader>
                    <ModalBody>
                        <Alert color="danger" isOpen={this.state.error}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                        <Alert color="danger" isOpen={this.state.not_found}>Η αποσύνδεση δεν ήταν επιτυχής.</Alert>
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
