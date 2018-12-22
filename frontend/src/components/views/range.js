/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from "react";
import ReactDOM from 'react-dom';

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
        <input className="range" type="range"
          value={range}
          min="0"
          max="150"
          step="0.01"
          onChange={this.updateRange}
        />
        <span className="price" id="price">{range}€</span>
      </div>
    );
  }
}

export default Range;

