import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  PaginationArrows,
  PatientAppointments,
  Sidebar,
  TopBar
} from '@components';
import { onError } from '@utils';
import useAppointment from '../../hooks/useAppointment';
import styles from './consultations.module.scss';

/* eslint-disable-next-line */
export interface ConsultationsProps {}

export function Consultations(props: ConsultationsProps) {
  const history = useHistory();

  const { appointmentList, totalRecords, getAppointments, upsertAppointment, isLoading, done, error } = useAppointment();

  const [page, setPage] = useState(1);

  const [size, setSize] = useState(10);

  useEffect(() => {
    try {
      getAppointments({ page, size });
    } catch (error) {
      onError(error);
    }
  }, [page]);

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

  // handle new appointment
  const handleAddNewAppointment = () => {
    history.push('/appointments');
  }

  return (
    <div className={`${styles.dashboard}`}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        <Row className="mt-3 mb-4 ">
          <Col xl={12} className="pr-xl-0">
            <div className="content-body h-100">
              <Row className={`${styles.appointmentsHeader} align-items-center justify-content-between mb-4`}>
                <Col lg="auto">
                  <h4 className="mb-0">Consultations</h4>
                </Col>
                <Col lg="auto">
                  <Image src="assets/images/icons/add-icon.svg" alt="add-icon" className={styles.addIcon} onClick={handleAddNewAppointment} />
                  <PaginationArrows page={page} size={size} totalRecords={totalRecords} changePage={changePage} />
                </Col>
              </Row>
              <PatientAppointments
                callerPatient={false}
                appointmentList={appointmentList}
                selectedFormatedDate={moment(new Date()).format('DD MMM YYYY')}
                upsertAppointment={upsertAppointment}
                done={done}
                error={error}
                isLoading={isLoading}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Consultations;
