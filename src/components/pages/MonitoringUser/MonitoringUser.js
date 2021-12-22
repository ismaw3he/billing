import React, { Component } from 'react';
import "./style.css";
import { connect } from "react-redux";


import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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
            chartData: [],
            count: 0,
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
                let dateData = [];

                let groupedData = [
                    {
                        name: "02-2021",
                        customers: 0 
                    }
                ];

                for(let i=0; i < result.length; i++){
                    dateData.push(result[i][6].substring(3))

                    let found = false;
                    for(let x = 0;x < groupedData.length; x++){
                        if(groupedData[x].name === result[i][6].substring(3)){
                            groupedData[x].customers ++;
                            found = true;
                        }
                    }
                    if(!found){
                        groupedData.push({
                            name: result[i][6].substring(3),
                            customers: 1
                        })
                    }
                }

                console.log("groupedData")
                console.log(groupedData)

                console.log(dateData)
                this.setState({
                    loading: false,
                    data: groupedData,
                    count: result.length
                });
            });
    }


    render() {
        return (
            <div className="user-list-container">
                <div className="users-list-header-container">
                    <h3 className="users-list-header">Users Count Monitoring (Total: {this.state.count})</h3>
                </div>
                <div className="users-list-table-container" style={{height: "500px", paddingTop: "50px"}}>
                    
                    {console.log(this.state.data)}




                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={this.state.data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#a90d0d" />
                        </AreaChart>
                    </ResponsiveContainer>




                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitoringUser);
