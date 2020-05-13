import React, {Component} from 'react';
import Hamburger from "./Hamburger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import logo from "../img/portflix.png";
import profile from "../img/profile.jpg";

class TopNav extends Component {
    render() {
        return (
            <div className={"top-nav"}>
                <div className={"top-nav-left"}>
                    <Hamburger onNavPositionChange={this.props.onNavPositionChange}/>
                    <div className={"nav-search-container"}>
                        <div className={"nav-search-input-container"}>
                            <input className={"nav-search"} type="text" placeholder={"Search"}/>
                            <FontAwesomeIcon icon={faSearch} size="1x" className={"search-box-icon"}/>
                        </div>
                        <div className={"selectWrapper"}>
                            <select className={"selectBox"}>
                                <option value="EN">EN</option>
                                <option value="AZ">AZ</option>
                                <option value="RUS">RUS</option>
                                <option value="TR">TR</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={"top-nav-center"}>
                    <div className={"logo-container"} style={background}/>
                </div>

                <div className={"top-nav-right"}>
                    <p className={"nav-right-username"}>Asif Ismayilov</p>
                    <div className={"profile-picture"} style={profileBackground}/>
                </div>
            </div>
        );
    }
}
const background = {
    backgroundImage: `url(${logo})`
};
const profileBackground = {
    backgroundImage: `url(${profile})`
};
export default TopNav;
