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
        this.state = {modal: false, error: null, success: null, not_found: null, error_message: null, message: null};
        this.toggle = this.toggle.bind(this);
        this.toggle_delete = this.toggle_delete.bind(this);
        this.delete_request = this.delete_request.bind(this);
        this.homepage = this.homepage.bind(this);
        this.id = this.props.id;
        this.message = null;
        this.closeall = this.closeall.bind(this);
        this._isMounted = null;
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
            not_found: null,
            error_message: null,
            message: null
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
        this.setState({ error: null, success: null, not_found: null, error_message: null, message: null });
        
        this._isMounted = await delete_method(this.url);
        const answer = this._isMounted;
        
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({message: 'Error 404 - Το αίτημα δεν ήταν επιτυχές', not_found: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message: 'Error 401 - Μη επιτρεπόμενη ενέργεια', not_found: true});
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

        this.toggle();
    }

    render() {
        return (
            <div>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
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
                    <ModalBody> Το αίτημα διαγραφής δεν καταχωρήθηκε επιτυχώς. {this.state.message} </ModalBody>
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
