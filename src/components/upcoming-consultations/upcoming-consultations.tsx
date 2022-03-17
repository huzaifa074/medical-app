import React, { useEffect, useState } from 'react';
import { onError } from '@utils';
import useAppointment from '../../hooks/useAppointment';
import PatientAppointments from '../patient-appointments/patient-appointments';
import styles from './upcoming-consultations.module.scss';
import moment from 'moment';
import { Col, Container, Image, Row, Spinner, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { PaginationArrows } from '@components';

/* eslint-disable-next-line */
export interface UpcomingConsultationsProps {
  patientId: any;
}

export function UpcomingConsultations({
  patientId,
}: UpcomingConsultationsProps) {
  const {
    appointmentList,
    getAppointments,
    upsertAppointment,
    isLoading,
    totalRecords,
    done,
    error,
    getAppointmentsForSpecificDate,
  } = useAppointment();

  const [appointments, setAppointments] = useState([]);

  const [selectedDay, setSelectedDay] = useState();

  const [page, setPage] = useState(1);

  const [size, setSize] = useState(10);

  useEffect(() => {
    setAppointments(appointmentList);
  }, [appointmentList]);

  useEffect(() => {
    try {
      getAppointments({ page, size }, patientId, false);
    } catch (error) {
      onError(error);
    }
  }, [patientId]);

  // handle calendar date change
  const handleDateChange = async (date) => {
    // set selected date
    try {
      await getAppointmentsForSpecificDate(
        [
          moment(date).startOf('D').toISOString(),
          moment(date).endOf('D').toISOString(),
        ],
        { page: 1, size: 500 },
        patientId
      );
    } catch (error) {
      onError(error);
    }
  };

  const handleDayClick = (e) => {
    const day = e.target.value;
    if (selectedDay === day) {
      setSelectedDay(null);
      getAppointments({ page: 1, size }, patientId, true);
    } else {
      setSelectedDay(day);
      handleDateChange(day);
    }
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
    <div className={styles.upcomingConsultations}>
      {/* calendar */}
      <Row>
        <Col
          className={styles.calender}
          md={6}
          xl={4}
          style={{ marginTop: 100, paddingLeft: 0, paddingRight: 10 }}
        >
          <Form.Group>
            <input type="date" min={new Date().toISOString().split("T")[0]} value={selectedDay} onChange={handleDayClick} />
          </Form.Group>
        </Col>
        </Row>
      <Row>
        <Col
          xl={12}
          style={{
            padding: 0,
            paddingRight: 44,
            paddingLeft: 8,
            marginTop: 100,
          }}
        >
          <Row className="justify-content-end">
            <PaginationArrows
              page={page}
              size={size}
              totalRecords={totalRecords}
              changePage={changePage}
            />
          </Row>
          <PatientAppointments
            callerPatient={selectedDay ? false : true}
            callerUpcoming={true}
            selectedFormatedDate={selectedDay}
            appointmentList={appointments}
            upsertAppointment={upsertAppointment}
            isLoading={isLoading}
            done={done}
            error={error}
          />
        </Col>
      </Row>
    </div>
  );
}

export default UpcomingConsultations;
