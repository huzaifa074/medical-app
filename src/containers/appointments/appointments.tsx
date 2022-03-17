import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { Sidebar, TopBar, UpsertAppointment } from '@components';

import styles from './appointments.module.scss';

/* eslint-disable-next-line */
export interface AppointmentsProps {}

export function Appointments(props: AppointmentsProps) {
  return (
    <div className={styles.appointments}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        <div className="content-body h-100 ">
          <h2 className="mb-4">Appointment</h2>
          <Row>
            {/* <Image src="/assets/images/agenda-calendar.png" alt="agenda-calendar" /> */}
            <UpsertAppointment />
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Appointments;
