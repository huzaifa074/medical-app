import { onError } from '@utils';
import { Field, FormikProvider, useFormik } from 'formik';
import _ from "lodash";
import moment from 'moment';
import { Multiselect } from 'multiselect-react-dropdown';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Image, ListGroup, Media, Row, Spinner } from 'react-bootstrap';
// import SimpleReactCalendar from 'simple-react-calendar'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import reasonsList from '../../data/reasons.json';
import useAppointment from '../../hooks/useAppointment';
import LoaderButton from '../loader-button/loader-button';
import { IForm, initialValues, validationSchema } from './schema';
import styles from './upsert-appointment.module.scss';


/* eslint-disable-next-line */
export interface UpsertAppointmentProps {}

interface ParamTypes {
  appointmentId: string;
}

export function UpsertAppointment(props: UpsertAppointmentProps) {

  const { appointmentId } = useParams<ParamTypes>();

  // multiselect style
  const multiSelectStyle = {
    chips: {
      background: '#00c2cb',
      color: '#111111',
    },
    searchBox: {
      border: 'none',
      borderBottom: '1px solid #00c2cb',
      borderRadius: '0px',
    },
    multiselectContainer: {
      color: '#fffff',
    },
  };

  const history = useHistory();
  // patient id in queryString
  const { patientId, patientName } = queryString.parse(history.location.search);
  // reasons list
  const [reasons, setReasons] = useState(reasonsList.online.reasons);
  // symptoms list
  const [symptoms, setSymptoms] = useState(reasonsList.online.symptoms);

  const [patientSearchInput, setPatientSearchInput] = useState('');

  const [minDate, setMinDate] = useState(new Date());

  const [defaultDate, setDefaultDate] = useState(new Date());

  const [selectedSlot, setSelectedSlot] = useState('');

  // debounce for api call delay while searching patients
  const delayedQuery = useRef(_.debounce(async (q) => { await getPatientsList(q); setPatientSearchInput('') }, 500)).current;
  const handleSearchInputChange = e => {
    if (!e) return;
    setPatientSearchInput(e);
    delayedQuery(e);
  };

  // use appointment hook
  const {
    done,
    error,
    isLoading,
    isSlotsLoading,
    isPatientsLoading,
    slots,
    patientsList,
    getAppointments,
    upsertAppointment,
    getPatientsList,
    getSlots,
    getAppointmentById,
    appointmentToEdit
  } = useAppointment();

  const handleSubmit = (values: IForm) => {
    const body = { ...values };
    if (appointmentToEdit) {
      return upsertAppointment(body, appointmentToEdit.id);
    } else {
      return upsertAppointment(body);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // get appointment details if opened in edit mode
  useEffect(() => {
    (async () => {
      try {
        if (!appointmentId) return;
        await getAppointmentById(appointmentId);
      } catch (error) {
        onError(error);
      }
    })();
  }, [appointmentId]);

  // set form values
  useEffect(() => {
    if (!appointmentToEdit) return;

    // if appointment date is less the current date then set min date as appointment date
    if (moment(appointmentToEdit.appointmentAt).isBefore(moment())) {
      // set min date
      setMinDate(new Date(appointmentToEdit.appointmentAt));
    }


    // set initial values for form
    const newValues = { ...appointmentToEdit };
    formik.setValues(newValues);

    // set selected slot
    handleSelectSlot(appointmentToEdit.appointmentAt);

    // set selected date
    setDefaultDate(new Date(appointmentToEdit.appointmentAt));

    // handle date change
    handleDateChange(new Date(appointmentToEdit.appointmentAt));

    // get patients list
    handleSearchInputChange(appointmentToEdit.patient.name.split(' ')[0]);

    // set selected patient
    handlePatientSelect(appointmentToEdit.patient.id, true);
  }, [appointmentToEdit]);

  // if patient is pre selected and new appointment is being created
  useEffect(() => {
    // set selected patient
    if (!patientId) return;
    handlePatientSelect(String(patientId), true);
  }, [patientId])

  // if patient is pre selected and new appointment is being created
  useEffect(() => {
    // set selected patient
    if (!patientName) return;
    handleSearchInputChange(String(patientName).split(' ')[0]);
  }, [patientName])

  // consultation type buttons instead of radio button
  const handleConsultationTypeChange = (value: string) => {
    formik.setFieldValue('consultationType', value);
    // update reasons list, syptoms list and fields value
    setReasons(reasonsList[value].reasons);
    formik.setFieldValue('reasons', []);
    setSymptoms(reasonsList[value].symptoms);
    // formik.setFieldValue('symptoms', []);
  }

  // handle calendar date change
  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    // call api to get slot for particular date
    getSlots(formattedDate);
    setDefaultDate(date);
  }

  // handle slot select
  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
    formik.setFieldValue('appointmentAt', slot)
  };

  // handle patient selected
  const handlePatientSelect = (patientId: string, checked: boolean) => {
    if (checked) {
      formik.setFieldValue('patientId', patientId);
    } else {
      formik.setFieldValue('patientId', '')
    }
  };

  // get slots for current date when loading first time
  useEffect(() => {
    const formattedDate = moment(defaultDate).format('YYYY-MM-DD');
    // call api to get slot for particular date
    getSlots(formattedDate);
  }, []);

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      toast.success('Appointment Added Successfully.');
      // formik.resetForm();
      // history.push('/dashboard');
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  const onMultipleSelect = (selectedList, controlName) => {
    const updatedValues = selectedList;
    // update control value
    formik.setFieldValue(controlName, updatedValues);
  };

  // handle new patient
  const handleNewPatientNavigation = () => {
    history.push('/patients/add');
  }


  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      className="row p-3"
    >
      <FormikProvider value={formik} >
        <Col md={6} xl={4}>
          {/* <SimpleReactCalendar blockClassName='date_picker' activeMonth={new Date()} /> */}
          {/* <Image src="/assets/images/agenda-calendar.png" alt="agenda-calendar" /> */}
          <Calendar minDate={minDate} defaultDate={defaultDate} activeStartDate={defaultDate} value={defaultDate} onChange={handleDateChange} />
        </Col>
        <Col xl={8}>
          <div className={styles.upsertAppointment}>
            <Row>
              <Col lg={4} className="px-2 mb-3 mb-lg-0">
                <Media className={`${styles.appointmentTypeItem} ${formik.values.consultationType === 'online' ? styles.selected : ''} align-items-center`} onClick={() => handleConsultationTypeChange('online')}>
                  <Image src="/assets/images/online-consultaion-white.svg" alt="appointment-type" />
                  <Media.Body>
                    <h6 className="text-center mb-0">Online Consultation</h6>
                  </Media.Body>
                  <Field type="radio" name="consultationType" value="online" />
                </Media>
              </Col>
              <Col lg={4} className="px-2 mb-3 mb-lg-0">
                <Media className={`${styles.appointmentTypeItem} ${formik.values.consultationType === 'in-person' ? styles.selected : ''} align-items-center`} onClick={() => handleConsultationTypeChange('in-person')}>
                  <Image src="/assets/images/location-visit-white.svg" alt="appointment-type" />
                  <Media.Body>
                    <h6 className="text-center mb-0">In person Consultation</h6>
                  </Media.Body>
                  <Field type="radio" name="consultationType" value="in-person" />
                </Media>
              </Col>
              <Col lg={4} className="px-2 mb-3 mb-lg-0">
                <Media className={`${styles.appointmentTypeItem} ${formik.values.consultationType === 'home-visit' ? styles.selected : ''} align-items-center`} onClick={() => handleConsultationTypeChange('home-visit')}>
                  <Image src="/assets/images/home-visit-white.svg" alt="appointment-type" />
                  <Media.Body>
                    <h6 className="text-center mb-0">Home Consultation</h6>
                  </Media.Body>
                  <Field type="radio" name="consultationType" value="home-visit" />
                </Media>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="mt-xl-5 mt-4">
                <Form className="form-wrap">
                  <Row>
                    <Form.Group as={Col} md={12}>
                      <Multiselect
                        avoidHighlightFirstOption
                        options={reasons}
                        isObject={false}
                        name="reasons"
                        placeholder="Reasons"
                        {...(appointmentToEdit &&
                        {
                          selectedValues: formik.values.reasons,
                        })}
                        id="css_custom"
                        style={multiSelectStyle}
                        onSelect={(selectedList, selectedItem) =>
                          onMultipleSelect(selectedList, 'reasons')
                        }
                        onRemove={(selectedList, selectedItem) =>
                          onMultipleSelect(selectedList, 'reasons')
                        }
                      />
                      {formik.errors && formik.touched.reasons && formik.errors.reasons && (
                        <div className="d-block invalid-feedback">{formik.errors.reasons}</div>
                      )
                      }
                    </Form.Group>

                  </Row>
                  <Row className="my-4">
                    <Col>
                      <h4>Appointment Time</h4>
                      <div className={`${styles.appointmentTimeItems} ${styles.selected} my-4`}>
                        {
                          !isSlotsLoading ?
                            (slots && slots.length > 0 ?
                              (slots.map((slot, index) => (
                                <span key={index} className={`mx-1 text-center mb-2 ${selectedSlot === slot ? styles.selected : ''}`} onClick={() => handleSelectSlot(slot)}>
                                  {moment(slot).format('hh:mm A')}
                                </span>))) : <p> No Slots Available</p>)

                            : <Spinner animation="border" variant="info" />
                        }
                        {/* hidden input */}
                        <input
                          type="text"
                          name="appointmentAt"
                          className='displayNone'
                        />
                        {formik.errors && formik.touched.appointmentAt && formik.errors.appointmentAt && (
                          <div className="d-block invalid-feedback">{formik.errors.appointmentAt}</div>
                        )
                        }
                      </div>
                    </Col>
                  </Row>
                </Form>
                <Row className="align-items-center justify-content-between">
                  <Col className="col-auto">
                    <h4>Patients</h4>
                  </Col>
                  <Col className="col-auto text-right">
                    <a className={styles.newPatient} onClick={handleNewPatientNavigation}>New Patient</a>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Control size="lg" type="text" placeholder="Search Patient by Name, Phone or Email" onChange={(e) => { handleSearchInputChange(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <ListGroup variant="flush" className={`${styles.patientInfo}`}>
                      {
                        !isPatientsLoading ?
                          (patientsList && patientsList.length > 0 ?
                            (patientsList.map((patient, index) => (
                              <ListGroup.Item className={`${styles.patientInfoItem} px-0`} key={index}>
                                <Row>
                                  <Col>
                                    <h3>{patient.name}</h3>
                                    <p className="mb-0">{patient.gender}</p>
                                  </Col>
                                  <Col>
                                    <Media className="align-items-center mb-3">
                                      <Image src="/assets/images/icons/email.svg" alt="appointment-type" className="mr-2" />
                                      <Media.Body>
                                        <p className="mb-0">{patient.email}</p>
                                      </Media.Body>
                                    </Media>
                                    <Media className="align-items-center">
                                      <Image src="/assets/images/icons/phone.svg" alt="appointment-type" className="mr-2" />
                                      <Media.Body>
                                        <p className="mb-0">{patient.phoneNumber}</p>
                                      </Media.Body>
                                    </Media>
                                  </Col>
                                  <Form.Group>
                                    <Form.Check
                                      type="checkbox"
                                      label="Select"
                                      onChange={(e: any) => { handlePatientSelect(patient.id, e.target.checked) }}
                                      checked={formik.values.patientId === patient.id} />
                                  </Form.Group>
                                </Row>
                              </ListGroup.Item>)))
                            : <p> No Patients Found</p>) : <Spinner animation="border" variant="info" />
                      }
                      {/* hidden input */}
                      <input
                        type="text"
                        name="patientId"
                        className='displayNone'
                      />
                      {formik.errors && formik.touched.patientId && formik.errors.patientId && (
                        <div className="d-block invalid-feedback">{formik.errors.patientId}</div>
                      )
                      }
                    </ListGroup>
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col className="text-right">
                    <LoaderButton
                      classes="btn btn-primary btn-lg"
                      type="submit"
                      isLoading={isLoading}
                      text={appointmentToEdit ? "Update Appointment" : "Book Appointment"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </FormikProvider>
    </Form >
  );
}

export default UpsertAppointment;
