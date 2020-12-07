import React, {Component} from 'react';
import "./AddContact.css";
import {faCaretDown, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import url from "../API";
class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: [],
            cards: [
                {
                    id: 0,
                    select: null,
                    data: null,
                    active: false
                }],
            loading: false
        }
    }
    componentDidMount() {
        this.setState({loading: true});
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(url+'/gettingcontacttype', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({selectData: data, loading: false});
            }).catch((e) => {
            this.setState({loading: false});
        });
    }

    openOrCloseSelect = (index) => {
        this.setState(prevState => {
            let cards = [...prevState.cards];
            cards[index].active = !cards[index].active;
            return {cards: cards};                                 // return new object jasper object
        });
    };

    onSelect = (index, data) => {
        this.setState(prevState => {
            let cards = [...prevState.cards];
            cards[index].select = data;
            return {cards: cards};                                 // return new object jasper object
        });
    };
    onAddSection = () =>{
        this.setState(prevState => {
            let cards = [...prevState.cards];
            cards.push({
                id: cards.length,
                select: null,
                data: null,
                active: false
            });
            return {cards: cards};                                 // return new object jasper object
        });
    };
    onRemoveSection = (index) =>{
        this.setState(prevState => {
            let cards = [...prevState.cards];
            cards.splice(index, 1);
            return {cards: cards};                                 // return new object jasper object
        });
    };
    render() {
        return (
            <div className={"contact-adder"}>
                <div className={"contact-add-header-container"}>
                    <p className={"contact-add-header"}>Contacts</p>
                    <FontAwesomeIcon onClick={this.onAddSection} className={"contact-plus"} icon={faPlus} size="2x"/>
                </div>
                <div className={"contact-card-container"}>
                    {this.state.cards.map((item, index) => {
                        return (
                            <div key={index} className={"card-element"}>
                                <FontAwesomeIcon onClick={()=>{this.onRemoveSection(index)}} className={"card-delete-icon"} icon={faTimes} size="2x"/>
                                <div onClick={() => {
                                    this.openOrCloseSelect(index)
                                }} className="contact-select">
                                    <div className={"dropdown-contact"}>
                                        <h2>{item.select ? item.select : "Options"}</h2>
                                        <FontAwesomeIcon icon={faCaretDown} size="2x"/>
                                    </div>
                                    <div className={`select-options ${item.active ? "show-select" : ""}`}>
                                        {
                                            this.state.selectData.map((element, elementIndex) => {
                                                return (
                                                    <div onClick={() => {
                                                        this.onSelect(index, element.value)
                                                    }} key={elementIndex} className={"contact-select-option"}>
                                                        <p>{element.value}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <div className={"contact-choose-input-container"}>
                                    <input type="text" className={"contact-choose-input-single"}/>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        );
    }
}

export default AddContact;
