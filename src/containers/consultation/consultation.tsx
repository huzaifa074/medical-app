import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Allergies, ChildhoodIllness, ChronicCondition, FamilyHistory, Input, Medications, PrescriptionModal, SickNoteModal, SocialHistory, Surgeries, Vaccinations } from '@components';
import { onError } from '@utils';
import { useFormik } from 'formik';
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
import { Col, Form, Image, Media, Row, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import reasonsList from '../../data/reasons.json';
import useAppointment from '../../hooks/useAppointment';
import styles from './consultation.module.scss';
import { IForm, initialValues, validationSchema } from './schema';
import { IForm as patientIForm, initialValues as patientInitialValues, validationSchema as patientValidationSchema } from '../patients/upsert-patient/schema';
import { Link, useHistory } from 'react-router-dom';
import usePatientUpsert from 'src/hooks/usePatientUpsert';

/* eslint-disable-next-line */
export interface ConsultationProps { }

export function Consultation(props: ConsultationProps) {

    const history = useHistory();

    // multiselect style
    const multiSelectStyle = {
        chips: {
            background: '#00c2cb',
            color: '#111111',
        },
        searchBox: {
            border: 'none',
            borderBottom: '1px solid #00c2cb',
            borderRadius: '0px',
        },
        multiselectContainer: {
            color: '#fffff',
        },
    };

    const { consultationId }: any = useParams();
    const [activeTab, setActiveTab] = useState('consultation');
    const [reasons, setReasons] = useState(reasonsList.online.reasons);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showSickNoteModal, setShowSickNoteModal] = useState(false);
    const [showReferPatientModal, setShowReferPatientModal] = useState(false);
    const { patientToEdit: patient, getPatient, isLoading, error, done, upsertPatient } = usePatientUpsert();
    const [step, setStep] = useState(1);
    // get appointment details if opened in edit mode
    useEffect(() => {
        (async () => {
            try {
                if (!consultationId) return;
                await getAppointmentById(consultationId);
            } catch (error) {
                onError(error);
            }
        })();
    }, [consultationId]);

    // use appointment hook
    const {
        getAppointmentById,
        appointmentToEdit,
        upsertAppointment
    } = useAppointment();

    // set form values
    useEffect(() => {
        if (!appointmentToEdit) return;
        // set initial values for form
        const newValues = { ...formik.values, ...appointmentToEdit };
        formik.setValues(newValues);
    }, [appointmentToEdit]);

    useEffect(() => {
        if (!appointmentToEdit) return;
        (async () => {
            // api call to get patient details
            try {
                getPatient(appointmentToEdit.patientId);
            } catch (error) {
                onError(error);
            }
        })();
    }, [appointmentToEdit]);

    const handleSubmit = (values: any) => {
        if (!appointmentToEdit) return;
        const body = { ...formik.values };
        upsertAppointment(body, appointmentToEdit.id);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    const onMultipleSelect = (selectedList, controlName) => {
        const updatedValues = selectedList;
        // update control value
        formik.setFieldValue(controlName, updatedValues).finally(() => {
            formik.handleSubmit(formik.values);
        });
    };

    const handleRadioButtonChange = (controlName: string) => {
        switch (controlName) {
            case 'add-prescription':
                setShowPrescriptionModal(true);
                break;
            case 'refer-patient':
                setShowReferPatientModal(true);
                break;
            case 'issue-sick-notes':
                setShowSickNoteModal(true);
                break;
            default:
                return null;
        }
    };


    const handleNavigateBack = () => {
        history.push('/consultations');
    };

    const handlePatientProfileSubmit = async (values: patientIForm) => {
        try {
            const body = { ...values };
            await upsertPatient(body);
        } catch (error) {
            onError(error);
        }
    }
    // profile picture update formik instance
    const formikPatientProfile = useFormik({
        enableReinitialize: true,
        initialValues: patientInitialValues,
        onSubmit: handlePatientProfileSubmit,
    });

    // Call on error and update
    useEffect(() => {
        if (done) {
            // show success toast
            //   toast.success('Patient Edited Successfully.');
            // formik.resetForm();
        } else if (error) {
            onError(error);
        }
    }, [done, error]);


    //handle step change
    const handleStepChange = (direction: string) => {
        if (direction === 'next') {
            if (step < 3) {
                setStep(step + 1);
            }
        } else if (direction === 'back') {
            if (step > 1) {
                setStep(step - 1);
            }
        }
    }

    return (
        <div>
            <Row>
                <img className={`pl-4 ${styles.backIcon}`} onClick={handleNavigateBack} src={`/assets/images/icons/left-arrow.png`} alt="Field Icon" />
                <h6 className="pl-1">{appointmentToEdit?.patient?.name || 'N/A'}</h6>
            </Row>
            <Row className="mt-3 mb-4">
                <Col xl={6} style={{ padding: 2.5 }}>
                    <div className="content-body h-100">
                        <Tabs
                            activeKey={activeTab}
                            id="tab"
                            className={`${styles.tabItems} border-0`}
                            onSelect={(k) => setActiveTab(k)}
                        >
                            <Tab eventKey="medicalHistory" title="Medical History">
                                <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>

                                    {/* progress bar and pagination arrows */}
                                    <Row className="justify-content-end">
                                        <Col md={4} className="text-right">
                                            <div className={`${styles.paginationArrows} d-inline-flex`}>
                                                <span
                                                    className={`${styles.arrowIcons} mr-3`}
                                                    onClick={() => handleStepChange('back')}
                                                    title="Previous"
                                                >
                                                    <Image
                                                        src={step === 1 ? "/assets/images/left-arrow.svg" : "/assets/images/left-arrow-active.svg"}
                                                        alt="arrow-icons"
                                                    />
                                                </span>
                                                <span
                                                    className={`${styles.arrowIcons}`}
                                                    onClick={() => handleStepChange('next')}
                                                    title="Next"
                                                >
                                                    <Image
                                                        src={step === 3 ? "/assets/images/right-arrow.svg" : "/assets/images/right-arrow-active.svg"}
                                                        alt="arrow-icons"
                                                    />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    {
                                        step === 1 &&
                                        (<Row className="mt-2">
                                            {/* page one content */}
                                            <Col md={12} className={styles.spacing} >
                                                {/* Allergies */}
                                                <Allergies
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading}
                                                />
                                            </Col>
                                            <Col md={12} className={styles.spacing}>
                                                {/* Chronic conditions */}
                                                <ChronicCondition
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading}
                                                />
                                            </Col>
                                            <Col md={12} className={styles.spacing}>
                                                {/* Medication Taken Regularly */}
                                                <Medications
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading}
                                                />
                                            </Col>

                                            <Col md={12} className={styles.spacing}>
                                                {/* Family History */}
                                                <FamilyHistory
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading} />
                                            </Col>
                                        </Row>)
                                    }
                                    {
                                        step === 2 &&
                                        (<Row className="mt-2">
                                            <Col md={12} className={styles.spacing}>
                                                <Surgeries
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading} />
                                            </Col>
                                            <Col md={12} className={styles.spacing}>
                                                <SocialHistory
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading} />
                                            </Col>
                                            <Col md={12} className={styles.spacing}>
                                                <ChildhoodIllness
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading} />
                                            </Col>
                                            <Col md={12} className={styles.spacing}>
                                                <Vaccinations
                                                    patient={patient}
                                                    formik={formikPatientProfile}
                                                    done={done}
                                                    error={error}
                                                    isLoading={isLoading} />
                                            </Col>
                                        </Row>)}
                                    {
                                        step === 3 &&
                                        (<Row className="mt-2">

                                        </Row>)}

                                </div>
                            </Tab>
                            <Tab eventKey="consultation" title="Consultation">
                                <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                                    <Form
                                        noValidate
                                        className="form-wrap"
                                    >
                                        <Row className={styles.space}>
                                            <Form.Group as={Col} md={12} >
                                                <label className="formLabel">Subjective</label>
                                                <CKEditor
                                                    name="subjective"

                                                    editor={ClassicEditor}
                                                    data={formik?.values?.subjective || ''}
                                                    placeholder="Enter Subjective"
                                                    onBlur={(event, editor) => {
                                                        const data = editor.getData();
                                                        formik.setFieldValue("subjective", data);
                                                    }}
                                                    config={{
                                                        toolbar: [
                                                            "heading",
                                                            "|",
                                                            "bold",
                                                            "italic",
                                                            "blockQuote",
                                                            "link",
                                                            "numberedList",
                                                            "bulletedList",
                                                            "insertTable",
                                                            "tableColumn",
                                                            "tableRow",
                                                            "mergeTableCells",
                                                            "|",
                                                            "undo",
                                                            "redo",
                                                        ],
                                                    }}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className={styles.space}>
                                            <Form.Group as={Col} md={12}>
                                                <Multiselect
                                                    avoidHighlightFirstOption
                                                    options={reasons}
                                                    isObject={false}
                                                    name="reasons"
                                                    placeholder="Reasons"
                                                    {...(appointmentToEdit &&
                                                    {
                                                        selectedValues: formik.values.reasons,
                                                    })}
                                                    id="css_custom"
                                                    style={multiSelectStyle}
                                                    onSelect={(selectedList, selectedItem) =>
                                                        onMultipleSelect(selectedList, 'reasons')
                                                    }
                                                    onRemove={(selectedList, selectedItem) =>
                                                        onMultipleSelect(selectedList, 'reasons')
                                                    }
                                                />
                                                {formik.errors && formik.touched.reasons && formik.errors.reasons && (
                                                    <div className="d-block invalid-feedback">{formik.errors.reasons}</div>
                                                )
                                                }
                                            </Form.Group>
                                        </Row>
                                        <Row className={styles.space}>
                                            <Input
                                                groupAs={Col}
                                                md="12"
                                                icon="full-name.svg"
                                                label="Assessmentment and findings (objective)"
                                                placeholder="Assessmentment and findings (objective)"
                                                type="text"
                                                name="objective"
                                                formik={formik}
                                                onBlurCapture={formik.handleSubmit}
                                                {...formik.getFieldProps('objective')}
                                                style={{ paddingRight: 30 }}
                                            />
                                        </Row>
                                        <Row className={styles.space}>
                                            <Input
                                                groupAs={Col}
                                                md="12"
                                                icon="full-name.svg"
                                                label="Diagnosis"
                                                placeholder="Diagnosis"
                                                type="text"
                                                name="diagnosis"
                                                formik={formik}
                                                onBlurCapture={formik.handleSubmit}
                                                {...formik.getFieldProps('diagnosis')}
                                                style={{ paddingRight: 30 }}
                                            />
                                        </Row>
                                        <Row className={styles.space}>
                                            <Input
                                                groupAs={Col}
                                                md="12"
                                                icon="full-name.svg"
                                                label="Treatment Plan"
                                                placeholder="Treatment Plan"
                                                type="text"
                                                name="treatmentPlan"
                                                formik={formik}
                                                onBlurCapture={formik.handleSubmit}
                                                {...formik.getFieldProps('treatmentPlan')}
                                                style={{ paddingRight: 30 }}
                                            />
                                        </Row>
                                        <Row >
                                            <Col md={12} className="d-flex justify-content-between pt-2 pb-2">
                                                <p>Follow up required ?</p>
                                                <Form.Check
                                                    type="switch"
                                                    id="active-3"
                                                    label=""
                                                    checked={formik.values.followUpRequired}
                                                    name="followUpRequired"
                                                    onChangeCapture={(e) => formik.handleSubmit(formik.values)}
                                                    {...formik.getFieldProps('followUpRequired')}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-space-between">
                                            <Input
                                                groupAs={Col}
                                                md="6"
                                                label="Follow up date"
                                                placeholder="Follow up date"
                                                type="date"
                                                name="followUpDate"
                                                formik={formik}
                                                onBlurCapture={formik.handleSubmit}
                                                {...formik.getFieldProps('followUpDate')}
                                            />
                                            <Form.Group as={Col} md={6}>
                                                <Form.Control
                                                    as="select"
                                                    size="lg"
                                                    name="followUpConsultationType"
                                                    onChangeCapture={(e) => formik.handleSubmit(formik.values)}
                                                    {...formik.getFieldProps('followUpConsultationType')}
                                                >
                                                    <option value="online">Online</option>
                                                    <option value="in-person">In Person</option>
                                                    <option value="home-visit">Home Visit</option>
                                                </Form.Control>
                                                <Form.Label className="text-left form-label">
                                                    Consultation Type ?
                                                </Form.Label>
                                            </Form.Group>
                                        </Row>
                                        <Row className={styles.space}>
                                            <Col lg={4} className="px-2 mb-3 mb-lg-0">
                                                <Media className={`${styles.appointmentTypeItem} align-items-center`} onClick={() => handleRadioButtonChange('add-prescription')}>
                                                    <Image src="/assets/images/online-consultaion-white.svg" alt="appointment-type" />
                                                    <Media.Body>
                                                        <h6 className="text-center mb-0">Add Prescription</h6>
                                                    </Media.Body>
                                                </Media>
                                            </Col>
                                            <Col lg={4} className="px-2 mb-3 mb-lg-0">
                                                <Media className={`${styles.appointmentTypeItem} align-items-center`} onClick={() => handleRadioButtonChange('refer-patient')}>
                                                    <Image src="/assets/images/location-visit-white.svg" alt="appointment-type" />
                                                    <Media.Body>
                                                        <h6 className="text-center mb-0">Refer Patient</h6>
                                                    </Media.Body>
                                                </Media>
                                            </Col>
                                            <Col lg={4} className="px-2 mb-3 mb-lg-0">
                                                <Media className={`${styles.appointmentTypeItem} align-items-center`} onClick={() => handleRadioButtonChange('issue-sick-notes')}>
                                                    <Image src="/assets/images/home-visit-white.svg" alt="appointment-type" />
                                                    <Media.Body>
                                                        <h6 className="text-center mb-0">Issue Sick Note</h6>
                                                    </Media.Body>
                                                </Media>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
                <Col xl={6} style={{ padding: 2.5 }}>
                    <div className="content-body h-100">
                        <h6>Audio/Video Section</h6>
                    </div>
                </Col>
            </Row>
            <PrescriptionModal doctor={appointmentToEdit?.doctor} patient={appointmentToEdit?.patient} showModal={showPrescriptionModal} setShowModal={setShowPrescriptionModal} formik={formik} />
            <SickNoteModal showModal={showSickNoteModal} setShowModal={setShowSickNoteModal} formik={formik} />
        </div>
    );
}

export default Consultation;
