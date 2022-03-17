import React, { useState, useEffect } from 'react';
import {
  Col,
  Image,
  ListGroup,
  Media,
  Row,
  Modal,
  Form,
} from 'react-bootstrap';

import { Input, LoaderButton, PhoneInput } from '@components';
import { onError } from '@utils';
import Select from 'react-select';
import styles from './doctor-personal-information.module.scss';
import useSpeciality from '../../hooks/useSpeciality';
import languages from '../../data/languages.json';

/* eslint-disable-next-line */
export interface DoctorPersonalInformationProps {
  doctor: any;
  formik: any;
  isLoading: boolean;
  done: boolean;
  error: any;
}

export function DoctorPersonalInformation({
  doctor,
  formik,
  isLoading,
  done,
  error,
}: DoctorPersonalInformationProps) {
  const customStyles = {
    control: () => ({
      alignItems: 'stretch',
      borderBottom: 'solid 1px #00c2cb',
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  const [showModal, setShowModal] = useState(false);
  const { specialitiesList, getSpecialitiesList } = useSpeciality();

  function handleEditAction() {
    setShowModal(true);

    // formik.setFieldValue('primarySpeciality', doctor.primarySpeciality);
    // doctor.primarySpeciality = specialitiesList.find((speciality: any) => speciality.name === doctor.primarySpeciality);
    formik.setValues({ ...doctor });
  }

  useEffect(() => {
    if (done) {
      setShowModal(false);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  // get specialities list
  useEffect(() => {
    (async () => {
      try {
        getSpecialitiesList();
      } catch (error) {
        onError(error);
      }
    })();
  }, []);

  const onPrimarySpecialityChange = (selectedItem) => {
    const updatedValue = selectedItem;
    // update control value
    console.log(updatedValue);
    formik.setFieldValue('primarySpeciality', updatedValue);
  };

  return (
    <div className={styles.doctorPersonalInformation}>
      {doctor !== null && (
        <>
          <Row className={`${styles.infoHeader} justify-content-between my-4`}>
            <Col md={10} className="">
              <h3 className="m-0">Dr. {doctor.name}</h3>
            </Col>
            <Col md={2} className="text-right">
              <div className={styles.editIcon} onClick={handleEditAction}>
                <Image src="/assets/images/edit-user.svg" alt="edit-icon" />
              </div>
            </Col>
          </Row>
          <Row className={styles.doctorSpeciality}>
            <Col>
              <h6 className="d-inline">
                {doctor?.primarySpeciality?.name || 'N/A'}
              </h6>
            </Col>
          </Row>
          <Row className={`${styles.listItems} my-4`}>
            <Col>
              <h5>Personal Info</h5>
              <ListGroup variant="flush">
                {doctor.gender && (
                  <ListGroup.Item className="border-0 px-0">
                    <Media className="align-items-center">
                      <Image
                        src="/assets/images/email-icon.svg"
                        alt="check-icon"
                        className={`${styles.listItemIcon} mr-3`}
                      />
                      <Media.Body>
                        <p>{doctor.gender}</p>
                      </Media.Body>
                    </Media>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="border-0 px-0">
                  <Media className="align-items-center">
                    <Image
                      src="/assets/images/email-icon.svg"
                      alt="check-icon"
                      className={`${styles.listItemIcon} mr-3`}
                    />
                    <Media.Body>
                      <p>{doctor.email}</p>
                    </Media.Body>
                  </Media>
                </ListGroup.Item>
                {doctor.practiceLocations.length > 0 && (
                  <ListGroup.Item className="border-0 px-0">
                    <Media className="align-items-center">
                      <Image
                        src="/assets/images/location-icon.svg"
                        alt="check-icon"
                        className={`${styles.listItemIcon} mr-3`}
                      />
                      <Media.Body>
                        <p>
                          {doctor?.practiceLocations &&
                          doctor?.practiceLocations?.length
                            ? doctor.practiceLocations.map((location, index) =>
                                index + 1 !==
                                doctor.practiceLocations.length ? (
                                  <span key={index}>{location.name}, </span>
                                ) : (
                                  <span key={index}>{location.name}.</span>
                                )
                              )
                            : 'N/A'}
                        </p>
                      </Media.Body>
                    </Media>
                  </ListGroup.Item>
                )}
                <ListGroup.Item className="border-0 px-0">
                  <Media className="align-items-center">
                    <Image
                      src="/assets/images/phone-icon.svg"
                      alt="check-icon"
                      className={`${styles.listItemIcon} mr-3`}
                    />
                    <Media.Body>
                      <p>{doctor.phoneNumber}</p>
                    </Media.Body>
                  </Media>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0">
                  <Media className="align-items-center">
                    <Image
                      src="/assets/images/mobile-icon.svg"
                      alt="check-icon"
                      className={`${styles.listItemIcon} mr-3`}
                    />
                    <Media.Body>
                      <p>+351 912 345 678</p>
                    </Media.Body>
                  </Media>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-wrap" onSubmit={formik.handleSubmit}>
            <Row>
              <Input
                groupAs={Col}
                md="6"
                label="First Name"
                placeholder="First Name"
                icon="full-name.svg"
                type="text"
                name="name"
                formik={formik}
                {...formik.getFieldProps('firstName')}
              />
              <Input
                groupAs={Col}
                md="6"
                label="Last Name"
                placeholder="Last Name"
                icon="full-name.svg"
                type="text"
                name="name"
                formik={formik}
                {...formik.getFieldProps('lastName')}
              />
            </Row>
            <Row>
              <Input
                groupAs={Col}
                md="6"
                label="Email"
                placeholder="Email"
                icon="email.svg"
                type="text"
                name="name"
                formik={formik}
                {...formik.getFieldProps('email')}
              />
              <PhoneInput
                groupAs={Col}
                md="6"
                label="Phone Number"
                icon="phone.svg"
                type="text"
                name="phoneNumber"
                controlName="phoneNumber"
                formik={formik}
                {...formik.getFieldProps('phoneNumber')}
              />
            </Row>
            <Row>
              <Form.Group
                as={Col}
                md={6}
                icon="institution.svg"
                className="my-auto"
              >
                <Select
                  styles={customStyles}
                  name="primarySpeciality"
                  value={formik.values.primarySpeciality}
                  onChange={onPrimarySpecialityChange}
                  options={specialitiesList}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                  placeholder="Search Speciality"
                />
              </Form.Group>
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

export default DoctorPersonalInformation;
