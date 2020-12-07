import React, {Component} from 'react';
import TariffAdderComponent from "../../TariffAdderComponent";
import "./style.css";

class AddTvTariff extends Component {
    render() {
        return (
            <div>
                <TariffAdderComponent  header={"TV Tariff"}/>
            </div>
        );
    }
}

export default AddTvTariff;
