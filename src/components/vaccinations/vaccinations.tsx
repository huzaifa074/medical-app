import React, { useState } from 'react';
import { Row, Col, Image, Modal, Form, Table } from 'react-bootstrap';
import styles from './vaccinations.module.scss';
import { Input, LoaderButton } from '@components';
import {
  VaccinationInterface,
  vaccinationInitialValues,
  vaccinationValidationSchema,
} from './schema';
import { useFormik } from 'formik';
import _ from 'lodash';
import vaccinationsList from '../../data/vaccines.json';
import moment from 'moment';
/* eslint-disable-next-line */
export interface VaccinationsProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export function Vaccinations({
  patient,
  formik,
  done,
  isLoading,
  error,
}: VaccinationsProps) {
  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [vaccinationIndex, setVaccinationIndex] = useState();

  const [vaccinations, setVaccinations] = useState([]);

  const handleVaccinationSubmit = (values: VaccinationInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        vaccinations: [...patient.vaccinations, values],
      });
    } else {
      setEditMode(false);
      setVaccinationIndex(null);
      formik.setValues({
        ...patient,
        vaccinations: [
          ...patient.vaccinations?.filter(
            (vaccination, index) => index !== vaccinationIndex
          ),
          values,
        ],
      });
    }
    vaccinationFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditVaccination = (vaccination, index) => {
    setEditMode(true);
    setShowModal(true);
    setVaccinationIndex(index);
    const vaccinationObj = _.cloneDeep(vaccination);
    vaccinationFormik.setValues(vaccinationObj);
  };

  const handleDeleteVaccination = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      vaccinations: [
        ...patient.vaccinations.filter(
          (vaccination: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    vaccinationFormik.resetForm();
    formik.handleSubmit();
  };

  const vaccinationFormik = useFormik({
    enableReinitialize: true,
    initialValues: vaccinationInitialValues,
    validationSchema: vaccinationValidationSchema,
    onSubmit: handleVaccinationSubmit,
  });

  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Vaccinations</h3>
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
              <p className={styles.addAllergy}>Add Vaccinations</p>
            </div>
          </div>
        </div>
        {patient && patient?.vaccinations.length > 0
          ? patient?.vaccinations.map((vaccine: any, index: number) => (
              <div className={styles.spacing} key={index}>
                <div className={`${styles.item}`}>
                  <div className={styles.itemInner}>
                    <span className={styles.emojiContainer}>
                      <span
                        className={styles.emoji}
                        role="img"
                        aria-label="snezzing"
                      >
                        💉
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteVaccination(index)}
                        />
                      </span>
                      <span className={`${styles.editIcon} ml-2`}></span>
                    </div>
                    <span
                      className="d-inline-block"
                      data-bs-placement="top"
                      data-toggle="tooltip"
                      title={'Covid-19'}
                    >
                      <p className={styles.generalCheckup}>{vaccine.name}</p>
                    </span>
                    <p className={styles.GeneralCheckupDescription}>
                    {moment(vaccine.vaccinationDate).format('MMMM YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </Row>
      {/* Vaccinations  modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header className={styles.bsHeader}>
          <Modal.Title className={styles.bsTitle}>Vaccinations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="form-wrap"
            noValidate
            onSubmit={vaccinationFormik.handleSubmit}
          >
            <div className={styles.form}>
              <Col md={3}>
                <Form.Control
                  as="select"
                  name="name"
                  {...vaccinationFormik.getFieldProps(`name`)}
                >
                  <option value="">Select Vaccination</option>
                  {vaccinationsList.map((vaccination, index) => (
                    <option key={index} value={vaccination}>
                      {vaccination}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    vaccinationFormik.errors['name'] &&
                    vaccinationFormik.touched['name']
                      ? 'd-block'
                      : ''
                  }
                >
                  {vaccinationFormik.errors['name']}
                </Form.Control.Feedback>
              </Col>
              <Input
                groupAs={Col}
                md="4"
                label="Vaccination Date"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                name={`vaccinationDate`}
                formik={vaccinationFormik}
                {...vaccinationFormik.getFieldProps(`vaccinationDate`)}
              />
              <div>
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
              {patient && patient?.vaccinations.length > 0 && (
                <thead>
                  <tr>
                    <th>Vaccination</th>
                    <th>Date</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient?.vaccinations.length > 0
                  ? patient?.vaccinations.map((vaccine, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {vaccine.name}
                        </td>
                        <td>{vaccine.vaccinationDate}</td>
                        <td className="text-right">
                          <span className={`${styles.cancelIcon} ml-2`}>
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/trash.svg"
                              alt="Field Icon"
                              onClick={() => handleDeleteVaccination(index)}
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon} ml-2`}
                            onClick={() =>
                              handleEditVaccination(vaccine, index)
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

export default Vaccinations;
