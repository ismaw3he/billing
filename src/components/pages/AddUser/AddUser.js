
import React, { Component } from 'react';
// import {ModalComponent, ModalEdit} from "../../ModalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
// import loginWrapper from "../../loginWrapper";

import url from "../../API";
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                fathername: "",
                date: "13-07-2021",
                serialnumber: "AZE17588089",
                usagegroup: "İnternet + Telefon",
                balance: "0",
                macaddress: "98c7.a409.91C8",
                internet_tariff: "standard",
                internet_price: 18.0,
                internet_speed: "10500",
                tv_tariff: null,
                tv_price: 0,
                voip_tariff: "standard",
                voip_price: 2.5,
                voip_number: null,
                intercom_tariff: null,
                intercom_price: 0,
                smsdate: null,
                contacttypes: "phone",
                addresstypes: "zona",
                extratypes: "box",
                noteforcontact: null,
                noteforaddress: null,
                noteforextra: null,
                phone: ["+994"],
                zona: "Dolmagöl",
                box: "H6"
            },
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
        this.setState({ contentLoad: true });
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        };
        fetch(url + '/gettingaddresstypevalue/' + type, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ content: data, contentLoad: false, activeContent: type });
            }).catch((e) => {
                this.setState({ contentLoad: false });
            });
    };
    addType = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addresstype: this.state.activeContent,
                addresstypevalue: this.state.inputData
            })
        };
        fetch(url + '/addingaddresstypevalue', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.contentLoader(this.state.activeContent);
            });
    };
    typesLoader = () => {
        this.setState({ loading: true });
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url + '/gettingaddresstype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data, loading: false });
            }).catch((e) => {
                this.setState({ loading: false });
            });
    };
    canceledModal = () => {
        this.setState({ editModal: false, deleteModal: false })
    };
    deleteValue = (address) => {
        this.setState({ deleteModal: false });
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addresstype: this.state.activeContent,
                addresstypevalue: address
            })
        };
        fetch(url + '/deletingaddresstypevalue', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.contentLoader(this.state.activeContent);
            });
    };
    editValue = (oldAddress, newAddress) => {
        this.setState({ editModal: false });
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addresstype: this.state.activeContent,
                oldname: oldAddress,
                newname: newAddress
            })
        };
        fetch(url + '/editingaddresstypevalue', requestOptions)
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
                <div className="user-list-container">
                    <div className="users-list-header-container">
                        <h3 className="users-list-header">Add User</h3>
                    </div>
                    <div className="user-add-container">
                        <div className="user-add-input-container">
                            <p>Username: </p>
                            <input className="text-input"
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            username: e.target.value,
                                            password: e.target.value
                                        }
                                    })
                                }}

                                onBlur={(e) => {
                                    let phoneText;
                                    if (e.target.value[0] === "0" || e.target.value[0] === 0) {
                                        phoneText = "+994" + e.target.value.substring(1);
                                    }
                                    let phone = [phoneText];
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            phone: phone
                                        }
                                    })
                                }}

                                type="number" value={this.state.data.username} />
                        </div>
                        {console.log(this.state.data)}
                        <div className="user-add-input-container">
                            <p>Password: </p>
                            <input className="text-input"
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            password: e.target.value
                                        }
                                    })
                                }}
                                type="number" value={this.state.data.password} />
                        </div>
                        <div className="user-add-flex-container">

                            <div className="user-add-input-container date-container">
                                <p>Date: </p>
                                <input className="text-input" type="date" />
                            </div>

                            <div className="user-add-input-container serial-container">
                                <p className="serial-number-label">Serial Number: </p>
                                <div className={"selectWrapper-user-add"}>
                                    <select className={"selectBox-user-add"}>
                                        <option value="AZE">AZE</option>
                                        <option value="AA">AA</option>
                                    </select>
                                </div>
                                <input className="text-input serial-input" type="number" />
                            </div>

                            <div className="user-add-input-container tariff-container">
                                <p className="tariff-label">Usage Group: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"}>
                                        <option value="Internet">Internet</option>
                                        <option value="Internet + Telephone">Internet + Telephone</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="user-add-input-container">
                            <p>First Name: </p>
                            <input className="text-input" type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Last Name: </p>
                            <input className="text-input" type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Father's Name: </p>
                            <input className="text-input" type="text" />
                        </div>


                        <div className="user-add-flex-container">


                            <div className="user-add-input-container balance-container">
                                <p className="serial-number-label">Balance: </p>
                                <input className="text-input serial-input" type="number" />
                            </div>
                            <div className="user-add-input-container tariff-container">
                                <p className="plan-label">Zone: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"}>
                                        <option value="Dolmagöl">Dolmagöl</option>
                                        <option value="Seyid Market">Seyid Market</option>
                                    </select>
                                </div>
                            </div>
                            <div className="user-add-input-container tariff-container">
                                <p className="plan-label">Plan: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"}>
                                        <option value="18.0">18 AZN : 10 MB/S</option>
                                        <option value="20.0">20 AZN : 15 MB/S</option>
                                        <option value="25.0">25 AZN : 25 MB/S</option>
                                        <option value="28.0">28 AZN : 30 MB/S</option>
                                        <option value="19.0">19 AZN : 3 MB/S</option>
                                        <option value="29.0">29 AZN : 5 MB/S</option>
                                        <option value="39.0">39 AZN : 10 MB/S</option>
                                        <option value="49.0">49 AZN : 15 MB/S</option>
                                        <option value="59.0">59 AZN : 20 MB/S</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="user-add-input-container balance-container">
                            <p className="serial-number-label">Box: </p>
                            <input className="text-input serial-input" type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Mac Address: </p>
                            <input className="text-input" type="text" />
                        </div>


                        {this.state.data.phone.map((item, index) => {
                            return (
                                <div className="user-add-input-container plus-container">
                                    {console.log(item)}
                                    <p className="serial-number-label">Phone: </p>
                                    <input className="text-input serial-input" value={item} type="text"
                                        onChange={(e) => {
                                            let phone = [...this.state.data.phone];
                                            phone[index] = e.target.value;
                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    phone: phone
                                                }
                                            })
                                        }}
                                    />
                                    {this.state.data.phone.length <= 1 || index === this.state.data.phone.length - 1 ?
                                        <div className="plus-button" onClick={() => {
                                            let phone = [...this.state.data.phone, "+994"];
                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    phone: phone
                                                }
                                            })
                                        }}>+</div>
                                        :
                                        <div className="plus-button" onClick={() => {
                                            let phone = [...this.state.data.phone];
                                            phone.splice(index, 1);
                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    phone: phone
                                                }
                                            })
                                        }}>-</div>
                                    }

                                </div>
                            )
                        })}

                    <div className="submit-button">Submit</div>


                    </div>
                </div>

            </div>
        );
    }
}

export default AddUser;
