import React, { useState } from 'react';
import { Row, Col, Image, Modal, Form, Table } from 'react-bootstrap';
import styles from './surgeries.module.scss';
import { Input, LoaderButton } from '@components';
import {
  surgeryInitialValues,
  SurgeryInterface,
  surgeryValidationSchema,
} from './schema';
import { useFormik } from 'formik';
import _ from 'lodash';
import surgeriesList from '../../data/surgeries.json';
import moment from 'moment';
/* eslint-disable-next-line */
export interface SurgeriesProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export function Surgeries({
  patient,
  formik,
  done,
  isLoading,
  error,
}: SurgeriesProps) {
  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [surgeryIndex, setSurgeryIndex] = useState();

  const [surgeries, setSurgeries] = useState([]);

  const handleSurgerySubmit = (values: SurgeryInterface) => {
    if (!editMode) {
      formik.setValues({
        ...patient,
        surgeries: [...patient.surgeries, values],
      });
    } else {
      setEditMode(false);
      setSurgeryIndex(null);
      formik.setValues({
        ...patient,
        surgeries: [
          ...patient.surgeries?.filter(
            (surgery, index) => index !== surgeryIndex
          ),
          values,
        ],
      });
    }
    surgeryFormik.resetForm();
    formik.handleSubmit();
  };

  const handleEditSurgery = (surgery, index) => {
    setEditMode(true);
    setShowModal(true);
    setSurgeryIndex(index);
    const surgeryObj = _.cloneDeep(surgery);
    surgeryFormik.setValues(surgeryObj);
  };

  const handleDeleteSurgery = (deleteIndex: number) => {
    formik.setValues({
      ...patient,
      surgeries: [
        ...patient.surgeries.filter(
          (surgery: any, index: number) => index !== deleteIndex
        ),
      ],
    });
    surgeryFormik.resetForm();
    formik.handleSubmit();
  };

  const surgeryFormik = useFormik({
    enableReinitialize: true,
    initialValues: surgeryInitialValues,
    validationSchema: surgeryValidationSchema,
    onSubmit: handleSurgerySubmit,
  });

  return (
    <div className={`${styles.container} content-body`}>
      <Row className="justify-content-center">
        <h3>Surgeries</h3>
      </Row>
      <Row>
        <div className={styles.spacing}>
          <div
            className={`${styles.addItem}`}
            onClick={() => setShowModal(true)}
          >
            <div className={styles.additemInner}>
              <Image
                src="/assets/images/plus.svg"
                alt="add-icon"
                className={`${styles.addIcon}`}
              />
              <p className={styles.addAllergy}>Add Surgeries</p>
            </div>
          </div>
        </div>
        {patient && patient?.surgeries?.length > 0
          ? patient?.surgeries?.map((surgery: any, index: number) => (
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
                        😷
                      </span>
                    </span>
                    <div className={styles.icon}>
                      <span className={`ml-2`}>
                        <img
                          className={styles.editIcon}
                          src="/assets/images/trash.svg"
                          alt="Field Icon"
                          onClick={() => handleDeleteSurgery(index)}
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
                      title={surgery.name}
                    >
                      <p className={styles.generalCheckup}>{surgery.name}</p>
                    </span>
                    <p className={styles.GeneralCheckupDescription}>
                      {moment(surgery.operateDate).format('MMMM YYYY')}
                    </p>
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
        <Modal.Header className={styles.bsHeader}>
          <Modal.Title className={styles.bsTitle}>Surgeries</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bsBody}>
          <Form
            className="form-wrap"
            noValidate
            onSubmit={surgeryFormik.handleSubmit}
          >
            <div className={styles.form}>
              <div className={styles.inputWidth}>
                <Form.Control
                  as="select"
                  name="name"
                  {...surgeryFormik.getFieldProps(`name`)}
                >
                  <option value="">Surgery</option>
                  {surgeriesList.map((surgery, index) => (
                    <option key={index} value={surgery}>
                      {surgery}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback
                  type="invalid"
                  className={
                    surgeryFormik.errors['name'] &&
                    surgeryFormik.touched['name']
                      ? 'd-block'
                      : ''
                  }
                >
                  {surgeryFormik.errors['name']}
                </Form.Control.Feedback>
              </div>
              <div className={styles.inputWidth}>
                <Input
                  label="Surgery Date"
                  type="date"
                  name={`operateDate`}
                  max={new Date().toISOString().split("T")[0]}
                  formik={surgeryFormik}
                  {...surgeryFormik.getFieldProps(`operateDate`)}
                />
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
              {patient && patient?.surgeries?.length > 0 && (
                <thead>
                  <tr>
                    <th>Surgery</th>
                    <th>Operate Date</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {patient && patient?.surgeries?.length > 0
                  ? patient?.surgeries?.map((surgery, index) => (
                      <tr key={index}>
                        <td>
                          <span className="mr-1">{index + 1}. </span>
                          {surgery.name}
                        </td>
                        <td>{surgery.operateDate}</td>

                        <td className="text-right">
                          <span className={`${styles.cancelIcon} ml-2`}>
                            <img
                              style={{ width: '16px' }}
                              src="/assets/images/trash.svg"
                              alt="Field Icon"
                              onClick={() => handleDeleteSurgery(index)}
                            />
                          </span>
                          <span
                            className={`${styles.cancelIcon} ml-2`}
                            onClick={() => handleEditSurgery(surgery, index)}
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

export default Surgeries;
