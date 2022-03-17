import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Modal, Form, Button, Table } from 'react-bootstrap';
import styles from './chronic-conditions.module.scss';
import {
  ChronicConditionInterface,
  chronicConditionInitialValues,
  chronicConditionValidationSchema,
} from '../../containers/patients/upsert-patient/schema';
import { useFormik } from 'formik';
import chronicConditionsList from '../../data/chronic-conditions.json';
import { Input, LoaderButton } from '@components';
import _ from 'lodash';
import moment from 'moment';
export interface ChronicConditionProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export const ChronicCondition = ({
  patient,
  formik,
  done,
  isLoading,
  error,
}: ChronicConditionProps) => {
  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [chronicConditionIndex, setChronicConditionIndex] = useState();

  const [chronicConditions, setChronicConditions] = useState([]);

  const handleChronicConditionSubmit = (values: ChronicConditionInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        chronicConditions: [...patient.chronicConditions, values],
      });
    } else {
      setEditMode(false);
      setChronicConditionIndex(null);
      formik.setValues({
        ...patient,
        chronicConditions: [
          ...patient.chronicConditions.filter(
            (chronicCondition, index) => index !== chronicConditionIndex
          ),
          values,
        ],
      });
    }
    chronicConditionFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditChronicCondition = (chronicCondition, index) => {
    setEditMode(true);
    setShowModal(true);
    setChronicConditionIndex(index);
    const chronicConditionObj = _.cloneDeep(chronicCondition);
    chronicConditionFormik.setValues(chronicConditionObj);
  };

  const handleDeleteChronicCondition = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      chronicConditions: [
        ...patient.chronicConditions.filter(
          (chronicCondition: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    chronicConditionFormik.resetForm();
    formik.handleSubmit();
  };

  const chronicConditionFormik = useFormik({
    enableReinitialize: true,
    initialValues: chronicConditionInitialValues,
    validationSchema: chronicConditionValidationSchema,
    onSubmit: handleChronicConditionSubmit,
  });

  const handleAddChronicCondition = () => {
    setShowModal(true);
  };

  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Chronic Condition</h3>
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
                onClick={handleAddChronicCondition}
              />{' '}
              <p className={styles.addAllergy}>Add condition</p>
            </div>
          </div>
        </div>
        {/* Render chronic conditions */}
        {patient && patient.chronicConditions.length > 0
          ? patient.chronicConditions.map((condition: any, index: number) => (
              <div key={index} className={styles.spacing}>
                <div className={`${styles.item}`}>
                  <div className={styles.itemInner}>
                    <span className={styles.emojiContainer}>
                      <span
                        className={styles.emoji}
                        role="img"
                        aria-label="snezzing"
                      >
                        🤕
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteChronicCondition(index)}
                        />
                      </span>
                    </div>
                    <span
                      className="d-inline-block"
                      data-bs-placement="top"
                      data-toggle="tooltip"
                      title={condition.name}
                    >
                      <p className={styles.generalCheckup}>{condition.name}</p>
                    </span>
                    <p className={styles.GeneralCheckupDescription}>
                      Diagnosed {moment(condition.duration).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Row>

      {/* allergies modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header className={styles.bsHeader}>
          <Modal.Title className={styles.bsTitle}>
            Chronic Conditions
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.bsBody}>
          <Form
            className="form-wrap"
            noValidate
            onSubmit={chronicConditionFormik.handleSubmit}
          >
            <div className={styles.form}>
              <div className={styles.inputWidth}>
                <Form.Control
                  as="select"
                  name="name"
                  {...chronicConditionFormik.getFieldProps(`name`)}
                >
                  <option value="">Select Condition</option>
                  {chronicConditionsList.map((condition, index) => (
                    <option key={index} value={condition}>
                      {condition}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    chronicConditionFormik.errors['name'] &&
                    chronicConditionFormik.touched['name']
                      ? 'd-block'
                      : ''
                  }
                >
                  {chronicConditionFormik.errors['name']}
                </Form.Control.Feedback>
              </div>
              <div
                className={styles.inputWidth}
                style={{ marginRight: '43px' }}
              >
                <Input
                  label="When did it start?"
                  // placeholder="When did it start?"
                  type="date"
                  name={`duration`}
                  formik={chronicConditionFormik}
                  {...chronicConditionFormik.getFieldProps(`duration`)}
                  style={{ width: 290 }}
                />
              </div>

              <div className={styles.buttons}>
                <LoaderButton
                  classes="btn btn-primary "
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
              {patient && patient.chronicConditions.length > 0 && (
                <thead>
                  <tr>
                    <th>Condition</th>
                    <th>Start Date</th>
                    <th></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient.chronicConditions.length > 0
                  ? patient.chronicConditions.map((condition, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {condition.name}
                        </td>
                        <td>{condition.duration}</td>
                        <td className="text-right">
                          <span className={`${styles.cancelIcon} ml-2`}>
                            <img
                              src="/assets/images/trash.svg"
                              style={{ width: '16px' }}
                              alt="Field Icon"
                              onClick={() =>
                                handleDeleteChronicCondition(index)
                              }
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon}`}
                            style={{ marginLeft: 20 }}
                            onClick={() =>
                              handleEditChronicCondition(condition, index)
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
          {/* Table of chronic coniditions */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChronicCondition;
