import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Input, LoaderButton } from "../../../components";
import useForgotPassword from "../../../hooks/useForgotPassword";
import { onError } from '../../../utils';
import styles from './forgot-password.module.scss';
import NewPassword from './new-password/new-password';
import {
  IForgotPasswordForm, initialValues, validationSchema
} from './schema';

export function ForgotPassword() {
  const history = useHistory();

  const {
    error,
    done,
    isLoading,
    isResetCodeRequested,
    userEmail,
    resetCodeClick,
    resetPasswordSubmit,
    forgotPasswordSubmit,
  } = useForgotPassword();


  // clean up
  useEffect(() => () => {
    // clean up
  }, [])

  const handleForgotPasswordSubmit = (values: IForgotPasswordForm) => {
    try {
      forgotPasswordSubmit(values);
    } catch (e) {
      onError(e);
    }
  }

  const forgotPasswordFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleForgotPasswordSubmit,
  });

  const renderForgotPassword = () => (
    <Form noValidate onSubmit={forgotPasswordFormik.handleSubmit} className="form-wrap">
      <Row>
        <Input
          groupAs={Col}
          md="12"
          icon="email.svg"
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          formik={forgotPasswordFormik}
          {...forgotPasswordFormik.getFieldProps('email')}
        />
      </Row>
      <Row>
        <Col className="text-right">
          <LoaderButton
            classes="btn btn-primary btn-lg"
            text="Get Code"
            type="submit"
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Form>
  )

  useEffect(() => {
    if (done) {
      // show success toast
      toast.success(
        'Your password has been updated successfully.'
      );
      history.push('/doctors', undefined);
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  return (
    <div className={`${styles.contentWrapper}`}>
      <Container fluid className="container-wrapper">
        <Row className="justify-content-center">
          <Col md={10} xl={5} className="pr-xl-0">
            <div className={`${styles.formCard}`}>
              <div className={`${styles.formHeader} mb-4 text-center`}>
                <div className={`${styles.headerLogo} mx-auto`}>
                  <Image src="/assets/images/form-logo.png" alt="Logo" />
                </div>
                {isResetCodeRequested ? <h1>Set Password?</h1> : <h1>Forget Password?</h1>}
                <h6>No worries, just enter your email and we'll send you a verification code for resetting your password</h6>
              </div>
              {isResetCodeRequested &&
                <h5 className={styles.verificationCode}>
                  We just sent you a verification code on <a href="{forgotPasswordFormik.values.email}" className="link-primary" rel="noreferrer">{forgotPasswordFormik.values.email}</a>
                </h5>
              }
              {isResetCodeRequested ?
                <NewPassword
                  userEmail={userEmail}
                  isLoading={isLoading}
                  resetCodeClick={resetCodeClick}
                  resetPasswordSubmit={resetPasswordSubmit}
                /> : renderForgotPassword()}
              {/* {isResetCodeRequested ? renderForgotPassword() : renderSetNewPassword()} */}

            </div>
          </Col>
          <Col xl={5} className="pl-xl-0 d-none d-xl-block">
            <div className={`${styles.formArtImage} pt-xl-5 pt-4`}>
              <Image src="/assets/images/main-illustration.svg" alt="auth-forms-art" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
}
export default ForgotPassword;
