import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import styles from './patient-profile-card.module.scss';
import DoctorProfileAvatar from '../doctor-profile-avatar/doctor-profile-avatar';

/* eslint-disable-next-line */
export interface PatientProfileCardProps {
  patient: any;
  editPatientHandler: (string) => void;
  formik: any;
  done: any;
  isLoading: any;
}

export function PatientProfileCard({
  patient,
  editPatientHandler,
  formik,
  done,
  isLoading,
}: PatientProfileCardProps) {
  return (
    patient && (
      <div className={styles.patientProfileCard}>
        <Row className="justify-content-between align-items-center">
          <Col
            sm="auto"
            className={`ml-auto text-right ${styles.patientProfileImage}`}
          >
            <div className={styles.editIcon}>
              <Image
                src="/assets/images/edit-icon.svg"
                alt="edit-icon"
                onClick={() => editPatientHandler(patient.id)}
              />
            </div>
          </Col>
        </Row>
        <Row className={`${styles.patientProfileInfo} text-center`}>
          <Col>
            <DoctorProfileAvatar
              doctor={patient}
              formik={formik}
              done={done}
              isLoading={isLoading}
              isCallerPatientDetail
            />
            <div className={`${styles.patientTitle}`}>
              <h4>{`${patient.firstName} ${patient.lastName}`}</h4>
            </div>
            <div className={`${styles.patientDetails}`}>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0">
                  <h6 className="text-uppercase">GENDER</h6>
                  <p className="mb-0">
                    {(patient.gender && patient.gender.toUpperCase()) || 'N/A'}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <h6 className="text-uppercase">CONTACT INFO</h6>
                  <p className="mb-0">{patient.email || 'N/A'}</p>
                  <p className="mb-0">{patient.phoneNumber || 'N/A'}</p>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <h6 className="text-uppercase">ID NUMBER</h6>
                  <p className="mb-0">990124 5835 087</p>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <h6 className="text-uppercase">CHILDREN</h6>
                  <p className="mb-0">{patient.haveChildren || 'N/A'}</p>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <h6 className="text-uppercase">MEDICAL AID</h6>
                  {patient &&
                    patient.insurances &&
                    patient.insurances.map((insurance, index) => (
                      <React.Fragment key={index}>
                        <p className="mb-0">{insurance.name}</p>
                        <p className="mb-0">{insurance.mainMemberNumber}</p>
                      </React.Fragment>
                    ))}
                  {patient && !patient.insurances ? <p>N/A</p> : null}
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <h6 className="text-uppercase">EMERGENCY CONTACT</h6>
                  <p className="mb-0">
                    {(patient.emergencyContact &&
                      patient.emergencyContact.name) ||
                      'N/A'}
                  </p>
                  <p className="mb-0">
                    {(patient.emergencyContact &&
                      patient.emergencyContact.number) ||
                      'N/A'}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default PatientProfileCard;
