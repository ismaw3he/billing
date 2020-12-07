import React, {Component} from 'react';
import "./style.css"
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ModalComponent, ModalEdit} from "../../ModalComponent";
import url from "../../API";

class AddLocationType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
        fetch(url+'/gettingaddresstype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({data: data, loading: false});
            }).catch((e) => {
            this.setState({loading: false});
        });
    };
    deleteType = (address) => {
        this.setState({loading: true,deleteModal:false});
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addresstype: address
            })
        };
        fetch('http://192.168.0.88:5000/deletingaddresstype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });

    };
    editType = (oldAddress, newAddress, selectable) => {
        this.setState({loading: true,editModal:false});
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                oldname: oldAddress,
                newname: newAddress,
                clickable:selectable
            })
        };
        fetch(url+'/editingaddresstype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    addType = () => {
        this.setState({loading: true});
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addresstype: this.state.inputData,
                clickable: this.state.switched
            })
        };
        fetch('http://192.168.0.88:5000/addingaddresstype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    canceledModal = ()=>{
      this.setState({editModal: false,deleteModal:false})
    };
    componentDidMount() {
        this.typesLoader();
    }

    render() {

        return (

            <div className={"add-location-type-page"}>
                {this.state.deleteModal? <ModalComponent action={this.deleteType} address={this.state.deleteString} cancel={this.canceledModal}/> : null}
                {this.state.editModal? <ModalEdit select={true} action={this.editType} address={this.state.editString} cancel={this.canceledModal}/> : null}
                <div className={"input-container"}>
                    <p className={"card-name"}>Add Location Type</p>
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

                        <div onClick={this.addType} className={"add-button"}>
                            Add
                        </div>
                    </div>
                </div>
                <div className={"cards-container"}>
                    <ul className={"cards-scroll"}>
                        {
                            this.state.loading ?
                                <h1>Loading</h1> : this.state.data.length !== 0 ? this.state.data.map((item, index) => {
                                    return (
                                        <li key={index} className={"cards-item"}>
                                            <div className={"card"}>
                                                <h3 className={"card-header"}>{item.addresstype}</h3>
                                                <div className={"card-right-container"}>
                                                    <p className={"card-selectable"}>Input
                                                        Type: <span>{item.clickable === "True" ?
                                                            "Select" : "Text"}</span></p>
                                                    <div className={"options-right"}>
                                                        <FontAwesomeIcon icon={faEdit} size="2x"
                                                                         className={"card-icon"}
                                                                         onClick={()=>{ this.setState({
                                                                             editModal: true,
                                                                             editString: item.addresstype
                                                                         })}}/>
                                                        <FontAwesomeIcon icon={faTrashAlt} size="2x"
                                                                         className={"card-icon"}
                                                                        onClick={()=>{ this.setState({
                                                                            deleteModal: true,
                                                                            deleteString: item.addresstype
                                                                        })}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : <h1>error</h1>

                        }


                    </ul>

                </div>
                {/*<h1>Add Location Type</h1>*/}
                {/*<input type="text"/>*/}
                {/*<h1>Choose Input method</h1>*/}
                {/*<select id="location-type">*/}
                {/*    <option value="select">Select</option>*/}
                {/*    <option value="text">Text</option>*/}
                {/*</select>*/}
            </div>
        )
            ;
    }
}

export default AddLocationType;
