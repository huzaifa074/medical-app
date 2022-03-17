import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import Qualifications from '../qualifications/qualifications';

import styles from './about.module.scss';
import useSpeciality from '../../hooks/useSpeciality';
import LoaderButton from '../loader-button/loader-button';
import ListingButton from '../listing-button/listing-button';
import languages from '../../data/languages.json';

/* eslint-disable-next-line */
export interface AboutProps {
  doctor?: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
  handleNextTab: (key: string) => void;
}

export function About({
  doctor,
  formik,
  done,
  isLoading,
  error,
  handleNextTab,
}: AboutProps) {
  // multiselect style
  const multiSelectStyle = {
    chips: {
      display: 'none',
    },
    searchBox: {
      border: 'none',
      borderBottom: '1px solid #00c2cb',
      borderRadius: '0px',
    },
    multiselectContainer: {
      color: '#fffff',
    },
    inputField: {
      // To change input field position or margin
      width: '100%',
    },
  };

  const [specialitiesListToDisplay, setSpecialitiesListToDisplay] = useState([
    ...doctor.specialities,
  ]);

  const [languagesListToDisplay, setLanguagesListToDisplay] = useState([
    ...doctor.languages,
  ]);

  useEffect(() => {
    formik.setValues({
      ...doctor,
      languages: doctor.languages,
      specialities: doctor.specialities,
      biography: doctor.biography,
      passportNumber: doctor.passportNumber,
      practiceNumber: doctor.practiceNumber,
    });
  }, [doctor]);

  useEffect(() => {
    getSpecialitiesList();
  }, []);

  const cancelClickHandler = (speciality) => {
    const updatedValues = formik.values.specialities.filter(
      (value) => value.id !== speciality.id
    );
    setSpecialitiesListToDisplay(
      specialitiesListToDisplay.filter((value) => value.id !== speciality.id)
    );
    formik.setFieldValue('specialities', updatedValues);
    formik.handleSubmit(formik.values);
  };

  const cancelLanguageClickHandler = (language) => {
    const updatedValues = formik.values.languages.filter(
      (value) => value.code !== language.code
    );
    setLanguagesListToDisplay(
      languagesListToDisplay.filter((value) => value.code !== language.code)
    );
    formik.setFieldValue('languages', updatedValues);
    formik.handleSubmit(formik.values);
  };

  const { specialitiesList, getSpecialitiesList } = useSpeciality();

  const onMultipleSelect = (selectedList, controlName) => {
    const updatedValues = selectedList;
    controlName === 'languages'
      ? setLanguagesListToDisplay(selectedList)
      : setSpecialitiesListToDisplay(selectedList);
    // update control value
    formik.setFieldValue(controlName, updatedValues);
    formik.handleSubmit(formik.values);
  };

  return (
    <div className={`${styles.about}`}>
      <Formik
        enableReinitialize
        initialValues={formik.values}
        validationSchema={formik.validationSchema}
        onSubmit={formik.handleSubmit}
      >
        {(props) => (
          <Form>
            <div className={`${styles.aboutMe} position-relative`}>
              <Form.Group
                controlId="about-me"
                className={`${styles.aboutMeContent} position-relative mb-0`}
              >
                <Form.Control
                  as="textarea"
                  name="biography"
                  formik={formik}
                  onBlurCapture={props.handleSubmit}
                  onChangeCapture={props.handleChange}
                  {...formik.getFieldProps('biography')}
                  rows={7}
                />
                <Form.Label className="d-flex align-items-ceter">
                  <Image src="/assets/images/user-icon.svg" alt="user-icon" />
                  <span className={`${styles.title} ml-2`}>About Me</span>
                </Form.Label>
              </Form.Group>
            </div>
            <Row className="my-4">
              <Form.Group
                as={Col}
                md="4"
                className={`${styles.fieldItem} position-relative mb-0`}
              >
                <Form.Control
                  type="text"
                  name="passportNumber"
                  formik={formik}
                  onBlurCapture={props.handleSubmit}
                  onChangeCapture={props.handleChange}
                  {...formik.getFieldProps('passportNumber')}
                />
                <Form.Label className="d-flex align-items-ceter">
                  <Image
                    src="/assets/images/icons/passport-null.svg"
                    alt="passport"
                  />
                  <span className={`${styles.title} ml-2`}>ID/Passport No</span>
                </Form.Label>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className={`${styles.fieldItem} position-relative mb-0`}
              >
                <Form.Control
                  type="text"
                  name="practiceNumber"
                  formik={formik}
                  onBlurCapture={props.handleSubmit}
                  onChangeCapture={props.handleChange}
                  {...formik.getFieldProps('practiceNumber')}
                />
                <Form.Label className="d-flex align-items-ceter">
                  <Image
                    src="/assets/images/icons/passport-null.svg"
                    alt="passport"
                  />
                  <span className={`${styles.title} ml-2`}>Practice No</span>
                </Form.Label>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className={`${styles.fieldItem} position-relative mb-0`}
              >
                <Form.Control
                  type="text"
                  name="registrationNumber"
                  formik={formik}
                  onBlurCapture={props.handleSubmit}
                  onChangeCapture={props.handleChange}
                  {...formik.getFieldProps('registrationNumber')}
                />
                <Form.Label className="d-flex align-items-ceter">
                  <Image
                    src="/assets/images/icons/passport-null.svg"
                    alt="passport"
                  />
                  <span className={`${styles.title} ml-2`}>
                    Registration No
                  </span>
                </Form.Label>
              </Form.Group>
            </Row>
          </Form>
        )}
      </Formik>
      {/* <Row className={`my-4`}>
        <Col>
          <QualificationListingTable />
        </Col>
      </Row> */}
      <Qualifications
        doctor={doctor}
        formik={formik}
        done={done}
        error={error}
        isLoading={isLoading}
      />
      {/* specialization and languages */}
      <Row>
        <Col md={6} lg={6} xs={12}>
          <Form className="mb-4" noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} md={12}>
                <Multiselect
                  avoidHighlightFirstOption
                  options={specialitiesList}
                  showCheckbox
                  name="specialities"
                  placeholder="Specialization Areas"
                  {...(specialitiesListToDisplay &&
                    formik.values.specialities && {
                      selectedValues: [...specialitiesListToDisplay],
                    })}
                  {...formik.getFieldProps('specialities')}
                  id="css_custom"
                  displayValue="name"
                  style={multiSelectStyle}
                  onSelect={(selectedList, selectedItem) =>
                    onMultipleSelect(selectedList, 'specialities')
                  }
                  onRemove={(selectedList, selectedItem) =>
                    onMultipleSelect(selectedList, 'specialities')
                  }
                  closeOnSelect={false}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                {specialitiesListToDisplay &&
                specialitiesListToDisplay.length > 0
                  ? specialitiesListToDisplay.map((speciality, index) => (
                      <ListingButton
                        classes="d-inline-block mr-3 mb-3"
                        text={speciality.name}
                        icon="cancel-icon.svg"
                        key={index}
                        cancelClickHandler={() =>
                          cancelClickHandler(speciality)
                        }
                      />
                    ))
                  : null}
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={6} lg={6} xs={12}>
          <Form className="mb-4" noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} md={12}>
                <Multiselect
                  avoidHighlightFirstOption
                  options={languages}
                  showCheckbox
                  name="languages"
                  placeholder="Languages"
                  {...(languagesListToDisplay &&
                    formik.values.languages && {
                      selectedValues: [...languagesListToDisplay],
                    })}
                  {...formik.getFieldProps('languages')}
                  id="css_custom"
                  displayValue="name"
                  style={multiSelectStyle}
                  onSelect={(selectedList, selectedItem) =>
                    onMultipleSelect(selectedList, 'languages')
                  }
                  onRemove={(selectedList, selectedItem) =>
                    onMultipleSelect(selectedList, 'languages')
                  }
                  closeOnSelect={false}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                {languagesListToDisplay && languagesListToDisplay.length > 0
                  ? languagesListToDisplay.map((language, index) => (
                      <ListingButton
                        classes="d-inline-block mr-3 mb-3"
                        text={language.name}
                        icon="cancel-icon.svg"
                        key={index}
                        cancelClickHandler={() =>
                          cancelLanguageClickHandler(language)
                        }
                      />
                    ))
                  : null}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={() => {
            handleNextTab('insurances');
          }}
          style={{ position: 'absolute', bottom: '32px', right: '60px' }}
        >
          Next
        </Button>
      </Row>
    </div>
  );
}

export default About;
