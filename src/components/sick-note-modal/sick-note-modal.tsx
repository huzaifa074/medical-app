import React, { useEffect, useRef } from 'react';
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
import { Input, InputFile } from '@components';
import styles from './sick-note-modal.module.scss';
import { useFormik } from 'formik';
import { IForm, initialValues, validationSchema } from './schema';
import LoaderButton from '../loader-button/loader-button';
import _ from 'lodash';

/* eslint-disable-next-line */
export interface SickNoteModalProps {
    showModal: boolean;
    setShowModal: (boolean) => void;
    formik: any;
}

export function SickNoteModal({ showModal, formik, setShowModal }: SickNoteModalProps) {
    const handleSickNoteSubmit = (values: IForm) => {
        formik.setValues({ ...formik.values, sickNote: { ...values } });
        formik.handleSubmit();
        setShowModal(false);
    };
    const fileInput = useRef(null);

    useEffect(() => {
        if (!_.isEmpty(formik.values.sickNote)) {
            sickNotesFormik.setValues({ ...formik.values.sickNote });
        }
    }, [formik.values]);

    const onUpload = async (file: any) => {
        sickNotesFormik.setFieldValue('sickNoteFileUrl', file.url);
    };

    const deleteSickFileHandler = () => {
        sickNotesFormik.setFieldValue('sickNoteFileUrl', '');
    };


    const sickNotesFormik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: handleSickNoteSubmit
    });

    //submit form when file upload
    useEffect(() => {
        handleSickNoteSubmit(sickNotesFormik.values);
    }, [sickNotesFormik.values.sickNoteFileUrl])

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered
            dialogClassName={styles.modal}
            contentClassName={styles.content}
        >
            <Modal.Header className={styles.bsHeader} closeButton>
                <Modal.Title className="ml-auto">Issue Sick Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* sickNote Form */}
                <Form className="form-wrap mb-4" noValidate onSubmit={sickNotesFormik.handleSubmit}>
                    <Row>
                        <Input
                            groupAs={Col}
                            md="12"
                            label="Notes"
                            placeholder="Notes"
                            type="text"
                            name="note"
                            formik={sickNotesFormik}
                            {...sickNotesFormik.getFieldProps('note')}
                        />
                    </Row>
                    <Row>
                        <Input
                            groupAs={Col}
                            md="6"
                            label="Start Date"
                            placeholder="Start Date"
                            type="date"
                            name="startDate"
                            formik={sickNotesFormik}
                            {...sickNotesFormik.getFieldProps('startDate')}
                        />
                        <Input
                            groupAs={Col}
                            md="6"
                            label="End Date"
                            placeholder="End Date"
                            type="date"
                            name="endDate"
                            formik={sickNotesFormik}
                            {...sickNotesFormik.getFieldProps('endDate')}
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
                    {
                        sickNotesFormik.values.sickNoteFileUrl && (
                            <p>
                                {sickNotesFormik.values.sickNoteFileUrl}
                                <span className={`${styles.cancelIcon} ml-2`} >
                                    <img className={`${styles.editIcon}`} src="/assets/images/trash.svg" alt="Field Icon" onClick={deleteSickFileHandler} />
                                </span>
                            </p>
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SickNoteModal;
