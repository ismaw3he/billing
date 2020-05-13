import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class LeftNavIcon extends Component {
    render() {
        return (

            <div className={"left-nav-item-single-content"}>
                <FontAwesomeIcon icon={this.props.item.icon} size="2x"
                                 className={"left-nav-icon"}/>
                <p className={"left-nav-category"}>{this.props.item.name}</p>
            </div>
        );
    }
}

export default LeftNavIcon;
