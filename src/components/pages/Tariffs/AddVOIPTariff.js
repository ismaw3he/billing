import React, {Component} from 'react';
import TariffAdderComponent from "../../TariffAdderComponent";
import "./style.css";

class AddVoipTariff extends Component {
    render() {
        return (
            <div>
                <TariffAdderComponent  header={"VOIP Tariff"}/>
            </div>
        );
    }
}

export default AddVoipTariff;
