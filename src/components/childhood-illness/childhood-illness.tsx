import React, { useState } from 'react';
import { Row, Col, Image, Modal, Form, Table } from 'react-bootstrap';
import styles from './childhood-illness.module.scss';
import { LoaderButton } from '@components';
import childhoodIllnessList from '../../data/illness.json';
import {
  ChildhoodIllnessInterface,
  childhoodIllnessInitialValues,
  childhoodIllnessValidationSchema,
} from '../../containers/patients/upsert-patient/schema';
import { useFormik } from 'formik';
import _ from 'lodash';

/* eslint-disable-next-line */
export interface ChildhoodIllnessProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export function ChildhoodIllness({
  patient,
  formik,
  done,
  isLoading,
  error,
}: ChildhoodIllnessProps) {
  const [showModal, setShowModal] = useState(false);
  const handleAddChildhoodIllness = () => {
    setShowModal(true);
    // set value on modal show
    formik.setValues({
      ...patient,
      allergies: patient.allergies,
    });
  };

  const [editMode, setEditMode] = useState(false);

  const [illnessIndex, setChildhoodIllnesIndex] = useState();

  const handleChildhoodIllnessSubmit = (values: ChildhoodIllnessInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        childIllness: [...patient.childIllness, values.illness],
      });
    } else {
      setEditMode(false);
      setChildhoodIllnesIndex(null);
      formik.setValues({
        ...patient,
        childIllness: [
          ...patient.childIllness.filter(
            (illness, index) => index !== illnessIndex
          ),
          values.illness,
        ],
      });
    }
    childhoodIllnessFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditChildhoodIllness = (illness, index) => {
    setEditMode(true);
    setShowModal(true);
    setChildhoodIllnesIndex(index);
    const illnessObj = illness;
    childhoodIllnessFormik.setFieldValue('illness', illnessObj);
  };

  const handleDeleteChildhoodIllness = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      childIllness: [
        ...patient.childIllness.filter(
          (allergy: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    childhoodIllnessFormik.resetForm();
    formik.handleSubmit();
  };

  const childhoodIllnessFormik = useFormik({
    enableReinitialize: true,
    initialValues: childhoodIllnessInitialValues,
    validationSchema: childhoodIllnessValidationSchema,
    onSubmit: handleChildhoodIllnessSubmit,
  });
  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Childhood Illness</h3>
      </Row>

      {/* allergy cards */}
      <Row>
        {/* add item */}
        <div className={styles.spacing} onClick={() => setShowModal(true)}>
          <div className={`${styles.addItem}`}>
            <div className={styles.additemInner}>
              <Image
                src="/assets/images/plus.svg"
                alt="add-icon"
                className={`${styles.addIcon}`}
              />
              <p className={styles.addChildhoodIllness}>
                Add Childhood Illness
              </p>
            </div>
          </div>
        </div>
        {/* Render surgeries  */}
        {patient && patient?.childIllness?.length > 0
          ? patient?.childIllness?.map((illness: any, index: number) => (
              <div className={styles.spacing}>
                <div className={`${styles.item}`}>
                  <div className={styles.itemInner}>
                    <span className={styles.emojiContainer}>
                      {/* <Image src="/assets/images/icons/sad.png" alt="add-icon" className={`${styles.addIcon}`} /> */}
                      <span
                        className={styles.emoji}
                        role="img"
                        aria-label="snezzing"
                      >
                        🤒
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteChildhoodIllness(index)}
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
                      title={'Mumps'}
                    >
                      <p className={styles.generalCheckup}>{illness}</p>
                    </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Row>
      {/* Surgeries  modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header className={styles.bsHeader} >
          <Modal.Title className={styles.bsTitle}>
            Childhood Illness
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bsBody}>
          <Form
            className="form-wrap"
            noValidate
            onSubmit={childhoodIllnessFormik.handleSubmit}
          >
            <div className={styles.form}>
              <Col md={9}>
                <Form.Control
                  as="select"
                  name="illness"
                  {...childhoodIllnessFormik.getFieldProps(`illness`)}
                >
                  <option value="">Illness</option>
                  {childhoodIllnessList.map((illness, index) => (
                    <option key={index} value={illness}>
                      {illness}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    childhoodIllnessFormik.errors['illness'] &&
                    childhoodIllnessFormik.touched['illness']
                      ? 'd-block'
                      : ''
                  }
                >
                  {childhoodIllnessFormik.errors['illness']}
                </Form.Control.Feedback>
              </Col>

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
              {patient && patient?.childIllness?.length > 0 && (
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient?.childIllness?.length > 0
                  ? patient?.childIllness?.map((illness, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {illness}
                        </td>
                        <td className="text-right">
                          <span className={`${styles.cancelIcon} ml-2`}>
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/trash.svg"
                              alt="Field Icon"
                              onClick={() =>
                                handleDeleteChildhoodIllness(index)
                              }
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon} ml-4`}
                            onClick={() =>
                              handleEditChildhoodIllness(illness, index)
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
}

export default ChildhoodIllness;
