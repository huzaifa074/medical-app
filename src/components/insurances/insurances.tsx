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
import { Input, LoaderButton, ListingButton } from '@components';
import { onError } from '@utils';
import { Multiselect } from 'multiselect-react-dropdown';
import useInsurance from '../../hooks/useInsurance';
import styles from './insurances.module.scss';

/* eslint-disable-next-line */
export interface InsurancesProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
}

export function Insurances({
  doctor,
  formik,
  done,
  isLoading,
  error,
}: InsurancesProps) {
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
  };

  const [showModal, setShowModal] = useState(false);

  const [modalInsuranceShowLimit, setModalInsuranceShowLimit] = useState(9);

  const [insuranceShowLimit, setInsuranceShowLimit] = useState(9);

  const { insurancesList, getInsurances } = useInsurance();

  const handleEditAction = () => {
    setShowModal(true);
    // set value on modal show
    formik.setValues({ ...doctor, insurances: doctor.insurances });
  };

  const onMultipleSelect = (selectedList, controlName, isSelectAllSelected, checked) => {
    if (!isSelectAllSelected) {
      const updatedValues = checked ? selectedList : selectedList.filter(item => item.id !== 'selectAll');
      // update control value
      formik.setFieldValue(controlName, updatedValues);
    } else {
      handleCheckUncheckAll(checked);
    }

  };

  // get insurances list
  useEffect(() => {
    (async () => {
      try {
        getInsurances();
      } catch (error) {
        onError(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (done) {
      setShowModal(false);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  const cancelClickHandler = (insurance) => {
    const updatedValues = formik.values.insurances.filter(
      (value) => value.id !== insurance.id
    );
    formik.setFieldValue('insurances', updatedValues);
  };

  const handleCheckUncheckAll = (isChecked) => {
    let updatedValues = [];
    if (isChecked) {
      updatedValues = [...insurancesList];
    }
    formik.setFieldValue('insurances', updatedValues);
  };

  return (
    <div className={`${styles.insurances} my-xl-5 my-4`}>
      <Row className="justify-content-between">
        <Col lg={11}>
          <Media className={`${styles.insurancesContent}`}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id="tooltip-top">insurances</Tooltip>}
            >
              <Image
                src="/assets/images/insurances.svg"
                alt="insurances"
                className="align-self-center mr-3"
              />
            </OverlayTrigger>
            <Media.Body className={`${styles.insurancesContentBody} pl-3 pt-2`}>
              {doctor.insurances.length > 0 ? (
                doctor.insurances
                  .slice(0, insuranceShowLimit)
                  .map((insurance, index) => (
                    <ListingButton
                      classes="d-inline-block mr-3 mb-3"
                      text={insurance.name}
                      key={index}
                    />
                  ))
              ) : (
                <p>Add your medical aids.</p>
              )}
              {doctor.insurances.length > 9 ? (
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={() =>
                    setInsuranceShowLimit(
                      insuranceShowLimit === 9 ? doctor.insurances.length : 9
                    )
                  }
                >
                  {insuranceShowLimit > 9 ? 'Show Less' : 'Show More'}{' '}
                </button>
              ) : null}
            </Media.Body>
          </Media>
        </Col>
        <Col lg={1} className="text-right">
          <div
            className={`${styles.editIcon} mx-auto`}
            onClick={handleEditAction}
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
          <Modal.Title>Medical Aid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="align-items-center mb-4">
              <Form.Group as={Col} md={12}>
                <Multiselect
                  avoidHighlightFirstOption
                  options={insurancesList}
                  showCheckbox
                  name="insurances"
                  placeholder="Add Medical Aid"
                  {...(doctor.insurances &&
                    formik.values.insurances && {
                    selectedValues: [...formik.values.insurances],
                  })}
                  {...formik.getFieldProps('insurances')}
                  id="css_custom"
                  displayValue="name"
                  style={multiSelectStyle}
                  onSelect={(selectedList, selectedItem) =>
                    onMultipleSelect(selectedList, 'insurances', selectedItem.id === 'selectAll', true)
                  }
                  onRemove={(selectedList, selectedItem) =>
                    onMultipleSelect(selectedList, 'insurances', selectedItem.id === 'selectAll', false)
                  }
                  closeOnSelect={false}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                {formik.values.insurances && formik.values.insurances.length > 0
                  ? formik.values.insurances
                    .slice(0, modalInsuranceShowLimit)
                    .map((insurance, index) => (
                      insurance.id !== 'selectAll' ? (
                        <ListingButton
                          classes="d-inline-block mr-3 mb-3"
                          text={insurance.name}
                          icon="cancel-icon.svg"
                          key={index}
                          cancelClickHandler={() =>
                            cancelClickHandler(insurance)
                          }
                        />) : null
                    )
                    )
                  : null}
                {formik.values.insurances.length > 9 ? (
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    onClick={() =>
                      setModalInsuranceShowLimit(
                        modalInsuranceShowLimit === 9
                          ? formik.values.insurances.length
                          : 9
                      )
                    }
                  >
                    {modalInsuranceShowLimit > 9 ? 'Show Less' : 'Show More'}{' '}
                  </button>
                ) : null}
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

export default Insurances;
