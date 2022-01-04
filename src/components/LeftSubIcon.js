import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

class LeftSubIcon extends Component {
    render() {
        return (
            <div>
                <div className={"left-sub-single"}>
                    <FontAwesomeIcon icon={this.props.item.icon} size="3x" className={
                        this.props.collapsing === this.props.index ? "nav-sub-icon rotate" : "nav-sub-icon"}/>
                    <p className={"item-description"}>{this.props.item.name}</p>
                </div>
                {this.props.item.subList.length !== 0 ?
                    <ul className={this.props.collapsing === this.props.index ? "collapse" :
                        "collapsed"}>{

                        this.props.item.subList.map((subItem, subIndex) => {
                            return (
                                
                                
                                <Link to={subItem.url} key={subIndex} className={"decoration-none"}>
                                    <li className={"left-sub-single"}>
                                        <FontAwesomeIcon icon={subItem.icon} size="2x"
                                                         className={"nav-sub-icon"}/>
                                        <p className={"item-description"}>{subItem.name}</p>
                                    </li>
                                </Link>
                            )
                        })
                    }
                    </ul> : null}
            </div>
        );
    }
}

export default LeftSubIcon;
