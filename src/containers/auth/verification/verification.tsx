import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Auth from '@aws-amplify/auth';

import { Container, Row, Col, Form, InputGroup, Image, Spinner } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useAppContext } from '../../../store';
import { onError } from '../../../utils';
import { LoaderButton } from '../../../components';

import { IForm, initialValues, validationSchema } from './schema';

import styles from './verification.module.scss';
import useForgotPassword from '../../../hooks/useForgotPassword';
import useSignUp from '../../../hooks/useSignUp';

/* eslint-disable-next-line */
export interface VerifyProps {}

export function Verification(props: VerifyProps) {
  const history = useHistory();
  const { email } = queryString.parse(history.location.search);
  const codeEl1 = useRef(null);
  const codeEl2 = useRef(null);
  const codeEl3 = useRef(null);
  const codeEl4 = useRef(null);
  const codeEl5 = useRef(null);
  const codeEl6 = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const { userHasAuthenticated, currentUser, setCurrentUser } = useAppContext();

  const { resendVerificationCode, isLoading: resendCodeLoading, done, error } = useSignUp();

  async function handleSubmit(values: IForm) {
    try {
      setIsLoading(true);

      const username = values.email.split('@')[0];
      await Auth.confirmSignUp(
        username,
        values.firstCharachter +
        values.secondCharachter +
        values.thirdCharachter +
        values.fourthCharachter +
        values.fifthCharachter +
        values.sixthCharachter
      );
      const user = await Auth.signIn(currentUser.email, currentUser.password);
      userHasAuthenticated(true);
      setCurrentUser(user.attributes);
      setIsLoading(false);
      history.push('/profile');
    } catch (error) {
      setIsLoading(false);
      onError(error);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...initialValues, email },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleChange = (e: any, controlName: string) => {
    const {value} = e.target;
    if (value.length === 6) {
      let controlName = '';
      for (let index = 0; index < value.length; index++) {
        if (/^[0-9]$/.test(value[index])) {
          if (index === 0) {
            controlName = 'firstCharachter';
          } else if (index === 1) {
            controlName = 'secondCharachter';
          } else if (index === 2) {
            controlName = 'thirdCharachter';
          } else if (index === 3) {
            controlName = 'fourthCharachter';
          } else if (index === 4) {
            controlName = 'fifthCharachter';
          } else {
            controlName = 'sixthCharachter';
          }
          formik.setFieldValue(controlName, value[index]);
          formik.setFieldTouched(controlName, false);
          formik.setErrors({});
        }
      }
    }
    else if (/^[0-9]$/.test(value) || value === '') {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
      }
  };

  // resend verification code
  const handleResendCode = (email: string) => {
    resendVerificationCode(email);
  }

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      toast.success('Code Sent Successfully.');
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  return (
    <div className={`${styles.contentWrapper}`}>
      <Container fluid className="container-wrapper">
        <Row className="align-items-end justify-content-center">
          <Col md={10} xl={5} className="pr-xl-0">
            <div className={`${styles.formCard}`}>
              <div className={`${styles.formHeader} mb-4 text-center`}>
                <div className={styles.headerLogo}>
                  <Image src="/assets/images/form-logo.png" alt="Logo" />
                </div>
                <h1>Authenticate</h1>
                <h6>Enter the 6 digit code sent to your mobile/email</h6>
              </div>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className="align-items-center justify-content-center text-center my-5">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="-"
                    ref={codeEl1}
                    className={`${styles.verificationCodeFields} mx-1 mx-md-2 ${formik.errors.firstCharachter &&
                      formik.touched.firstCharachter
                      ? `${styles.inValid}`
                      : ''
                      }`}
                    onKeyDown={(e) => {
                      if (/^[0-9]$/.test(e.key)) {
                        setTimeout(() => {
                          codeEl1.current.focus();
                        });
                      }
                    }}
                    {...formik.getFieldProps('firstCharachter')}
                    onChange={(e) => handleChange(e, 'firstCharachter')}
                  />
                  <Form.Control
                    size="lg"
                    ref={codeEl2}
                    type="text"
                    placeholder="-"
                    className={`${styles.verificationCodeFields} mx-1 mx-md-2 ${formik.errors.secondCharachter &&
                      formik.touched.secondCharachter
                      ? `${styles.inValid}`
                      : ''
                      }`}
                    onKeyDown={(e) => {
                      if (/^[0-9]$/.test(e.key)) {
                        setTimeout(() => {
                          codeEl3.current.focus();
                        });
                      }
                    }}
                    {...formik.getFieldProps('secondCharachter')}
                    onChange={(e) => handleChange(e, 'secondCharachter')}
                  />
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="-"
                    ref={codeEl3}
                    className={`${styles.verificationCodeFields} mx-1 mx-md-2 ${formik.errors.thirdCharachter &&
                      formik.touched.thirdCharachter
                      ? `${styles.inValid}`
                      : ''
                      }`}
                    onKeyDown={(e) => {
                      if (/^[0-9]$/.test(e.key)) {
                        setTimeout(() => {
                          codeEl4.current.focus();
                        });
                      }
                    }}
                    {...formik.getFieldProps('thirdCharachter')}
                    onChange={(e) => handleChange(e, 'thirdCharachter')}
                  />
                  <span
                    className={`${styles.verificationCodeFields} mx-0`}
                   />
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="-"
                    ref={codeEl4}
                    className={`${styles.verificationCodeFields} mx-1 mx-md-2 ${formik.errors.fourthCharachter &&
                      formik.touched.fourthCharachter
                      ? `${styles.inValid}`
                      : ''
                      }`}
                    onKeyPress={(e) => {
                      if (/^[0-9]$/.test(e.key)) {
                        setTimeout(() => {
                          codeEl5.current.focus();
                        });
                      }
                    }}
                    {...formik.getFieldProps('fourthCharachter')}
                    onChange={(e) => handleChange(e, 'fourthCharachter')}
                  />
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="-"
                    ref={codeEl5}
                    className={`${styles.verificationCodeFields} mx-1 mx-md-2 ${formik.errors.fifthCharachter &&
                      formik.touched.fifthCharachter
                      ? `${styles.inValid}`
                      : ''
                      }`}
                    onKeyDown={(e) => {
                      if (/^[0-9]$/.test(e.key)) {
                        setTimeout(() => {
                          codeEl6.current.focus();
                        });
                      }
                    }}
                    {...formik.getFieldProps('fifthCharachter')}
                    onChange={(e) => handleChange(e, 'fifthCharachter')}
                  />
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="-"
                    ref={codeEl6}
                    className={`${styles.verificationCodeFields
                      } mx-1 mx-md-2 mr-0 ${formik.errors.sixthCharachter &&
                        formik.touched.sixthCharachter
                        ? `${styles.inValid}`
                        : ''
                      }`}
                    {...formik.getFieldProps('sixthCharachter')}
                    onChange={(e) => handleChange(e, 'sixthCharachter')}
                  />
                </Row>
                <Row className="d-flex justify-content-end">
                  <Col>
                    {resendCodeLoading ? (<Spinner animation="border" />) : (
                      <p className={`${styles.Link}`} onClick={() => { handleResendCode(String(email)) }}>
                        Resend Code
                      </p>
                    )}

                  </Col>
                </Row>
                <Row>
                  <Col className="text-right">
                    <LoaderButton
                      classes="btn btn-primary btn-lg"
                      text="Verify"
                      type="submit"
                      isLoading={isLoading}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col xl={5} className="pl-xl-0 d-none d-xl-block">
            <div className={`${styles.formArtImage} pt-xl-5 pt-4`}>
              <Image
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

export default Verification;
