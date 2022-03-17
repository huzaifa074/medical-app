import React, { useEffect, useState } from 'react';
import { Col, Form, Image, ListGroup, Modal, Row } from 'react-bootstrap';

import { LoaderButton, ListingButton } from '@components';

import styles from './patient-medical-history.module.scss';

/* eslint-disable-next-line */
export interface PatientMedicalHistoryProps {
  patient: any;
  editPatientHandler: (string) => void;
}

export function PatientMedicalHistory({ patient, editPatientHandler }: PatientMedicalHistoryProps) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chronicItems, setChronicData] = useState({
    itemToShow: 3,
    expanded: false,
    showMoreLessButton: true,
  });
  const [medicationItems, setMedicationData] = useState({
    itemToShow: 3,
    expanded: false,
    showMoreLessButton: true,
  });
  const [allergiesItems, setAllergiesData] = useState({
    itemToShow: 3,
    expanded: false,
    showMoreLessButton: true,
  });
  function handleEditAction() {
    setShowModal(true);
  }

  useEffect(() => {
    if (patient && patient.chronicConditions) {
      if (patient.chronicConditions.length - 1 < chronicItems.itemToShow) {
        setChronicData({
          ...chronicItems,
          showMoreLessButton: false,
        });
      }
    }
    if (patient && patient.medications) {
      if (patient.medications.length - 1 < medicationItems.itemToShow) {
        setMedicationData({
          ...medicationItems,
          showMoreLessButton: false,
        });
      }
    }
    if (patient && patient.allergies) {
      if (patient.allergies.length - 1 < allergiesItems.itemToShow) {
        setAllergiesData({
          ...allergiesItems,
          showMoreLessButton: false,
        });
      }
    }
  }, [patient]);

  const handleShowMoreLessButton = (caller: string) => {
    if (caller === 'chronic') {
      chronicItems.itemToShow === 3
        ? setChronicData({
          ...chronicItems,
          itemToShow: patient.chronicConditions.length,
          expanded: true,
        })
        : setChronicData({
          ...chronicItems,
          itemToShow: 3,
          expanded: false,
        });
    } else if (caller === 'medication') {
      medicationItems.itemToShow === 3
        ? setMedicationData({
          ...medicationItems,
          itemToShow: patient.medications.length,
          expanded: true,
        })
        : setMedicationData({
          ...medicationItems,
          itemToShow: 3,
          expanded: false,
        });
    } else if (caller === 'allegries') {
      allergiesItems.itemToShow === 3
        ? setAllergiesData({
          ...allergiesItems,
          itemToShow: patient.allergies.length,
          expanded: true,
        })
        : setAllergiesData({
          ...allergiesItems,
          itemToShow: 3,
          expanded: false,
        });
    }
  };

  return (
    <div className={styles.patientMedicalHistory}>
      <Row className="justify-content-between align-items-center mb-5">
        <Col>
          <h4 className="mb-0">Medical History</h4>
        </Col>
        <Col sm="auto" className="text-right">
          <div className={styles.editIcon} onClick={() => editPatientHandler(patient.id)}>
            <Image src="/assets/images/edit-icon.svg" alt="edit-icon" />
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <h5 className="text-center mb-4">Chronic Conditions</h5>
          <div className={`${styles.listItems}`}>
            {patient &&
              patient.chronicConditions &&
              patient.chronicConditions
                .slice(0, chronicItems.itemToShow)
                .map((condition, index) => (
                  <span key={index} className={`${styles.listItem} d-inline-block`}>
                    {condition.name}
                  </span>
                ))}
          </div>
          {chronicItems.showMoreLessButton && (
            <div
              className={`${styles.viewMore} text-center mt-2`}
              onClick={() => handleShowMoreLessButton('chronic')}
            >
              {chronicItems.expanded ? <span>Less</span> : <span>More</span>}
            </div>
          )}
        </Col>
        <Col lg={4}>
          <h5 className="mb-4">Medications</h5>
          <div className={`${styles.listItems}`}>
            {patient &&
              patient.medications &&
              patient.medications
                .slice(0, medicationItems.itemToShow)
                .map((medication, index) => (
                  <span key={index} className={`${styles.listItem} d-inline-block`}>
                    {medication}
                  </span>
                ))}
          </div>
          {medicationItems.showMoreLessButton && (
            <div
              className={`${styles.viewMore} text-center mt-2`}
              onClick={() => handleShowMoreLessButton('medication')}
            >
              {medicationItems.expanded ? <span>Less</span> : <span>More</span>}
            </div>
          )}
        </Col>
        <Col lg={4}>
          <h5 className="mb-4">Allergies</h5>
          <div className={`${styles.listItems} border-0`}>
            {patient &&
              patient.allergies &&
              patient.allergies
                .slice(0, allergiesItems.itemToShow)
                .map((allergy, index) => (
                  <span key={index} className={`${styles.listItem} d-inline-block`}>
                    {allergy}
                  </span>
                ))}
          </div>
          {allergiesItems.showMoreLessButton && (
            <div
              className={`${styles.viewMore} text-center mt-2`}
              onClick={() => handleShowMoreLessButton('allegries')}
            >
              {allergiesItems.expanded ? <span>Less</span> : <span>More</span>}
            </div>
          )}
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Medical History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className={styles.medicalHistoryItem}>
              <h5 className="mb-4">Chronic Conditions</h5>
              <Row>
                <Col sm={12}>
                  <Form.Control as="select" size="lg">
                    <option>Add Chronic Conditions</option>
                  </Form.Control>
                </Col>
                <Col sm={12} className="my-4">
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Portrait"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Landscap"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Image"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Table"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Share"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Medicine"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="General"
                    icon="cancel-icon.svg"
                  />
                </Col>
              </Row>
            </div>

            <div className={styles.medicalHistoryItem}>
              <h5 className="mb-4">Medications</h5>
              <Row>
                <Col sm={12}>
                  <Form.Control as="select" size="lg">
                    <option>Add Medications</option>
                  </Form.Control>
                </Col>
                <Col sm={12} className="my-4">
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Portrait"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Landscap"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Image"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Table"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Share"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Medicine"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="General"
                    icon="cancel-icon.svg"
                  />
                </Col>
              </Row>
            </div>
            <div className={styles.medicalHistoryItem}>
              <h5 className="mb-4">Allergies</h5>
              <Row>
                <Col sm={12}>
                  <Form.Control as="select" size="lg">
                    <option>Add Allergies</option>
                  </Form.Control>
                </Col>
                <Col sm={12} className="my-4">
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Portrait"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Landscap"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Image"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Table"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Share"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="Medicine"
                    icon="cancel-icon.svg"
                  />
                  <ListingButton
                    classes="d-inline-block mr-3 mb-3"
                    text="General"
                    icon="cancel-icon.svg"
                  />
                </Col>
              </Row>
            </div>

            <Row className="my-4">
              <Col className="text-right">
                <LoaderButton
                  classes="btn btn-primary btn-lg"
                  text="Save"
                  type="submit"
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PatientMedicalHistory;
