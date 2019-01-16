/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class Shops extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, shops: [], empty: null };
        this.toggle = this.toggle.bind(this);
        this.addshop = this.addshop.bind(this);
        this.homepage = this.homepage.bind(this);
        this.select = this.select.bind(this);
        this.close = this.close.bind(this);
    }
    
    select (id) {
        this.props.select(id);
    }
    
    addshop () {
        browserHistory.push('/addshop');
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    close () {
        this.setState({modal: false});
    }
    
    toggle(shops) {
        var empty = shops.shops.length === 0;
        this.setState({
            modal: !this.state.modal, shops: shops.shops, empty
        });
    }
 
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.close} className={this.props.className}>
                    {this.state.shops.length > 0
                    ? <div>
                        <ModalHeader>Επιλογή Καταστήματος</ModalHeader>
                        <ModalBody>
                            <Table hover>
                                <thead>
                                  <tr>
                                    <th>Όνομα Καταστήματος</th>
                                    <th>Διεύθυνση</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {this.state.shops.map(shop => (
                                    <tr key={shop.id} onClick={() => this.select(shop.id)}  className="row_pointer">
                                        <td>{shop.name}</td>
                                        <td>{shop.address}</td>
                                    </tr>
                                    ))}
                                </tbody>
                              </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addshop}>Προσθήκη Νέου Καταστήματος</Button>
                            <Button color="secondary" onClick={this.homepage}>Αρχική Σελίδα</Button>
                        </ModalFooter>
                        </div>
                    : <div>
                        <ModalBody> Δε βρέθηκαν καταστήματα σε αυτή την τοποθεσία. </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addshop}>Προσθήκη Νέου Καταστήματος</Button>
                            <Button color="secondary" onClick={this.homepage}>Αρχική Σελίδα</Button>
                        </ModalFooter>
                    </div>
                    }
                </Modal>
            </div>
        );
    }
}

export default Shops;
