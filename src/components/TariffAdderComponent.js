import React, {Component} from 'react';
import url from "./API";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {ModalComponent, ModalEditMultiple} from "./ModalComponent";

class TariffAdderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            deleteModal: false,
            deleteString: null,
            editModal: true,
            inputName: null,
            inputPrice: null,
            inputType: null,
            inputSpeed: null,
            selectData: "MB",
            selectStatus: false
        }
    }

    typesLoader = () => {
        this.setState({loading: true});
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(url + this.props.getRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({data: data, loading: false});
            }).catch((e) => {
            console.log(e);
            this.setState({loading: false});
        });
    };
    deleteType = (type) => {
        this.setState({loading: true, deleteModal: false});
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    tariffname: type
                })
        };
        fetch(url + this.props.deleteRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    editType = (oldName, newName) => {
        this.setState({loading: true, editModal: false});
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                this.props.speed ?
                    {
                        oldname: oldName,
                        newname: newName,
                        price: 22,
                        tarifftype: "Personal",
                        speed: "100MB"
                    }
                    : {
                        oldname: oldName,
                        newname: newName,
                        price: 22,
                        tarifftype: "Personal"
                    })
        };
        fetch(url + this.props.editRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    addType = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                this.props.speed ?
                    {
                        tariffname: this.state.inputName,
                        price: this.state.inputPrice,
                        tarifftype: this.state.inputType,
                        speed: this.state.inputSpeed+this.state.selectData
                    }
                    : {
                        tariffname: this.state.inputName,
                        price: this.state.inputPrice,
                        tarifftype: this.state.inputType
                    })
        };
        fetch(url + this.props.postRequest, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.typesLoader();
            });
    };
    openOrCloseSelect = () => {
        this.setState({selectStatus: !this.state.selectStatus})
    };
    canceledModal = () => {
        this.setState({editModal: false, deleteModal: false})
    };

    componentDidMount() {
        this.typesLoader();
    }

    render() {
        return (
            <div className={"add-contact-type-page"}>
                {this.state.deleteModal ? <ModalComponent action={this.deleteType}
                                                          address={this.state.deleteString}
                                                          cancel={this.canceledModal}/> : null}
                {this.state.editModal? <ModalEditMultiple speed={true} cancel={this.canceledModal}/> : null}
                <div className={"multiple-input-container"}>
                    <p className={"card-name"}>{this.props.header}</p>
                    <div className={"inputs-container"}>

                        <div className="multiple-input-container-single">
                            <p className={"input-label"}>Name</p>
                            <input type="text" onChange={(e) => {
                                this.setState({inputName: e.target.value})
                            }} className={"input"}/>
                        </div>

                        <div className="multiple-input-container-single">
                            <p className={"input-label"}>Price</p>
                            <input type="text" onChange={(e) => {
                                this.setState({inputPrice: e.target.value})
                            }} className={"input"}/>
                        </div>

                        <div className="multiple-input-container-single">
                            <p className={"input-label"}>Tariff Type</p>
                            <input type="text" onChange={(e) => {
                                this.setState({inputType: e.target.value})
                            }} className={"input"}/>
                        </div>
                        {this.props.speed ?
                            <div className="multiple-input-container-single">
                                <p className={"input-label"}>Speed</p>
                                <div className={"internet-select"}>
                                    <input type="text" onChange={(e) => {
                                        this.setState({inputSpeed: e.target.value})
                                    }} className={"input internet-mb"}/>

                                    <div onClick={() => {
                                        this.openOrCloseSelect();
                                    }} className="contact-select internet-dropdown">
                                        <div className={"dropdown-contact"}>
                                            <h2>{this.state.selectData}</h2>
                                            <FontAwesomeIcon icon={faCaretDown} size="2x"/>
                                        </div>
                                        <div className={`select-options ${this.state.selectStatus ? "show-select" : ""}`}>

                                            <div onClick={() => {
                                                this.setState({ selectData: "KB"})
                                            }} className={"contact-select-option"}>
                                                <p>KB</p>
                                            </div>
                                            <div onClick={() => {
                                                this.setState({ selectData: "MB"})
                                            }} className={"contact-select-option"}>
                                                <p>MB</p>
                                            </div>
                                            <div onClick={() => {
                                                this.setState({ selectData: "GB"})
                                            }} className={"contact-select-option"}>
                                                <p>GB</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div> :
                            null}


                        <div onClick={this.addType} className={"add-button"}>
                            Add
                        </div>
                    </div>
                </div>
                <div className={"page-right-data-container"}>
                    {this.state.data.map((item, index) => {
                        return (
                            <div key={index} className={"page-right-data-card"}>
                                <p className={"tariff-name"}>{item.tariffname}</p>
                                <p className={"tariff-price"}>Price: {item.price} AZN</p>
                                <div className={"tariff-card-bottom"}>
                                    <p>Type: {item.tarifftype}</p>
                                    {this.props.speed ?
                                        <p>Speed: {item.speed}</p> :
                                        null
                                    }
                                    <div className={"tariff-card-buttons-container"}>
                                        <div className={"options-right"}>
                                            <FontAwesomeIcon icon={faEdit} size="2x"
                                                             className={"card-icon"}
                                                             onClick={() => {
                                                                 this.setState({
                                                                     editModal: true

                                                                 })
                                                             }}/>
                                            <FontAwesomeIcon icon={faTrashAlt} size="2x"
                                                             className={"card-icon"}
                                                             onClick={() => {
                                                                 this.setState({
                                                                     deleteModal: true,
                                                                     deleteString: item.tariffname
                                                                 })
                                                             }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        );
    }
}

export default TariffAdderComponent;
