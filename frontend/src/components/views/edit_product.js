import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Categories} from '../helper_components/categories_menu';
import { Input, InputGroupAddon, Button, Form, InputGroup, 
        Modal, ModalBody, ModalFooter, FormGroup, Label, Container, FormText, Col, Alert } from 'reactstrap';
import {receive_from_server} from '../communication/receive';
import {put} from '../communication/put';
import {patch} from '../communication/patch';
import NavBarClass from '../helper_components/navbar';

function onlyUnique (value, index, self) { 
    return self.indexOf(value) === index;
}

function check_changes (original, edited) {
    const keys = Object.keys(edited);
    var changed = [];
    
    var unchanged = ['withdrawn', 'barcode', 'tags'];
    for (var i=0; i<unchanged.length; i++) {
        var index = keys.indexOf(unchanged[i]); 
        if (index > -1) {
            keys.splice(index, 1);
        }
    }
    
    for (i=0; i<keys.length; i++) {
        var orig = original[keys[i]];
        if (keys[i] === 'volume' || keys[i] === 'brand') orig = original.extraData[keys[i]];
        if (orig !== edited[keys[i]]) {
            changed.push(keys[i]);
        }
    }
    
    if (original.tags.join(',') !== edited.tags) {
        changed.push('tags');
    }
    return changed;
}

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this);
        this.state = { message_edit: null, error_message: null, message: null, 
                    details: null, error: null, success: null, not_found: null, 
                    volume: '', description: '', tags: '', name: '', brand: '', 
                    success_edit: null};
        this.toggleModal = this.toggleModal.bind(this);
        this.homepage = this.homepage.bind(this);
        this.products = this.products.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._isMounted = null;
    }
    
     componentDidMount () {
        this._asyncRequest = this.request().then(
            details => {
                this._asyncRequest = null;
                this.setState({details, description: details.description, tags: details.tags, 
                    name: details.name, brand: details.extraData.brand, volume: details.extraData.volume});
            }
        );
    }
    
    componentWilldUnmount () {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }

    async request () {
        this.setState({success: null, error: null, not_found: null, message: null, error_message: null });
        const url = '/products/' + this.props.location.query.id;
        this._isMounted = await receive_from_server(url);
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
        
        var details = await answer.json().then((result) => {return result;});
        console.log(details);
        this.setState({details: details});
        return details;
    }
    
    handleChange(event) {
        var name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    products() {
        browserHistory.push('/products');
    }
    
    toggleModal() {
        this.setState({ not_found_edit: !this.state.not_found_edit });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        
        this.setState({success_edit: null, message_edit: null, not_found_edit: null});
        
        const name = document.getElementById('edit_product_name').value;
        const barcode = document.getElementById('edit_product_barcode').value;
        const brand = document.getElementById('edit_product_brand').value;
        const volume = document.getElementById('edit_product_volume').value;
        const description = document.getElementById('edit_product_description').value; 
        var tags_list = (document.getElementById('edit_product_tags').value).split(',');
        const category = this.refs.edit_product_category.state.category;
        
        var tags = [];
        tags_list = tags_list.filter(onlyUnique);
        for (var i=0; i<tags_list.length; i++) {
            var temp = tags_list[i].replace(/\s+/g,' ').trim();
            if (temp === "") continue;
            tags.push(temp);
        }

        tags = tags.filter( onlyUnique );
        if (tags.length > 0) {
            if (tags[0] === "") {
                tags = [];
            }
        }
        
        var product = {
            description,
            name,
            barcode,
            brand,
            volume: parseInt(volume),
            category,
            tags: tags.join(','),
            withdrawn: this.state.details.withdrawn
        };
        
        console.log(product);
        
        var changed = check_changes(this.state.details, product);
        
        const url = '/products/' + this.props.location.query.id;
        
        var answer;
        
        if (changed.length === 1) {
            var key = changed[0];
            var body = {};
            body[key] = product[key];
            this._isMounted = await patch(url, body);
        }
        else if (changed.length > 1) {
            this._isMounted = await put(url, product); 
        }
        else {
            browserHistory.push('/products');
        }
        
        answer = this._isMounted;
        
        try {
            if (answer.status === 200) {
                this.setState({success_edit: true});
            }
            else if (answer.status === 404) {
                this.setState({message_edit: 'Error 404 - Το αίτημα δεν ήταν επιτυχές', not_found_edit: true});
                return;
            }
            else if (answer.status === 401) {
                this.setState({message_edit: 'Error 401 - Μη επιτρεπόμενη ενέργεια', not_found_edit: true});
                return;
            }
            else if (answer.status === 403) {
                this.setState({message_edit: 'Error 403 - Απαιτείται σύνδεση', not_found_edit: true});
                return;
            }
            else if (answer.status === 400) {
                this.setState({message_edit: 'Error 400 - Μη έγκυρες παράμετροι αιτήματος.', not_found_edit: true});
                return;
            }
            else {
                this.setState({message_edit: 'Error ' + answer.status.toString() + ' - Πρόβλημα με την ολοκλήρωση του αιτήματος.', not_found_edit: true});
                return;
            }
        }
        catch (error) {
            this.setState({error: true, error_message: error});
            return;
        }
    }
    
    render() {
      return (
        <div>
            <NavBarClass/>
            
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
            <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
            
            {this.state.details === null
            ?<div> Loading </div>
            : <div>
                <Container className="EditProduct">
                <h2 align="center">Επεξεργασία Προϊόντος</h2>
                <hr></hr>
                <Form id="edit_product_form" onSubmit={this.handleSubmit}>
                    <FormGroup check row>
                        <Label sm={3} for="edit_product_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input disabled id="edit_product_barcode" name="barcode" pattern="[0-9]{1,128}" onChange={this.handleChange} value={this.state.details.extraData.barcode} type="text"/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_name" className="mr-sm-2">Όνομα Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_name" name="name" value={this.state.name} onChange={this.handleChange} type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_brand" className="mr-sm-2">Μάρκα Προϊόντος:</Label>
                        <Col sm={3}>
                            <Input id="edit_product_brand" name="brand" value={this.state.brand} onChange={this.handleChange} type="text" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={3} for="edit_product_category">Κατηγορία:</Label>
                        <Col sm={10}>
                            <Categories ref='edit_product_category' default={this.state.details.category}/>
                        </Col>
                    </FormGroup>
                    <div className="row mt-3"></div>
                    <FormGroup check row>
                        <Label sm={6} for="edit_product_tags">Χαρακτηριστικά Προϊόντος:
                        <FormText>Διαχωρισμός χαρακτηριστικών με κόμμα (,)</FormText>
                        </Label>
                        <Col sm={8}>
                            <Input type="textarea" name="tags" id="edit_product_tags" onChange={this.handleChange} value={this.state.tags}/>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Label sm={6} for="edit_product_description">Περιγραφή προϊόντος:</Label>
                        <Col sm={8}>
                            <Input type="textarea" name="description" id="edit_product_description" onChange={this.handleChange} value={this.state.description} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Label sm={3} for="edit_product_volume">Όγκος:</Label>
                        <Col sm={3}>
                            <InputGroup>
                                <Input type="text" id="edit_product_volume" pattern="[0-9]+" value={this.state.volume} onChange={this.handleChange} name="volume"/>
                                <InputGroupAddon addonType="append">ml</InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <hr></hr>
                    <div className="text-center">
                        <Button type="submit" id="button1">Αποθήκευση</Button>{'  '}
                        <Button type="button" onClick={browserHistory.goBack}>Ακύρωση</Button>
                    </div>
                </Form>
                </Container>
                
            </div>
            }
            
            <Modal isOpen={this.state.not_found_edit} toggle={this.toggleModal}>
                <ModalBody>Η επεξεργασία δεν ολοκληρώθηκε επιτυχώς. {this.state.message_edit}</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
                
            <Modal isOpen={this.state.success_edit}>
                <ModalBody>Η επεξεργασία ολοκληρώθηκε επιτυχώς.</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                    <Button color="secondary" onClick={this.products}>Προϊόντα</Button>
                </ModalFooter>
            </Modal>
        </div>

          );
    }
}
