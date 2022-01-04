
import React, { Component } from 'react';
// import {ModalComponent, ModalEdit} from "../../ModalComponent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { connect } from "react-redux";
// import loginWrapper from "../../loginWrapper";

const mapStateToProps = state => {
    return {
        user: state.editUser
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};


let timer = null;



class UserEdit extends Component {



    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: "",
                firstname: "",
                lastname: "",
                fathername: "",
                box: "",
                macaddress: "",
                balance: 0,
                serialNumber: "",
                usagegroup: "İnternet",
                internet_price: 18.0,
                internet_speed: "10500",
                phone: ["+994"],
                zona: "Dolmagöl",
                temporarySerialNumberPrefix: "AZE",
            },
            newMacAddress: null,
            responseMessage: null,
            success: false,
            error: false,
            loading: false
        }
    }

    getSingleUser(id) {
        fetch('http://62.212.226.11:7755/gettinguser/' + id)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    ...this.state,
                    data: {
                        username: result.username,
                        password: result.username,
                        firstname: result.firstname,
                        lastname: result.lastname,
                        fathername: result.fathername,
                        macAddress: result.macaddress,
                        usagegroup: result.usagegroup,
                        internet_price: result.internet_price,
                        internet_speed: result.internet_speed,
                        box: result.box,
                        zona: result.zona,
                        serialNumber: result.serialNumber,
                        phone: result.Phone,
                        balance: result.balance
                    }

                })
            }).catch((error) => {
                console.log("errror:")
                console.log(error)
            });
    }

    componentDidMount() {

        this.getSingleUser(this.props.user)
    }


    async editMacAddress() {
        let data = {
            username: this.state.data.username,
            macaddress: this.state.newMacAddress,
        }

        // console.log(data)
        // Default options are marked with *

        const response = await fetch("http://62.212.226.11:7755/editingmacaddress", {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects

    }

    apiCallEditUser() {
        this.setState({
            ...this.state,
            loading: true,
            responseMessage: "Loading..."
        })

        this.editMacAddress().then((data) => {
            let message = data.message;

            // console.log(message);
            // console.log(data);


            this.setState({
                ...this.state,
                loading: false,
                success: true,
                error: false,
                responseMessage: message,
            })



            timer = setTimeout(() => {
                this.setState({
                    ...this.state,
                    loading: false,
                    success: false,
                    error: false,
                    responseMessage: ""
                })
            }, 2000)
        }).catch((error) => {
            console.log("errror:")
            console.log(error)
            this.setState({
                ...this.state,
                loading: false,
                success: false,
                error: true,
                responseMessage: error.message
            })
        });
    }

    componentWillUnmount() {
        clearTimeout(timer);
    }


    render() {
        return (
            <div className={"add-location-page"}>
                <div className="user-list-container">
                    <div className={this.state.loading ? "response-message response-message-loading" :
                        this.state.error ? "response-message response-message-error" :
                            this.state.success ? "response-message response-message-success" :
                                "response-message response-message-hidden"

                    }>{this.state.responseMessage}</div>


                    <div className="users-list-header-container">
                        <h3 className="users-list-header">Edit User</h3>
                    </div>
                    <div className="user-add-container">

                        {this.state.loading ? <div className="add-user-loader"></div> : null}


                        <div className="user-add-input-container">
                            <p>Username: </p>
                            <input className="text-input" disabled type="number" defaultValue={this.state.data.username} />
                        </div>
                        <div className="user-add-input-container">
                            <p>Password: </p>
                            <input className="text-input" disabled type="number" defaultValue={this.state.data.password} />
                        </div>
                        <div className="user-add-flex-container">

                            <div className="user-add-input-container date-container">
                                <p>Date: </p>
                                <input className="text-input" disabled value={" "} type="text" />
                            </div>

                            <div className="user-add-input-container serial-container">
                                <p className="serial-number-label">Serial Number: </p>
                                <div className={"selectWrapper-user-add"}>
                                    <select className={"selectBox-user-add"} disabled value={"AA"}>
                                        <option value="AZE">AZE</option>
                                        <option value="AA">AA</option>
                                    </select>
                                </div>
                                <input className="text-input serial-input" disabled defaultValue={this.state.data.serialNumber} type="number" />
                            </div>

                            <div className="user-add-input-container tariff-container">
                                <p className="tariff-label">Usage Group: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"} disabled value={"Internet + Telephone"}>
                                        <option value="Internet">Internet</option>
                                        <option value="Internet + Telephone">{this.state.data.usagegroup}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="user-add-input-container">
                            <p>First Name: </p>
                            <input className="text-input" disabled value={this.state.data.firstname} type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Last Name: </p>
                            <input className="text-input" disabled value={this.state.data.lastname} type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Father's Name: </p>
                            <input className="text-input" disabled value={this.state.data.fathername} type="text" />
                        </div>


                        <div className="user-add-flex-container">


                            <div className="user-add-input-container balance-container">
                                <p className="serial-number-label">Balance: </p>
                                <input className="text-input serial-input" value={this.state.data.balance} disabled type="number" />
                            </div>
                            <div className="user-add-input-container tariff-container">
                                <p className="plan-label">Zone: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"}
                                        value={this.state.data.zona}
                                        disabled
                                    >
                                        <option value="Dolmagöl">Dolmagöl</option>
                                        <option value="Seyid Market">Seyid Market</option>
                                    </select>
                                </div>
                            </div>
                            <div className="user-add-input-container tariff-container">
                                <p className="plan-label">Plan: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select
                                        disabled
                                        value={this.state.data.internet_price + " " + this.state.data.internet_speed}
                                        className={"selectBox-user-add tariff-box"}>
                                        <option value="18.0-10500">18 AZN : 10 MB/S</option>
                                        <option value="20.0-15500">20 AZN : 15 MB/S</option>
                                        <option value="25.0-25500">25 AZN : 25 MB/S</option>
                                        <option value="28.0-30500">28 AZN : 30 MB/S</option>
                                        <option value="19.0-3500">19 AZN : 3 MB/S</option>
                                        <option value="29.0-5500">29 AZN : 5 MB/S</option>
                                        <option value="39.0-10500">39 AZN : 10 MB/S</option>
                                        <option value="49.0-15500">49 AZN : 15 MB/S</option>
                                        <option value="59.0-20500">59 AZN : 20 MB/S</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="user-add-input-container balance-container">
                            <p className="serial-number-label">Box: </p>
                            <input className="text-input serial-input"
                                // value={this.state.data.box}
                                defaultValue={this.state.data.box}
                                disabled
                                type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Mac Address: </p>
                            <input className="text-input"

                                defaultValue={this.state.data.macAddress}

                                onChange={(e) => {
                                    this.setState({
                                        newMacAddress: e.target.value
                                    })
                                }}
                                type="text" />
                        </div>


                        {/* {console.log(this.state.data.phone)} */}
                        {/* <div className="user-add-input-container plus-container">
                            <p className="serial-number-label">Phone: </p>
                            <input className="text-input serial-input" value={"+994505392909"} disabled type="text" />
                            <div className="plus-button" >+</div>
                        </div>
                        <div className="user-add-input-container plus-container">
                            <p className="serial-number-label">Phone: </p>
                            <input className="text-input serial-input" value={"+994557881166"} disabled type="text" />
                            <div className="plus-button" >+</div>
                        </div> */}


                        <div className="submit-button"
                            onClick={() => {
                                this.apiCallEditUser();
                            }}
                        >Save</div>


                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
