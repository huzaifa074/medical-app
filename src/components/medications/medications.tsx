import { LoaderButton, Input } from '@components';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { Row, Col, Image, Form, Modal, Table } from 'react-bootstrap';
import {
  MedicationHistoryInterface,
  medicationHistoryInitialValues,
  medicationHistoryValidationSchema,
} from '../../containers/patients/upsert-patient/schema';
import styles from './medications.module.scss';
import medicationTypeList from '../../data/medicine-type-list.json';
import medicationFrequencyList from '../../data/medication-frequency.json';
import medicationTimeList from '../../data/medication-time.json';
export interface MedicationsProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export const Medications = ({
  patient,
  formik,
  done,
  isLoading,
  error,
}: MedicationsProps) => {
  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [medicationIndex, setMedicationIndex] = useState();

  const handleMedicationSubmit = (values: MedicationHistoryInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        medications: [...patient.medications, values],
      });
    } else {
      setEditMode(false);
      setMedicationIndex(null);
      formik.setValues({
        ...patient,
        medications: [
          ...patient.medications.filter(
            (medication, index) => index !== medicationIndex
          ),
          values,
        ],
      });
    }
    medicationFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditMedication = (medication, index) => {
    setEditMode(true);
    setShowModal(true);
    setMedicationIndex(index);
    const medicationObj = _.cloneDeep(medication);
    medicationFormik.setValues(medicationObj);
  };

  const handleDeleteMedication = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      medications: [
        ...patient.medications.filter(
          (medication: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    medicationFormik.resetForm();
    formik.handleSubmit();
  };

  const medicationFormik = useFormik({
    enableReinitialize: true,
    initialValues: medicationHistoryInitialValues,
    validationSchema: medicationHistoryValidationSchema,
    onSubmit: handleMedicationSubmit,
  });

  const handleAddMedication = () => {
    setShowModal(true);
  };
  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Medications Taken Regularly</h3>
      </Row>

      {/* allergy cards */}
      <Row>
        {/* add item */}

        <div className={styles.spacing}>
          <div className={`${styles.addItem}`}>
            <div className={styles.additemInner}>
              <Image
                src="/assets/images/plus.svg"
                alt="add-icon"
                className={`${styles.addIcon}`}
                onClick={handleAddMedication}
              />
              <p className={styles.addAllergy}>Add Medications</p>
            </div>
          </div>
        </div>
        {/* Render medications */}
        {patient && patient.medications.length > 0
          ? patient.medications.map((medication, index) => (
              <div key={index} className={styles.spacing}>
                <div className={`${styles.item}`}>
                  <div className={styles.itemInner}>
                    <span className={styles.emojiContainer}>
                      {/* <Image src="/assets/images/icons/sad.png" alt="add-icon" className={`${styles.addIcon}`} /> */}
                      <span
                        className={styles.emoji}
                        role="img"
                        aria-label="snezzing"
                      >
                        💊
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteMedication(index)}
                        />
                      </span>
                      {/* <span className={`${styles.editIcon} ml-2`} >
                                                <img className={styles.editIcon} src="/assets/images/edit-icon.svg" alt="Field Icon" />
                                            </span> */}
                    </div>

                    <span
                      className="d-inline-block"
                      data-bs-placement="top"
                      data-toggle="tooltip"
                      title={medication.medication}
                    >
                      <p className={styles.generalCheckup}>
                        {medication.medication}
                      </p>
                    </span>
                    <p className={styles.GeneralCheckupDescription}>
                      {medication.dosage} {medication.type}
                    </p>
                    <p className={styles.GeneralCheckupDescription}>
                      {medication.frequency}
                    </p>
                    <p className={styles.GeneralCheckupDescription}>
                      {medication.type}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Row>
      {/* medication history modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header className={styles.bsHeader}>
          <Modal.Title className={styles.bsTitle}>
            Medication Taken Regularly
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bsBody}>
          <Form
            className={['form-wrap', styles.form].join(' ')}
            noValidate
            onSubmit={medicationFormik.handleSubmit}
          >
            <div className={styles.inputWidth} style={{ marginRight: 12 }}>
              <Input
                type="text"
                name="medication"
                {...medicationFormik.getFieldProps(`medication`)}
                placeholder="Enter Medication"
                label="Medication Name"
                formik={medicationFormik}
                style={{ minWidth: 200 }}
              />
            </div>
            <div className={styles.inputWidth} style={{ marginRight: 24 }}>
              <Form.Control
                as="select"
                name="type"
                {...medicationFormik.getFieldProps(`type`)}
                style={{ paddingRight: '50px', minWidth: 200, marginRight: 24 }}
              >
                <option value="">Medication Type</option>
                {medicationTypeList.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback
                type="invalid"
                className={
                  medicationFormik.errors['type'] &&
                  medicationFormik.touched['type']
                    ? 'd-block'
                    : ''
                }
              >
                {medicationFormik.errors['type']}
              </Form.Control.Feedback>
            </div>
            <div
              className={styles.inputWidth}
              style={{ paddingLeft: '10px', marginRight: 24 }}
            >
              <Input
                type="number"
                name="dosage"
                {...medicationFormik.getFieldProps(`dosage`)}
                placeholder="Enter Dosage"
                label="Dosage"
                formik={medicationFormik}
                style={{ minWidth: 200 }}
              />
            </div>
            <div className={styles.inputWidth} style={{ marginRight: 24 }}>
              <Form.Control
                as="select"
                name="frequency"
                {...medicationFormik.getFieldProps(`frequency`)}
                style={{ minWidth: 200 }}
              >
                <option value="">Select frequency</option>
                {medicationFrequencyList.map((frequency, index) => (
                  <option key={index} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback
                type="invalid"
                className={
                  medicationFormik.errors['frequency'] &&
                  medicationFormik.touched['frequency']
                    ? 'd-block'
                    : ''
                }
              >
                {medicationFormik.errors['frequency']}
              </Form.Control.Feedback>
            </div>
            <div className={styles.inputWidth} style={{ marginRight: 24 }}>
              <Form.Control
                as="select"
                name="medicationTime"
                {...medicationFormik.getFieldProps(`medicationTime`)}
              >
                <option value="">Select Medication Time</option>
                {medicationTimeList.map((medicationTime, index) => (
                  <option key={index} value={medicationTime}>
                    {medicationTime}
                  </option>
                ))}
              </Form.Control>

              <Form.Control.Feedback
                type="invalid"
                className={
                  medicationFormik.errors['medicationTime'] &&
                  medicationFormik.touched['medicationTime']
                    ? 'd-block'
                    : ''
                }
              >
                {medicationFormik.errors['medicationTime']}
              </Form.Control.Feedback>
            </div>

            <div style={{ paddingTop: '5px' }} className={styles.buttons}>
              <LoaderButton
                classes="btn btn-primary"
                type="submit"
                isLoading={isLoading}
                text={editMode ? 'Save' : 'Add'}
              />
            </div>
          </Form>

          <div className={styles.table}>
            <Table
              responsive
              className={`${styles.qualificationsListItems} mb-0`}
            >
              {patient && patient.medications.length > 0 && (
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Type</th>
                    <th>Dosage</th>
                    <th style={{ paddingRight: 0 }}>Frequency</th>
                    <th>Medication Time</th>
                    <th style={{ paddingLeft: 0 }}></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient.medications.length > 0
                  ? patient.medications.map((medication, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {medication.medication}
                        </td>
                        <td>{medication.type}</td>
                        <td>{medication.dosage}</td>
                        <td style={{ paddingRight: 0 }}>
                          {medication.frequency}
                        </td>
                        <td>{medication?.medicationTime}</td>
                        <td style={{ paddingLeft: 0 }} className="text-left">
                          <span className={`${styles.cancelIcon} ml-2`}>
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/trash.svg"
                              alt="Field Icon"
                              onClick={() => handleDeleteMedication(index)}
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon} ml-4`}
                            onClick={() =>
                              handleEditMedication(medication, index)
                            }
                          >
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/edit-icon.svg"
                              alt="Field Icon"
                            />
                          </span>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Medications;
