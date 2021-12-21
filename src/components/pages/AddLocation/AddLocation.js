import React, {Component} from 'react';
import {ModalComponent, ModalEdit} from "../../ModalComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import url from "../../API";
class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            loading: false,
            inputData: null,
            deleteModal: false,
            deleteString: null,
            editModal: false,
            editString: null,
            content: null,
            contentLoad: true,
            activeContent: null
        }
    }

    contentLoader = (type) => {
        this.setState({contentLoad: true});
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},

        };
        fetch(url+'/gettingaddresstypevalue/' + type, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({content: data, contentLoad: false, activeContent: type});
            }).catch((e) => {
            this.setState({contentLoad: false});
        });
    };
    addType = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addresstype: this.state.activeContent,
                addresstypevalue:this.state.inputData
            })
        };
        fetch(url+'/addingaddresstypevalue', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.contentLoader(this.state.activeContent);
            });
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
    canceledModal = () => {
        this.setState({editModal: false, deleteModal: false})
    };
    deleteValue = (address)=>{
        this.setState({deleteModal:false});
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addresstype:this.state.activeContent,
                addresstypevalue: address
            })
        };
        fetch(url+'/deletingaddresstypevalue', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.contentLoader(this.state.activeContent);
            });
    };
    editValue = (oldAddress, newAddress)=>{
        this.setState({editModal:false});
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addresstype: this.state.activeContent,
                oldname: oldAddress,
                newname:newAddress
            })
        };
        fetch(url+'/editingaddresstypevalue', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.contentLoader(this.state.activeContent);
            });
    };
    componentDidMount() {
        this.typesLoader();
    }

    render() {
        return (
            <div className={"add-location-page"}>
                {this.state.deleteModal ? <ModalComponent action={this.deleteValue} address={this.state.deleteString}
                                                          cancel={this.canceledModal}/> : null}
                {this.state.editModal ? <ModalEdit select={false} action={this.editValue} address={this.state.editString}
                                                   cancel={this.canceledModal}/> : null}
                <div className={"location-left-container"}>
                    <div className={"input-container-location-add"}>
                        <p className={"card-name"}>Add Location</p>
                        <div className={"inputs-container"}>

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


                    <div className={"location-choose"}>
                        <p className={"location-choose-header"}>Types:</p>
                        <div className={"location-choose-data-header"}>
                            <p>#</p>
                            <p>Name</p>
                            <p>Input Type</p>
                        </div>
                        <div className={"location-choose-data-container"}>
                            <ul className={"location-choose-data-scroll"}>
                                {this.state.loading ?
                                    <h1>Loading</h1> : this.state.data.length !== 0 ? this.state.data.map((item, index) => {

                                            return (
                                                item.clickable === "True" ?
                                                    (<li key={index}
                                                         className={this.state.activeContent === item.addresstype ? "active-button" : ""}
                                                         onClick={() => {
                                                             this.contentLoader(item.addresstype)
                                                         }}>
                                                        <div className={"location-choose-item"}>
                                                            <p>{index + 1}</p>
                                                            <p className={"capitalize"}>{item.addresstype}</p>
                                                            <p className={"capitalize"}>{item.clickable === "True" ?
                                                                "Select" : "Text"}</p>
                                                        </div>
                                                    </li>)
                                                    : null
                                            )
                                        })
                                        : <h1>error</h1>
                                }

                            </ul>
                        </div>

                    </div>


                </div>
                <div className={"cards-container"}>
                    <ul className={"cards-scroll-short"}>
                        {
                            this.state.contentLoad ?
                                <h1> </h1> : this.state.content.length !== 0 ? this.state.content.map((item, index) => {
                                    return (
                                        <li key={index} className={"cards-item"}>
                                            <div className={"card"}>
                                                <h3 className={"card-header"}>{item.addresstypevalue}</h3>
                                                <div className={"card-right-container short"}>
                                                    <div className={"options-right"}>
                                                        <FontAwesomeIcon icon={faEdit} size="2x"
                                                                         className={"card-icon"}
                                                                         onClick={() => { this.setState({
                                                                             editModal: true,
                                                                             editString: item.addresstypevalue
                                                                         })
                                                                         }}/>
                                                        <FontAwesomeIcon icon={faTrashAlt} size="2x"
                                                                         className={"card-icon"}
                                                                         onClick={()=>{ this.setState({
                                                                             deleteModal: true,
                                                                             deleteString: item.addresstypevalue
                                                                         })}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : <h1>Empty</h1>

                        }


                    </ul>

                </div>
            </div>
        );
    }
}

export default AddLocation;
