import { Input, LoaderButton, LocationsCard } from '@components';
import { onError } from '@utils';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { toast } from 'react-toastify';
import useLocation from '../../hooks/useLocation';
import { Schedule } from '../index';
import styles from './locations.module.scss';
import { IForm, initialValues, scheduleValidationSchema, validationSchema } from './schema';
/* eslint-disable-next-line */
export interface LocationsProps {
  doctor: any,
  editDoctorProfile: (body: any) => void,
  getDoctorProfile: () => void
}

export function Locations({ doctor, editDoctorProfile, getDoctorProfile }: LocationsProps) {

  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState('');

  const handleAddEditLocation = (location?: any) => {

    setShowModal(true);

    if (location) {
      setEditMode(true);
      setLocationToEdit(location);
      formik.setValues(location);
    }
  }

  const handleEditSchedule = (location?: any) => {
    setSelectedSchedule(location.schedule);
    setSelectedLocation(location.id);
    scheduleFormik.setValues({
      schedule: {
        slotInterval: location?.schedule?.slotInterval,
        workingHours: location?.schedule?.workingHours,
      }
    })
    setShowEditScheduleModal(true);
  }

  // location hook
  const {
    error,
    isLoading,
    done,
    currentUser,
    upsertLocation,
    setLocationToEdit,
    updateLocationSchedule
  } = useLocation(editDoctorProfile, getDoctorProfile);

  useEffect(() => {
    if (done) {
      if (showEditScheduleModal) {
        setShowEditScheduleModal(false);
        scheduleFormik.resetForm();
        toast.success('Schedule edited successfully.');
      } else {
        setShowModal(false);
        formik.resetForm();
        toast.success(
          editMode
            ? 'Location edited successfully.'
            : 'Location saved successfully');
      }
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  // handle location create/edit submit
  const handleLocationSubmit = async (values: IForm) => {
    try {
      const body = { ...values };
      await upsertLocation(body);
    } catch (error) {
      onError(error);
    }
  };

  // location update formik object
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: handleLocationSubmit,
  });

  // schedule update submit
  async function onSubmit(values) {
    try {
      values.schedule.slotInterval = Number(values.schedule.slotInterval);
      await updateLocationSchedule(selectedLocation, values);
      await getDoctorProfile();
    } catch (e) {
      onError(e);
    }
  }


  // schedule edit formik obect
  const scheduleFormik = useFormik({
    initialValues: {
      schedule: {
        slotInterval: selectedSchedule?.slotInterval || 60,
        workingHours: selectedSchedule?.workingHours || [],
      }
    },
    validationSchema: scheduleValidationSchema,
    onSubmit,
  });

  // on slot duration chaneg
  const handleSlotIntervalChange = (newInterval) => {
    // scheduleFormik.values.schedule.workingHours.forEach((day, index) => {
    //   day.shifts.forEach((shift, shiftIndex) => {
    //     const updatedEndTime = moment(scheduleFormik.values.schedule.workingHours[index].shifts[shiftIndex].startTime, 'HH:mm').add(newInterval, 'minutes').format('HH:mm');
    //     scheduleFormik.setFieldValue(`schedule.workingHours[${index}].shifts[${shiftIndex}].endTime`, updatedEndTime);
    //   });
    // });
  }

  // google map
  const MapWithAMarker = useMemo(() => (
    withGoogleMap(props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: formik.values.geoPoint.lat,
          lng: formik.values.geoPoint.lon,
        }}
      >
        <Marker
          position={{
            lat: formik.values.geoPoint.lat,
            lng: formik.values.geoPoint.lon,
          }}
        />
      </GoogleMap>
    )
  ), [formik.values.geoPoint]);


  // on google place slelected
  const onPlaceSelected = (place) => {
    const formattedAddress = place.formatted_address;
    const geoPoint = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
    };
    formik.setFieldValue('name', formattedAddress.split(',')[0]);
    formik.setFieldValue('formattedAddress', formattedAddress);
    formik.setFieldValue('geoPoint', geoPoint);
  };

  // restrict enter in address seletion
  const handleEnterOnAddressfield = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className={`${styles.locations}`}>
      {/* Locations card listing */}
      <LocationsCard doctor={currentUser} handleAddEditLocation={handleAddEditLocation} handleEditSchedule={handleEditSchedule} />
      {/* schdule edit component */}
      <Modal show={showEditScheduleModal} onHide={() => { setShowEditScheduleModal(false); }} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <h5>Schedule Date & Time</h5>
        </Modal.Header>
        <Schedule formik={scheduleFormik} isLoading={isLoading} locationId={selectedLocation} handleSlotIntervalChange={handleSlotIntervalChange} />
      </Modal>
      {/* location edit create component */}
      <Modal show={showModal} onHide={() => { formik.resetForm(); setShowModal(false); }} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Practice Location</span>
            <p className={`${styles.practiceLocation}`}>Staylowkey Helps Provides Reach More New Patients. </p>
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <Form className="form-wrap" noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <InputGroup className="mb-4">
                    <Autocomplete
                      className="form-control"
                      placeholder="Google Address"
                      onKeyPress={handleEnterOnAddressfield}
                      defaultValue={formik.values.formattedAddress}
                      onPlaceSelected={onPlaceSelected}
                      types={['address']}
                      componentRestrictions={{ country: "za" }}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon1">
                        <img src="assets/images/icons/practice-location.svg" alt="Field Icon" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Label className="text-left form-label">Address</Form.Label>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Input
                groupAs={Col}
                md="12"
                label="Practice Location Name"
                placeholder="Practice Location Name"
                icon="address-icon.svg"
                type="text"
                name="name"
                formik={formik}
                {...formik.getFieldProps('name')}
              />
            </Row>
            <Row>
              <Col>
                <MapWithAMarker
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Col>
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

export default Locations;
