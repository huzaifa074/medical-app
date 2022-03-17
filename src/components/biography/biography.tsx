import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Image,
  Media,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { Input, LoaderButton } from '@components';
import { onError } from '@utils';
import useDoctorProfile from '../../hooks/useDoctorProfile';
import EditButton from '../edit-button/edit-button';

import styles from './biography.module.scss';
/* eslint-disable-next-line */
export interface BiographyProps {
  doctor: any;
  formik: any;
  isLoading: boolean;
  done: boolean;
  error: any;
}

export function Biography({
  doctor,
  formik,
  isLoading,
  done,
  error,
}: BiographyProps) {
  const [showModal, setShowModal] = useState(false);

  // show modal
  function handleEditDescription() {
    setShowModal(true);
    formik.setValues({ ...doctor, biography: doctor.biography });
  }

  useEffect(() => {
    if (done) {
      setShowModal(false);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  return (
    <div className={`${styles.biography}`}>
      <Row className="justify-content-between">
        <Col lg={11}>
          <Media className={`${styles.biographyContent}`}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id="tooltip-top">About</Tooltip>}
            >
              <Image
                src="/assets/images/about-icon.svg"
                alt="edit-icon"
                className="align-self-center mr-3"
              />
            </OverlayTrigger>
            <Media.Body className={`${styles.biographyContentBody} pl-3`}>
              {doctor && <p>{doctor.biography || 'Please add details about you.'} </p>}
            </Media.Body>
          </Media>
        </Col>
        <Col lg={1} className="text-right">
          {/* <EditButton
          onClick={handleEditDescription}
          /> */}
          <div
            className={`${styles.editIcon} mx-auto`}
            onClick={handleEditDescription}
          >
            <Image src="/assets/images/edit-icon.svg" alt="edit-icon" />
          </div>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-wrap" noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Input
                groupAs={Col}
                md="12"
                label="Biography"
                placeholder="Biography"
                type="string"
                name="biography"
                formik={formik}
                as="textarea"
                rows="5"
                {...formik.getFieldProps('biography')}
              />
            </Row>
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

export default Biography;
