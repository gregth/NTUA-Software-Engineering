import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <link href="css/bootstrap.min.css" rel="stylesheet"></link>
        {this.props.children}
      </div>
    );
  }
}