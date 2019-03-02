import React from "react";
<<<<<<< HEAD
import {Col, Row} from 'reactstrap';
=======
import {Col} from 'reactstrap';
import { Row } from 'reactstrap';
>>>>>>> 9398faf10d9b96e57d133e86b6f9c378e1450d05

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);
  }
  
  updateRange(e) {
    this.props.updateRange(e.target.value);
  }
  
  render() {
    // console.log(this.props);
    const { range } = this.props;
    return (
      <div>
       
      <Row>
          <input className="range" type="range"
            value={range} 
            min="0"
            max="150"
            step="1"
            onChange={this.updateRange}
          />

          <span htmlFor="range" className="price" id="price">{range}€</span>

          </Row>
       </div>
    );
  }
}

export default Range;

