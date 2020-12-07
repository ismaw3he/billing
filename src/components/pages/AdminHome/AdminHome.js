import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'
import url from "../../API";
const mapStateToProps = state => {
    return{
        loggedIn: state.loggedIn,
        isAdmin: state.isAdmin,
        isUser: state.isUser,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onLogOutAdmin: () => dispatch ({type: "LOGOUT_ADMIN",
            accessToken: null,
            refreshToken: null,
            loggedIn: false,
            isAdmin: true,
            isUser: false
        })
    };
};

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading:false
        };
    }

    onLogOut = () => {
        this.setState({loading:true});
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': "Bearer "+ this.props.accessToken }
        };
        fetch(url+'/logout', requestOptions)
            .then(response => response.json())
            .then(data => {
                requestOptions['headers']={ 'Authorization': "Bearer "+ this.props.refreshToken };
                fetch(url+'/refreshlogout', requestOptions)
                    .then(response => response.json())
                    .then(data => {

                        if(data['message']==="Successfully logged out")
                        {
                            this.props.onLogOutAdmin()
                        }
                        else{
                            this.setState({loading:false,error:data['message']});
                        }
                    });
            });
    };

    render() {
        if(!this.props.loggedIn){
            return <Redirect to="/login" />
        }
        return (
            <div>
                <h1>Logged in as ADMIN</h1>
                <h5>AccessToken:</h5>
                <br/>
                <h5>{this.props.accessToken}</h5>
                <h5>refreshToken:</h5>
                <br/>
                <h5>{this.props.refreshToken}</h5>
                <button onClick={this.onLogOut}> Log out </button>
                {this.state.error? <h3>{this.state.error}</h3>:null}
                {this.state.loading? <h3>LOADING...</h3>:null}
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
