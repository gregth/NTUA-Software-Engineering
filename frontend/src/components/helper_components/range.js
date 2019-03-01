import React from "react";
import {Col,Row } from 'reactstrap';

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
       
      <Col>
          <input className="range" type="range"
            value={range} 
            min="0"
            max="150"
            step="0.1"
            onChange={this.updateRange}
          />
     
          <span for="range" className="price" id="price">{range}€</span>
          </Col>
       </div>
    );
  }
}

export default Range;

