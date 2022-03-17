import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Image,
  Row,
  Tab,
  Tabs,
  ProgressBar,
  Button,
} from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  PastConsultations,
  PatientMedicalHistory,
  PatientProfileCard,
  UpcomingConsultations,
  Surgeries,
  SocialHistory,
  ChildhoodIllness,
  Vaccinations,
  Allergies,
  ChronicCondition,
  Medications,
  FamilyHistory,
} from '@components';
import usePatientUpsert from '../../../hooks/usePatientUpsert';
import { onError } from '../../../utils';
import {
  IForm,
  initialValues,
  validationSchema,
} from '../upsert-patient/schema';
import styles from './patient-detail.module.scss';

/* eslint-disable-next-line */
export interface PatientDetailProps {}

export function PatientDetail(props: PatientDetailProps) {
  const {
    patientToEdit: patient,
    getPatient,
    isLoading,
    error,
    done,
    upsertPatient,
  } = usePatientUpsert();
  const [activeTab, setActiveTab] = useState('medicalHistory');
  const [step, setStep] = useState(1);
  const { patientId }: any = useParams();

  const history = useHistory();

  useEffect(() => {
    (async () => {
      // api call to get patient details
      try {
        getPatient(patientId);
      } catch (error) {
        onError(error);
      }
    })();
  }, [patientId]);

  const editPatientHandler = (patientId, callerMedicationDetail = false) => {
    history.push(
      `/patients/${patientId}/edit?callerMedicationDetail=${callerMedicationDetail}`
    );
  };

  const handleSubmit = async (values: IForm) => {
    try {
      const body = { ...values };
      await upsertPatient(body);
    } catch (error) {
      onError(error);
    }
  };
  // profile picture update formik instance
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: handleSubmit,
  });

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      toast.success('Patient Edited Successfully.');
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
  };

  return (
    <div className={`${styles.patientDetails}`}>
      <Row>
        <Col md={6} xl={4}>
          <div className="content-body p-3">
            <PatientProfileCard
              patient={patient}
              isLoading={isLoading}
              done={done}
              formik={formik}
              editPatientHandler={() => editPatientHandler(patientId)}
            />
          </div>

          <div className={`content-body p-3 ${styles.medicalSchema}`}>
            <h3>DISCOVERY MEDICAL SCHEME</h3>

            <div className={`${styles.row}`}>
              <p>Classic saver</p>
              <p>******94</p>
            </div>

            <div className={`${styles.row}`}>
              <Button type="button" className={`${styles.button1}`}>
                Principal Members
              </Button>
              <Button
                type="button"
                variant="outline-primary"
                className={`${styles.button2}`}
              >
                Active
              </Button>
            </div>
          </div>
        </Col>
        <Col xl={8} className={['pl-xl-0', styles.space].join(' ')}>
          {/* <div className="content-body">
            <PatientMedicalHistory
              patient={patient}
              editPatientHandler={() => editPatientHandler(patientId, true)}
            />
          </div>
           */}

          {/* new patient profile */}
          <Tabs
            activeKey={activeTab}
            id="tab"
            className={`${styles.tabItems} border-0`}
            onSelect={(k) => setActiveTab(k)}
          >
            <Tab eventKey="medicalHistory" title="Medical History">
              <div className={`${styles.tabItemContent}`}>
                {/* progress bar and pagination arrows */}
                <Row className="justify-content-end">
                  <Col md={4} className="text-right">
                    <div className={`${styles.paginationArrows} d-inline-flex`}>
                      <div>
                        <p className="mb-0">
                          Profile: {patient?.profileCompletePercentage}%
                        </p>
                        <ProgressBar
                          now={patient?.profileCompletePercentage}
                          className={`${styles.progressBar} mb-0 mt-0`}
                        />
                      </div>
                      <span
                        className={`${styles.arrowIcons} mr-3`}
                        onClick={() => handleStepChange('back')}
                        title="Previous"
                      >
                        <Image
                          src={
                            step === 1
                              ? '/assets/images/left-arrow.svg'
                              : '/assets/images/left-arrow-active.svg'
                          }
                          alt="arrow-icons"
                        />
                      </span>
                      <span
                        className={`${styles.arrowIcons}`}
                        onClick={() => handleStepChange('next')}
                        title="Next"
                      >
                        <Image
                          src={
                            step === 3
                              ? '/assets/images/right-arrow.svg'
                              : '/assets/images/right-arrow-active.svg'
                          }
                          alt="arrow-icons"
                        />
                      </span>
                    </div>
                  </Col>
                </Row>
                {step === 1 && (
                  <Row className="mt-2">
                    {/* page one content */}
                    <Col md={6} className={styles.spacing}>
                      {/* Allergies */}
                      <Allergies
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                    <Col md={6} className={styles.spacing}>
                      {/* Chronic conditions */}
                      <ChronicCondition
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                    <Col md={6} className={styles.spacing}>
                      {/* Medication Taken Regularly */}
                      <Medications
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>

                    <Col md={6} className={styles.spacing}>
                      {/* Family History */}
                      <FamilyHistory
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                  </Row>
                )}
                {step === 2 && (
                  <Row className="mt-2">
                    <Col md={6} className={styles.spacing}>
                      <Surgeries
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                    <Col md={6} className={styles.spacing}>
                      <SocialHistory
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                    <Col md={6} className={styles.spacing}>
                      <ChildhoodIllness
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                    <Col md={6} className={styles.spacing}>
                      <Vaccinations
                        patient={patient}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </Col>
                  </Row>
                )}
                {step === 3 && <Row className="mt-2"></Row>}
              </div>
            </Tab>

            <Tab eventKey="consultations" title="Consultations">
              <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                <div className="d-flex justify-content-end p-2">
                  <Link
                    to={`/appointments?patientId=${patientId}&&patientName=${patient?.name}`}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    Book Appointment
                  </Link>
                </div>
                <Tabs
                  defaultActiveKey="upcoming"
                  id="tab"
                  className={`${styles.tabItems} border-0`}
                >
                  <Tab
                    eventKey="upcoming"
                    title="Upcoming Consultations"
                    className={styles.active}
                  >
                    <div className={`${styles.tabItemContent}`}>
                      <UpcomingConsultations patientId={patient?.id} />
                    </div>
                  </Tab>

                  <Tab eventKey="past" title="Past Consultations">
                    <div className={`${styles.tabItemContent}`}>
                      <PastConsultations patientId={patient?.id} />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="children" title="Children">
              <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}></div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default PatientDetail;
