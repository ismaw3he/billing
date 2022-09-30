import React from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function Modal({ show, closeModal, paymentsList }) {


    return (
        show ?
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <FontAwesomeIcon onClick={closeModal} icon={faTimes} size="1x" className={styles.iconModal} />
                    <div className={styles.fullScreen}>

                        <div className={styles.tags}>
                        <h3 className={styles.idNumber}>№</h3> 
                            <h3 className={styles.idDate}>Date</h3>
                            <h3 className={styles.idHead}>Time</h3>
                            <h3 className={styles.idBalance}>Amount</h3>
                            <h3 className={styles.idFullName}>Source</h3>
                        </div>
                        {console.log({paymentsList})}
                        {paymentsList.map((payment, index) => {
                            return (
                                <div key={index} className={styles.singleUserContainer}>
                                    <p className={styles.idNumber}>{index + 1}</p>
                                    <p className={styles.idDate}>{payment.date}</p>
                                    <p className={styles.idHead}>{payment.time}</p>
                                    <p className={styles.idBalance}>{payment.amount}</p>
                                    <p className={styles.idFullName}>{payment.source}</p>
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

export default Modal;