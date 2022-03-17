import { useFormik } from "formik";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input, LoaderButton } from "../../../../components";
import useForgotPassword from "../../../../hooks/useForgotPassword";
import { onError } from "../../../../utils";
import {
    resetPasswordInitialValues,
    resetPasswordValidationSchema,
    IResetPasswordForm
} from '../schema';
import styles from './new-password.module.scss';
  
  

const NewPassword = ({
    userEmail,
    isLoading,
    resetCodeClick,
    resetPasswordSubmit
}) => {

  const handleResetPasswordSubmit = async (values: IResetPasswordForm) => {
    try {
      resetPasswordSubmit(values);
    } catch (e) {
      onError(e);
    }
  }

    const formik = useFormik({
        initialValues: resetPasswordInitialValues,
        validationSchema: resetPasswordValidationSchema,
        onSubmit: handleResetPasswordSubmit,
    });

    async function handleResetCodeClick() {
        try {
            resetCodeClick(userEmail);
            toast.success('Verification code is sent again. Please check your email.');
        } catch (e) {
            onError(e);
        }
    }

    return (

        <Form noValidate onSubmit={formik.handleSubmit} className="form-wrap">
            <Row>
                <Input
                    groupAs={Col}
                    md="12"
                    icon="verification-code.svg"
                    label="Verification Code"
                    placeholder="Verification Code"
                    type="text"
                    name="code"
                    formik={formik}
                    {...formik.getFieldProps('code')}
                />
                <Col onClick={handleResetCodeClick} className="link-primary text-right">
                    <h6>Resend Code?</h6>
                </Col>
            </Row>
            <Row>
                <Input
                    groupAs={Col}
                    md="12"
                    icon="password.svg"
                    label="New Password"
                    placeholder="New Password"
                    type="password"
                    name="password"
                    formik={formik}
                    {...formik.getFieldProps('password')}
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
                    name="confirmPassword"
                    formik={formik}
                    {...formik.getFieldProps('confirmPassword')}
                />
            </Row>
            <Row>
                <Col className="text-right">
                    <LoaderButton
                        classes="btn btn-primary btn-lg"
                        text="Update"
                        type="submit"
                        isLoading={isLoading}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default NewPassword;