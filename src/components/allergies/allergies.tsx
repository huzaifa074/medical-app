import React, { useState } from 'react';
import { Col, Image, Row, Modal, Form, Table } from 'react-bootstrap';
import styles from './allergies.module.scss';
import allergiesList from '../../data/allergies.json';
import {
  AllergiesInterface,
  allergiesInitialValues,
  allergiesValidationSchema,
} from '../../containers/patients/upsert-patient/schema';
import { useFormik } from 'formik';
import _ from 'lodash';
import { LoaderButton } from '@components';

export interface AllergiesProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export const Allergies = ({
  patient,
  formik,
  done,
  isLoading,
  error,
}: AllergiesProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddAllergy = () => {
    setShowModal(true);
    // set value on modal show
    formik.setValues({
      ...patient,
      allergies: patient.allergies,
    });
  };

  const [editMode, setEditMode] = useState(false);

  const [allergyIndex, setAllergyIndex] = useState();

  const [allergy, setAllergys] = useState([]);

  const handleAllergySubmit = (values: AllergiesInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        allergies: [...patient.allergies, values.allergy],
      });
    } else {
      setEditMode(false);
      setAllergyIndex(null);
      formik.setValues({
        ...patient,
        allergies: [
          ...patient.allergies.filter(
            (allergy, index) => index !== allergyIndex
          ),
          values.allergy,
        ],
      });
    }
    allergyFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditAllergy = (allergy, index) => {
    setEditMode(true);
    setShowModal(true);
    setAllergyIndex(index);
    const allergyObj = allergy;
    allergyFormik.setFieldValue('allergy', allergyObj);
  };

  const handleDeleteAllergy = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      allergies: [
        ...patient.allergies.filter(
          (allergy: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    allergyFormik.resetForm();
    formik.handleSubmit();
  };

  const allergyFormik = useFormik({
    enableReinitialize: true,
    initialValues: allergiesInitialValues,
    validationSchema: allergiesValidationSchema,
    onSubmit: handleAllergySubmit,
  });

  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Allergies</h3>
      </Row>
      {/* allergy cards */}
      <Row
      // style={{display:"flex", flexWrap: "wrap" }}
      >
        {/* add item */}
        {/* <Col md={6}   */}

        <div className={styles.spacing}>
          <div className={`${styles.addItem}`}>
            <div className={styles.additemInner}>
              <Image
                src="/assets/images/plus.svg"
                alt="add-icon"
                className={`${styles.addIcon}`}
                onClick={handleAddAllergy}
              />
              <p className={styles.addAllergy}>Add Allergy</p>
            </div>
          </div>
        </div>
        {/* Render allergies */}
        {patient && patient.allergies.length > 0
          ? patient.allergies.map((allergy, index) => (
              // <Col  md={6}

              <div key={index} className={styles.spacing}>
                <div className={`${styles.item}`}>
                  <div className={styles.itemInner}>
                    <span className={styles.emojiContainer}>
                      {/* <Image src="/assets/images/icons/sad.png" alt="add-icon" className={`${styles.addIcon}`} /> */}
                      <span
                        className={styles.emoji}
                        role="img"
                        aria-label="snezzinf"
                      >
                        🤧
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteAllergy(index)}
                        />
                      </span>
                      {/* <span className={ `${styles.editIcon} ml-2`} >
                                                        <img className={ styles.editIcon}  src="/assets/images/edit-icon.svg" alt="Field Icon" />
                                        </span> */}
                    </div>
                    <span
                      className="d-inline-block"
                      data-bs-placement="top"
                      data-toggle="tooltip"
                      title={allergy}
                    >
                      <p className={styles.generalCheckup}>{allergy}</p>
                    </span>
                  </div>
                </div>
              </div>

              // </Col>
            ))
          : null}
      </Row>

      {/* allergies modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="xl"
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header className={styles.bsHeader}>
          <Modal.Title className={styles.bsTitle}>Allergies</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bsBody}>
          <Form
            className="form-wrap"
            noValidate
            onSubmit={allergyFormik.handleSubmit}
          >
            <div className={styles.form}>
              <div className={styles.mutiSelect}>
                <Form.Control
                  as="select"
                  name="allergy"
                  {...allergyFormik.getFieldProps(`allergy`)}
                >
                  <option value="">Select Allergy</option>
                  {allergiesList.map((condition, index) => (
                    <option key={index} value={condition}>
                      {condition}
                    </option>
                  ))}
                </Form.Control>

                <Form.Control.Feedback
                  type="invalid"
                  className={
                    allergyFormik.errors['allergy'] &&
                    allergyFormik.touched['allergy']
                      ? 'd-block'
                      : ''
                  }
                >
                  {allergyFormik.errors['allergy']}
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
              {patient && patient.allergies.length > 0 && (
                <thead>
                  <tr>
                    <th>Allergy</th>
                    <th></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient.allergies.length > 0
                  ? patient.allergies.map((allergy, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {allergy}
                        </td>
                        <td className="text-right">
                          <span className={`${styles.cancelIcon}`}>
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/trash.svg"
                              alt="Field Icon"
                              onClick={() => handleDeleteAllergy(index)}
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon} ml-4`}
                            onClick={() => handleEditAllergy(allergy, index)}
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

export default Allergies;
