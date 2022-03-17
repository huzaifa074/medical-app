import React from 'react';

import { Col, Image, ListGroup, Media, Row } from 'react-bootstrap';
import { DoctorPersonalInformation, DoctorProfileAvatar } from '@components';

import styles from './doctor-profile-card.module.scss';

/* eslint-disable-next-line */
export interface DoctorProfileCardProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
  error: any;
}

export function DoctorProfileCard({
  doctor,
  formik,
  done,
  isLoading,
  error,
}: DoctorProfileCardProps) {
  return (
    <div className={styles.doctorProfileCard}>
      <DoctorProfileAvatar
        doctor={doctor}
        formik={formik}
        done={done}
        isCallerPatientDetail={false}
        isLoading={isLoading}
      />
      <div className="px-3">
        <DoctorPersonalInformation
          doctor={doctor}
          formik={formik}
          done={done}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default DoctorProfileCard;
