import React, {Component} from 'react';
import Modal from "react-modal";
import "./modal.css"

export class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }
    }

    render() {
        return (
            <Modal
                style={customStyles}
                isOpen={this.state.isOpen}>
                <div className={"modal-container"}>
                    <h1 className={"modal-header"}>Please confirm to make changes</h1>
                    <div className={"modal-buttons-container"}>
                        <div className={"modal-button-confirm button"}
                             onClick={() => {
                                 this.props.action(this.props.address)
                                 this.setState({isOpen: false})
                             }}
                        >Confirm
                        </div>
                        <div className={"modal-button-cancel button"}
                             onClick={() => {
                                 // this.setState({isOpen: false})
                                 this.props.cancel()
                             }}
                        >Cancel
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export class ModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputData: null,
            switched: false,
            isOpen: true
        }
    }

    switcher = () => {
        this.setState({switched: !this.state.switched})
    };

    render() {
        return (
            <Modal
                style={customStyles}
                isOpen={this.state.isOpen}>
                <div className={"modal-container"}>
                    <h1 className={"modal-header"}>Please confirm to make changes</h1>
                    <div className="container">
                        <input type="text" onChange={(e) => {
                            this.setState({inputData: e.target.value})
                        }} className={"input"}/>
                        <div className={"flex"}>
                            <label className={`switch ${this.state.switched ? "switched" : ""}`}>
                                <input onClick={this.switcher} type="checkbox"/>
                                <div></div>

                            </label>
                            <p>Input type: <span>{this.state.switched ? "Select" : "Text"}</span></p>
                        </div>
                    </div>
                    <div className={"modal-buttons-container"}>
                        <div className={"modal-button-confirm button"}
                             onClick={() => {
                                 this.props.action(this.props.address, this.state.inputData, this.state.switched);
                                 this.setState({isOpen: false})
                             }}
                        >Confirm
                        </div>
                        <div className={"modal-button-cancel button"}
                             onClick={() => {
                                 this.props.cancel()
                             }}
                        >Cancel
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(103,103,103,0.75)',
        zIndex: 4
    },
    content: {
        position: 'absolute',
        top: "24%",
        left: "32%",
        right: "32%",
        bottom: "32%",
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '15px',
        outline: 'none',
        padding: '20px'
    }
};
