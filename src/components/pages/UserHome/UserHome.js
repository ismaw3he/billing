import React, {Component} from 'react';
import {connect} from "react-redux";
import { Route, Redirect} from 'react-router-dom'
import "../UserHome.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTv,
    faUserFriends,
    faPhoneAlt,
    faNetworkWired,
    faListAlt,
    faMapMarkedAlt,
    faGlobeAmericas,
    faUserPlus,
    faUsers,
    faAngleRight,
    faSignal, faCogs, faNewspaper, faSearch, faChartLine,
} from '@fortawesome/free-solid-svg-icons'
import TopNav from "../../TopNav";
import LeftNavIcon from "../../LeftNavIcon";
import LeftSubIcon from "../../LeftSubIcon";
import AddLocationType from "../AddLocationType/AddLocationType"
import AddLocation from "../AddLocation/AddLocation";

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        isAdmin: state.isAdmin,
        isUser: state.isUser,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        mainPage: state.mainPage
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
                                    icon: faListAlt
                                },
                                {
                                    name: "Add User",
                                    icon: faUserPlus
                                },
                                {
                                    name: "Internet",
                                    icon: faNetworkWired
                                },
                                {
                                    name: "TV",
                                    icon: faTv
                                },
                                {
                                    name: "VOIP",
                                    icon: faPhoneAlt
                                }]
                        },
                        {
                            name: "Groups",
                            icon: faAngleRight,
                            subList: [
                                {
                                    name: "Groups",
                                    icon: faUserFriends
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
                                    icon: faListAlt
                                },
                                {
                                    name: "Users List",
                                    icon: faListAlt
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
                            subList: []
                        }
                    ]
                },
                {
                    name: "Monitoring",
                    icon: faSignal,
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
                            name: "Buildings",
                            icon: faAngleRight,
                            subList: []
                        },
                        {
                            name: "Equipments",
                            icon: faAngleRight,
                            subList: []
                        }
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
        fetch('http://192.168.0.106:5000/logout', requestOptions)
            .then(response => response.json())
            .then(() => {
                requestOptions['headers'] = {'Authorization': "Bearer " + this.props.refreshToken};
                fetch('http://192.168.0.106:5000/refreshlogout', requestOptions)
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
        // if(!this.props.loggedIn){
        //     return <Redirect to="/login" />
        // }
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
                                        onClick={() => {
                                            this.state.navigationList.map((itemSecond, indexSecond) => {
                                                indexSecond === index ? itemSecond.active = true : itemSecond.active = false;
                                            });
                                            this.setState({
                                                navigation: this.state.navigation === 2 && this.state.activeSub === index ? 1 : 2,
                                                activeSub: index
                                            })
                                        }}>
                                        <LeftNavIcon item={item}/>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    <div className={`left-sub-nav ${this.state.navigation < 2 ? "hidden-sub-nav" : ""} `}>
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
                            <Route path={"/admin/addlocationtype"} component={AddLocationType}/>
                            <Route path={"/admin/addlocation"} component={AddLocation}/>
                    </div>
                </div>

                {/*<button onClick={this.onLogOut}> Log out </button>*/}
                {/*{this.state.error? <h3>{this.state.error}</h3>:null}*/}
                {/*{this.state.loading? <h3>LOADING...</h3>:null}*/}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
