import React, {Component} from 'react';
import AdderComponent from "../../AdderComponent";
class AddContactType extends Component {
    render() {
        return (
            <AdderComponent
                getRequest={'/gettingcontacttype'}
                deleteRequest={'/deletingcontacttype'}
                editRequest={'/editingcontacttype'}
                postRequest={'/addingcontacttype'}
                config={null}
                header={"Add Contact Type"}
            />
        );
    }
}

export default AddContactType;
