import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
import { Input, PrescriptionListingTable, InputFile, Prescription } from '@components';
import styles from './prescription-modal.module.scss';
import { useFormik } from 'formik';
import { IForm, initialValues, validationSchema } from './schema';
import LoaderButton from '../loader-button/loader-button';
import administrationList from '../../data/medical-administration.json';
import medicationTypeList from '../../data/medicine-type-list.json';
import medicationFrequencyList from '../../data/medication-frequency.json';
import medicationTimeList from '../../data/medication-time.json';
import _ from 'lodash';

/* eslint-disable-next-line */
export interface PrescriptionModalProps {
    showModal: boolean;
    setShowModal: (boolean) => void;
    formik: any;
    doctor: any;
    patient: any;
}

export function PrescriptionModal({ showModal, formik, setShowModal, doctor, patient }: PrescriptionModalProps) {
    const [editMode, setEditMode] = useState(false);
    const [showPrescriptionPDFModal, setShowPrescriptionPDFModal] = useState(false);
    const [prescriptionIndex, setPrescriptionIndex] = useState();
    const fileInput = useRef(null);
    const handlePrescriptionSubmit = (values: IForm) => {
        if (!editMode) {
            formik.setValues({ ...formik.values, prescriptions: [...formik.values.prescriptions, values] });
        } else {
            setEditMode(false);
            setPrescriptionIndex(null);
            formik.setValues({ ...formik.values, prescriptions: [...formik.values.prescriptions.filter((prescription, index) => index !== prescriptionIndex), values] });
        }
        formik.handleSubmit();
        prescriptionFormik.resetForm();
    };

    const handleEditPrescription = (prescription, index) => {
        setEditMode(true);
        setShowModal(true);
        setPrescriptionIndex(index);
        const prescriptionObj = _.cloneDeep(prescription);
        prescriptionFormik.setValues(prescriptionObj);
    };

    const handleDeletePrescription = async (deleteId) => {
        formik.setValues({ ...formik.values, prescriptions: [...formik.values.prescriptions.filter((prescription) => prescription.id !== deleteId)] });
        formik.handleSubmit();
    };

    const prescriptionFormik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: handlePrescriptionSubmit
    });

    const onUpload = async (file: any) => {
        prescriptionFormik.setFieldValue('prescriptionFileUrl', file.url);
    };

    const [selectedPrescription, setSelectedPrescription] = useState({});

    //submit form when file upload
    useEffect(() => {
        const values = prescriptionFormik.values;
        if (values.prescriptionFileUrl && !values.medication && !values.frequency && !values.dosage && !values.medicationTime && !values.instructions && !values.administration && !values.refil && !values.type) {
            handlePrescriptionSubmit(prescriptionFormik.values);
        }
    }, [prescriptionFormik.values.prescriptionFileUrl])

    return (
        <>
            <Modal show={showModal}
                onHide={() => setShowModal(false)}
                size="xl"
                centered
                dialogClassName={styles.modal}
                contentClassName={styles.content}
            >
                <Modal.Header className={styles.bsHeader} closeButton>
                    <Modal.Title className="ml-auto">Write Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body className="prescription">
                    {/* Prescription Form */}
                    <Form className="form-wrap mb-4" noValidate onSubmit={prescriptionFormik.handleSubmit}>
                        <Row>
                            <Input
                                groupAs={Col}
                                md="4"
                                label="Medication"
                                placeholder="Medication"
                                type="text"
                                name="medication"
                                formik={prescriptionFormik}
                                {...prescriptionFormik.getFieldProps('medication')}
                            />
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    name="type"
                                    {...prescriptionFormik.getFieldProps(
                                        `type`
                                    )}
                                >
                                    <option value=''>Select Type</option>
                                    {
                                        medicationTypeList.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid"
                                    className={prescriptionFormik.errors['type'] && prescriptionFormik.touched['type'] ? 'd-block' : ''}>
                                    {prescriptionFormik.errors['type']}
                                </Form.Control.Feedback>
                            </Col>
                            <Input
                                groupAs={Col}
                                md="4"
                                label="Dosage"
                                placeholder="Dosage"
                                type="number"
                                name="dosage"
                                formik={prescriptionFormik}
                                {...prescriptionFormik.getFieldProps('dosage')}
                            />
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    name="frequency"
                                    {...prescriptionFormik.getFieldProps(
                                        `frequency`
                                    )}
                                >
                                    <option value=''>Select frequency</option>
                                    {
                                        medicationFrequencyList.map((frequency, index) => (
                                            <option key={index} value={frequency}>{frequency}</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid"
                                    className={prescriptionFormik.errors['frequency'] && prescriptionFormik.touched['frequency'] ? 'd-block' : ''}>
                                    {prescriptionFormik.errors['frequency']}
                                </Form.Control.Feedback>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    name="medicationTime"
                                    {...prescriptionFormik.getFieldProps(
                                        `medicationTime`
                                    )}
                                >
                                    <option value=''>Select Medication Time</option>
                                    {
                                        medicationTimeList.map((medicationTime, index) => (
                                            <option key={index} value={medicationTime}>{medicationTime}</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid"
                                    className={prescriptionFormik.errors['medicationTime'] && prescriptionFormik.touched['medicationTime'] ? 'd-block' : ''}>
                                    {prescriptionFormik.errors['medicationTime']}
                                </Form.Control.Feedback>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    name="administration"
                                    {...prescriptionFormik.getFieldProps(
                                        `administration`
                                    )}
                                >
                                    <option value=''>Select Administration</option>
                                    {
                                        administrationList.map((administration, index) => (
                                            <option key={index} value={administration}>{administration}</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid"
                                    className={prescriptionFormik.errors['administration'] && prescriptionFormik.touched['administration'] ? 'd-block' : ''}>
                                    {prescriptionFormik.errors['administration']}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row>
                            <Input
                                groupAs={Col}
                                md="4"
                                label="Special Instructions"
                                placeholder="Special Instructions"
                                type="text"
                                name="instructions"
                                formik={prescriptionFormik}
                                {...prescriptionFormik.getFieldProps('instructions')}
                            />
                            <Input
                                groupAs={Col}
                                md="4"
                                label="Refil"
                                placeholder="Refil"
                                type="text"
                                name="refil"
                                formik={prescriptionFormik}
                                {...prescriptionFormik.getFieldProps('refil')}
                            />
                        </Row>
                        <Row>

                            <Col md={12} className="text-right">
                                <LoaderButton
                                    classes="btn btn-primary btn-lg"
                                    text="Save"
                                    type="submit"
                                />
                            </Col>
                        </Row>
                    </Form>
                    {/* file upload */}
                    <div className={`text-center`}>
                        <hr style={{ width: "60%", margin: "0px auto" }} />
                        <h4
                            className={`${styles.dividerText} d-inline-block bg-white mb-0`}
                        >
                            OR
                        </h4>
                        <InputFile
                            className={styles.uploadImages}
                            onFileUpload={(e) => onUpload(e)}
                            ref={fileInput}
                        />
                        <Button
                            className={styles.uploadButton}
                            onClick={() => fileInput.current.click()}>
                            UPLOAD FILE
                        </Button>
                    </div>
                    {/* Table */}
                    {
                        formik?.values?.prescriptions?.length > 0 ? (
                            <PrescriptionListingTable setSelectedPrescription={setSelectedPrescription} setShowPrescriptionPDFModal={setShowPrescriptionPDFModal} prescriptions={formik.values.prescriptions} editPrescriptionHandler={handleEditPrescription} deletePrescriptionHandler={handleDeletePrescription} />
                        ) : null
                    }
                </Modal.Body>
            </Modal>
            <Prescription
                showModal={showPrescriptionPDFModal}
                setShowModal={setShowPrescriptionPDFModal}
                formik={formik}
                doctor={doctor}
                patient={patient}
                prescription={selectedPrescription}
            />
        </>
    )
}

export default PrescriptionModal;
