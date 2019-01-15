/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {delete_method} from '../communication/delete';
import React from 'react';
import { browserHistory } from 'react-router';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, error: null, success: null, not_found: null};
        this.toggle = this.toggle.bind(this);
        this.toggle_delete = this.toggle_delete.bind(this);
        this.delete_request = this.delete_request.bind(this);
        this.homepage = this.homepage.bind(this);
        this.id = this.props.id;
        this.message = null;
        this.closeall = this.closeall.bind(this);
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    closeall () {
        this.setState({
            modal: false,
            error: null,
            success: null,
            not_found: null
        });
    }
    
    toggle_delete(id, name) {
        if (this.props.category === 'shop') {
            this.message = 'Είστε σίγουρος/-η ότι θέλετε να διαγράψετε το κατάστημα ' + name + ';'; 
            this.url = 'http://localhost:3002/shops/' + id;
        } 
        else {
            this.message = 'Είστε σίγουρος/-η ότι θέλετε να διαγράψετε το προϊόν ' + name + ';'; 
            this.url = 'http://localhost:3002/products/' + id;
        }
        this.setState({
            modal: !this.state.modal
        });
    }
    
    homepage () {
        browserHistory.push('/');
    }
    
    async delete_request() {
        const answer = await delete_method(this.url);

         if (answer === 'error') {
            this.setState({error: true});
            return;
        }
        
        if (answer.status === 200) {
            this.setState({success: true});
        }
        else {
            this.setState({not_found: true});
        }
        this.toggle();
    }

    render() {
        return (
            <div>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody> {this.message} </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.delete_request}>Ναι</Button>
                            <Button color="primary" onClick={this.toggle}>Όχι</Button>
                        </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.success} className={this.props.className}>
                    <ModalBody> Το αίτημα διαγραφής καταχωρήθηκε επιτυχώς.</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.homepage}>Αρχική σελίδα</Button>
                            <Button color="primary" onClick={this.props.back}>Επιστροφή</Button>
                        </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.not_found} className={this.props.className}>
                    <ModalBody> Το αίτημα διαγραφής δεν καταχωρήθηκε επιτυχώς. </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.delete_request}>Προσπάθεια ξανά</Button>
                            <Button color="primary" onClick={this.homepage}>Αρχική σελίδα</Button>
                            <Button color="primary" onClick={this.props.back}>Επιστροφή</Button>
                        </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Delete;
