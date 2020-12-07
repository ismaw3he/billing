import React, {Component} from 'react';
import Modal from "react-modal";
import "./modal.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

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
                                 this.props.action(this.props.address);
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
                        {this.props.select? <div className={"flex"}>
                            <label className={`switch ${this.state.switched ? "switched" : ""}`}>
                                <input onClick={this.switcher} type="checkbox"/>
                                <div></div>

                            </label>
                            <p>Input type: <span>{this.state.switched ? "Select" : "Text"}</span></p>
                        </div>: null}

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

export class ModalEditMultiple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputData: null,
            isOpen: true,
            selectData: "MB",
            selectStatus: false
        }
    }

    openOrCloseSelect = () => {
        this.setState({selectStatus: !this.state.selectStatus})
    };
    render() {
        return (
            <Modal
                style={customMultiple}
                isOpen={this.state.isOpen}>
                <div className={"modal-container"}>
                    <h1>Please confirm to make changes</h1>
                    <div className="container">
                        <div className="multiple-input-container-single">
                            <p className={"input-label"}>Name</p>
                            <input type="text" onChange={(e) => {
                                this.setState({inputName: e.target.value})
                            }} className={"input"}/>
                        </div>

                        <div className="multiple-input-container-single">
                            <p className={"input-label"}>Price</p>
                            <input type="text" onChange={(e) => {
                                this.setState({inputPrice: e.target.value})
                            }} className={"input"}/>
                        </div>

                        <div className="multiple-input-container-single">
                            <p className={"input-label"}>Tariff Type</p>
                            <input type="text" onChange={(e) => {
                                this.setState({inputType: e.target.value})
                            }} className={"input"}/>
                        </div>
                        {this.props.speed ?
                            <div className="multiple-input-container-single">
                                <p className={"input-label"}>Speed</p>
                                <div className={"internet-select"}>
                                    <input type="text" onChange={(e) => {
                                        // this.setState({inputSpeed: e.target.value})
                                    }} className={"input internet-mb"}/>

                                    <div onClick={() => {
                                        this.openOrCloseSelect();
                                    }} className="contact-select internet-dropdown">
                                        <div className={"dropdown-contact"}>
                                            <h2>{this.state.selectData}</h2>
                                            <FontAwesomeIcon icon={faCaretDown} size="2x"/>
                                        </div>
                                        <div className={`select-options ${this.state.selectStatus ? "show-select" : ""}`}>

                                            <div onClick={() => {
                                                this.setState({ selectData: "KB"})
                                            }} className={"contact-select-option"}>
                                                <p>KB</p>
                                            </div>
                                            <div onClick={() => {
                                                this.setState({ selectData: "MB"})
                                            }} className={"contact-select-option"}>
                                                <p>MB</p>
                                            </div>
                                            <div onClick={() => {
                                                this.setState({ selectData: "GB"})
                                            }} className={"contact-select-option"}>
                                                <p>GB</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div> :
                            null}

                    </div>
                    <div className={"modal-buttons-container"}>
                        <div className={"modal-button-confirm button"}
                             onClick={() => {
                                 // this.props.action(this.props.address, this.state.inputData, this.state.switched);
                                 // this.setState({isOpen: false})
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
const customMultiple={
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
        top: "10%",
        left: "32%",
        right: "32%",
        bottom: "13%",
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '15px',
        outline: 'none',
        padding: '20px'
    }
};
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
