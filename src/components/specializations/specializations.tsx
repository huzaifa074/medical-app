import React, { useEffect, useState } from 'react';
import { Col, Form, Image, Media, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import {
  ListingButton, LoaderButton
} from '@components';
import { onError } from '@utils';
import { Multiselect } from 'multiselect-react-dropdown';
import useSpeciality from '../../hooks/useSpeciality';
import styles from './specializations.module.scss';



/* eslint-disable-next-line */
export interface SpecializationsProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
}

export function Specializations({ doctor, formik, done, isLoading, error }: SpecializationsProps) {

  // multiselect style
  const multiSelectStyle = {
    chips: {
      display: 'none'
    },
    searchBox: {
      border: 'none',
      borderBottom: '1px solid #00c2cb',
      borderRadius: '0px',
    },
    multiselectContainer: {
      color: '#fffff',
    },
    inputField: { // To change input field position or margin
      width: '100%'
    },
  };

  const [showModal, setShowModal] = useState(false);
  const { specialitiesList, getSpecialitiesList } = useSpeciality();

  const handleEditAction = () => {
    setShowModal(true);
    // set value on modal show
    formik.setValues({ ...doctor, specialities: doctor.specialities });
  }

  const onMultipleSelect = (selectedList, controlName) => {
    const updatedValues = selectedList;
    // update control value
    formik.setFieldValue(controlName, updatedValues);
  };

  // get insurances list
  useEffect(() => {
    (async () => {
      try {
        getSpecialitiesList();
      } catch (error) {
        onError(error);
      }
    })();
  }, []);


  useEffect(() => {
    if (done) {
      setShowModal(false);
    } else if (error) {
      onError(error)
    }
  }, [done, error]);

  const cancelClickHandler = (speciality) => {
    const updatedValues = formik.values.specialities.filter(value => value.id !== speciality.id);
    formik.setFieldValue('specialities', updatedValues);
  }

  return (
    <div className={`${styles.specializations} my-xl-5 my-4`}>
      <Row className="justify-content-between">
        <Col lg={11}>
          <Media className={`${styles.specializationsContent}`}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-top">
                  Specializations
                </Tooltip>
              }
            >
              <Image src="/assets/images/specializations.svg" alt="specializations" className="align-self-center mr-3" />
            </OverlayTrigger>
            <Media.Body className={`${styles.specializationsContentBody} pl-3 pt-2`}>
              {doctor.specialities.length > 0 ?
                (
                  doctor.specialities.map((speciality, index) => (
                    <ListingButton
                      classes="d-inline-block mr-3 mb-3"
                      text={speciality.name}
                      key={index}
                    />
                  ))
                ) : <p>Please add your specialities.</p>
              }

            </Media.Body>
          </Media>
        </Col>
        <Col lg={1} className="text-right">
          <div className={`${styles.editIcon} mx-auto`} onClick={handleEditAction}>
            <Image src="/assets/images/edit-icon.svg" alt="edit-icon" />
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Specialization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-4" noValidate onSubmit={formik.handleSubmit} >
            <Row className="mb-4">
              <Form.Group as={Col} md={12}>
                <Multiselect
                  avoidHighlightFirstOption
                  options={specialitiesList}
                  showCheckbox
                  name="specialities"
                  placeholder="Choose Your Specialization"
                  {...(doctor.specialities &&
                    formik.values.specialities && {
                    selectedValues: [...formik.values.specialities],
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
                {
                  formik.values.specialities &&
                    formik.values.specialities.length > 0 ?
                    formik.values.specialities.map((speciality, index) => (
                      <ListingButton
                        classes="d-inline-block mr-3 mb-3"
                        text={speciality.name}
                        icon="cancel-icon.svg"
                        key={index}
                        cancelClickHandler={() => cancelClickHandler(speciality)}
                      />
                    )) : null}
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

export default Specializations;
