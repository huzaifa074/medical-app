import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Image,
  Media,
  Modal,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import { Input, LoaderButton, ListingButton } from '@components';
import { onError } from '@utils';
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import styles from './medical-aids.module.scss';
import useInsurance from '../../hooks/useInsurance';

/* eslint-disable-next-line */
export interface MedicalAidsProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
}
export function MedicalAids({
  doctor,
  formik,
  done,
  isLoading,
  error,
}: MedicalAidsProps) {
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

  const [modalInsuranceShowLimit, setModalInsuranceShowLimit] = useState(12);

  const [insuranceShowLimit, setInsuranceShowLimit] = useState(20);

  const { insurancesList, getInsurances } = useInsurance();

  const [insuranceListToDisplay, setInsuranceListToDisplay] = useState([
    ...doctor.insurances,
  ]);

  const [searchInput, setSearchInput] = useState('');

  const handleEditAction = () => {
    setShowModal(true);
    // set value on modal show
    formik.setValues({ ...doctor, insurances: doctor.insurances });
  };

  const onMultipleSelect = (
    selectedList,
    controlName,
    isSelectAllSelected,
    checked
  ) => {
    if (!isSelectAllSelected) {
      const updatedValues = checked
        ? selectedList
        : selectedList.filter((item) => item.id !== 'selectAll');
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
      setInsuranceListToDisplay([...doctor.insurances]);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  const cancelClickHandler = (insurance) => {
    const updatedValues = formik.values.insurances.filter(
      (value) => value.id !== insurance.id
    );
    setInsuranceListToDisplay(
      insuranceListToDisplay.filter((value) => value.id !== insurance.id)
    );
    formik.setFieldValue('insurances', updatedValues);
  };

  const deleteMedicalAid = (insurance) => {
    cancelClickHandler(insurance);
    formik.handleSubmit(formik.values);
    // show success toast
    toast.success('Medical Aid Deleted Successfully.');
  };

  const handleCheckUncheckAll = (isChecked) => {
    let updatedValues = [];
    if (isChecked) {
      updatedValues = [...insurancesList];
      setInsuranceListToDisplay([...insurancesList]);
      formik.setFieldValue('insurances', updatedValues);
    }
    formik.setFieldValue('insurances', updatedValues);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    const searchRegex = new RegExp(e.target.value, 'i');
    setInsuranceListToDisplay(
      doctor.insurances.filter((insurance) => searchRegex.test(insurance.name))
    );
  };

  return (
    <div className={`${styles.medicalAids}`}>
      <Row
        className={`${styles.profileStatus} align-items-center justify-content-between`}
      >
        <Col className="col-auto">
          <div className="d-flex align-items-center">
            {insuranceListToDisplay.length > 0 ? (
              <>
                <div className={styles.searchBar}>
                  <Form>
                    <Form.Group className="position-relative mb-0">
                      <input
                        className="form=control"
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                      />
                      <Button variant="primary" className={styles.searchBtn}>
                        <Image
                          src="/assets/images/search-icon.svg"
                          alt="Search Icon"
                        />
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
                <div className={`${styles.addMedicalAid} ml-3`}>
                  <Image
                    src="/assets/images/plus.svg"
                    alt="Add Icon"
                    onClick={handleEditAction}
                  />
                </div>
              </>
            ) : null}
          </div>
        </Col>
        {/* <Col className="col-auto text-right">
          <div className={`${styles.progressBarItem} pt-3`}>
            <h6>Medical Aids  16 of 44</h6>
            <ProgressBar now={60} className={`${styles.progressBar}`} />
          </div>
        </Col> */}
      </Row>

      <Row
        style={{ marginTop: 20 }}
        className={
          insuranceListToDisplay.length > 0
            ? ''
            : 'justify-content-center align-items-center'
        }
      >
        {insuranceListToDisplay.length > 0 ? (
          insuranceListToDisplay
            .slice(0, insuranceShowLimit)
            .map((insurance, index) =>
              insurance.id !== 'selectAll' ? (
                <Col
                  lg={4}
                  xl={3}
                  className={`${styles.aidListItem} px-1 mb-2`}
                  key={index}
                >
                  <div className={`${styles.medicalAidItem}`}>
                    <Media className="">
                      {/* <Image
                src="/assets/images/form-logo.png"
                alt="check-icon"
                className={`${styles.listItemIcon} mr-3`}
              /> */}
                      <span className={styles.listItemIcon} />
                      <Media.Body className={`${styles.medicalAidItemTitle}`}>
                        {insurance.name}
                      </Media.Body>
                    </Media>
                    <span
                      className={styles.deleteIcon}
                      onClick={() => {
                        deleteMedicalAid(insurance);
                      }}
                    >
                      <img src="/assets/images/trash.svg" alt="trash" />
                    </span>
                  </div>
                </Col>
              ) : null
            )
        ) : (
          <Col lg={5}>
            <div className={`${styles.notFound} text-center `}>
              <img src="/assets/images/not-found.svg" alt="location" />
              <h4 className="mt-xl-5 mt-4">No Record Found</h4>
              <img
                src="/assets/images/plus.svg"
                alt="location"
                className={`${styles.addBtnIcon} mt-4 `}
                onClick={handleEditAction}
              />
            </div>
          </Col>
        )}
      </Row>
      {insuranceListToDisplay.length > 0 ? (
        <Row className={`my-4 ${styles.bottoms}`}>
          <Col className="text-center">
            {insuranceListToDisplay.length > 20 ? (
              <button
                className={`${styles.viewBtn} btn btn-sm `}
                type="button"
                onClick={() =>
                  setInsuranceShowLimit(
                    insuranceShowLimit === 20
                      ? insuranceListToDisplay.length
                      : 20
                  )
                }
              >
                {insuranceShowLimit > 20 ? 'Show Less' : 'Show More'}{' '}
              </button>
            ) : null}
          </Col>
        </Row>
      ) : null}

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
                    onMultipleSelect(
                      selectedList,
                      'insurances',
                      selectedItem.id === 'selectAll',
                      true
                    )
                  }
                  onRemove={(selectedList, selectedItem) =>
                    onMultipleSelect(
                      selectedList,
                      'insurances',
                      selectedItem.id === 'selectAll',
                      false
                    )
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
                      .map((insurance, index) =>
                        insurance.id !== 'selectAll' ? (
                          <ListingButton
                            classes="d-inline-block mr-3 mb-3"
                            text={insurance.name}
                            icon="cancel-icon.svg"
                            key={index}
                            cancelClickHandler={() =>
                              cancelClickHandler(insurance)
                            }
                          />
                        ) : null
                      )
                  : null}
              </Col>
            </Row>
            <Row className="my-4">
              <Col className="text-right">
                {insuranceListToDisplay.length > 12 ? (
                  <button
                    className={`${styles.viewBtn} btn btn-sm `}
                    type="button"
                    onClick={() =>
                      setModalInsuranceShowLimit(
                        modalInsuranceShowLimit === 12
                          ? insuranceListToDisplay.length
                          : 12
                      )
                    }
                  >
                    {modalInsuranceShowLimit > 12 ? 'Show Less' : 'Show More'}{' '}
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

export default MedicalAids;
