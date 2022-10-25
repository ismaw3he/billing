
import React, { Component } from 'react';
// import {ModalComponent, ModalEdit} from "../../ModalComponent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
// import loginWrapper from "../../loginWrapper";
let timer = null;

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
                box: "",
                macaddress: "",
                balance: 0,
                date: "13-07-2021",
                serialnumber: "",
                usagegroup: "İnternet",
                internet_price: 18.0,
                internet_speed: "40500",
                phone: ["+994"],
                zona: "Dolmagöl",
                temporarySerialNumberPrefix: "AZE"
            },
            responseMessage: null,
            success: false,
            error: false,
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


    async addUser() {

        let data = {
            username: this.state.data.username,
            password: this.state.data.password,
            firstname: this.state.data.firstname,
            lastname: this.state.data.lastname,
            fathername: this.state.data.fathername,
            date: this.state.data.date,
            serialnumber: this.state.data.serialnumber,
            usagegroup: this.state.data.usagegroup,
            balance: this.state.data.balance,
            macaddress: this.state.data.macaddress,
            internet_tariff: "standard",
            internet_price: this.state.data.internet_price,
            internet_speed: this.state.data.internet_speed,
            tv_tariff: null,
            tv_price: 0,
            voip_tariff: "standard",
            voip_price: this.state.data.usagegroup === "Internet + Telephone" ? 2.5 : 0,
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
            phone: this.state.data.phone,
            zona: this.state.data.zona,
            box: this.state.data.box,
            note: null
        }
        // console.log(data)
        // Default options are marked with *
        const response = await fetch("http://94.20.229.18:6655/addinguser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects

    }

    apiCallAddUser() {
        this.setState({
            ...this.state,
            loading: true,
            responseMessage: "Loading..."
        })

        this.addUser().then((data) => {
            let message = data.message;

            if (message.slice(message.length - 20, message.length) === "added successfully !") {
                let freshData = {
                    ...this.state.data,
                    username: "",
                    password: "",
                    firstname: "",
                    lastname: "",
                    fathername: "",
                    box: "",
                    macaddress: "",
                    balance: 0,
                    phone: ["+994"],
                    serialnumber: ""    
                }
                this.setState({
                    ...this.state,
                    loading: false,
                    success: true,
                    error: false,
                    responseMessage: message,

                    data: freshData,
                })
            }
            else {
                this.setState({
                    ...this.state,
                    loading: false,
                    success: false,
                    error: true,
                    responseMessage: message
                })
            }



            timer = setTimeout(() => {
                this.setState({
                    ...this.state,
                    loading: false,
                    success: false,
                    error: false,
                    responseMessage: ""
                })
            }, 20000)
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
                    {/* {this.state.loading ?
                        <div className="response-message response-message-loading">{this.state.responseMessage}</div> 
                        :
                        this.state.error ?
                        <div className="response-message response-message-error">{this.state.responseMessage}</div> 
                        :
                        this.state.success ?
                        <div className="response-message response-message-success">{this.state.responseMessage}</div> 
                        :
                        null
                    } */}

                    <div className="users-list-header-container">
                        <h3 className="users-list-header">Add User</h3>
                    </div>
                    <div className="user-add-container">

                        {this.state.loading ? <div className="add-user-loader"></div> : null}


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
                        {/* {console.log(this.state.data)} */}
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
                                <input className="text-input"
                                    onChange={(e) => {


                                        let date = e.target.value;
                                        let year = date.substring(0, 4);
                                        let month = date.slice(5, 7);
                                        let day = date.slice(8, 10);
                                        date = day + "-" + month + "-" + year
                                        // console.log(date);

                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                date: date
                                            }
                                        })
                                    }}
                                    type="date" />
                            </div>

                            <div className="user-add-input-container serial-container">
                                <p className="serial-number-label">Serial Number: </p>
                                <div className={"selectWrapper-user-add"}>
                                    <select className={"selectBox-user-add"}
                                        onChange={(e) => {
                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    temporarySerialNumberPrefix: e.target.value
                                                }
                                            })
                                        }}
                                    >
                                        <option value="AZE">AZE</option>
                                        <option value="AA">AA</option>
                                    </select>
                                </div>
                                <input className="text-input serial-input"
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                serialnumber: this.state.data.temporarySerialNumberPrefix + e.target.value
                                            }
                                        })
                                    }}
                                    type="number" />
                            </div>

                            <div className="user-add-input-container tariff-container">
                                <p className="tariff-label">Usage Group: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"}
                                        value={this.state.data.usagegroup}
                                        onChange={(e) => {
                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    usagegroup: e.target.value
                                                }
                                            })
                                        }}
                                    >
                                        <option value="Internet">Internet</option>
                                        <option value="Internet + Telephone">Internet + Telephone</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="user-add-input-container">
                            <p>Last Name: </p>
                            <input className="text-input"
                                value={this.state.data.lastname}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            lastname: e.target.value
                                        }
                                    })
                                }}
                                type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>First Name: </p>
                            <input className="text-input"
                                value={this.state.data.firstname}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            firstname: e.target.value
                                        }
                                    })
                                }}
                                type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Father's Name: </p>
                            <input className="text-input"
                                value={this.state.data.fathername}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            fathername: e.target.value
                                        }
                                    })
                                }}
                                type="text" />
                        </div>


                        <div className="user-add-flex-container">


                            <div className="user-add-input-container balance-container">
                                <p className="serial-number-label">Balance: </p>
                                <input className="text-input serial-input"
                                    value={this.state.data.balance}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                balance: e.target.value
                                            }
                                        })
                                    }}
                                    type="number" />
                            </div>
                            <div className="user-add-input-container tariff-container">
                                <p className="plan-label">Zone: </p>
                                <div className={"selectWrapper-user-add tariff"}>
                                    <select className={"selectBox-user-add tariff-box"}
                                        value={this.state.data.zona}
                                        onChange={(e) => {
                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    zona: e.target.value
                                                }
                                            })
                                        }}
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
                                        onChange={(e) => {

                                            let price = e.target.value.substring(0, 4);
                                            let speed = e.target.value.substring(5,);

                                            this.setState({
                                                data: {
                                                    ...this.state.data,
                                                    internet_price: price,
                                                    internet_speed: speed
                                                }
                                            })
                                        }}
                                        className={"selectBox-user-add tariff-box"}>
                                        <option value="18.0-40000">18 AZN : 40 MB/S</option>
                                        <option value="20.0-50000">20 AZN : 50 MB/S</option>
                                        <option value="25.0-70000">25 AZN : 70 MB/S</option>
                                        <option value="28.0-80000">28 AZN : 80 MB/S</option>
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
                                value={this.state.data.box}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            box: e.target.value
                                        }
                                    })
                                }}
                                type="text" />
                        </div>
                        <div className="user-add-input-container">
                            <p>Mac Address: </p>
                            <input className="text-input"
                                value={this.state.data.macaddress}
                                onChange={(e) => {
                                    this.setState({
                                        data: {
                                            ...this.state.data,
                                            macaddress: e.target.value
                                        }
                                    })
                                }}
                                type="text" />
                        </div>


                        {this.state.data.phone.map((item, index) => {
                            return (
                                <div key={item + index} className="user-add-input-container plus-container">
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

                        <div className="submit-button"
                            onClick={() => {
                                this.apiCallAddUser();
                                console.log("submitted")
                            }}
                        >Submit</div>


                    </div>
                </div>

            </div>
        );
    }
}

export default AddUser;
