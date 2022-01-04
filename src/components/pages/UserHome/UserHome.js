import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Redirect} from 'react-router-dom'
import "../UserHome.css";

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTv,
    faUserFriends,
    faPhoneAlt,
    faNetworkWired,
    faListAlt,
    faMapMarkedAlt,
    faGlobeAmericas,
    faUserPlus,
    faChalkboardTeacher,
    faUsers,
    faAngleRight,
    faSignal,
    faCogs,
    faNewspaper,
    faSearch,
    faChartLine,
    faAddressCard,
    faIdBadge,
    faCube,
    faMoneyBillAlt,
    faWallet, faGlobeEurope, faPhoneVolume, faBuilding, faDollarSign
} from '@fortawesome/free-solid-svg-icons'
import TopNav from "../../TopNav";
import LeftNavIcon from "../../LeftNavIcon";
import LeftSubIcon from "../../LeftSubIcon";

// import AddLocationType from "../AddLocationType/AddLocationType"
// import AddLocation from "../AddLocation/AddLocation";
// import AddContact from "../AddContact";
import AddUser from "../AddUser/AddUser";
import UserEdit from "../UserEdit/UserEdit";
import MonitoringUser from "../MonitoringUser/MonitoringUser";
import MonitoringTraffic from '../MonitoringTraffic/MonitoringTraffic';
// import LoginNew from "../LoginNew/LoginNew";
import UsersList from "../UsersList/UsersList";
// import AddContactType from "../AddContactType/AddContactType";
// import TariffType from "../TariffType/TariffType";
// import AddPaymentMethod from "../AddPaymentMethod/AddPaymentMethod";
// import AddWithdrawMethod from "../AddWithdrawMethod/AddWithdrawMethod";
import url from "../../API";
import MonitoringActiveUsers from '../MonitoringActiveUsers/MonitoringActiveUsers';

