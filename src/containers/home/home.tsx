import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Col, Container, Image, ListGroup, Row, } from 'react-bootstrap';
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

import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const router = useHistory();

  const {
    currentUser,
  } = useAppContext();

  return (
    <div className={`${styles.dashboard}`}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        <Row >
          <Col xl={8} className="pr-xl-0">
            <div className="content-body h-100">
              <Row className="justify-content-between">
                <Col xl={8}>
                  <div className={`${styles.welcomeBox}`}>
                    <h1 className="mb-0">Welcome Back!</h1>
                    <h2 className="font-italic">{currentUser.name}!</h2>
                    <p className="my-3">Happy Monday! we wish you a productive day ahead. your agenda for today is shown below, alternatively You can update your availability using the doctor icon on your left. </p>
                    <Button variant="primary">Agenda</Button>
                  </div>
                </Col>
                <Col xl={4} className="text-right">
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
                  <Image src="/assets/images/sidebar-icons/reports-active.svg" alt="reports" />
                </div>
                <div className={`${styles.reportStatsItems}`}>
                  <ListGroup className="my-3" variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-2">
                      <span className={`${styles.counts}`}>288</span>
                      Appointments
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-2">
                      <span className={`${styles.counts}`}>508</span>
                      Patients
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-2">
                      <span className={`${styles.counts}`}>28</span>
                      Repeat Scripts Request
                    </ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">View Reports</Button>
                </div>
              </div>
            </div>
          </Col>

        </Row>
        <Row className="mt-3 mb-4 ">
          <Col xl={8} className="pr-xl-0">
            <div className="content-body h-100">
              <Row className={`${styles.appointmentsHeader} align-items-center justify-content-between mb-4`}>
                <Col lg="auto">
                  <h4 className="mb-0">Today's Appointments - <span>25 March 2021</span></h4>
                </Col>
                <Col lg="auto">
                  <a href="/appointments">
                    <Image src="assets/images/icons/add-icon.svg" alt="add-icon" className={`${styles.addIcon} mr-3`} />
                  </a>
                  {/* <PaginationArrows /> */}
                </Col>
              </Row>
              {/* <PatientAppointments /> */}
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

export default Home;
