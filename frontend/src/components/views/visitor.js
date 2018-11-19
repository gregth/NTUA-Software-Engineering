/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router';


class Visitor extends React.Component {
   
    render() {
        browserHistory.push('/search');
        return;
  }
}

export default Visitor;
