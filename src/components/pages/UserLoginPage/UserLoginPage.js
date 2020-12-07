import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'
import background from "../../../img/baloon.jpg"
import "../UserLoginPage.css"
import url from "../../API";
const mapStateToProps = state => {
    return{
        username: state.username,
        password: state.password,
        loggedIn: state.loggedIn,
        isAdmin: state.isAdmin,
        isUser: state.isUser,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken
    };
};
const mapDispatchToProps = dispatch => {
    return{
        onLoginUser: (accessToken,refreshToken) => dispatch ({type: "LOGIN_USER",
            accessToken: accessToken,
            refreshToken: refreshToken,
            loggedIn: true,
            isAdmin: false,
            isUser: true
        }),
        onUsernameChange: (e) => dispatch ({type: "USERNAME_CHANGE",
            element: e.target, isAdmin: false, isUser: true}),
        onPasswordChange: (e) => dispatch ({type: "PASSWORD_CHANGE",
            element: e.target, isAdmin: false, isUser: true})
    };
};

class UserLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading:false
        };
    }
    onLogIn = () => {
        this.setState({loading:true});
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username":this.props.username,
                "password":this.props.password,
                "isAdmin": false
            })
        };
        fetch(url+'/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(!data['message']){

                    fetch(url+'/addrefresh', {
                        method: 'POST',
                        headers: { 'Authorization': 'Bearer '+ data["refresh_token"]  }
                    })
                        .then(response => response.json())
                        .then(data => {

                        });
                    this.props.onLoginUser(data["access_token"],data["refresh_token"])
                }
                else{
                    this.setState({loading:false,error:data['message']});
                }
            });
    };
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.onLogIn();
        }
    };
    render() {
        if(this.props.loggedIn){
            return <Redirect to="/" />
        }
        return (
            <div className={"login-page-container"} style={style}>
                <div className={"login-page-center-container"}>
                    <div className={"login-left-panel"} style={style}>

                    </div>
                    <div className={"login-right-panel"}>
                        <h1 className={"login-company-name"}>User Login</h1>
                        <p className={"login-page-name"}>User login page</p>
                        <input className={"login-input"} type="text" placeholder={"username"} onChange={this.props.onUsernameChange}/>
                        <br/>
                        <input className={"login-input"} onKeyPress={this.handleKeyPress} type="text" placeholder={"password"} onChange={this.props.onPasswordChange}/>
                        <button className={"login-submit"}  onClick={this.onLogIn}>Login</button>
                        {this.state.error? <h3>{this.state.error}</h3>:null}
                        {this.state.loading? <h3>LOADING...</h3>:null}
                    </div>
                </div>
            </div>
        );
    }
}

const style = {
    backgroundImage: `url(${background})`
};
export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
