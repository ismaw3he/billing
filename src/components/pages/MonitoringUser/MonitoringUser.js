import React, { Component } from 'react';
import "./style.css";
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


class MonitoringUser extends Component {
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
    

    render() {
        return (
            <div className="user-list-container">
                <div className="users-list-header-container">
                    <h3 className="users-list-header">Users Count Monitoring (Total: {this.state.data.length})</h3>
                </div>
                <div className="users-list-table-container">
                    Test

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitoringUser);
