import { FieldArray, FormikProvider, useFormik } from 'formik';
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useEffect, useRef } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';

import { default as Autocomplete } from 'react-google-autocomplete';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Address } from '@staylowkey/types';
import { Input, LoaderButton, PhoneInput } from '../../../components';
import allergiesList from '../../../data/allergies.json';
import chronicConditionsList from '../../../data/chronic-conditions.json';
import illnessList from '../../../data/illness.json';
import medicationsList from '../../../data/medications.json';
import usePatientUpsert from '../../../hooks/usePatientUpsert';
import { onError } from '../../../utils';
import { IForm, initialValues, validationSchema } from './schema';
import styles from './upsert-patient.module.scss';
/* eslint-disable-next-line */
export interface UpsertPatientProps { }

interface ParamTypes {
  patientId: string;
}

export const useQuery = () => new URLSearchParams(useLocation().search)

export function UpsertPatient(props: UpsertPatientProps) {
  const history = useHistory();

  const { patientId } = useParams<ParamTypes>();

  const medicationDivRef = useRef();


  // get query params
  const query = useQuery();

  // const callerMedicationDetail = query.get('callerMedicationDetail');
  // check if this component is called from patient detail page medication section
  // useEffect(() => {
  //   if (callerMedicationDetail === 'true' && medicationDivRef && medicationDivRef.current) {
  //     medicationDivRef?.current?.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [callerMedicationDetail]);

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

  const handleSubmit = (values: IForm) => {
    const body = { ...values };
    upsertPatient(body);
  };

  const {
    done,
    error,
    isLoading,
    insurancesList,
    patientToEdit,
    patientId: id,
    upsertPatient,
    getPatient,
    getInsurances,
  } = usePatientUpsert();


  useEffect(() => {
    if (done) {
      history.push(`/patients/${id}`);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

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

  // clean up useEfffect
  useEffect(() => () => {
      // clean up hook
    }, []);

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      toast.success(
        patientId
          ? 'Patient Edited Successfully.'
          : 'Patient Added Successfully.'
      );
      formik.resetForm();
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  // get patient details if opened in edit mode
  useEffect(() => {
    (async () => {
      try {
        if (!patientId) return;
        await getPatient(patientId);
      } catch (error) {
        onError(error);
      }
    })();
  }, [patientId]);

  // set form values
  useEffect(() => {
    if (!patientToEdit) return;
    // set initial values for form
    const newValues = { ...patientToEdit };
    formik.setValues(newValues);
  }, [patientToEdit]);

  const onPlaceSelected = (place) => {
    // const formattedAddress = place.formatted_address;
    const formattedAddress: Address = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipcode: '',
      country: ' ',
      area: ' ',
      formattedAddress: ' ',
    };
    place.address_components.forEach((addressComponent) => {
      if (addressComponent.types.includes('street_number')) {
        formattedAddress.addressLine1 = addressComponent.long_name;
      } else if (addressComponent.types.includes('sublocality_level_1')) {
        formattedAddress.addressLine2 = addressComponent.long_name;
      } else if (addressComponent.types.includes('sublocality_level_2')) {
        formattedAddress.area = addressComponent.long_name;
      } else if (addressComponent.types.includes('locality')) {
        formattedAddress.city = addressComponent.long_name;
      } else if (
        addressComponent.types.includes('administrative_area_level_1')
      ) {
        formattedAddress.state = addressComponent.long_name;
      } else if (addressComponent.types.includes('country')) {
        formattedAddress.country = addressComponent.long_name;
      } else if (addressComponent.types.includes('postal_code')) {
        formattedAddress.zipcode = String(addressComponent.long_name);
      }
    });
    formattedAddress.formattedAddress = place.formatted_address;
    formik.setFieldValue('address', formattedAddress);
  };

  const onSingleSelect = (
    selectedList,
    selectedItem,
    controlName,
    controlValue,
    controlKey,
    changeIndex
  ) => {
    const updatedControlValue = [...controlValue];
    updatedControlValue[changeIndex][controlKey] = selectedItem;
    // update control value
    formik.setFieldValue(controlName, updatedControlValue);
  };

  const onMultipleSelect = (selectedList, controlName) => {
    const updatedValues = selectedList;
    // update control value
    formik.setFieldValue(controlName, updatedValues);
  };

  const handleEnterOnAddressfield = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.upsertPatient}>
      <Row>
        <Col>
          <div className="content-body">
            <Form
              noValidate
              onSubmit={formik.handleSubmit}
              className="form-wrap"
            >
              <div className={`${styles.patientInfoBox}`}>
                <div className={`${styles.infoTitle} mb-4`}>
                  <h3>Basic Information</h3>
                </div>
                <Row>
                  <Input
                    groupAs={Col}
                    md="6"
                    icon="full-name.svg"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    formik={formik}
                    {...formik.getFieldProps('firstName')}
                  />
                  <Input
                    groupAs={Col}
                    md="6"
                    icon="full-name.svg"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    formik={formik}
                    {...formik.getFieldProps('lastName')}
                  />
                </Row>
                <Row>
                  <Input
                    groupAs={Col}
                    md="6"
                    icon="email.svg"
                    label="Email Address"
                    placeholder="Email Address"
                    type="text"
                    name="email"
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
                  <Input
                    groupAs={Col}
                    md="6"
                    icon="passport.svg"
                    label="ID/Passport No"
                    placeholder="ID/Passport No"
                    type="text"
                    name="passportNumberOrId"
                    formik={formik}
                    {...formik.getFieldProps('passportNumberOrId')}
                  />
                  <Form.Group as={Col} md={6}>
                    <Form.Control
                      as="select"
                      size="lg"
                      name="gender"
                      {...formik.getFieldProps('gender')}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md={12}>
                    <InputGroup className="mb-4">
                      <Autocomplete
                        className="form-control"
                        placeholder="Address"
                        onKeyPress={handleEnterOnAddressfield}
                        defaultValue={
                          patientId && formik.values.address
                            ? formik.values.address.formattedAddress
                            : ''
                        }
                        onPlaceSelected={onPlaceSelected}
                        types={['address']}
                        componentRestrictions={{ country: 'za' }}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text id="basic-addon1">
                          <img
                            src="assets/images/icons/practice-location.svg"
                            alt="Field Icon"
                          />
                        </InputGroup.Text>
                      </InputGroup.Append>
                      <Form.Label className="text-left form-label">
                        Address
                      </Form.Label>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Input
                    groupAs={Col}
                    md="6"
                    icon="phone.svg"
                    label="Emergency Contact Person Name"
                    placeholder="Emergency Contact Person Name"
                    type="text"
                    name="emergencyContact.name"
                    formik={formik}
                    {...formik.getFieldProps('emergencyContact.name')}
                  />
                  <PhoneInput
                    groupAs={Col}
                    md="6"
                    label="Emergency Contact No"
                    icon="phone.svg"
                    type="text"
                    controlName="emergencyContact.number"
                    name="emergencyContact.number"
                    formik={formik}
                    {...formik.getFieldProps('emergencyContact.number')}
                  />
                </Row>
              </div>
              <div className={`${styles.patientInfoBox}`} ref={medicationDivRef}>
                <div className={`${styles.infoTitle} mb-4`}>
                  <h3>Medical Aid</h3>
                </div>
                <FormikProvider value={formik}>
                  <FieldArray
                    name="insurances"
                    render={({ push, remove }) => (
                      <div>
                        {formik.values.insurances &&
                          formik.values.insurances.map((insurance, index) => (
                            <Row key={index}>
                              <Form.Group as={Col} md={6}>
                                <Multiselect
                                  avoidHighlightFirstOption
                                  options={insurancesList}
                                  isObject={false}
                                  selectionLimit="1"
                                  singleSelect
                                  {...(patientId &&
                                    insurance.name && {
                                    selectedValues: [insurance.name],
                                  })}
                                  placeholder="Name"
                                  name={`insurances[${index}].name`}
                                  {...formik.getFieldProps(
                                    `insurances[${index}].name`
                                  )}
                                  id="css_custom"
                                  style={multiSelectStyle}
                                  displayKey="name"
                                  onSelect={(selectedList, selectedItem) =>
                                    onSingleSelect(
                                      selectedList,
                                      selectedItem,
                                      'insurances',
                                      formik.values.insurances,
                                      'name',
                                      index
                                    )
                                  }
                                />
                              </Form.Group>
                              <Input
                                groupAs={Col}
                                md="6"
                                label="Plan"
                                placeholder="Plan"
                                icon="plan.svg"
                                type="text"
                                name={`insurances[${index}].plan`}
                                formik={formik}
                                {...formik.getFieldProps(
                                  `insurances[${index}].plan`
                                )}
                              />
                              <Input
                                groupAs={Col}
                                md="6"
                                label="Membership No"
                                placeholder="Membership No"
                                icon="membership.svg"
                                type="text"
                                name={`insurances[${index}].membershipNumber`}
                                formik={formik}
                                {...formik.getFieldProps(
                                  `insurances[${index}].membershipNumber`
                                )}
                              />
                              <Input
                                groupAs={Col}
                                md="6"
                                label="Main Member ID"
                                placeholder="Main Member ID"
                                icon="passport.svg"
                                type="text"
                                name={`insurances[${index}].mainMembershipNumber`}
                                formik={formik}
                                {...formik.getFieldProps(
                                  `insurances[${index}].mainMembershipNumber`
                                )}
                              />
                            </Row>
                          ))}
                      </div>
                    )}
                  />
                </FormikProvider>
              </div>
              <div className={`${styles.patientInfoBox}`}>
                <div className={`${styles.infoTitle} mb-4`}>
                  <h3>Medical History</h3>
                </div>
                {/* <FormikProvider value={formik}>
                  <FieldArray
                    name="chronicConditions"
                    render={({ push, remove }) => (
                      <div>
                        {formik.values.chronicConditions &&
                          formik.values.chronicConditions.map(
                            (chronicCondition, index) => (
                              <Row key={index}>
                                <Form.Group
                                  as={Col}
                                  md={6}
                                  label="Chronic Conditions"
                                >
                                  <Multiselect
                                    avoidHighlightFirstOption
                                    options={chronicConditionsList}
                                    isObject={false}
                                    singleSelect
                                    {...(patientId &&
                                      chronicCondition.name && {
                                      selectedValues: [chronicCondition.name],
                                    })}
                                    selectionLimit="1"
                                    placeholder="Chronic Condition"
                                    name={`chronicConditions[${index}].name`}
                                    {...formik.getFieldProps(
                                      `chronicConditions[${index}].name`
                                    )}
                                    id="css_custom"
                                    style={multiSelectStyle}
                                    onSelect={(selectedList, selectedItem) =>
                                      onSingleSelect(
                                        selectedList,
                                        selectedItem,
                                        'chronicConditions',
                                        formik.values.chronicConditions,
                                        'name',
                                        index
                                      )
                                    }
                                  />
                                </Form.Group>
                                <Input
                                  groupAs={Col}
                                  md="6"
                                  label="How long have you had this condition?"
                                  placeholder="How long have you had this condition?"
                                  type="text"
                                  name={`chronicConditions[${index}].duration`}
                                  formik={formik}
                                  icon={
                                    formik.values.chronicConditions.length ===
                                      index + 1
                                      ? 'add-icon.svg'
                                      : 'minus-icon.png'
                                  }
                                  addIcon={
                                    formik.values.chronicConditions.length ===
                                    index + 1
                                  }
                                  removeIcon={
                                    !(
                                      formik.values.chronicConditions.length ===
                                      index + 1
                                    )
                                  }
                                  clickiconhandler={() => {
                                    if (
                                      formik.values.chronicConditions.length ===
                                      index + 1
                                    ) {
                                      // if clicked on last index then add a row
                                      push({
                                        name: '',
                                        duration: '',
                                      });
                                    } else {
                                      // remove row
                                      remove(index);
                                    }
                                  }}
                                  {...formik.getFieldProps(
                                    `chronicConditions[${index}].duration`
                                  )}
                                />
                              </Row>
                            )
                          )}
                      </div>
                    )}
                  />
                </FormikProvider>
                <FormikProvider value={formik}>
                  <FieldArray
                    name="familyIllnesses"
                    render={({ push, remove }) => (
                      <div>
                        {formik.values.familyIllnesses &&
                          formik.values.familyIllnesses.map(
                            (familyIllness, index) => (
                              <Row key={index}>
                                <Form.Group as={Col} md={6}>
                                  <Multiselect
                                    avoidHighlightFirstOption
                                    options={illnessList}
                                    isObject={false}
                                    singleSelect
                                    {...(patientId &&
                                      familyIllness.illnesses && {
                                      selectedValues: [
                                        familyIllness.illnesses,
                                      ],
                                    })}
                                    selectionLimit="1"
                                    placeholder="Family Illness"
                                    name={`familyIllnesses[${index}].illnesses`}
                                    {...formik.getFieldProps(
                                      `familyIllnesses[${index}].illnesses`
                                    )}
                                    id="css_custom"
                                    style={multiSelectStyle}
                                    onSelect={(selectedList, selectedItem) =>
                                      onSingleSelect(
                                        selectedList,
                                        selectedItem,
                                        'familyIllnesses',
                                        formik.values.familyIllnesses,
                                        'illnesses',
                                        index
                                      )
                                    }
                                  />
                                </Form.Group>
                                <Input
                                  groupAs={Col}
                                  md="6"
                                  label="Whom"
                                  placeholder="Whom"
                                  icon={
                                    formik.values.familyIllnesses.length ===
                                      index + 1
                                      ? 'add-icon.svg'
                                      : 'minus-icon.png'
                                  }
                                  type="text"
                                  name={`familyIllnesses[${index}].relation`}
                                  formik={formik}
                                  addIcon={
                                    formik.values.familyIllnesses.length ===
                                    index + 1
                                  }
                                  removeIcon={
                                    !(
                                      formik.values.familyIllnesses.length ===
                                      index + 1
                                    )
                                  }
                                  clickiconhandler={() => {
                                    if (
                                      formik.values.familyIllnesses.length ===
                                      index + 1
                                    ) {
                                      // if clicked on last index then add a row
                                      push({
                                        illnesses: '',
                                        relation: '',
                                      });
                                    } else {
                                      // remove row
                                      remove(index);
                                    }
                                  }}
                                  {...formik.getFieldProps(
                                    `familyIllnesses[${index}].relation`
                                  )}
                                />
                              </Row>
                            )
                          )}
                      </div>
                    )}
                    {...formik.getFieldProps('familyIllnesses')}
                  />
                </FormikProvider> */}
                {/* <Row>
                  <Form.Group as={Col} md={6}>
                    <Multiselect
                      avoidHighlightFirstOption
                      options={allergiesList}
                      isObject={false}
                      name="allergies"
                      placeholder="Allergies"
                      {...(patientId &&
                        formik.values.allergies && {
                        selectedValues: [...formik.values.allergies],
                      })}
                      {...formik.getFieldProps('allergies')}
                      id="css_custom"
                      style={multiSelectStyle}
                      onSelect={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'allergies')
                      }
                      onRemove={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'allergies')
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Multiselect
                      avoidHighlightFirstOption
                      options={medicationsList}
                      isObject={false}
                      name="medications"
                      {...(patientId &&
                        formik.values.medications && {
                        selectedValues: [...formik.values.medications],
                      })}
                      {...formik.getFieldProps('medications')}
                      id="css_custom"
                      placeholder="Medications"
                      style={multiSelectStyle}
                      onSelect={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'medications')
                      }
                      onRemove={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'medications')
                      }
                    />
                  </Form.Group>
                </Row> */}
                <Row>
                  <Form.Group as={Col} md={6}>
                    <Multiselect
                      avoidHighlightFirstOption
                      options={allergiesList}
                      isObject={false}
                      name="drugAllergies"
                      {...(patientId &&
                        formik.values.drugAllergies && {
                        selectedValues: [...formik.values.drugAllergies],
                      })}
                      placeholder="Drug Allergies"
                      {...formik.getFieldProps('drugAllergies')}
                      id="css_custom"
                      style={multiSelectStyle}
                      onSelect={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'drugAllergies')
                      }
                      onRemove={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'drugAllergies')
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Multiselect
                      avoidHighlightFirstOption
                      options={allergiesList}
                      isObject={false}
                      name="foodAllergies"
                      {...(patientId &&
                        formik.values.foodAllergies && {
                        selectedValues: [...formik.values.foodAllergies],
                      })}
                      {...formik.getFieldProps('foodAllergies')}
                      id="css_custom"
                      placeholder="Food Allergies"
                      style={multiSelectStyle}
                      onSelect={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'foodAllergies')
                      }
                      onRemove={(selectedList, selectedItem) =>
                        onMultipleSelect(selectedList, 'foodAllergies')
                      }
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Control
                      as="select"
                      size="lg"
                      name="haveChildren"
                      {...formik.getFieldProps('haveChildren')}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </Form.Control>
                    <Form.Label className="text-left form-label">
                      Do You Have Children ?
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Control
                      as="select"
                      size="lg"
                      name="doYouSmoke"
                      {...formik.getFieldProps('doYouSmoke')}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </Form.Control>
                    <Form.Label className="text-left form-label">
                      Do You Smoke ?
                    </Form.Label>
                  </Form.Group>
                </Row>
                <Row>
                  {/* <Input
                    groupAs={Col}
                    md="12"
                    label="Medication Taken Regularly"
                    placeholder="Medication Taken Regularly"
                    type="string"
                    name="medicationTakenRegularly"
                    formik={formik}
                    as="textarea"
                    rows="5"
                    {...formik.getFieldProps('medicationTakenRegularly')}
                  /> */}
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
              </div>


            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UpsertPatient;
