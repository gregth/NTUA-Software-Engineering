/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, {Component} from 'react';
import { Alert, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Container, CardDeck} from 'reactstrap';
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
                            <CardImg  width="260" height="260" src={"/athina.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Αθηνά Σταματίου</CardTitle>
                                <CardSubtitle>Frontend/UI Desinger</CardSubtitle>
                  
                            </CardBody>
                        </Card>
                 
                        <Card>
                       
                            <CardImg  width="260" height="260" src={"/nikol.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Νικολέττα Κατσούλη</CardTitle>
                                <CardSubtitle>Frontend Engineer</CardSubtitle>
                            
                            </CardBody>
                        </Card>
                       
                        </CardDeck>
                        <CardDeck>
                    
                        <Card>
                            <CardImg width="260" height="260" src={"/grigoris.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Γρηγόρης Θανάσουλας</CardTitle>
                                <CardSubtitle>Backend Engineer</CardSubtitle>
                              
                            </CardBody>
                        </Card>
                        
                        <Card>
                            <CardImg width="260" height="260" src={"/themis.png"} alt="Card image cap" />
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
