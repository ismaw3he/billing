import React, {Component} from 'react';
import "./style.css"
import AdderComponent from "../../AdderComponent";
class AddPaymentMethod extends Component {

    render() {
        return (
            <AdderComponent
                getRequest={'/gettingconfigurationtype/paymentmethod'}
                deleteRequest={'/deletingconfigurationtype'}
                editRequest={'/editingconfigurationtype'}
                postRequest={'/addingconfigurationtype'}
                config={"paymentmethod"}
                header={"Add Payment Method"}
            />
        );
    }
}

export default AddPaymentMethod;
