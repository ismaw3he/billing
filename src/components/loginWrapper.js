import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux";

const mapStateToProps = state => {
    return{
        loggedIn: state.loggedIn,
        isAdmin: state.isAdmin,
        isUser: state.isUser,
    };
};

class LoginWrapper extends Component {
    render() {
        if(!this.props.loggedIn){
            return <Redirect to="/login" />
        }
        else if(this.props.isAdmin){
            return <Redirect to="/admin/home" />
        }
        else if(this.props.isUser){
            return <Redirect to="/user/home" />
        }
    }
}
export default connect(mapStateToProps)(LoginWrapper);
