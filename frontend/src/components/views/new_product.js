import React from 'react';
import { browserHistory } from 'react-router';
import { Alert, Modal, ModalBody, ModalFooter, FormText, Input, Label, Button, Form, Container, FormGroup, Col, InputGroupAddon, InputGroup } from 'reactstrap';
import {Categories} from '../helper_components/categories_menu';
import {send_to_server} from '../communication/send';
import NavBarClass from '../helper_components/navbar';

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

class newProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { error_message: null, success: null, error: null, not_found: null, message: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.homepage = this.homepage.bind(this);
        this._isMounted = null;
    }
    
    componentWilldUnmount() {
        if (this._isMounted) {
            this._isMounted.cancel();
        }
    }
    
    homepage () {
        browserHistory.push('/');
    }
    
    toggleModal() {
        this.setState({ error: !this.state.error });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        this.setState({success: null, error: null, not_found: null, message: null, error_message: null });
        const name = document.getElementById('new_product_name').value;
        const barcode = document.getElementById('new_product_barcode').value;
        const brand = document.getElementById('new_product_brand').value;
        const volume = document.getElementById('new_product_volume').value;
        const description = document.getElementById('new_product_description').value; 
        const category = this.refs.new_product_category.state.category;
        var tags_list = (document.getElementById('new_product_tags').value).split(',');
        
        tags_list = tags_list.filter(onlyUnique);
        var tags = [];
        for (var i=0; i<tags_list.length; i++) {
            var temp = tags_list[i].replace(/\s+/g,' ').trim();
            if (temp === "") continue;
            tags.push(temp);
        }
        
        tags = tags.filter( onlyUnique );
        
        var product = { 
            description,
            name,
            barcode,
            brand,
            volume,
            category,
            tags: tags.join(','),
            withdrawn: 0
        };
        
        console.log(product);
        const url = '/products';
        this._isMounted = await send_to_server(url, product);
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
    }
  
    render() {
        return(
            <div>
            <NavBarClass/>
            
            <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά. {this.state.error_message}</Alert>
            <Alert color="danger" isOpen={this.state.not_found===true}>{this.state.message}</Alert>
                
            <Container className="newProduct">
                <h2 align="center">Εισαγωγή Προϊόντος</h2>
                <hr></hr>
            <Form id="new_product_form" onSubmit={this.handleSubmit}>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_barcode" className="mr-sm-2">Barcode Προϊόντος:</Label>
                    <Col sm={3}>
                        <Input id="new_product_barcode" name="new_product_barcode" pattern="[0-9]{1,128}" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_name" className="mr-sm-2">Όνομα Προϊόντος:</Label>
                    <Col sm={3}>
                        <Input id="new_product_name" name="new_product_name" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_brand" className="mr-sm-2">Μάρκα Προϊόντος:</Label>
                    <Col sm={3}>
                        <Input id="new_product_brand" name="new_product_brand" type="text" required/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={3} for="new_product_category">Κατηγορία:</Label>
                    <Col sm={6}>
                        <Categories ref='new_product_category'/>
                    </Col>
                </FormGroup>
                <div className="row mt-3"></div>
                <FormGroup check row>
                    <Label sm={6} for="new_product_tags">Χαρακτηριστικά Προϊόντος:
                    <FormText>Διαχωρισμός χαρακτηριστικών με κόμμα (,)</FormText></Label>
                    <Col sm={6}>
                  
                        <Input type="textarea" name="text" id="new_product_tags" onChange={this.handleChangeTags} value={this.state.tags}/>
                    </Col>
                </FormGroup>
                
                <FormGroup check row>
                    <Label sm={6} for="new_product_description">Περιγραφή προϊόντος:</Label>
                    <Col sm={6}>
                        <Input type="textarea" name="text" id="new_product_description" required/>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Label sm={3} for="new_product_volume">Όγκος:</Label>
                    <Col sm={3}>
                        <InputGroup>
                            <Input type="text" id="new_product_volume" pattern="[0-9]+" name="new_product_volume"/>
                            <InputGroupAddon addonType="append">ml</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <hr></hr>
                <div className="text-center">
                <Button type="submit" id="button1">Προσθήκη</Button>{'  '}
                <Button type="button" id="button2" onClick={this.homepage}>Ακύρωση</Button>
                </div>
            </Form>
            </Container>
            
            
            <Modal isOpen={this.state.error} toggle={this.toggleModal}>
                <ModalBody>Το αίτημα προσθήκης δεν ήταν επιτυχές.</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>Προσπάθεια ξανά</Button>{' '}
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen={this.state.success}>
                <ModalBody>Το αίτημα προσθήκης ήταν επιτυχές.</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.homepage}>Αρχική σελίδα</Button>
                </ModalFooter>
            </Modal>
            
           </div>
        );
  }
}

export default newProduct;

