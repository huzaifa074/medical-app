import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Image,
  ListGroup,
  Media,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import { Input, LoaderButton } from '@components';
import { onError } from '@utils';

import useDoctorProfile from '../../hooks/useDoctorProfile';
import styles from './availability-card.module.scss';

/* eslint-disable-next-line */
export interface AvailabilityCardProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
}

export function AvailabilityCard({
  doctor,
  formik,
  done,
  isLoading,
  error,
}: AvailabilityCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleEditAvailability = () => {
    setShowModal(true);
    // IF THERE IS NO DOCTOR CONSULTATION THEN ADD STATICALLY
    if (!('consultation' in doctor)) {
      doctor.consultation = {
        online: {
          active: false,
          fee: 0,
        },
        inPerson: {
          active: false,
          fee: 0,
        },
        homeVisit: {
          active: false,
          fee: 0,
        },
      };
    }

    // set value on modal show
    formik.setValues({
      ...doctor,
      consultation: doctor.consultation,
    });
  };

  useEffect(() => {
    if (done) {
      setShowModal(false);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  return (
    <div className={styles.availability}>
      <Row
        className={`${styles.cardHearder} justify-content-between align-items-center`}
      >
        <Col className="col-auto">
          <h6 className="m-0 ">Consulation Types</h6>
        </Col>
        <Col className="col-auto">
          <div className={styles.editIcon} onClick={handleEditAvailability}>
            <Image src="/assets/images/edit-icon.svg" alt="edit-icon" />
          </div>
        </Col>
      </Row>
      <Row className={`${styles.listItems} my-4`}>
        <Col>
          {doctor && (
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 px-0">
                <Media className="align-items-center">
                  <Image
                    src="/assets/images/online-consultation.svg"
                    alt="check-icon"
                    className={`${styles.listItemIcon} mr-3`}
                  />
                  <Media.Body>
                    <p>Online Consultations</p>
                  </Media.Body>
                </Media>
                <div className={styles.checkIcon}>
                  <Image
                    src={`/assets/images/${
                      doctor?.consultation?.online?.active
                        ? 'check-icon.svg'
                        : 'check-icon-inactive.svg'
                    }`}
                    alt="check-icon"
                  />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="border-0 px-0">
                <Media className="align-items-center">
                  <Image
                    src="/assets/images/location-icon.svg"
                    alt="check-icon"
                    className={`${styles.listItemIcon} mr-3`}
                  />
                  <Media.Body>
                    <p>In-person Visits</p>
                  </Media.Body>
                </Media>
                <div className={styles.checkIcon}>
                  <Image
                    src={`/assets/images/${
                      doctor?.consultation?.inPerson?.active
                        ? 'check-icon.svg'
                        : 'check-icon-inactive.svg'
                    }`}
                    alt="check-icon"
                  />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="border-0 px-0">
                <Media className="align-items-center">
                  <Image
                    src="/assets/images/home-visit.svg"
                    alt="check-icon"
                    className={`${styles.listItemIcon} mr-3`}
                  />
                  <Media.Body>
                    <p>Home Visits</p>
                  </Media.Body>
                </Media>
                <div className={styles.checkIcon}>
                  <Image
                    src={`/assets/images/${
                      doctor?.consultation?.homeVisit?.active
                        ? 'check-icon.svg'
                        : 'check-icon-inactive.svg'
                    }`}
                    alt="check-icon"
                  />
                </div>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-wrap" noValidate onSubmit={formik.handleSubmit}>
            <ListGroup horizontal>
              <ListGroup.Item className="availability-item font-weight-bold w-100">
                Consultation Type
              </ListGroup.Item>
              <ListGroup.Item className="availability-item font-weight-bold w-100">
                Price
              </ListGroup.Item>
              <ListGroup.Item className="availability-item font-weight-bold w-100">
                Action
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal>
              <ListGroup.Item className="availability-item w-100">
                <Media className="align-items-center">
                  <Image
                    src="/assets/images/online-consultation.svg"
                    alt="check-icon"
                    className="mr-2"
                  />
                  <Media.Body>
                    <p className="mb-0">Online Consultations</p>
                  </Media.Body>
                </Media>
              </ListGroup.Item>
              <ListGroup.Item className="availability-item w-100">
                <Input
                  groupAs={Col}
                  md="12"
                  type="number"
                  placeholder="Fee"
                  name="consultation.online.fee"
                  formik={formik}
                  {...formik.getFieldProps('consultation.online.fee')}
                />
              </ListGroup.Item>
              <ListGroup.Item className="availability-item w-100">
                <Form.Check
                  type="switch"
                  id="active-1"
                  label=""
                  name="consultation.online.active"
                  checked={formik.values.consultation?.online?.active}
                  formik={formik}
                  {...formik.getFieldProps('consultation.online.active')}
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal>
              <ListGroup.Item className="availability-item w-100">
                <Media className="align-items-center">
                  <Image
                    src="/assets/images/location-icon.svg"
                    alt="check-icon"
                    className="mr-2"
                  />
                  <Media.Body>
                    <p className="mb-0">In-person Visits</p>
                  </Media.Body>
                </Media>
              </ListGroup.Item>
              <ListGroup.Item className="availability-item w-100">
                <Input
                  groupAs={Col}
                  md="12"
                  type="number"
                  placeholder="Fee"
                  name="consultation.inPerson.fee"
                  formik={formik}
                  {...formik.getFieldProps('consultation.inPerson.fee')}
                />
              </ListGroup.Item>
              <ListGroup.Item className="availability-item w-100">
                <Form.Check
                  type="switch"
                  id="active-2"
                  label=""
                  name="consultation.inPerson.active"
                  checked={formik.values.consultation?.inPerson?.active}
                  formik={formik}
                  {...formik.getFieldProps('consultation.inPerson.active')}
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal>
              <ListGroup.Item className="availability-item w-100">
                <Media className="align-items-center">
                  <Image
                    src="/assets/images/home-visit.svg"
                    alt="check-icon"
                    className="mr-2"
                  />
                  <Media.Body>
                    <p className="mb-0">Home Visits</p>
                  </Media.Body>
                </Media>
              </ListGroup.Item>
              <ListGroup.Item className="availability-item w-100">
                <Input
                  groupAs={Col}
                  md="12"
                  type="number"
                  placeholder="Fee"
                  name="consultation.homeVisit.fee"
                  formik={formik}
                  {...formik.getFieldProps('consultation.homeVisit.fee')}
                />
              </ListGroup.Item>
              <ListGroup.Item className="availability-item w-100">
                <Form.Check
                  type="switch"
                  id="active-3"
                  label=""
                  checked={formik.values.consultation?.homeVisit?.active}
                  name="consultation.homeVisit.active"
                  formik={formik}
                  {...formik.getFieldProps('consultation.homeVisit.active')}
                />
              </ListGroup.Item>
            </ListGroup>
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

export default AvailabilityCard;
