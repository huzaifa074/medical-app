import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Auth from '@aws-amplify/auth';

import { Col, Container, Form, Row, Image } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { onError } from '../../../utils';
import { Input, LoaderButton } from '../../../components';

import { IProfileForm, initialValues, validationSchema } from './schema';

import styles from './change-password.module.scss';
import useChangePassword from '../../../hooks/useChangePassword';

/* eslint-disable-next-line */
export interface ChangePasswordProps {
  toggleModal(flag: boolean): void;
}

export function ChangePassword({ toggleModal }: ChangePasswordProps) {
  const { isLoading, error, done, changePassword } = useChangePassword();

  const history = useHistory();

  async function handleSubmit(values: IProfileForm) {
    changePassword(values);
  }

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      formik.resetForm();
      toggleModal(false);
      toast.success('Your password has changed successfully.');
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={`${styles.contentWrapper} p-0`}>
      <Row className="align-items-end justify-content-center">
        <Col md={12} xl={12}>
          <div className={`${styles.formCard}`}>
            <div className={`${styles.formHeader} mb-4 text-center`}>
              <h1>Change Password</h1>
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
                  icon="password.svg"
                  label="Old Password"
                  placeholder="Old Password"
                  type="password"
                  name="oldPassword"
                  formik={formik}
                  {...formik.getFieldProps('oldPassword')}
                />
              </Row>

              <Row>
                <Input
                  groupAs={Col}
                  md="12"
                  icon="password.svg"
                  label="New Password"
                  placeholder="New Password"
                  type="password"
                  name="newPassword"
                  formik={formik}
                  {...formik.getFieldProps('newPassword')}
                />
              </Row>

              <Row>
                <Input
                  groupAs={Col}
                  md="12"
                  icon="password.svg"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  name="newConfirmPassword"
                  formik={formik}
                  {...formik.getFieldProps('confirmNewPassword')}
                />
              </Row>

              <Row>
                <Col className="text-right">
                  <LoaderButton
                    classes="btn btn-primary btn-lg"
                    text="Change"
                    type="submit"
                    isLoading={isLoading}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default ChangePassword;
