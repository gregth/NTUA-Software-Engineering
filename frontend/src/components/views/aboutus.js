/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { Alert, Row, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Container, Col, CardDeck} from 'reactstrap';
import NavBarClass from '../helper_components/navbar';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <NavBarClass/>
                <Alert color="danger" isOpen={this.state.error===true}>Πρόβλημα με τη σύνδεση. Δοκιμάστε ξανά.</Alert>
                <div>
                    <Container className="About">
                    <CardDeck>
                        <Card>
                            <CardImg  width="200" height="260" src={"/public/athina.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Αθηνά Σταματίου</CardTitle>
                                <CardSubtitle>Frontend/UI Desinger</CardSubtitle>
                  
                            </CardBody>
                        </Card>
                 
                        <Card>
                       
                            <CardImg  width="200" height="260" src={"/public/nikol.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Νικολέττα Κατσούλη</CardTitle>
                                <CardSubtitle>Frontend Engineer</CardSubtitle>
                            
                            </CardBody>
                        </Card>
                       
                        </CardDeck>
                        <CardDeck>
                    
                        <Card>
                            <CardImg width="200" height="260" src={"/public/grigoris.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Γρηγόρης Θανάσουλας</CardTitle>
                                <CardSubtitle>Backend Engineer</CardSubtitle>
                              
                            </CardBody>
                        </Card>
                        
                        <Card>
                            <CardImg width="200" height="260" src={"/public/themis.png"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Θέμης Παπαμελετίου</CardTitle>
                                <CardSubtitle>Backend Engineer</CardSubtitle>
                              
                            </CardBody>
                        </Card>
                  
                        </CardDeck>                        
                    </Container>
                </div>
            </div>
        );
    }
}

export default About;
