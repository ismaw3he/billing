import React, { Component } from 'react';
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";



const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        isAdmin: state.isAdmin,
        isUser: state.isUser,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        mainPage: state.mainPage,
        loggedInNew: state.loggedInNew
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onEditUser: (user) => dispatch({
            type: "EDIT_USER",
            userId: user
        })
    };
};


class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            searching: false,
            infoIndex: -1,
            infoData: {},
            data: [],
            filteredData: [],


            ipAddress: "10.10.1.110",
            macAddress: "403f.8c92.5f60",
            usage: "Internet + Telephone",
            internetPrice: 18.0,
            internetSpeed: 10500,
            voipPrice: 2.5,
            box: "A5",
            zona: "Dolmagol",
            serialNumber: "AZE08521625",
            phone: "0505392909",
            balance: 20
        };
    }

    componentDidMount() {
        fetch('http://62.212.226.11:7755/gettingallusers')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loading: false,
                    data: result
                });
            });
    }

    getSingleUser(id, index) {
        fetch('http://62.212.226.11:7755/gettinguser/' + id)
            .then(res => res.json())
            .then(result => {
                // Created-Time: "21-09-2021"
                this.setState({
                    ...this.state,
                    infoIndex: index,
                    ipAddress: result.ipaddress,
                    macAddress: result.macaddress,
                    usage: result.usagegroup,
                    internetPrice: result.internet_price,
                    internetSpeed: result.internet_speed,
                    voipPrice: result.voip_price,
                    box: result.box,
                    zona: result.zona,
                    serialNumber: result.serialnumber,
                    phone: result.Phone,
                    balance: result.balance
                })
            }).catch((error) => {
                console.log("errror:")
                console.log(error)
            });
    }

    render() {
        return (
            <div className="user-list-container">
                <div className="users-list-header-container">
                    <h3 className="users-list-header">Users List ({this.state.data.length})</h3>
                </div>
                <div className="users-list-table-container">
                    <div className="users-list-table">
                        <div className="table-row">
                            <div className="table-head head-right">
                                <FontAwesomeIcon icon={faSearch} size="1x" className={"search-icon"} />
                                <input className="text-input-search" type="text"
                                    onChange={(e) => {
                                        let search = false;
                                        if (e.target.value) {
                                            search = true;
                                        }
                                        let filtered = [];
                                        this.state.data.map((item, index) => {
                                            let tester = false;
                                            for (let i = 0; i < item.length; i++) {
                                                if (item[i].toString().toLowerCase().includes(e.target.value.toLowerCase())) {
                                                    tester = true;
                                                    break;
                                                }
                                            }
                                            if (tester) {
                                                filtered.push(item);
                                            }
                                            return true;
                                            // string.includes(substring)
                                        })
                                        this.setState({
                                            searching: search,
                                            filteredData: filtered
                                        })
                                    }}
                                />

                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-head">
                                <div className="id-head">
                                    <h3>#ID</h3>
                                </div>
                                <div className="name-head">
                                    <h3>Full Name</h3>
                                </div>
                                <div className="deposit-head">
                                    <h3>Deposit</h3>
                                </div>
                                <div className="credit-head">
                                    <h3>Credit</h3>
                                </div>
                                <div className="status-head">
                                    <h3>Status</h3>
                                </div>
                                <div className="date-head">
                                    <h3>Date</h3>
                                </div>
                                <div className="sold-head">
                                    <h3>Mac Address</h3>
                                </div>
                            </div>
                        </div>
                        {this.state.searching ?
                            this.state.filteredData.map((item, index) => {
                                return (
                                    <div key={index} className={index === this.state.infoIndex ? "table-row opened-row" : "table-row"}>
                                        <div
                                            onClick={() => {
                                                console.log(index)
                                                console.log(this.state.infoIndex)
                                                if (this.state.infoIndex !== index) {
                                                    this.getSingleUser(item[0], index)
                                                }
                                                else {
                                                    this.setState({
                                                        infoIndex: -1
                                                    })
                                                }
                                            }}
                                            className={index === this.state.infoIndex ? "table-data-row opened-data-row hover-blue" : "table-data-row"}>
                                            <div className="id-row">
                                                <p>{item[0]}</p>
                                            </div>
                                            <div className="name-row">
                                                <p>{item[1]} {item[2]} {item[3]}</p>
                                            </div>
                                            <div className="deposit-row">
                                                <p>{item[4]}</p>
                                            </div>
                                            <div className="credit-row">
                                                <p>-</p>
                                            </div>
                                            <div className="status-row">
                                                <div className={item[4] < 0 ? "status-box deactive-status" : "status-box active-status"}></div>
                                            </div>
                                            <div className="date-row">
                                                <p>{item[6]}</p>
                                            </div>
                                            <div className="sold-row">
                                                <p>{item[5]}</p>
                                            </div>
                                        </div>

                                        {index === this.state.infoIndex ?
                                            <div className="info-box">
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>IP Address: </h3>
                                                        <p>{this.state.ipAddress}</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Mac Address: </h3>
                                                        <p>{this.state.macAddress}</p>

                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Usage: </h3>
                                                        <p>{this.state.usage}</p>
                                                    </div>

                                                    <div className="info-box-col">
                                                        <h3>Internet Price: </h3>
                                                        <p>{this.state.internetPrice} AZN</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Internet Speed: </h3>
                                                        <p>{this.state.internetSpeed} {
                                                            this.state.internetSpeed === 10500 ? "kb/s (10 mb/s)" :
                                                                this.state.internetSpeed === 15500 ? "kb/s (15 mb/s)" :
                                                                    this.state.internetSpeed === 25500 ? "kb/s (25 mb/s)" :
                                                                        this.state.internetSpeed === 30500 ? "kb/s (30 mb/s)" :
                                                                            this.state.internetSpeed === 3500 ? "kb/s (3 mb/s)" :
                                                                                this.state.internetSpeed === 5500 ? "kb/s (5 mb/s)" :
                                                                                    this.state.internetSpeed === 20500 ? "kb/s (20 mb/s)" : "kb/s"}</p>
                                                    </div>
                                                </div>
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>VOIP Price: </h3>
                                                        <p>{this.state.voipPrice} AZN</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Box: </h3>
                                                        <p>{this.state.box}</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Zone: </h3>
                                                        <p>{this.state.zona}</p>
                                                    </div>

                                                    <div className="info-box-col">
                                                        <h3>Serial Number: </h3>
                                                        <p>{this.state.serialNumber}</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Balance: </h3>
                                                        <p>{this.state.balance}</p>
                                                    </div>
                                                </div>
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>Phone: </h3>
                                                        <p>{this.state.phone}</p>
                                                    </div>

                                                    <Link to={"user-edit"} className={"more-button"}
                                                        onClick={() => {
                                                            console.log(this.state.data[this.state.infoIndex][0])
                                                            this.props.onEditUser(this.state.filteredData[this.state.infoIndex][0])
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>

                                                </div>
                                            </div>
                                            :
                                            <div className="info-box closed-info-box"></div>
                                        }

                                    </div>


                                )

                            })

                            :

                            this.state.data.map((item, index) => {
                                return (
                                    <div key={index} className={index === this.state.infoIndex ? "table-row opened-row" : "table-row"}>
                                        {/* <div className="table-data-row"> */}

                                        <div
                                            onClick={() => {
                                                if (this.state.infoIndex !== index) {
                                                    this.getSingleUser(item[0], index)
                                                }
                                                else {
                                                    this.setState({
                                                        infoIndex: -1
                                                    })
                                                }
                                            }}
                                            className={index === this.state.infoIndex ? "table-data-row opened-data-row hover-blue" : "table-data-row"}>
                                            <div className="id-row">
                                                <p>{item[0]}</p>
                                            </div>
                                            <div className="name-row">
                                                <p>{item[1]} {item[2]} {item[3]}</p>
                                            </div>
                                            <div className="deposit-row">
                                                <p>{item[4]}</p>
                                            </div>
                                            <div className="credit-row">
                                                <p>-</p>
                                            </div>
                                            <div className="status-row">
                                                <div className={item[4] < 0 ? "status-box deactive-status" : "status-box active-status"}></div>
                                            </div>
                                            <div className="date-row">
                                                <p>{item[6]}</p>
                                            </div>
                                            <div className="sold-row">
                                                <p>{item[5]}</p>
                                            </div>
                                        </div>

                                        {index === this.state.infoIndex ?
                                            <div className="info-box">
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>IP Address: </h3>
                                                        <p>{this.state.ipAddress}</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Mac Address: </h3>
                                                        <p>{this.state.macAddress}</p>

                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Usage: </h3>
                                                        <p>{this.state.usage}</p>
                                                    </div>

                                                    <div className="info-box-col">
                                                        <h3>Internet Price: </h3>
                                                        <p>{this.state.internetPrice} AZN</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Internet Speed: </h3>
                                                        <p>{this.state.internetSpeed} {
                                                            this.state.internetSpeed === 10500 ? "kb/s (10 mb/s)" :
                                                                this.state.internetSpeed === 15500 ? "kb/s (15 mb/s)" :
                                                                    this.state.internetSpeed === 25500 ? "kb/s (25 mb/s)" :
                                                                        this.state.internetSpeed === 30500 ? "kb/s (30 mb/s)" :
                                                                            this.state.internetSpeed === 3500 ? "kb/s (3 mb/s)" :
                                                                                this.state.internetSpeed === 5500 ? "kb/s (5 mb/s)" :
                                                                                    this.state.internetSpeed === 20500 ? "kb/s (20 mb/s)" : "kb/s"}</p>
                                                    </div>
                                                </div>
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>VOIP Price: </h3>
                                                        {console.log(this.state.usage)}
                                                        <p>{this.state.usage.length === 8 ? 0 : 2.5} AZN</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Box: </h3>
                                                        <p>{this.state.box}</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Zone: </h3>
                                                        <p>{this.state.zona}</p>
                                                    </div>

                                                    <div className="info-box-col">
                                                        <h3>Serial Number: </h3>
                                                        <p>{this.state.serialNumber}</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Balance: </h3>
                                                        <p>{this.state.balance}</p>
                                                    </div>
                                                </div>
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>Phone: </h3>
                                                        <p>{this.state.phone}</p>
                                                    </div>

                                                    <Link to={"user-edit"} className={"more-button"}
                                                        onClick={() => {
                                                            this.props.onEditUser(this.state.data[this.state.infoIndex][0])
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>

                                                </div>
                                            </div>
                                            :
                                            <div className="info-box closed-info-box"></div>
                                        }

                                    </div>
                                )

                            })
                        }

                    </div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
