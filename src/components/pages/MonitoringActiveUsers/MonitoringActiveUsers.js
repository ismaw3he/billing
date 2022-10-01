import React, { Component } from 'react';
import "./style.css";
import ModalFilterPayments from '../ModalFilterPayments/ModalFilterPayments';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 70 },
];

const COLORS = ['#398108', '#8b0d0d', '#196f9d'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


class MonitoringActiveUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,



            chartData: [],
            count: 0,
            error: null,
            loading: false,
            searching: false,
            infoIndex: -1,
            infoData: {},
            data: [],
            activity: [
                { name: "Active", value: 0 },
                { name: "Deactive", value: 0 },
                { name: "New", value: 0 },
            ],


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

                const d = new Date();
                let month = d.getMonth() + 1;
                let year = d.getFullYear();
                let currentdate = "";

                if (month < 10) {
                    currentdate = "0" + month + "-" + year;
                }
                else {
                    currentdate = "" + month + "-" + year;
                }


                let active = 0;
                let deactive = 0;
                let newUsers = 0;

                for (let i = 0; i < result.length; i++) {

                    if (result[i][4] < 0) {
                        deactive++;
                    }
                    else {
                        if (result[i][6].substring(3) === currentdate) {
                            newUsers++;
                        }
                        else {
                            active++
                        }
                    }
                }

                this.setState({
                    loading: false,
                    activity: [
                        { name: "Active", value: active },
                        { name: "Deactive", value: deactive },
                        { name: "New", value: newUsers },
                    ]
                });
            });
    }

    paymentsFliter() {
        this.setState({
            ...this.state,
            modal: true
        })
    }
    render() {
        return (
            <div className="user-list-container">
                <ModalFilterPayments show={this.state.modal} closeModal={() => this.setState({ ...this.state, modal: false })} />
                <div className="users-list-header-container">
                    <h3 className="users-list-header">Users Activity Monitoring (Current Month)</h3>
                    <div className='chart-info-box'>
                        <div className='chart-color-info' style={{ backgroundColor: "#398108" }}>
                        </div>
                        <p className='chart-statistics-info'>Active Users</p>
                    </div>

                    <div className='chart-info-box'>
                        <div className='chart-color-info' style={{ backgroundColor: "#8b0d0d" }}>

                        </div>
                        <p className='chart-statistics-info'>Deactive Users</p>
                    </div>

                    <div className='chart-info-box'>
                        <div className='chart-color-info' style={{ backgroundColor: "#196f9d" }}>

                        </div>
                        <p className='chart-statistics-info'>New Users with free 1 month Internet</p>
                    </div>
                    <div className='chart-info-box'>
                        <div onClick={()=>this.paymentsFliter()} className='inspect'>
                            Inspect
                        </div>
                    </div>
                </div>

                <div className="users-list-table-container-second" style={{ width: "100%", height: "400px", paddingTop: "50px" }}>
                    <div className='charts-container'>
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Active Users</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={600} height={600}>
                                <Pie
                                    data={this.state.activity}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label
                                    outerRadius={130}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                    <div className='charts-container'>
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Active Users (Percentage %)</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={this.state.activity}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                </div>
            </div>
        );
    }
}

export default MonitoringActiveUsers;