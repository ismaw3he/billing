import React, {Component} from 'react';
import "./style.css";
import AdderComponent from "../../AdderComponent";
class TariffType extends Component {
     render() {
        return (
            <AdderComponent
                getRequest={'/gettingconfigurationtype/tarifftype'}
                deleteRequest={'/deletingconfigurationtype'}
                editRequest={'/editingconfigurationtype'}
                postRequest={'/addingconfigurationtype'}
                config={"tarifftype"}
                header={"Add Tariff Type"}
            />
        );
    }
}

export default TariffType;
