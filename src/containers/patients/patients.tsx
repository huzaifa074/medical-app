import API from '@aws-amplify/api';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Dropdown,
  DropdownButton,
  Image,
  Media,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { onError } from '@utils';
import usePatientsListing from '../../hooks/usePatientsListing';
import styles from './patients.module.scss';
import { PatientCard } from '../../components/patient-card/patient-card';

/* eslint-disable-next-line */
export interface PatientsProps {}

export function Patients(props: PatientsProps) {
  const history = useHistory();

  const {
    error,
    isLoading,
    patients,
    totalRecords,
    getListing,
  } = usePatientsListing();

  const [page, setPage] = useState(1);

  const [size, setSize] = useState(7);

  useEffect(() => {
    try {
      getListing({ page, size: 7 });
    } catch (error) {
      onError(error);
    }
  }, [page]);

  const handleAddPatientClick = () => {
    history.push('patients/add');
  };

  const handlePatientDetailsClick = (patientId) => {
    history.push(`patients/${patientId}`);
  };

  const handleEditPatientClick = (patientId) => {
    history.push(`patients/${patientId}/edit`);
  };

  const changePage = (direction: string) => {
    if (direction === 'next') {
      if (totalRecords > page * size) {
        setPage(page + 1);
      }
    } else if (direction === 'back') {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };

  return (
    <div className={`${styles.patients}`}>
      <div className="content-body">
        <Row
          className={`${styles.profileStatus} align-items-center justify-content-between mb-3`}
        >
          <Col className="col-auto">
            <h1 className={styles.cardTitle}>My Patients Profiles</h1>
          </Col>
          
          <Col className="col-auto text-right">
            <div className="pt-3">
              <h6>{`Available patient profile ${page} of ${Math.ceil(totalRecords / size) || 1}`}</h6>
              <ProgressBar now={(page * 100) / (totalRecords / size)} className={`${styles.progressBar}`} />
            </div>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Col md={4} className="text-right">
            <div className={`${styles.paginationArrows} d-inline-flex`}>
              <span
                className={`${styles.arrowIcons} mr-3`}
                onClick={() => changePage('back')}
                title="Previous"
              >
                <Image
                  src={`/assets/images/${page > 1 ? 'left-arrow-active.svg' : 'left-arrow.svg'
                    }`}
                  alt="arrow-icons"
                />
              </span>
              <span
                className={`${styles.arrowIcons}`}
                onClick={() => changePage('next')}
                title="Next"
              >
                <Image
                  src={`/assets/images/${totalRecords > page * size
                    ? 'right-arrow-active.svg'
                    : 'right-arrow.svg'
                    }`}
                  alt="arrow-icons"
                />
              </span>
            </div>
          </Col>
        </Row>

        <Row className={`${styles.patientProfiles} pt-4`}>
          {page === 1 ?
            (
              <Col md={6} lg={4} xl={3} className="mb-xl-4 mb-3 pl-3">
                <div
                  className={`${styles.addNew} ${styles.patientsListItem} d-flex justify-content-center align-items-center text-center`}
                >
                  <div onClick={handleAddPatientClick}>
                    <Image src="/assets/images/add.svg" alt="Plus Icon" />
                    <h2 className="mt-3">Create New Patient Profile</h2>
                  </div>
                </div>
              </Col>
            ) : null}

            
          {patients.map((patient, index) => (
            <PatientCard
              key={index}
              patient={patient}
              editPatientHandler={handleEditPatientClick}
              patientDetailHandler={handlePatientDetailsClick}
            />
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Patients;
