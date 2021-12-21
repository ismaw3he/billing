
import React, { Component } from 'react';
import { connect } from "react-redux";
import "./style.css";
import { Redirect } from 'react-router-dom'
// import url from "../../API";

const mapStateToProps = state => {
    return {
        loggedInNew: state.loggedInNew,
        username: state.usernameNew,
        password: state.passwordNew,
        accounts: state.accounts
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogInUserNew: (user) => dispatch({
            type: "LOGIN_USER_NEW",
            loggedInNew: true,
            user: user
        }),
        onPasswordChange: (text) => dispatch({
            type: "PASSWORD_INPUT_CHANGE",
            payload: text
        }),
        onUsernameChange: (text) => dispatch({
            type: "USERNAME_INPUT_CHANGE",
            payload: text
        })
    };
};


class LoginNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }


    checkUser = () => {
        for (let i = 0; i < this.props.accounts.length; i++) {
            if (this.props.accounts[i].username === this.props.username && this.props.accounts[i].password === this.props.password) {
                this.setState({error : false})
                this.props.onLogInUserNew(this.props.accounts[i].fullname);
                break;
            }
            else{
                this.setState({error : true})
            }
        }
    }
    render() {
        if (this.props.loggedInNew) {
            return <Redirect to="/admin/users-list" />
        } else {
            return (
                <div className={"login-screen"}>
                    <div className={"login-container"}>

                        <div className={"logo-container-login"} >
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.28 841.89">
                                <defs>
                                    <style>

                                    </style>
                                </defs>
                                {/* <rect class="cls-1" width="595.28" height="841.89" /> */}
                                <path className="cls-2" d="M148.18,369.64a26.11,26.11,0,0,1,11.34,10.47,35.07,35.07,0,0,1,0,32.34A26,26,0,0,1,148.18,423a38.85,38.85,0,0,1-17.36,3.65H113.5v24.61H99.26V366h31.56A38.71,38.71,0,0,1,148.18,369.64Zm-3.89,39.22q4.83-4.39,4.82-12.55t-4.82-12.54q-4.81-4.39-14.13-4.39H113.5v33.86h16.66Q139.48,413.24,144.29,408.86Z" />
                                <path className="cls-2" d="M186.48,447.84A29.51,29.51,0,0,1,175.36,436a39,39,0,0,1,0-34.41,29.58,29.58,0,0,1,11.12-11.81,32.3,32.3,0,0,1,32.1,0,29.67,29.67,0,0,1,11.13,11.81,39.09,39.09,0,0,1,0,34.41,29.6,29.6,0,0,1-11.13,11.88,32.36,32.36,0,0,1-32.1,0ZM215,433.46q4.92-5.59,4.93-14.74T215,404A16.65,16.65,0,0,0,190,404q-4.87,5.6-4.88,14.73T190,433.46a16.65,16.65,0,0,0,24.93,0Z" />
                                <path className="cls-2" d="M280.71,385.47V400a15.32,15.32,0,0,0-3.18-.37q-8,0-12.49,5.18t-4.49,14.92v31.55h-13.7V386.2h13v9.5Q265.81,385.47,280.71,385.47Z" />
                                <path className="cls-2" d="M329.69,447.71a15.49,15.49,0,0,1-5.86,3.29,24.05,24.05,0,0,1-7.29,1.1q-9.65,0-14.9-5.6t-5.26-16.33v-31.3h-9.64V386.69h9.64V371.83h13.69v14.86h15.67v12.18H310.07v30.94c0,3.17.7,5.58,2.09,7.25a7.39,7.39,0,0,0,6,2.49,11.21,11.21,0,0,0,7.67-2.68Z" />
                                <path className="cls-2" d="M354.67,382.79v3.9h16.11v12.18H355.11v52.38h-13.7V398.87h-9.64V386.69h9.64v-4.14q0-10.47,5.48-16.51t15.45-6q7.89,0,12.38,3.54L370.89,375a12.2,12.2,0,0,0-7.56-2.68Q354.68,372.32,354.67,382.79ZM380,360.87h13.7v90.38H380Z" />
                                <path className="cls-2" d="M412.3,372.87a9.69,9.69,0,0,1,0-13,8.36,8.36,0,0,1,6.25-2.62,8.58,8.58,0,0,1,8.77,8.77,9.75,9.75,0,0,1-2.47,6.76,8.08,8.08,0,0,1-6.3,2.74A8.35,8.35,0,0,1,412.3,372.87Zm-.65,13.33h13.69v65.05H411.65Z" />
                                <path className="cls-2" d="M480.57,451.25l-15-22.54-15.12,22.54H435.31l22.79-33-21.8-32h15.23l14.35,21.32,14.36-21.32H495L473.12,418,496,451.25Z" />
                                <path className="cls-2" d="M428,466.64H416.22a4.85,4.85,0,0,0-4.85,4.85v8.34a4.85,4.85,0,0,0,4.85,4.85H428a4.85,4.85,0,0,0,4.85-4.85v-8.34A4.85,4.85,0,0,0,428,466.64Zm1.35,11.91a3.19,3.19,0,0,1-3.18,3.18h-8.07a3.18,3.18,0,0,1-3.18-3.18v-5.78a3.18,3.18,0,0,1,3.18-3.18h8.07a3.18,3.18,0,0,1,3.18,3.18Z" />
                                <path className="cls-2" d="M459.56,466.64H447.82a4.85,4.85,0,0,0-4.84,4.85v8.34a4.85,4.85,0,0,0,4.84,4.85h11.74a4.85,4.85,0,0,0,4.85-4.85v-8.34A4.85,4.85,0,0,0,459.56,466.64Zm1.34,11.91a3.18,3.18,0,0,1-3.18,3.18h-8.06a3.18,3.18,0,0,1-3.18-3.18v-5.78a3.18,3.18,0,0,1,3.18-3.18h8.06a3.18,3.18,0,0,1,3.18,3.18Z" />
                                <path className="cls-2" d="M491.17,466.64H479.43a4.85,4.85,0,0,0-4.85,4.85v8.34a4.85,4.85,0,0,0,4.85,4.85h11.74a4.85,4.85,0,0,0,4.85-4.85v-8.34A4.85,4.85,0,0,0,491.17,466.64Zm1.34,11.91a3.18,3.18,0,0,1-3.18,3.18h-8.06a3.18,3.18,0,0,1-3.18-3.18v-5.78a3.18,3.18,0,0,1,3.18-3.18h8.06a3.18,3.18,0,0,1,3.18,3.18Z" />
                            </svg>
                        </div>
                        <form className="commentForm">
                            <div className="login-inputs-container">
                                <input type="text" className="login-input-new" placeholder="Username"
                                    onChange={(e) => {
                                        this.props.onUsernameChange(e.target.value)
                                    }}
                                />

                                <input type="password" className="login-input-new" placeholder="Password"
                                    onChange={(e) => {
                                        this.props.onPasswordChange(e.target.value)
                                    }}
                                />
                            </div>

                            <button  type="submit" onClick={() => this.checkUser()} className="login-button-new" href="#">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Log In
                            </button>

                            <p  className={this.state.error ? "error-text red": "error-text"}>Invalid Username or password</p>
                        </form>

                    </div>




                </div>
            );
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginNew);
