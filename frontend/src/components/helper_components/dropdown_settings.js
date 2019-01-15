import React, { Component } from 'react';
import {DropdownMenu, DropdownToggle, ButtonDropdown, DropdownItem  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,} from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';

export class Settings extends Component {
    constructor(props) {
    super(props);
    this.logoff = this.logoff.bind(this);        
    this.delete = this.delete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { dropdownOpen: false };
  }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
    
    delete () {
        //TODO 
        cookie.remove('loggedin', { path: '/' });
        cookie.remove('username', { path: '/' });
        cookie.remove('need_login', { path: '/' });
        browserHistory.push('/');
    }
    
    logoff () {
        cookie.remove('username', { path: '/' });
        cookie.remove('loggedin', { path: '/' });
        cookie.remove('need_login', { path: '/' });
        browserHistory.push('/');
    }
    
    render() {
        return ( 
            <div>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
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
                </ButtonDropdown>
            </div>
        );
    }
};

export default Settings;
