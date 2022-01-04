import React, { Component } from 'react';
import "./style.css";


import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



class MonitoringTraffic extends Component {
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

                for (let x = 0; x < groupedData.length; x++) {
                    // let foundTotal = false;
                    totalData.push({
                        name: groupedData[x].name,
                        totalTraffic: "100",
                        download: "70",
                        upload: "30",
                        perPerson: 0,
                        customers: 0
                    })
                    for (let y = 0; y <= x; y++) {
                        totalData[totalData.length - 1].customers = totalData[totalData.length - 1].customers + groupedData[y].customers



                        // if (totalData[x].name === result[i][6].substring(3)) {
                        //     totalData[x].customers++;
                        //     foundTotal = true
                        // }
                    }

                }

                let testData = [
                    {
                        name: "02-2021",
                        totalTraffic: "100",
                        download: "70",
                        upload: "700",
                    },
                    {
                        name: "03-2021",
                        totalTraffic: "170",
                        download: "130",
                        upload: "1300",
                    },
                    {
                        name: "04-2021",
                        totalTraffic: "230",
                        download: "180",
                        upload: "1800",
                    },
                    {
                        name: "05-2021",
                        totalTraffic: "300",
                        download: "230",
                        upload: "2300",
                    },
                    {
                        name: "06-2021",
                        totalTraffic: "420",
                        download: "330",
                        upload: "3300",
                    },
                    {
                        name: "07-2021",
                        totalTraffic: "500",
                        download: "370",
                        upload: "3700",
                    },
                    {
                        name: "08-2021",
                        totalTraffic: "580",
                        download: "430",
                        upload: "4300",
                    },
                    {
                        name: "09-2021",
                        totalTraffic: "740",
                        download: "550",
                        upload: "5500",
                    },
                    {
                        name: "10-2021",
                        totalTraffic: "790",
                        download: "580",
                        upload: "5800",
                    },
                    {
                        name: "11-2021",
                        totalTraffic: "900",
                        download: "650",
                        upload: "6500",
                    },
                    {
                        name: "12-2021",
                        totalTraffic: "990",
                        download: "720",
                        upload: "7200",
                    }
                ]

                for (let i = 0; i < totalData.length; i++) {
                    for (let x = 0; x < testData.length; x++) {
                        if (totalData[i].name === testData[x].name) {

                            totalData[i].totalTraffic = testData[x].totalTraffic
                            totalData[i].download = testData[x].download
                            totalData[i].upload = testData[x].upload
                            totalData[i].perPerson = totalData[i].customers / testData[x].totalTraffic
                        }
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
                    <h3 className="users-list-header">Traffic Monitoring</h3>
                </div>
                <div className="users-list-table-container-second" style={{ width: "100%", height: "1160px", paddingTop: "50px" }}>



                    <div className='charts-container'>

                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Total Traffic (MB/s)</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart
                                width={500}
                                height={350}
                                data={this.state.totalData}
                                syncId="anyId"
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
                                <Area type="monotone" dataKey="totalTraffic" stroke="#8884d8" fill="#37aceb" />
                            </AreaChart>
                            {/* <Brush /> */}
                        </ResponsiveContainer>
                    </div>
                    <div className='charts-container'>
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Download (MB/s)</h3>

                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart
                                width={500}
                                height={350}
                                data={this.state.totalData}
                                syncId="anyId"
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
                                <Area type="monotone" dataKey="download" stroke="#82ca9d" fill="#1fbb10" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='charts-container'>
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Upload (MB/s)</h3>

                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart
                                width={500}
                                height={350}
                                data={this.state.totalData}
                                syncId="anyId"
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
                                <Area type="monotone" dataKey="upload" stroke="#82ca9d" fill="#a90d0d" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='charts-container'>
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Total Customer Count</h3>

                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart
                                width={500}
                                height={350}
                                data={this.state.totalData}
                                syncId="anyId"
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
                                <Area type="monotone" dataKey="customers" stroke="#82ca9d" fill="#d3f107" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='charts-container'>
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Data Usage Per Customer</h3>

                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart
                                width={500}
                                height={350}
                                data={this.state.totalData}
                                syncId="anyId"
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
                                <Area type="monotone" dataKey="perPerson" stroke="#82ca9d" fill="#6208d1" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
        );
    }
}

export default MonitoringTraffic;