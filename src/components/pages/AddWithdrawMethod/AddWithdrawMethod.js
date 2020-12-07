import React, {Component} from 'react';
import "./style.css";
import AdderComponent from "../../AdderComponent";
class AddWithdrawMethod extends Component {
    render() {
        return (
            <AdderComponent
                getRequest={'/gettingconfigurationtype/withdrawmethod'}
                deleteRequest={'/deletingconfigurationtype'}
                editRequest={'/editingconfigurationtype'}
                postRequest={'/addingconfigurationtype'}
                config={"withdrawmethod"}
                header={"Add Withdraw Method"}
            />
        );
    }
}

export default AddWithdrawMethod;
