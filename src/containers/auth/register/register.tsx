import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Input, LoaderButton, PhoneInput } from '../../../components';
import useSignUp from '../../../hooks/useSignUp';
import { useAppContext } from '../../../store';
import { onError } from '../../../utils';
import styles from './register.module.scss';
import { IForm, initialValues, validationSchema } from './schema';
import useSpeciality from '../../../hooks/useSpeciality';

export function Register() {
  // select style
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

  const router = useHistory();
  const { userHasAuthenticated, setCurrentUser } = useAppContext();
  const { specialitiesList, getSpecialitiesList } = useSpeciality();

  const { done, error, isLoading, signUp } = useSignUp();

  const handleSubmit = (values: IForm) => {
    const body = { ...values };
    signUp(body);
  };

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      setCurrentUser(formik.values);
      router.push(`/verification?email=${formik.values.email}`);
      formik.resetForm();
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

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const onPrimarySpecialityChange = (selectedItem) => {
    const updatedValue = selectedItem;
    // update control value
    formik.setFieldValue('primarySpeciality', updatedValue);
  };

  return (
    <div className={`${styles.contentWrapper}`}>
      <Container fluid className="container-wrapper">
        <Row className="justify-content-center">
          <Col md={10} xl={6} className="pr-xl-0">
            <div className={`${styles.formCard}`}>
              <div className={`${styles.formHeader} text-center`}>
                <div className={`${styles.headerLogo} mx-auto`}>
                  <Image src="/assets/images/form-logo.png" alt="Logo" />
                </div>
                <div className={`${styles.headerContent} mb-4`}>
                  <h1>Account Details</h1>
                  <h6>Staylowkey helps providers reach more new patients.</h6>
                </div>
              </div>
              <div className={`${styles.formCardbody} form-wrap`}>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Row>
                    <Input
                      groupAs={Col}
                      md="6"
                      label="First Name"
                      icon="full-name.svg"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      formik={formik}
                      {...formik.getFieldProps('firstName')}
                    />
                    <Input
                      groupAs={Col}
                      md="6"
                      label="Last Name"
                      icon="full-name.svg"
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
                      md="12"
                      label="Email"
                      icon="email.svg"
                      type="email"
                      name="email"
                      placeholder="Email"
                      formik={formik}
                      {...formik.getFieldProps('email')}
                    />
                  </Row>

                  <Row>
                    <Input
                      groupAs={Col}
                      md="6"
                      label="Password"
                      icon="password.svg"
                      type="password"
                      name="password"
                      placeholder="Password"
                      formik={formik}
                      {...formik.getFieldProps('password')}
                    />
                    {/* Primary Speciality */}
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
                  <Row>
                    <Input
                      groupAs={Col}
                      md="6"
                      label="Passport"
                      icon="passport.svg"
                      type="text"
                      name="passport"
                      placeholder="ID/Passport"
                      formik={formik}
                      {...formik.getFieldProps('passportNumber')}
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
                      label="Practice Number"
                      icon="practice-number.svg"
                      type="text"
                      name="practiceNumber"
                      placeholder="Practice Number"
                      formik={formik}
                      {...formik.getFieldProps('practiceNumber')}
                    />
                    <Input
                    groupAs={Col}
                    md="6"
                    label="Registration Number"
                    icon="practice-number.svg"
                    type="text"
                    name="registrationNumber"
                    placeholder="Registration Number"
                    formik={formik}
                    {...formik.getFieldProps('registrationNumber')}
                    />
                  </Row>

                  <Row className="align-items-center mb-4">
                    <Col md={8} className={`${styles.termsPolicyBox} `}>
                      <Form.Check
                        custom
                        inline
                        type="checkbox"
                        id="termsPolicy"
                        name="termsPolicy"
                        label="Accept our"
                        className={`${
                          formik.errors.termsPolicy &&
                          formik.touched.termsPolicy
                            ? ' is-invalid'
                            : ''
                        } mr-0`}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.termsPolicy && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.termsPolicy}
                        </Form.Control.Feedback>
                      )}
                      <span className={`${styles.termsPolicy} d-inline`}>
                        <a href="/terms-of-use"> Terms of Use</a> and{' '}
                        <a href="/privacy-policy">Privacy Policy</a>
                      </span>
                    </Col>
                    <Col className="text-right">
                      <LoaderButton
                        classes="btn btn-primary btn-lg"
                        text="Register"
                        type="submit"
                        isLoading={isLoading}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className={`${styles.formFooter} text-center`}>
                <hr className="m-0" />
                <h6
                  className={`${styles.dividerText} d-inline-block bg-white mb-0`}
                >
                  OR
                </h6>
                <p className="mb-0">
                  Already have an acccount? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </Col>
          <Col xl={5} className="pl-xl-0 d-none d-xl-block">
            <div className={`${styles.formArtImage} text-right pt-xl-5 pt-4`}>
              <img
                src="/assets/images/main-illustration.svg"
                alt="auth-forms-art"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
