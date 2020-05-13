import React, {Component} from 'react';

class Hamburger extends Component {
    render() {
        return (
            <div className={"hamburger"} onClick={this.props.onNavPositionChange}>
                <div className={"hamburger-line line-1"}> </div>
                <div className={"hamburger-line line-2"}> </div>
                <div className={"hamburger-line line-3"}> </div>
            </div>
        );
    }
}

export default Hamburger;
