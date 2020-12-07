import React, {Component} from 'react';
import {ModalComponent, ModalEdit} from "./ModalComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import url from "./API";

class AdderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            inputData: null,
            deleteModal: false,
            deleteString: null,
            editModal: false,
            editString: null
        }
    }

    typesLoader = () => {
        this.setState({loading: true});
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(url + this.props.getRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data, loading: false});
            }).catch((e) => {
            this.setState({loading: false});
        });
    };
    deleteType = (type) => {
        this.setState({loading: true, deleteModal: false});
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                this.props.config ?
                    {
                        configurationtype: this.props.config,
                        value: type
                    }
                    : {
                        value: type
                    })
        };
        fetch(url + this.props.deleteRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    editType = (oldAddress, newAddress) => {
        this.setState({loading: true, editModal: false});
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                this.props.config ?
                    {
                        configurationtype: this.props.config,
                        oldname: oldAddress,
                        newname: newAddress
                    }
                    : {
                        oldname: oldAddress,
                        newname: newAddress
                    })
        };
        fetch(url + this.props.editRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    addType = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                this.props.config ?
                    {
                        configurationtype: this.props.config,
                        value: this.state.inputData
                    }
                    : {
                        value: this.state.inputData
                    })
        };
        fetch(url + this.props.postRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    canceledModal = () => {
        this.setState({editModal: false, deleteModal: false})
    };

    componentDidMount() {
        this.typesLoader();
    }

    render() {
        return (
            <div className={"add-contact-type-page"}>
                {this.state.deleteModal ? <ModalComponent action={this.deleteType} address={this.state.deleteString}
                                                          cancel={this.canceledModal}/> : null}
                {this.state.editModal ? <ModalEdit select={false} action={this.editType} address={this.state.editString}
                                                   cancel={this.canceledModal}/> : null}
                <div className={"input-container-shorter"}>
                    <p className={"card-name"}>{this.props.header}</p>
                    <div className={"inputs-container contact-input-container"}>

                        <div className="container">
                            <input type="text" onChange={(e) => {
                                this.setState({inputData: e.target.value})
                            }} className={"input"}/>
                        </div>

                        <div onClick={this.addType} className={"add-button"}>
                            Add
                        </div>
                    </div>
                </div>
                <div className={"cards-container"}>
                    <ul className={"cards-scroll-short"}>
                        {this.state.data.map((item, index) => {
                            return (
                                <li key={index} className={"cards-item"}>
                                    <div className={"card"}>
                                        <h3 className={"card-header"}>{item.value}</h3>
                                        <div className={"card-right-container short"}>
                                            <div className={"options-right"}>
                                                <FontAwesomeIcon icon={faEdit} size="2x"
                                                                 className={"card-icon"}
                                                                 onClick={() => {
                                                                     this.setState({
                                                                         editModal: true,
                                                                         editString: item.value
                                                                     })
                                                                 }}/>
                                                <FontAwesomeIcon icon={faTrashAlt} size="2x"
                                                                 className={"card-icon"}
                                                                 onClick={() => {
                                                                     this.setState({
                                                                         deleteModal: true,
                                                                         deleteString: item.value
                                                                     })
                                                                 }}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}


                    </ul>

                </div>
            </div>
        );
    }
}

export default AdderComponent;
