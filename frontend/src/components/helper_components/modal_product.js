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
                    <button className="homepage" onClick={this.props.new}>
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
    new: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;

