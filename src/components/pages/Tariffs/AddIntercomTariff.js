import React, {Component} from 'react';
import TariffAdderComponent from "../../TariffAdderComponent";
import "./style.css";
class AddIntercomTariff extends Component {
    render() {
        return (
            <div>
                <TariffAdderComponent header={"Intercom"}/>
            </div>
        );
    }
}

export default AddIntercomTariff;
