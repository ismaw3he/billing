import React, {Component} from 'react';
import TariffAdderComponent from "../../TariffAdderComponent";
import "./style.css";
class AddInternetTariff extends Component {
    render() {
        return (
            <div>
                <TariffAdderComponent
                    header={"Internet"}
                    speed={true}
                    getRequest={"/gettinginternettariff"}
                    postRequest={"/addinginternettariff"}
                    deleteRequest={"/deletinginternettariff"}
                />
            </div>
        );
    }
}

export default AddInternetTariff;
