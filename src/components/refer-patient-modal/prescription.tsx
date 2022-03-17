import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BrandLogo from '../brand-logo/brand-logo';
import styles from './prescription.module.scss';


/* eslint-disable-next-line */
export interface PrescriptionProps { }

export function Prescription(params: PrescriptionProps) {
    const ref = React.createRef();

    return (
        <div className={styles.prescription} >
            <Row className={`${styles.headerBox} ${styles.row} justify-content-between`}>
                {/* logo */}
                <Col md={6}>
                    <BrandLogo />
                </Col>
                {/* heading */}
                <Col md={6} className={`${styles.heading}`}>
                    <h3>P R E S C R I P T I O N</h3>
                </Col>
            </Row>
            {/* patient details */}
            <Row className={`${styles.patientDetails} ${styles.row}`}>
                <Col md={3} className={styles.patientDetailItem}>
                    <h5>PATIENT NAME</h5>
                    <p>AQEEL KHAN</p>
                </Col>
                <Col md={3} className={styles.patientDetailItem}>
                    <h5>ID/PASSPORT NO</h5>
                    <p>12345678</p>
                </Col>
                <Col md={3} className={styles.patientDetailItem}>
                    <h5>REFERENCE</h5>
                    <p>XYZ</p>
                </Col>
                <Col md={3} className={styles.patientDetailItem}>
                    <h5>DATE</h5>
                    <p>07 MARCH 2021</p>
                </Col>
            </Row>
            {/* filled heading */}
            <Row className={`${styles.row} ${styles.prescriptionDetailsContainer}`}>
                <p className={`${styles.prescriptionText} ml-5 my-auto`}>PRESCRIPTION DETAILS</p>
            </Row>
            {/* PRESCRIPTION DETAILS */}
            <Row className={`${styles.row} mt-5`}>
                <Col md={1} className="pl-0 ml-5">
                    logo RX
                </Col>
                <Col md={4}>
                    <Row className={`${styles.medicineItem}`}>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>Acefyl neubrol synflex</strong></p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                    </Row>
                    <Row className={`${styles.medicineItem}`}>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>Acefyl neubrol synflex</strong></p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                    </Row>
                    <Row className={`${styles.medicineItem}`}>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>Acefyl neubrol synflex</strong></p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                    </Row>
                    <Row className={`${styles.medicineItem}`}>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>Acefyl neubrol synflex</strong></p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                        <p className={`${styles.medicineItemText} d-flex`}><strong>synflex: </strong> AVDX</p>
                    </Row>
                </Col>

            </Row>
            {/* doctor name and signature box */}
            <Row className={`${styles.row} d-flex mt-5 justify-content-center`}>
                <Col md={5}>
                    <div>
                        <h4>
                            Dr. Aq Kh
                        </h4>
                        <p>
                            PRACTICE NO: MP 45721
                        </p>
                        <p>
                            REG NO: PR 420
                        </p>
                    </div>
                </Col>
                <Col md={5}>
                    <div className={styles.signatureBox}>

                    </div>
                </Col>
            </Row>
            <Row className={`${styles.row} d-flex mt-5 justify-content-center`}>
                {/* Authenticity container */}
                <Col md={5} className="flex-column justify-content-between">
                    <div>
                        <h4 className={styles.authenticityHeading}>How to verify Authenticity</h4>
                        <p className={styles.authenticityText}>Go to verifications.staylowkey.co or contact us via contact details provided alongside.</p>
                    </div>
                    <div>
                        <p className={styles.authenticityText}><strong>ADDRESS:</strong> Aleppo Avenue</p>
                    </div>
                </Col>
                {/* kontact container */}
                <Col md={5}>
                    <div>
                        <h5>Contact Details</h5>
                        <p className="mt-2">verifications.staylowkey.co</p>
                        <p className="mt-4">(+27) 010 145 2021</p>
                        <p className="mt-2 ml-auto"><strong>REG: </strong> 2021/458745/07</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Prescription;
