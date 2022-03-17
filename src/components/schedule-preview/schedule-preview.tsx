import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Calendar from 'react-calendar';
import useAppointment from '../../hooks/useAppointment';
import styles from './schedule-preview.module.scss';
import 'react-calendar/dist/Calendar.css';


/* eslint-disable-next-line */
export interface SchedulePreviewPropsInterface {
  locationId: string;
}

export function SchedulePreview({ locationId }: SchedulePreviewPropsInterface) {
  // use appointment hook
  const {
    done,
    error,
    isLoading,
    slots,
    getSlots
  } = useAppointment();

  // handle calendar date change
  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    // call api to get slot for particular date
    getSlots(formattedDate, locationId);
  }

  // get slots for current date when loading first time
  useEffect(() => {
    const formattedDate = moment(new Date()).format('YYYY-MM-DD');
    // call api to get slot for particular date
    getSlots(formattedDate, locationId);
  }, []);

  return (
    <Row className={styles.scheduleListingCard}>
      <Col md={6} xl={6}>
        {/* <SimpleReactCalendar blockClassName='date_picker' activeMonth={new Date()} /> */}
        {/* <Image src="/assets/images/agenda-calendar.png" alt="agenda-calendar" /> */}
        <Calendar minDate={new Date()} defaultValue={new Date()} onChange={handleDateChange} />
      </Col>
      <Col xl={6}>
        <h4>Schedule</h4>
        <div className={`${styles.appointmentTimeItems} ${styles.selected} my-4`}>
          {
            !isLoading ?
              (slots && slots.length > 0 ?
                (slots.map((slot, index) => (
                  <span key={index} className="mx-1 text-center mb-2">
                    {moment(slot).format('hh:mm A')}
                  </span>))) : <p> No Slots Available</p>)
              : <Spinner animation="border" variant="info" />
          }
        </div>
      </Col>
    </Row>
  );
}

export default SchedulePreview;
