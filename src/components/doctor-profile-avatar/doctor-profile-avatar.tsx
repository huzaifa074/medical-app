import React from 'react';
import { Form } from 'react-bootstrap';
import { InputFile } from '@components';
import styles from './doctor-profile-avatar.module.scss';


/* eslint-disable-next-line */
export interface DoctorProfileAvatarProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  isCallerPatientDetail: boolean;
}

export function DoctorProfileAvatar({ doctor, formik, done, isLoading, isCallerPatientDetail = false }: DoctorProfileAvatarProps) {

  const onImageUpload = async (file: any) => {
    const profilePicture = {
      name: file.name,
      originalUrl: file.url
    };

    if (!isCallerPatientDetail) {
      formik.setValues({ ...doctor, profilePicture });
    } else {
      formik.setValues({ profilePicture });
    }

    formik.handleSubmit();
  }

  const setPreview = (file) => {
    const profilePicture = {
      name: file.name,
      originalUrl: file.url
    };
    doctor.profilePicture = profilePicture;
    formik.setFieldValue('profilePicture', profilePicture);
  }

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className={styles.doctorProfileAvatar}>
        <img src={doctor.profilePicture?.originalUrl || "/assets/images/default-avatar.png"} alt="Profile Avatar" />
        <InputFile
          accept="*"
          className={styles.uploadImages}
          onFileUpload={onImageUpload}
          setPreview={setPreview}
        />
        {formik.errors.picture ? (
          <Form.Control.Feedback type="invalid" className={styles.show}>
            {formik.errors.picture}
          </Form.Control.Feedback>
        ) : (
          ''
        )}
      </Form.Group>
    </Form>
  );
}

export default DoctorProfileAvatar;
