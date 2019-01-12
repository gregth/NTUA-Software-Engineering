/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        shops: []
      };

      this.toggle = this.toggle.bind(this);
      this.addshop = this.addshop.bind(this);
      this.homepage = this.homepage.bind(this);
      this.select = this.select.bind(this);
    }
    
    componentDidMount() {
        //TODO request results
        this.setState({shops : [{latitude: 37.9763, longitude:23.79763, id:0, address: 'Address1', name: 'CAVA_0'}, 
                    {latitude: 37.9738, longitude:23.7275, id:1, address: 'address2', name: 'CAVA_1'}]});
    }
    
    select (id) {
        console.log(id);
    }
    
    addshop () {
        browserHistory.push('/addshop');
    }
    
    homepage() {
        browserHistory.push('/search');
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
 
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
                        <ModalBody> Δε βρέθηκαν κοντινά καταστήματα στην τοποθεσία σας. </ModalBody>
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

export default ModalExample;
