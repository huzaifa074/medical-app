import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { Row, Col, Image, Modal, Form, Table } from 'react-bootstrap';
import {
  FamilyHistoryInterface,
  familyHistoryInitialValues,
  familyHistoryValidationSchema,
} from 'src/containers/patients/upsert-patient/schema';
import styles from './family-history.module.scss';
import illnessList from '../../data/family-illness.json';
import relationList from '../../data/family-relation.json';
import { LoaderButton } from '@components';

export interface FamilyHistoryProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export const FamilyHistory = ({
  patient,
  formik,
  done,
  isLoading,
  error,
}: FamilyHistoryProps) => {
  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [familyHistoryIndex, setFamilyHistoryIndex] = useState();

  const handleFamilyHistorySubmit = (values: FamilyHistoryInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        familyIllnesses: [...patient.familyIllnesses, values],
      });
    } else {
      setEditMode(false);
      setFamilyHistoryIndex(null);
      formik.setValues({
        ...patient,
        familyIllnesses: [
          ...patient.familyIllnesses.filter(
            (familyHistory, index) => index !== familyHistoryIndex
          ),
          values,
        ],
      });
    }
    familyHistoryFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditFamilyHistory = (familyHistory, index) => {
    setEditMode(true);
    setShowModal(true);
    setFamilyHistoryIndex(index);
    const familyHistoryObj = _.cloneDeep(familyHistory);
    familyHistoryFormik.setValues(familyHistoryObj);
  };

  const handleDeleteFamilyHistory = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      familyIllnesses: [
        ...patient.familyIllnesses.filter(
          (familyHistory: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    familyHistoryFormik.resetForm();
    formik.handleSubmit();
  };

  const familyHistoryFormik = useFormik({
    enableReinitialize: true,
    initialValues: familyHistoryInitialValues,
    validationSchema: familyHistoryValidationSchema,
    onSubmit: handleFamilyHistorySubmit,
  });

  const handleAddFamilyHistory = () => {
    setShowModal(true);
  };
  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Family History</h3>
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
                onClick={handleAddFamilyHistory}
              />
              <p className={styles.addAllergy}>Add Family History</p>
            </div>
          </div>
        </div>
        {/* Render chronic conditions */}
        {patient && patient.familyIllnesses.length > 0
          ? patient.familyIllnesses.map((illness: any, index: number) => (
              <div key={index} className={styles.spacing}>
                <div className={`${styles.item}`}>
                  <div className={styles.itemInner}>
                    <span className={styles.emojiContainer}>
                      <span
                        className={styles.emoji}
                        role="img"
                        aria-label="snezzing"
                      >
                        🏡
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteFamilyHistory(index)}
                        />
                      </span>
                      <span className={`${styles.editIcon} ml-2`}>
                        {/* <img className={styles.editIcon} src="/assets/images/edit-icon.svg" alt="Field Icon" /> */}
                      </span>
                    </div>

                    <span
                      className="d-inline-block"
                      data-bs-placement="top"
                      data-toggle="tooltip"
                      title={illness.illness}
                    >
                      <p className={styles.generalCheckup}>{illness.illness}</p>
                    </span>
                    <p className={styles.GeneralCheckupDescription}>
                      {illness.whom}
                    </p>
                    <p className={styles.GeneralCheckupDescription}>
                      {illness.side === 'parental'
                        ? "Fathar's side"
                        : "Mother's side"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Row>

      {/* family history modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header className={styles.bsHeader}>
          <Modal.Title className={styles.bsTitle}>Family Histroy</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bsBody}>
          <Form
            className="form-wrap"
            noValidate
            onSubmit={familyHistoryFormik.handleSubmit}
          >
            <div className={styles.form}>
              <div className={styles.inputWidth}>
                <Form.Control
                  as="select"
                  name="illness"
                  {...familyHistoryFormik.getFieldProps(`illness`)}
                >
                  <option value="">Select Illness</option>
                  {illnessList.map((illness, index) => (
                    <option key={index} value={illness}>
                      {illness}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    familyHistoryFormik.errors['illness'] &&
                    familyHistoryFormik.touched['illness']
                      ? 'd-block'
                      : ''
                  }
                >
                  {familyHistoryFormik.errors['illness']}
                </Form.Control.Feedback>
              </div>
              <div className={styles.inputWidth}>
                <Form.Control
                  as="select"
                  name="side"
                  {...familyHistoryFormik.getFieldProps(`side`)}
                >
                  <option value="">Select Side</option>
                  <option value="paternal">Paternal</option>
                  <option value="maternal">Maternal</option>
                  <option value="both">Both</option>
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    familyHistoryFormik.errors['side'] &&
                    familyHistoryFormik.touched['side']
                      ? 'd-block'
                      : ''
                  }
                >
                  {familyHistoryFormik.errors['side']}
                </Form.Control.Feedback>
              </div>
              <div className={styles.inputWidth}>
                <Form.Control
                  as="select"
                  name="whom"
                  {...familyHistoryFormik.getFieldProps(`whom`)}
                >
                  <option value="">Select Whom</option>
                  {relationList.map((relation, index) => (
                    <option key={index} value={relation}>
                      {relation}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    familyHistoryFormik.errors['whom'] &&
                    familyHistoryFormik.touched['whom']
                      ? 'd-block'
                      : ''
                  }
                >
                  {familyHistoryFormik.errors['whom']}
                </Form.Control.Feedback>
              </div>
              <div className={styles.buttons}>
                <LoaderButton
                  classes="btn btn-primary"
                  type="submit"
                  isLoading={isLoading}
                  text={editMode ? 'Save' : 'Add'}
                />
              </div>
            </div>
          </Form>
          <div className={styles.table}>
            <Table
              responsive
              className={`${styles.qualificationsListItems} mb-0`}
            >
              {patient && patient.familyIllnesses.length > 0 && (
                <thead>
                  <tr>
                    <th>Illness</th>
                    <th>Side</th>
                    <th>Whom</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient.familyIllnesses.length > 0
                  ? patient.familyIllnesses.map((illness, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {illness.illness}
                        </td>
                        <td>{illness.side}</td>
                        <td>{illness.whom}</td>
                        <td className="text-right">
                          <span className={`${styles.cancelIcon} ml-2`}>
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/trash.svg"
                              alt="Field Icon"
                              onClick={() => handleDeleteFamilyHistory(index)}
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon}`}
                            onClick={() =>
                              handleEditFamilyHistory(illness, index)
                            }
                            style={{ marginLeft: 20 }}
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

export default FamilyHistory;
