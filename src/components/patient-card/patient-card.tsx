import React from 'react';
import {
  Col,
  Dropdown,
  DropdownButton,
  Image,
  Media,
  ProgressBar,
} from 'react-bootstrap';
import styles from './patient-card.module.scss';

/* eslint-disable-next-line */
export interface PatientCardProps {
  patient: any;
  editPatientHandler: (string) => void;
  patientDetailHandler: (string) => void;
}

export function PatientCard({
  patient,
  editPatientHandler,
  patientDetailHandler,
}: PatientCardProps) {
  return (
    patient && (
      <Col
        md={6}
        lg={4}
        xl={3}
        className={`${styles.patientCard} mb-xl-4 mb-3 pl-3`}
      >
        <div className={`${styles.patientsListItem}`}>
          <DropdownButton
            className={`${styles.actionBtn} three-dots`}
            drop="left"
            variant="link"
            title="s"
          >
            <Dropdown.Item eventKey="1">
              <Image
                src="/assets/images/prescription.svg"
                alt="action-icon"
                className="mr-2"
              />
              <span>Issue Prescription</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <Image
                src="/assets/images/sick-notes.svg"
                alt="action-icon"
                className="mr-2"
              />
              <span>Issue Sick Note</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <Image
                src="/assets/images/invoice.svg"
                alt="action-icon"
                className="mr-2"
              />
              <span>Issue Invoice</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="4">
              <Image
                src="/assets/images/refer-doctor.svg"
                alt="action-icon"
                className="mr-2"
              />
              <span>Refer Doctor</span>
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="4"
              onClick={() => editPatientHandler(patient.id)}
            >
              <Image
                src="/assets/images/refer-doctor.svg"
                alt="action-icon"
                className="mr-2"
              />
              <span>Edit</span>
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="4"
              onClick={() => patientDetailHandler(patient.id)}
            >
              <Image
                src="/assets/images/refer-doctor.svg"
                alt="action-icon"
                className="mr-2"
              />
              <span>Details</span>
            </Dropdown.Item>
          </DropdownButton>
          <div className={`${styles.patientAvatar} mx-auto text-center`}>
            <Image
              src={
                patient.profilePicture?.originalUrl ||
                '/assets/images/default-avatar.png'
              }
              alt="Plus Icon"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          <div className={`${styles.patientInfo}`}>
            <h4 className="text-center my-3">{patient.name}</h4>
            <Media
              style={{ marginLeft: 20 }}
              className="align-items-center my-xl-4 my-3"
            >
              <Image
                src="/assets/images/blood-group.svg"
                alt="blood-group"
                className="mr-2"
              />
              <Media.Body>
                <p className="mb-0 border-left pl-2">
                  {patient.bloodGroup || 'N/A'}
                </p>
              </Media.Body>
            </Media>

            <Media
              style={{ marginLeft: 20 }}
              className="align-items-center my-2"
            >
              <Image
                src="/assets/images/phone-icon.svg"
                alt="Phone"
                className="mr-2"
              />
              <Media.Body>
                <p className="mb-0 border-left pl-2">{patient.phoneNumber}</p>
              </Media.Body>
            </Media>
          </div>
          <div className={`${styles.profileStatus} pt-1`}>
            <h6>Active</h6>
            <ProgressBar
              now={patient.profileCompletePercentage}
              className={`${
                (patient.profileCompletePercentage < 30 &&
                  styles.progressBarRed) ||
                (patient.profileCompletePercentage > 30 &&
                  patient.profileCompletePercentage < 90 &&
                  styles.progressBarOrange) ||
                (patient.profileCompletePercentage > 90 &&
                  styles.progressBarGreen)
              }`}
            />
            <p
              className={`${
                (patient.profileCompletePercentage < 30 && styles.textRed) ||
                (patient.profileCompletePercentage > 30 &&
                  patient.profileCompletePercentage < 90 &&
                  styles.textOrange) ||
                (patient.profileCompletePercentage > 90 && styles.textGreen)
              }`}
            >
              Profile Completion: {patient.profileCompletePercentage}%
            </p>
          </div>
        </div>
      </Col>
    )
  );
}
