/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    if(!this.props.show) {
        return null;
    }

    return (
        <div className="backdrop">
            <div className="modal">
                {this.props.children}
                <div className="footer">
                    <button className="homepage" onClick={this.props.onClose}>
                        Διόρθωση Barcode
                    </button>
                    <button className="homepage" onClick={this.props.new_product}>
                        Προσθήκη Νέου Προϊόντος
                    </button>
                    <button className="homepage" onClick={this.props.home}>
                        Αρχική Σελίδα
                    </button>
                </div>
            </div>
        </div>
    );
  }
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    home: PropTypes.func.isRequired,
    new_product: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;

