import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Container, Row, Col, Form, Image } from 'react-bootstrap';

import queryString from 'query-string';
import { useAppContext } from '../../../store';
import { onError } from '../../../utils';
import { Input, LoaderButton } from '../../../components';
import useSignIn from '../../../hooks/useSignIn';
import { IForm, initialValues, validationSchema } from './schema';
import styles from './login.module.scss';

export function Login() {
  const router = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { error, isLoading, doctor, signIn } = useSignIn();
  const { userHasAuthenticated, setCurrentUser } = useAppContext();

  useEffect(() => {
    if (doctor !== null) {
      userHasAuthenticated(true);
      setCurrentUser(doctor);
      if (params.redirect) {
        router.push(`${params.redirect}`);
      } else {
        router.push('/');
      }
    } else if (error) {
      onError(error);
    }
  }, [error, doctor]);

  async function handleSubmit({ username, password }: IForm) {
    try {
      signIn({
        userName: username,
        password,
      });
    } catch (error) {
      onError(error);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={`${styles.contentWrapper}`}>
      <Container fluid className="container-wrapper">
        <Row className="justify-content-center">
          <Col md={10} xl={5} className="pr-xl-0">
            <div className={`${styles.formCard}`}>
              <div className={`${styles.formHeader} mb-5 text-center`}>
                <div className={styles.headerLogo}>
                  <Image src="/assets/images/form-logo.png" alt="Logo" />
                </div>
                <h1>Welcome Back Dr.</h1>
                <h6>Enter your credentials below to get started...</h6>
              </div>
              <Form
                noValidate
                onSubmit={formik.handleSubmit}
                className="form-wrap"
              >
                <Row>
                  <Input
                    groupAs={Col}
                    md="12"
                    icon="email.svg"
                    label="Username"
                    placeholder="Username"
                    type="text"
                    name="username"
                    formik={formik}
                    {...formik.getFieldProps('username')}
                  />
                </Row>

                <Row>
                  <Input
                    groupAs={Col}
                    md="12"
                    icon="password.svg"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    formik={formik}
                    {...formik.getFieldProps('password')}
                  />
                </Row>
                <Row className="mb-4 justify-content-between align-items-center">
                  {/* <Col className="col-auto">
                    <Form.Check
                      type="checkbox"
                      label="Keep me logged in"
                      custom
                      inline
                      className={styles.loggedIn}
                    />
                  </Col> */}
                  <Col className="col-auto text-right">
                    <div className={styles.forgotPassword}>
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                  </Col>
                  <Col className="col-auto text-right">
                    <LoaderButton
                      classes="btn btn-primary btn-lg"
                      type="submit"
                      isLoading={isLoading}
                      text="Login"
                    />
                  </Col>
                </Row>
              </Form>
              <div className={`${styles.formFooter} text-center`}>
                <hr className="m-0" />
                <h6
                  className={`${styles.dividerText} d-inline-block bg-white mb-0`}
                >
                  OR
                </h6>
                <p className="mb-0">
                  Don't have an account yet? <Link to="/register">Sign Up</Link>
                </p>
              </div>
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

export default Login;
