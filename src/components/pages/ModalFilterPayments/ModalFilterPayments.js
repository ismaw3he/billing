import React, { useState } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from '../Modal/Modal';


function ModalFilterPayments({ show, closeModal }) {
    const [dateInputData, setDateInputData] = useState("00-00-0000")
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [userPaymentList, setSetUserPaymentList] = useState([]);

    const handleDateSubmit = () => {
        fetch('http://94.20.229.18:6655/getUsersDateFiltered/' + dateInputData)
            .then(res => res.json())
            .then(result => {
                if (result.length === 0) {
                    setData([{
                        id: "",
                        fullName: "Not Found",
                        balance: "",
                        registerdate: ""
                    }]);
                } else {
                    setData(result);
                }

            }).catch((error) => {
                console.log("errror:")
                console.log(error)
            });
    }
    const getUserPayments = (id) => {
        fetch('http://94.20.229.18:6655/getUserPaymentInfo/' + id)
            .then(res => res.json())
            .then(result => {
                if (result.length === 0) {

                    setSetUserPaymentList([{
                        amount: "",
                        date: "No payment",
                        source: "",
                        time: ""
                    }])
                    setModal(true);
                } else {
                    setSetUserPaymentList(result)
                    setModal(true);
                }
            }).catch((error) => {
                console.log("errror:")
                console.log(error)
            });
    }
    return (
        show ?
            <div className={styles.modalContainer}>
                <Modal paymentsList={userPaymentList} show={modal} closeModal={() => setModal(false)} />
                <div className={styles.modal}>
                    <FontAwesomeIcon onClick={closeModal} icon={faTimes} size="1x" className={styles.iconModal} />
                    <div className={styles.fullScreen}>
                        <div className={styles.inputsContainer}>
                            <input className={styles.dateInput}
                                onChange={(e) => {
                                    let date = e.target.value;
                                    let year = date.substring(0, 4);
                                    let month = date.slice(5, 7);
                                    let day = date.slice(8, 10);
                                    date = day + "-" + month + "-" + year
                                    setDateInputData(date);
                                }}
                                type="date" />
                            <div onClick={() => handleDateSubmit()} className={styles.searchButton}>
                                Search
                            </div>
                        </div>
                        <div className={styles.tags}>
                            <h3 className={styles.idBalance}>№</h3>
                            <h3 className={styles.idDate}>#ID</h3>
                            <h3 className={styles.idHead}>Full Name</h3>
                            <h3 className={styles.idBalance}>Balance</h3>
                            <h3 className={styles.idDate}>Register Date</h3>
                        </div>
                        {data.map((user, index) => {
                            return (
                                <div
                                    onClick={() => getUserPayments(user.id)}
                                    key={index}
                                    className={styles.singleUserContainer}
                                >
                                    <p className={styles.idBalance}>{index + 1}</p>
                                    <p className={styles.idDate}>{user.id}</p>
                                    <p className={styles.idHead}>{user.fullName}</p>
                                    <p className={styles.idBalance}>{user.balance}</p>
                                    <p className={styles.idDate}>{user.registerdate}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            :
            null
    );
}

export default ModalFilterPayments;