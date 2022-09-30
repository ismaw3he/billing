import React, { Component } from 'react';
import "./style.css";


import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



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
            totalData: [],
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

        fetch('http://94.20.229.18:6655/gettingallusers')
            .then(res => res.json())
            .then(result => {
                let dateData = [];

                let groupedData = [
                    {
                        name: "02-2021",
                        customers: 0
                    }
                ];

                
                let totalData = [
                    // {
                    //     name: "02-2021",
                    //     customers: 16
                    // }
                ];

                for (let i = 0; i < result.length; i++) {
                    dateData.push(result[i][6].substring(3))

                    let found = false;
                    // let foundTotal = false;
                    for (let x = 0; x < groupedData.length; x++) {
                        if (groupedData[x].name === result[i][6].substring(3)) {
                            groupedData[x].customers++;
                            found = true;
                        }
                        // if (totalData[x].name === result[i][6].substring(3)) {
                        //     totalData[x].customers++;
                        //     foundTotal = true
                        // }
                    }

                    if (!found) {
                        groupedData.push({
                            name: result[i][6].substring(3),
                            customers: 1
                        })
                    }
                    // if(!foundTotal){      
                    //     totalData.push({
                    //         name: result[i][6].substring(3),
                    //         customers: totalData[totalData.length-1].customers + 1
                    //     })
                    // }

                    // console.log(totalData[totalData.length-1].customers)
                    // console.log(groupedData[groupedData.length -1].customers)
                }

                for(let x =0; x < groupedData.length; x++){
                    // let foundTotal = false;
                        totalData.push({
                            name: groupedData[x].name,
                            customers: 0
                        })
                    for (let y = 0; y <= x; y++) {
                        totalData[totalData.length -1].customers = totalData[totalData.length -1].customers + groupedData[y].customers



                        // if (totalData[x].name === result[i][6].substring(3)) {
                        //     totalData[x].customers++;
                        //     foundTotal = true
                        // }
                    }

                }
                this.setState({
                    loading: false,
                    data: groupedData,
                    totalData: totalData,
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
                <div className="users-list-table-container" style={{ height: "500px", paddingTop: "50px" }}>



                    <div className='charts-container'>
                        <h3 style={{color: "#fff", marginBottom: "10px"}}>New Customer Count (Monthly)</h3>
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

                    <div className='charts-container'>
                    <h3 style={{color: "#fff", marginBottom: "10px"}}>Total Customer Count (Monthly)</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={this.state.totalData}
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
                                <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#1fbb10" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
        );
    }
}

export default MonitoringUser;
