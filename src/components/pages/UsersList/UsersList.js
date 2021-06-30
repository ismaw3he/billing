import React, { Component } from 'react';
import "./style.css";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            data: [
                [
                    "0507331337",
                    "Alim",
                    "Ağayev",
                    "Rasim",
                    0.0
                ],
                [
                    "05077435336",
                    "Fatih",
                    "Huseynov",
                    "Eliaga",
                    0.0
                ],
                [
                    "0507331211",
                    "Faiq",
                    "Azizzade",
                    "Oqtay",
                    2.50
                ],
                [
                    "0507332655",
                    "Movsum",
                    "Nuiyev",
                    "Bayram",
                    0.0
                ],
                [
                    "0507332256",
                    "Erol",
                    "Novruzov",
                    "Mehman",
                    10.0
                ], [
                    "0505233033",
                    "Anar",
                    "Sahiboglu",
                    "Sahib",
                    15.0
                ]
            ]

        };
    }
    render() {
        return (
            <div className="user-list-container">
                <div className="users-list-header-container">
                    <h3 className="users-list-header">Users List</h3>
                </div>
                <div className="users-list-table-container">
                    <div className="users-list-table">

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
                        {this.state.data.map((item) => {
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
                                            <p>-</p>
                                        </div>
                                        <div className="date-row">
                                            <p>12/4/2021</p>
                                        </div>
                                        <div className="sold-row">
                                            <p>-</p>
                                        </div>
                                    </div>
                                </div>
                            )

                        })}

                    </div>

                </div>
            </div>
        );
    }
}

export default UsersList;