// import AddIntercomTariff from "../Tariffs/AddIntercomTariff";
// import AddTvTariff from "../Tariffs/AddTVTariff";
// import AddVoipTariff from "../Tariffs/AddVOIPTariff";
// import AddInternetTariff from "../Tariffs/AddInternetTariff";
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
        onLogOutUser: () => dispatch({
            type: "LOGOUT_USER",
            accessToken: null,
            refreshToken: null,
            loggedIn: false,
            isAdmin: false,
            isUser: true
        })
    };
};

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            navigation: 1,
            activeSub: 0,
            collapsing: null,
            navigationList: [
                {
                    name: "Customers",
                    icon: faUsers,
                    active: true,
                    list: [
                        {
                            name: "Users",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Users List",
                                    icon: faListAlt,
                                    url: "/admin/users-list"
                                },
                                {
                                    name: "Add User",
                                    icon: faUserPlus,
                                    url: "/admin/add-user"
                                },
                                {
                                    name: "Internet",
                                    icon: faNetworkWired,
                                    url: "/admin/users-list"
                                },
                                {
                                    name: "TV",
                                    icon: faTv,
                                    url: "/admin/users-list"
                                },
                                {
                                    name: "VOIP",
                                    icon: faPhoneAlt,
                                    url: "/admin/users-list"
                                }]
                        },
                        {
                            name: "Groups",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Groups",
                                    icon: faUserFriends,
                                    url: "/admin/users-list"
                                }]
                        }
                    ]
                },
                {
                    name: "Reports",
                    icon: faNewspaper,
                    active: false,
                    collapsed: true,
                    list: [
                        {
                            name: "Internet",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: [
                                {
                                    name: "Users List",
                                    icon: faListAlt,
                                    url: "/admin/users-list"
                                },
                                {
                                    name: "Users List",
                                    icon: faListAlt,
                                    url: "/admin/users-list"
                                }]
                        },
                        {
                            name: "TV",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: []
                        },
                        {
                            name: "VOIP",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: []
                        },
                        {
                            name: "Payments",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: []
                        },
                        {
                            name: "Fees",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: []
                        },
                        {
                            name: "System",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: []
                        },
                        {
                            name: "Help Desk",
                            icon: faAngleRight,
                            collapsed: true,
                            subList: []
                        }
                    ]
                },
                {
                    name: "Configuration",
                    icon: faCogs,
                    active: false,
                    collapsed: true,
                    list: [
                        {
                            name: "Administrators",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "NAS",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Internet",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Add Internet Tariff",
                                    icon: faGlobeEurope,
                                    url: "/admin/add-internet-tariff"
                                }
                            ]
                        },
                        {
                            name: "TV",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Add TV Tariff",
                                    icon: faTv,
                                    url: "/admin/add-tv-tariff"
                                }
                            ]
                        },
                        {
                            name: "VOIP",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Add VOIP Tariff",
                                    icon: faPhoneVolume,
                                    url: "/admin/add-voip-tariff"
                                }
                            ]
                        },
                        {
                            name: "Intercom",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Add Intercom Tariff",
                                    icon: faBuilding,
                                    url: "/admin/add-intercom-tariff"
                                }
                            ]
                        },
                        {
                            name: "Locations",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Add Location Type",
                                    icon: faGlobeAmericas,
                                    url: "/admin/addlocationtype"
                                },
                                {
                                    name: "Add Location",
                                    icon: faMapMarkedAlt,
                                    url: "/admin/addlocation"
                                }
                            ]
                        },
                        {
                            name: "Contacts",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Add Contacts Type",
                                    icon: faAddressCard,
                                    url: "/admin/addcontacttype"
                                },
                                {
                                    name: "Add Contacts",
                                    icon: faIdBadge,
                                    url: "/admin/addcontact"
                                }
                            ]
                        },
                        {
                            name: "Payment Systems",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Help Desk",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Others",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Tariff Type",
                                    icon: faCube,
                                    url: "/admin/tarifftype"
                                },
                                {
                                    name: "Payment Method",
                                    icon: faWallet,
                                    url: "/admin/add-payment-method"
                                }
                                ,
                                {
                                    name: "Withdraw Method",
                                    icon: faMoneyBillAlt,
                                    url: "/admin/add-withdraw-method"
                                }

                            ]
                        }
                    ]
                },
                {
                    name: "Monitoring",
                    icon: faSignal,
                    active: false,
                    list: [
                        {
                            name: "Internet",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "User Count",
                                    icon: faUsers,
                                    url: "/admin/monitoring-user"
                                },
                                {
                                    name: "Active Users (Live)",
                                    icon: faChalkboardTeacher,
                                    url: "/admin/monitoring-active-users"
                                },
                                {
                                    name: "Traffic",
                                    icon: faChartLine,
                                    url: "/admin/monitoring-traffic"
                                },
                                {
                                    name: "Payments",
                                    icon: faDollarSign,
                                    url: "/admin/users-list"
                                },

                            ]
                        },
                    ]
                },
                {
                    name: "Charts",
                    icon: faChartLine,
                    active: false,
                    collapsed: true,
                    list: [
                        {
                            name: "Internet",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "TV",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "VOIP",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Bills",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Equipments",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Buildings",
                            icon: faAngleRight,
                            subList: []
                        }
                    ]
                },
                {
                    name: "Search",
                    icon: faSearch,
                    active: false,
                    collapsed: true,
                    list: []
                }
            ]
        };
    }


    onNavPositionChange = () => {
        switch (this.state.navigation) {
            case 0:
                this.setState({navigation: 1});
                break;
            case 1:
                this.setState({navigation: 0});
                break;
            case 2:
                this.setState({navigation: 1});
                break;
            default:
                this.setState({navigation: 0});
                break;
        }
    };
    onLogOut = () => {
        this.setState({loading: true});
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': "Bearer " + this.props.accessToken}
        };
        fetch(url+'/logout', requestOptions)
            .then(response => response.json())
            .then(() => {
                requestOptions['headers'] = {'Authorization': "Bearer " + this.props.refreshToken};
                fetch(url+'/refreshlogout', requestOptions)
                    .then(response => response.json())
                    .then(data => {

                        if (data['message'] === "Successfully logged out") {
                            this.props.onLogOutUser()
                        } else {
                            this.setState({loading: false, error: data['message']});
                        }
                    });
            });
    };


    render() {
        if(!this.props.loggedInNew){
            return <Redirect to="/login" />
            
        }
        else{
            return (
                <div className={"full-screen"}>
                    <TopNav onNavPositionChange={this.onNavPositionChange}/>
                    <div className={"screen-main"}>
                        <div className={`left-nav-container ${this.state.navigation === 0 ? "hidden-nav" : ""}`}>
                            <ul className={"left-nav-items"}>
                                {this.state.navigationList.map((item, index) => {
                                    return (
    
                                        <li key={index}
                                            className={`left-nav-item-single ${item.active ? "active" : ""}`}
                                            onMouseEnter={() => {
                                                this.state.navigationList.map((itemSecond, indexSecond) => {
                                                    return indexSecond === index ? itemSecond.active = true : itemSecond.active = false;
                                                });
                                                this.setState({
                                                    navigation: this.state.navigation === 2 && this.state.activeSub === index ? 1 : 2,
                                                    activeSub: index
                                                })
                                            }}
                                            >
                                                
                                            <LeftNavIcon item={item}/>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className={`left-sub-nav ${this.state.navigation < 2 ? "hidden-sub-nav" : ""} `}
                        onMouseLeave={() => {
                            this.setState({
                                navigation:  1
                            })
                        }}>
                            <ul className={"left-sub-list"}>
                                {this.state.navigationList[this.state.activeSub].list.map((item, index) => {
                                    return <li key={index}
                                               onClick={item.subList.length !== 0 && this.state.collapsing !== index ? () => {
                                                   this.setState({
                                                       collapsing: index
                                                   });
                                               } : () => {
                                                   this.setState({
                                                       collapsing: null
                                                   });
                                               }}>
                                        <LeftSubIcon item={item} index={index} collapsing={this.state.collapsing}/>
                                    </li>
                                })
                                }
                            </ul>
                        </div>
    
    
                        <div className={"screen-main-right"}>
                            {/* <Route path={"/admin/addlocationtype"} component={AddLocationType}/> */}
                            {/* <Route path={"/admin/addlocation"} component={AddLocation}/> */}
                            {/* <Route path={"/admin/addcontacttype"} component={AddContactType}/> */}
                            {/* <Route path={"/admin/addcontact"} component={AddContact}/> */}
                            {/* <Route path={"/admin/tarifftype"} component={TariffType}/> */}
                            {/* <Route path={"/admin/add-payment-method"} component={AddPaymentMethod}/> */}
                            {/* <Route path={"/admin/add-withdraw-method"} component={AddWithdrawMethod}/> */}
                            {/* <Route path={"/admin/add-intercom-tariff"} component={AddIntercomTariff}/> */}
                            {/* <Route path={"/admin/add-tv-tariff"} component={AddTvTariff}/> */}
                            {/* <Route path={"/admin/add-voip-tariff"} component={AddVoipTariff}/> */}
                            {/* <Route path={"/admin/add-internet-tariff"} component={AddInternetTariff}/> */}
                            <Route path={"/admin/add-user"} component={AddUser}/>
                            <Route path={"/admin/users-list"} component={UsersList}/>
                            <Route path={"/admin/user-edit"} component={UserEdit}/>

                            <Route path={"/admin/monitoring-user"} component={MonitoringUser}/>
                            <Route path={"/admin/monitoring-traffic"} component={MonitoringTraffic}/>
                            <Route path={"/admin/monitoring-active-users"} component={MonitoringActiveUsers}/>
                            
                        </div>
                    </div>
    
                    {/*<button onClick={this.onLogOut}> Log out </button>*/}
                    {/*{this.state.error? <h3>{this.state.error}</h3>:null}*/}
                    {/*{this.state.loading? <h3>LOADING...</h3>:null}*/}
                </div>
            );
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
