import React from 'react';
import { browserHistory } from 'react-router';
import { Modal, ModalBody, ModalFooter, Input, Label, Button, Form, FormGroup, Container, Col, 
        InputGroupAddon, InputGroup, FormFeedback, Alert } from 'reactstrap';
import Shops from '../helper_components/nearby_shops';
import { address_to_coords } from '../functions/address_to_coordinates';
import { getLocation } from '../functions/current_location';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';
import {receive_from_server} from '../communication/receive';
import cookie from 'react-cookies';

class Product extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { error_message: null, not_found2: null, message2: null, 
                    flag: false, success: null, error: null, current: null, 
                    nearby_shops: false, error_address: null, not_found: null, 
                    message: null, fail: null, success_add: null };
        this._isMounted = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.find_barcode = this.find_barcode.bind(this);
        this.find_shop = this.find_shop.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.new_product = this.new_product.bind(this);
        this.nearby_shops = this.nearby_shops.bind(this);
        this.add_price = this.add_price.bind(this);
        this.body = {productId: null, shopId: null, price: null, dateFrom: null, dateTo: null};
    }
    
    componentDidMount() {
        try {
            var loggedin = Boolean(cookie.load('loggedin'));
            if (!loggedin) {
                browserHistory.push('/login');
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
    
    nearby_shops () {
        this.refs.nearby_shops.toggle();
    }
    
    async currentLocation ()  {
        this.setState({flag: !this.state.flag});
        var checkBox = document.getElementById("addprice_location");
        if (!checkBox.checked) {
            return;
        }
        
        let result = await getLocation();
        console.log(result);
        var temp = this.state.show_current;
        this.setState({ current: { latitude: result[0], longitude: result[1], address: result[2]}, show_current: !temp});
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    async find_barcode () {
        this.setState({ success: null, not_found: null, error: null, message: null, error_message: null, not_found2: null, message2: null });
        const barcode = document.getElementById('addprice_barcode').value;
        var url = '/products?barcode=' + barcode;
        this._isMounted = await receive_from_server(url);
        const answer = this._isMounted;
        
        try {
            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({not_found2: true});
                this.setState({message2: 'Το προϊόν με barcode ' +  barcode + ' δε βρέθηκε.'});
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
                try {
                    this.setState({message: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found: true});
                    return;
                }
                catch (error) {
                    this.setState({error: true, error_message: error});
                    return;
                }
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
       
        var details = await answer.json().then((result) => {return result;});
        try {
            var id = details.products[0].id;
            return id;
        }
        catch (error) {
            return;
        }
    }
    
    async find_shop () {
        this.setState({success: null, error: null, not_found: null, message: null, error_message: null, not_found2: null, message2: null, success_add: null });
        var lng = null;
        var lat = null;
        
        var checkBox = document.getElementById("addprice_location");
        
        if (checkBox.checked) {
            try {
                lng = this.state.current.longitude;
                lat = this.state.current.latitude;
            }
            catch {
                this.setState({error_address: true});
                return;
            }
        }
        else {
            const postal = document.getElementById('addprice_postal').value;
            const address_name = document.getElementById('addprice_address').value;
            const number = document.getElementById('addprice_number').value;
            const total = address_name + ' ' + number + ' ' + postal;
            var result = await address_to_coords(total);
            try {
                lat = result[0];
                lng = result[1];
                this.setState({error_address: false});
            }
            catch {
                this.setState({error_address: true});
                return;
            }
        }
        
        var url = '/shops?geoDist=0.1&geoLat=' + lat + '&geoLng=' + lng;
        this._isMounted = await receive_from_server(url);
        const answer = this._isMounted;
        
        try {
            if (answer.status === 200) {
                this.setState({success: true});
            }
            else if (answer.status === 404) {
                this.setState({not_found2: true});
                this.setState({message2: 'Δε βρέθηκαν καταστήματα σε αυτή την τοποθεσία.'});
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
            else if (answer.status === 400) {
                this.setState({not_found2: true});
                this.setState({message2: 'Δε βρέθηκαν καταστήματα σε αυτή την τοποθεσία.'});
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
                
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.refs.nearby_shops.toggle(details);
    }
    
    async add_price (id) {
        this.refs.nearby_shops.close();
        this.body.shopId = id;
        console.log(this.body);
        this.setState({ success: null, not_found: null, error: null, message: null, error_message: null});
            
        var url = '/prices';
        this._isMounted = await send_to_server(url, this.body);
        const answer = this._isMounted;
        var result = await answer.json().then((result) => {return result;});
        console.log(result)
        console.log(answer);
        try {
            if (answer === 'error') {
                this.setState({error: true});
                return;
            }

            if (answer.status === 200) {
                this.setState({success_add: true});
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
        
    }
    
    async handleSubmit (event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({error: false});
        
        var result = await this.find_barcode().then((result) => {return result;});
        if (!result) {
            this.setState({ success: null, not_found2: true, message2: 'Το προϊόν με barcode ' + document.getElementById('addprice_barcode').value + ' δε βρέθηκε.'});
            return;
        }
        this.body.productId = result;
        
        const price = document.getElementById('addprice_price').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        
        this.body.price = price;
        this.body.dateFrom = dateFrom;
        this.body.dateTo = dateTo;

        result = await this.find_shop();        
    }
    
    toggleModal() {
        this.setState({
            not_found2: !this.state.not_found2
        });
    }
    
    new_product () {
        browserHistory.push('/newproduct');
    }
    
    render() {
        var curr = new Date();
        curr.setUTCDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        var min_d = new Date();
        min_d.setUTCDate(curr.getDate()-3);
        var min_date = min_d.toISOString().substr(0,10);
        return(
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
                <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
                <Container className="Product">
                <h2 align="center">Εισαγωγή Τιμής</h2>
                <hr></hr>
                <Form id="addproduct" onSubmit={this.handleSubmit}>
                        <FormGroup check row>
                            <Label sm={3} for="addprice_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                            <Col sm={3}>
                                <Input id="addprice_barcode" name="barcode" pattern="[0-9]{1,128}" type="text" required/>
                            </Col>
                        </FormGroup>
                        <div className="row mt-3"></div>
                        <FormGroup check>
                        <Label check>
                        <Col sm={9}>
                            <Input type="checkbox" name="location" id="addprice_location" onChange={() => this.currentLocation()}/>      
                        </Col>
                            Τωρινή Τοποθεσία
                        </Label>

                    
                        </FormGroup>    
                        <FormGroup check row>
                            <Label sm={8} for="addprice_name">Όνομα Καταστήματος:</Label>
                            <Col sm={3}>
                                <Input id="addprice_name" name="name" type="text" disabled={this.state.flag}/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={3} for="addprice_address">Διεύθυνση:</Label>
                            <Col sm={3}>
                                <Input id="addprice_address" invalid={this.state.error_address} name="address" type="text" disabled={this.state.flag} required/>
                                <FormFeedback valid={!this.state.error_address}>Η διεύθυνση δεν είναι έγκυρη.</FormFeedback>
                            </Col>
                        </FormGroup>
        
                        <FormGroup check row>
                                <Label sm={3} for="addprice_number">Αριθμός:</Label>
                                <Col sm={1}>
                                    <Input id="addprice_number" invalid={this.state.error_address} name="number" type="text" disabled={this.state.flag} required/>
                            </Col>
                        </FormGroup>
                      
                        <FormGroup check row>
                            <Label sm={3} for="addprice_postal">ΤΚ/Περιοχή:</Label>
                                <Col sm={2}>
                                <Input id="addprice_postal" invalid={this.state.error_address} name="postal" type="text" disabled={this.state.flag} required/>
                                </Col>
                                </FormGroup>
  
                        <FormGroup check row>
                            <Label sm={3} for="addprice_price">Τιμή:</Label>
                            <Col sm={3}>
                                <InputGroup>
                                    <Input type="text" id="addprice_price" pattern="[0-9]+" name="price" required/>
                                    <InputGroupAddon addonType="append">€</InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Label sm={8} for="dateFrom">Ημερομηνία παρατήρησης:</Label>
                            <Col sm={2}>
                                <Input id="dateFrom" type="date" name="dateFrom" defaultValue={date} min={min_date} max={date} required/>
                            </Col>
                        </FormGroup>
                        
                        <FormGroup check row>
                            <Label sm={8} for="dateTo">Ημερομηνία λήξης τιμής:</Label>
                            <Col sm={2}>
                                <Input id="dateTo" type="date" name="dateTo" min={date} defaultValue={date} required/>
                            </Col>
                        </FormGroup>
                        <hr></hr>
                        <div className="text-center">
                            <Button className="btn" type="submit">Προσθήκη</Button>{'  '}
                            <Button type="button" onClick={browserHistory.goBack}>Ακύρωση</Button>
                        </div>
                </Form>
                </Container>
                <Modal isOpen={this.state.not_found2} toggle={this.toggleModal}>
                    <ModalBody> {this.state.message2}</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Διόρθωση</Button>{' '}
                        <Button color="secondary" onClick={this.homepage}>Ακύρωση</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.success_add}>
                    <ModalBody> Η τιμή καταχωρήθηκε επιτυχώς.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.homepage}>Αρχική Σελίδα</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.fail} toggle={() => this.setState({fail: null})}>
                    <ModalBody> Η καταχώρηση τιμής απέτυχε. </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.setState({fail: null})}>Προσπάθεια ξανά</Button>{' '}
                        <Button color="secondary" onClick={this.homepage}>Ακύρωση</Button>
                    </ModalFooter>
                </Modal>
                
                <Shops ref='nearby_shops' select={this.add_price}/>
            </div>
        );
  }
}

export default Product;
