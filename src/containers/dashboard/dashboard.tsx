import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import {
  PaginationArrows,
  PatientAppointments,
  ScriptRequests,
  Sidebar,
  TopBar,
} from '@components';

import Auth from '@aws-amplify/auth';

import { useAppContext } from '@store';
import { onError } from '@utils';

import moment from 'moment';
import styles from './dashboard.module.scss';
import useAppointment from '../../hooks/useAppointment';
import useDoctorProfile from 'src/hooks/useDoctorProfile';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const history = useHistory();

  const { currentUser, setCurrentUser, userHasAuthenticated } = useAppContext();

  const { getDashboardStats, dashboardStats } = useDoctorProfile();

  const {
    appointmentList,
    totalRecords,
    getAppointmentsForSpecificDate,
    upsertAppointment,
    isLoading,
    done,
    error,
  } = useAppointment();
  const [page, setPage] = useState(1);

  const [size, setSize] = useState(3);

  useEffect(() => {
    getDashboardStats();
  }, []);

  useEffect(() => {
    try {
      getAppointmentsForSpecificDate(
        [
          moment(new Date()).startOf('D').toISOString(),
          moment(new Date()).endOf('D').toISOString(),
        ],
        { page, size }
      );
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
  };

  return (
    <div className={`${styles.dashboard}`}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        <Row>
          <Col xl={8} className="pr-xl-0">
            <div className="content-body h-100 d-flex align-items-center">
              <Row className="align-items-center">
                <Col xl={8}>
                  <div className={`${styles.welcomeBox}`}>
                    <h1 className="mb-0">Welcome Back!!</h1>
                    <h2 className="font-italic">{currentUser.name}!</h2>
                    <p className="my-3">
                      Happy Monday! we wish you a productive day ahead. your
                      agenda for today is shown below, alternatively You can
                      update your availability using the doctor icon on your
                      left.{' '}
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => history.push('/agenda')}
                    >
                      Agenda
                    </Button>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className={`${styles.welcomeBoxArt}`}>
                    <Image src="/assets/images/welcome.svg" alt="welcome" />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={6} xl={4}>
            <div className="content-body h-100 ">
              <div className={`${styles.reportStats} text-center`}>
                <div className={styles.reportsIcon}>
                  <Image
                    src="/assets/images/sidebar-icons/reports-active.svg"
                    alt="reports"
                  />
                </div>
                <ListGroup
                  className={`${styles.reportStatsItems} my-3`}
                  variant="flush"
                >
                  <ListGroup.Item className="border-0 px-0 py-2">
                    <span className={`${styles.counts}`}>
                      {dashboardStats?.totalAppointments}
                    </span>
                    Appointments
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0 px-0 py-2">
                    <span className={`${styles.counts}`}>
                      {dashboardStats?.totalPatients}
                    </span>
                    Patients
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0 px-0 py-2">
                    <span className={`${styles.counts}`}>28</span>
                    Repeat Scripts Request
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="primary"
                  onClick={() => history.push('/reports')}
                >
                  View Reports
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 mb-4 ">
          <Col xl={8} className="pr-xl-0">
            <div className="content-body h-100">
              <Row
                className={`${styles.appointmentsHeader} align-items-center justify-content-between mb-4`}
              >
                <Col lg="auto">
                  <h4 className="mb-0">
                    Today's Appointments -{' '}
                    <span>{moment(new Date()).format('DD MMM YYYY')}</span>
                  </h4>
                </Col>
                <Col lg="auto">
                  <Image
                    src="assets/images/icons/add-icon.svg"
                    alt="add-icon"
                    className={styles.addIcon}
                    onClick={handleAddNewAppointment}
                  />
                  <PaginationArrows
                    page={page}
                    size={size}
                    totalRecords={totalRecords}
                    changePage={changePage}
                  />
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
          <Col md={6} xl={4}>
            <div className="content-body h-100 ">
              <ScriptRequests />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
