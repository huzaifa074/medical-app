import React, { useRef } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import BrandLogo from '../brand-logo/brand-logo';
import styles from './prescription.module.scss';
import { PDFExport } from '@progress/kendo-react-pdf';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import moment from 'moment';

/* eslint-disable-next-line */
export interface PrescriptionProps {
    showModal: boolean;
    setShowModal: (boolean) => void;
    formik: any;
    doctor: any;
    patient: any;
    prescription: any;
}

export function Prescription({ showModal, formik, setShowModal, doctor, patient, prescription }: PrescriptionProps) {

    const pdfExportComponent = useRef(null);
    const printComponent = useRef(null);
    
    const handleExportWithComponent = (event) => {
        const file = pdfExportComponent.current.save();
    };

    const handlePrint = useReactToPrint({
        content: () => printComponent.current
    });


    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Prescription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col md={8} className="ml-auto mr-auto">
                    <PDFExport fileName="Prescription" author={doctor?.name} ref={pdfExportComponent} paperSize="A4">
                        <div ref={printComponent} style={{ border: "1px solid #bbbdc2" }} >
                            <Row style={{
                                margin: "auto",
                                display: "flex",
                                alignItems: "center",
                                color: "#00c2cb",
                                borderLeft: "1px solid #bbbdc2",
                                justifyContent: "center",
                                boxSizing: "border-box",
                                letterSpacing: "10px",
                                borderBottom: "1px solid #bbbdc2"
                            }}>
                                {/* logo */}
                                <Col style={{ width: "50%" }}>
                                    <BrandLogo />
                                </Col>
                                {/* heading */}
                                <Col style={{ width: "50%", borderLeft: "1px solid #bbbdc2" }} className={`${styles.heading}`}>
                                    <h3>PRESCRIPTION</h3>
                                </Col>
                            </Row>
                            {/* patient details */}
                            <div
                                style={{
                                    margin: "auto",
                                    padding: "30px",
                                    display:"flex"
                                }}
                            >
                                <Col md={3}
                                    style={{
                                        padding: "5px",
                                        display: "flex",
                                        fontSize: "11px",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <h5>PATIENT NAME</h5>
                                    <p>{patient?.name}</p>
                                </Col>
                                <Col md={4}
                                    style={{
                                        padding: "5px",
                                        display: "flex",
                                        fontSize: "11px",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}>
                                    <h5>ID/PASSPORT NO</h5>
                                    <p>{patient?.passportNumberOrId || 'N/A'}</p>
                                </Col>
                                <Col md={3}
                                    style={{
                                        padding: "5px",
                                        display: "flex",
                                        fontSize: "11px",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}>
                                    <h5>REFERENCE</h5>
                                    <p>{patient?.reference || 'N/A'}</p>
                                </Col>
                                <Col md={2}
                                    style={{
                                        padding: "5px",
                                        display: "flex",
                                        fontSize: "11px",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}>
                                    <h5>DATE</h5>
                                    <p>{moment().format('DD/MMM/YYYY')}</p>
                                </Col>
                            </div>
                            {/* filled heading */}
                            <Row style={{
                                backgroundColor: "#00c2cb",
                                width: "90%",
                                marginLeft: "5%",
                                marginTop: "auto",
                                borderRadius:"10px"
                            }}>
                                <p
                                    style={{
                                        marginTop: "auto",
                                        marginLeft: "5px",
                                        marginBottom: "auto",
                                        padding:"5px 5px",
                                        paddingLeft:"20px", 
                                        color: "#ffffff",
                                        borderRadius:"10px"
                                    }}>PRESCRIPTION DETAILS</p>
                            </Row>
                            {/* PRESCRIPTION DETAILS */}
                            <div className={`${styles.row} mt-5`}
                                style={{
                                  marginTop: "5px",
                                  width: "95%",
                                  display:"flex",
                                  margin: "0px auto"
                                }}
                            >
                                <div style={{width:"13%"}}>
                                    logo RX
                                </div>
                                <div style={{width:"80%"}} >
                                    <div >
                                        <p ><strong>{prescription?.medication}</strong></p>
                                        <p ><strong>Dosage: </strong> {prescription?.dosage}</p>
                                        <p ><strong>Frequency: </strong> {prescription?.frequency}</p>
                                        <p ><strong>When: </strong> {prescription?.medicationTime}</p>
                                    </div>
                                </div>

                            </div>
                            {/* doctor name and signature box */}
                            <div  style={{display:"flex", width:"75%",margin:"0px auto" }} >
                                <Col md={7}>
                                    <div>
                                        <h4>
                                            Dr. {doctor?.name || 'N/A'}
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
                                    <div style={{border:"1px solid black",width:"250px",height:"150px"}} >

                                    </div>
                                </Col>
                            </div>
                            <div style={{display:"flex", width:"85%",margin: "20px auto 10px 91px"}}>
                                {/* Authenticity container */}
                                <div style={{width:"55%",paddingRight:10}} className="flex-column justify-content-between">
                                    <div>
                                        <h5 className={styles.authenticityHeading}>How to verify Authenticity</h5   >
                                        <p className={styles.authenticityText}>Go to verifications.staylowkey.co or contact us via contact details provided alongside.</p>
                                    </div>
                                    <div>
                                        <p className={styles.authenticityText}><strong>ADDRESS:</strong> Aleppo Avenue</p>
                                    </div>
                                </div>
                                {/* kontact container */}
                                
                                <div  style={{width:"45%"}}>
                                    <div>
                                        <h5>Contact Details</h5>
                                        <p className="mt-2">verifications.staylowkey.co</p>
                                        <p className="mt-4">(+27) 010 145 2021</p>
                                        <p className="mt-2 ml-auto"><strong>REG: </strong> 2021/458745/07</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PDFExport>
                    <Row className="p-3">
                        <Col md={6} className="d-flex justify-content-center">
                            <button className="btn btn-secondary" onClick={handlePrint}>Print</button>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={handleExportWithComponent}>Email</button>
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal >
    )
}

export default Prescription;
