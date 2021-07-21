import React, { Component } from 'react';
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            searching: false,
            data: [],
            filteredData: []
        };
    }

    componentDidMount() {
        fetch('http://172.19.4.35:6655/gettingallusers')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loading: false,
                    data: result
                });
            });
    }

    render() {
        return (
            <div className="user-list-container">
                <div className="users-list-header-container">
                    <h3 className="users-list-header">Users List ({this.state.data.length - 1})</h3>
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
                                    <h3>Sold</h3>
                                </div>
                            </div>
                        </div>
                        {this.state.searching ?
                            this.state.filteredData.map((item) => {
                                return (
                                    <div className="table-row">
                                        <div className="table-data-row">
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
                                                <p>-</p>
                                            </div>
                                            <div className="sold-row">
                                                <p>-</p>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })

                            :

                            this.state.data.map((item, index) => {
                                return (
                                    <div className={false ? "table-row opened-row" : "table-row"}>
                                        {/* <div className="table-data-row"> */}
                                        <div className={false ? "table-data-row opened-data-row" : "table-data-row"}>
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
                                                <p>-</p>
                                            </div>
                                            <div className="sold-row">
                                                <p>-</p>
                                            </div>
                                        </div>

                                        {false ?
                                            <div className="info-box">
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>IP Address: </h3>
                                                        <p>10.10.1.115</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Mac Address: </h3>
                                                        <p>403f.8c92.5f6d</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Usage: </h3>
                                                        <p>Internet + Telephone</p>
                                                    </div>

                                                    <div className="info-box-col">
                                                        <h3>Internet Price: </h3>
                                                        <p>18 AZN</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Internet Speed: </h3>
                                                        <p>10500 kb/s (10 mb/s)</p>
                                                    </div>
                                                </div>
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>VOIP Price: </h3>
                                                        <p>2.5 AZN</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Box: </h3>
                                                        <p>A9</p>
                                                    </div>
                                                    <div className="info-box-col">
                                                        <h3>Zone: </h3>
                                                        <p>Dolmagöl</p>
                                                    </div>

                                                    <div className="info-box-col">
                                                        <h3>Serial Number: </h3>
                                                        <p>AZE08521625</p>
                                                    </div>
                                                </div>
                                                <div className="info-box-row">
                                                    <div className="info-box-col">
                                                        <h3>Phone: </h3>
                                                        <p>+994505392909</p>
                                                    </div>
                                                    
                                                    <div className="more-button">More</div>
                                                </div>
                                            </div>
                                            : null}
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

export default UsersList;
