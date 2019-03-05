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
                            <CardImg width="280" height="200" src={"/grigoris.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><strong>Γρηγόρης Θανάσουλας</strong></CardTitle>
                                <CardSubtitle>Backend Engineer</CardSubtitle>
                              
                            </CardBody>
                        </Card>
                        
                        <Card>
                            <CardImg width="280" height="200" src={"/themis.png"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><strong>Θέμης Παπαμελετίου</strong></CardTitle>
                                <CardSubtitle>Backend Engineer</CardSubtitle>
                              
                            </CardBody>
                        </Card>
                        <Card>
                            <CardImg width="280" height="200" src={"/marilena.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><strong>Μαριλένα Οικονομοπούλου</strong></CardTitle>    
                                <CardSubtitle><strong>-</strong></CardSubtitle>                          
                            </CardBody>
                        </Card>
                    </CardDeck>   
                    
                    <CardDeck className="down">
                        <Card>
                            <CardImg width="220" height="220" src={"/athina.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><strong>Αθηνά Σταματίου</strong></CardTitle>
                                <CardSubtitle>Frontend/UI Desinger</CardSubtitle>
                  
                            </CardBody>
                        </Card>
                 
                        <Card>
                       
                            <CardImg  width="200" height="240" src={"/nikol.jpg"} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><strong>Νικολέττα Κατσούλη</strong></CardTitle>
                                <CardSubtitle>Frontend Engineer</CardSubtitle>
                            
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
