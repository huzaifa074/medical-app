import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Image,
  Media,
  Modal,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import {
  Input,
  LoaderButton,
  ListingButton,
  QualificationListingTable,
} from '@components';

import { useFormik } from 'formik';
import AsyncSelect from 'react-select/async';
import { onError } from '@utils';
import * as _ from 'lodash';
import { API } from 'aws-amplify';
import useSearchInstite from '../../hooks/useSearchInstite';
import {
  Qualification,
  qualificationInitialValues,
  qualificationValidationSchema,
} from '../../containers/doctor-profile/schema';
import styles from './qualifications.module.scss';
import { generateYears } from '../../utils/generateYears';

/* eslint-disable-next-line */
export interface QualificationsProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
}

export function Qualifications({
  doctor,
  formik,
  done,
  isLoading,
  error,
}: QualificationsProps) {
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

  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [qualificationIndex, setQualificationIndex] = useState();

  const handleEditAction = () => {
    setShowModal(true);
  };

  const [yearsList, setYearsList] = useState([]);

  const { institutesList, getInstitutesList } = useSearchInstite();

  useEffect(() => {
    setYearsList(generateYears(40));
  }, []);

  useEffect(() => {
    if (done) {
      qualificationFormik.resetForm();
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  const [debounce, setDebounce] = useState<any>({});

  useEffect(() => {
    const { cb, delay } = debounce;
    if (cb) {
      const timeout = setTimeout(cb, delay);
      return () => clearTimeout(timeout);
    }
  }, [debounce]);

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setDebounce({
        cb: async () => {
          if (!inputValue) return;
          const { items } = await API.get('API', `/institutes`, {
            queryStringParameters: { q: inputValue },
          });
          const optionsList = items.map((institute) => ({
            ...institute,
            label: institute.name,
          }));
          resolve(optionsList);
        },
        delay: 500, // ms
      });
    });

  const handleQualificationSubmit = (values: Qualification) => {
    if (!editMode) {
      formik.setValues({
        ...doctor,
        qualifications: [...doctor.qualifications, values],
      });
    } else {
      setEditMode(false);
      setQualificationIndex(null);
      formik.setValues({
        ...doctor,
        qualifications: [
          ...doctor.qualifications.filter(
            (qualification, index) => index !== qualificationIndex
          ),
          values,
        ],
      });
    }
    formik.handleSubmit();
  };

  const handleEditQualification = (qualification, index) => {
    setEditMode(true);
    setShowModal(true);
    setQualificationIndex(index);
    const qualificationObj = _.cloneDeep(qualification);
    qualificationFormik.setValues(qualificationObj);
  };

  const handleDeleteQualification = (deleteIndex) => {
    formik.setValues({
      ...doctor,
      qualifications: [
        ...doctor.qualifications.filter(
          (qualification, index) => index !== deleteIndex
        ),
      ],
    });
    qualificationFormik.resetForm();
    formik.handleSubmit();
  };

  const qualificationFormik = useFormik({
    enableReinitialize: true,
    initialValues: qualificationInitialValues,
    validationSchema: qualificationValidationSchema,
    onSubmit: handleQualificationSubmit,
  });

  const onInstituteChange = (selectedItem) => {
    const updatedValue = selectedItem;
    // update control value
    qualificationFormik.setFieldValue('institute', updatedValue);
  };

  const handleAddQualification = () => {
    setShowModal(true);
    setEditMode(false);
    qualificationFormik.resetForm();
  };

  //////async styles
  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      position: 'relative;',
      borderBottom: '1px solid #dee2e6',
      width: '100%',
    }),
    indicatorsContainer: () => ({
      // none of react-select's styles are passed to <Control />
      position: 'absolute',
      top: 0,
      right: 0,
    }),

    // indicatorSeparator: () => ({
    //   alignSelf: `stretch`,
    //   backgroundColor: `hsl(0, 0%, 80%)`,
    //   // marginBottom: `0px`,
    //   // marginTop: `8px`,
    //   width: `1px`,
    //   boxSizing: `border-box`,
    //   marginLeft: `27px`,
    //   display: 'none',
    // }),

    loadingIndicator: () => ({
      // color: 'hsl(0, 0%, 40%)',
      // display: `flex`,
      // padding: `8px`,
      alignSelf: `center`,
      fontSize: `4px`,
      // lineHeight: `1`,
      // marginRight: `24px`,
      // textAlign: `center`,
      // verticalAlign: `middle`,
      // boxSizing: `border-box`,
      position: 'absolute',
      top: 14,
      left: '-20px',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className={`${styles.qualifications} my-xl-5 my-4`}>
      <Row className="w-100 m-0">
        {doctor.qualifications.length > 0 ? (
          <Col lg={12}>
            <QualificationListingTable
              qualifications={doctor.qualifications}
              showEditIcon
              showAddIcon
              addQualificationHandler={handleAddQualification}
              editQualificationHandler={handleEditQualification}
              deleteQualificationHandler={handleDeleteQualification}
              tableheaderColor={false}
            />
          </Col>
        ) : (
          <Col md={4}>
            <div
              className={`${styles.qualificationAddBtn} d-flex align-items-center`}
              onClick={handleEditAction}
            >
              <div className={styles.btnIcon}>
                <Image src="/assets/images/student.svg" alt="qualification" />
              </div>
              <h6>Add qualifications</h6>
            </div>
          </Col>
        )}
      </Row>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        dialogClassName={styles.modal}
        contentClassName={styles.content}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add your Qualification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="form-wrap mb-4"
            noValidate
            onSubmit={qualificationFormik.handleSubmit}
          >
            <Row>
              <Input
                groupAs={Col}
                md="12"
                icon="qualifications.svg"
                label="Qualification"
                placeholder="Qualification"
                type="text"
                name="degreeTitle"
                formik={qualificationFormik}
                {...qualificationFormik.getFieldProps('degreeTitle')}
              />
            </Row>

            <Row>
              <Form.Group
                as={Col}
                md={6}
                icon="institution.svg"
                className="my-auto"
                style={{ paddingTop: 10 }}
              >
                <AsyncSelect
                  cacheOptions
                  defaultOptions={false}
                  isClearable
                  className="basic-single"
                  classNamePrefix="select"
                  name="institute"
                  styles={customStyles}
                  onChange={onInstituteChange}
                  loadOptions={(inputValue) => promiseOptions(inputValue)}
                  value={qualificationFormik.values.institute}
                  onInputChange={(e) => e}
                  getOptionLabel={(option) => option.name}
                />
                {qualificationFormik.errors &&
                qualificationFormik.touched.institute &&
                qualificationFormik.errors.institute ? (
                  <div className="invalid-feedback d-block">
                    Institute is required
                  </div>
                ) : null}

                <Form.Label
                  style={{ top: -15, color: '#00c2cb' }}
                  className="text-left form-label"
                >
                  Select Institute
                </Form.Label>
              </Form.Group>

              <Form.Group
                as={Col}
                md={6}
                icon="completion-year.svg"
                className="my-auto"
              >
                <Form.Control
                  as="select"
                  size="lg"
                  name="complitionYear"
                  {...qualificationFormik.getFieldProps('complitionYear')}
                >
                  <option value="">Select Complition Year</option>
                  {yearsList.length > 0
                    ? yearsList.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))
                    : null}
                </Form.Control>

                <Form.Label className="text-left form-label">
                  Complition Year
                </Form.Label>
                {qualificationFormik.errors &&
                qualificationFormik.touched.complitionYear &&
                qualificationFormik.errors.complitionYear ? (
                  <div className="invalid-feedback d-block">
                    Complition year is required
                  </div>
                ) : null}
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
          {doctor.qualifications.length > 0 ? (
            <QualificationListingTable
              qualifications={doctor.qualifications}
              showAddIcon={false}
              showEditIcon
              addQualificationHandler={handleAddQualification}
              editQualificationHandler={handleEditQualification}
              deleteQualificationHandler={handleDeleteQualification}
              tableheaderColor={true}
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Qualifications;
