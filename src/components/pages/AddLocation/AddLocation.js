import React, {Component} from 'react';
import {ModalComponent, ModalEdit} from "../../ModalComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            switched: false,
            error: null,
            loading: false,
            inputData: null,
            deleteModal: false,
            deleteString: null,
            editModal: false,
            editString: null
        }
    }

    switcher = () => {
        this.setState({switched: !this.state.switched})
    };
    typesLoader = () => {
        this.setState({loading: true});
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://192.168.0.88:5000/gettingaddresstype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data, loading: false});
            }).catch((e) => {
            this.setState({loading: false});
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
            <div className={"add-location-page"}>
                {this.state.deleteModal ? <ModalComponent action={this.deleteType} address={this.state.deleteString}
                                                          cancel={this.canceledModal}/> : null}
                {this.state.editModal ? <ModalEdit action={this.editType} address={this.state.editString}
                                                   cancel={this.canceledModal}/> : null}
                <div className={"location-left-container"}>
                    <div className={"input-container-location-add"}>
                        <p className={"card-name"}>Add Location</p>
                        <div className={"inputs-container"}>

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
                            <div onClick={() => {
                            }} className={"add-button"}>
                                Add
                            </div>
                        </div>
                    </div>
                    <div className={"location-choose"}>

                    </div>
                </div>
                <div className={"cards-container"}>
                    <ul className={"cards-scroll"}>
                        {
                            this.state.loading ?
                                <h1>Loading</h1> : Object.keys(this.state.data).length !== 0 ? Object.keys(this.state.data).map((item, index) => {
                                    return (
                                        <li key={index} className={"cards-item"}>
                                            <div className={"card"}>
                                                <h3 className={"card-header"}>{item}</h3>
                                                <div className={"card-right-container"}>
                                                    <p className={"card-selectable"}>Input
                                                        Type: <span>{this.state.data[item] === "True" ?
                                                            "Select" : "Text"}</span></p>
                                                    <div className={"options-right"}>
                                                        <FontAwesomeIcon icon={faEdit} size="2x"
                                                                         className={"card-icon"}
                                                                         onClick={() => {
                                                                         }}/>
                                                        <FontAwesomeIcon icon={faTrashAlt} size="2x"
                                                                         className={"card-icon"}
                                                                         onClick={() => {
                                                                         }}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : <h1>error</h1>

                        }


                    </ul>

                </div>
            </div>
        );
    }
}

export default AddLocation;
