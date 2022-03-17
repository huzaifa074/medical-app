import {
  PaginationArrows,
  PatientAppointments,
  Sidebar,
  TopBar
} from '@components';
import { onError } from '@utils';
import moment from 'moment';
import React, { useState } from 'react';
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import DayPicker ,{ LocaleUtils }from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import  './cssmodules.css'
import "react-day-picker/lib/style.css";
import { useHistory } from 'react-router-dom';
import useAppointment from '../../hooks/useAppointment';
import styles from './agenda.module.scss';



/* eslint-disable-next-line */
export interface AgendaProps { }

export function Agenda(props: AgendaProps) {

  const history = useHistory();

  const { appointmentList, totalRecords, getAppointmentsForSpecificDate, upsertAppointment, isLoading, done, error } = useAppointment();

  const [page, setPage] = useState(1);

  const [size, setSize] = useState(5);

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDaysWithAppointments, setSelectedDaysWithAppointment] = useState([]);
  const [active, setactive] = useState(0)

  // handle calendar date change
  const handleDateChange = async (date) => {
    // set selected date
    try {
      const appointments = await getAppointmentsForSpecificDate([moment(date).startOf('D').toISOString(), moment(date).endOf('D').toISOString()], { page: 1, size: 500 });
      setSelectedDaysWithAppointment([...selectedDaysWithAppointments, { date: moment(date).format('DD MMM'), appointments: appointments }].sort((a, b) => moment(b.date).unix() - moment(a.date).unix()));
    } catch (error) {
      onError(error);
    }
  }

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

  const handleDayClick = (day, modifier, event) => {
    const dayIndex = selectedDays.findIndex(selectedDay => moment(selectedDay).unix() === moment(day).unix());
    if (dayIndex === -1) {
      setSelectedDays([...selectedDays, day].sort((a, b) => moment(b).unix() - moment(a).unix()));
      handleDateChange(day);
    } else {
      setSelectedDays([...selectedDays.filter((day, index) => index !== dayIndex)]);
      setSelectedDaysWithAppointment([...selectedDaysWithAppointments.filter((day, index) => index !== dayIndex)].sort((a, b) => moment(b.date).unix() - moment(a.date).unix()));
    }
  };
const WEEKDAYS_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
 
function formatWeekdayShort(i, locale) {
  return WEEKDAYS_SHORT[i];
}
  return (
    <div className={`${styles.agenda}`}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        <div className={`content-body h-100 ${styles.container}`}>
          <h2 className="mb-4">Agenda</h2>
          <Row>
            <Col className={styles.calender} md={6} xl={5}>
              {/* <Image src="/assets/images/agenda-calendar.png" alt="agenda-calendar" /> */}
              {/* <SimpleReactCalendar activeMonth={new Date()} /> */}
              {/* <Calendar defaultValue={new Date()} onChange={handleDateChange} selectRange /> */}
              <div className={styles.flex}> 
              <span className={active===0?styles.button:styles.focusButton} onClick={()=>{setactive(0)}}>Today </span>
               <span className={active===1?styles.button:styles.focusButton} onClick={()=>{setactive(1)}}>This week</span>
                <span className={active===2?styles.button:styles.focusButton} onClick={()=>{setactive(2)}}>Next week</span> </div>
              <DayPicker
          
                onDayClick={handleDayClick}
                selectedDays={selectedDays} 
                localeUtils={ { ...LocaleUtils, formatWeekdayShort } }
            
                />
            </Col>
            <Col xl={7} style={{padding:0}}>
              <Row className={`${styles.appointmentsHeader} align-items-center justify-content-between`}>
                <Col lg="auto">
                  <h3>Your Agenda</h3>
                </Col>
                
                <Col lg="auto">
                  <Image src="assets/images/icons/add-icon.svg" alt="add-icon" className={styles.addIcon} onClick={handleAddNewAppointment} />
                  <PaginationArrows page={page} size={size} totalRecords={totalRecords} changePage={changePage} />
                </Col>
              </Row>
              {selectedDaysWithAppointments.length > 0 && selectedDaysWithAppointments.map((appointment, index) => (
                <div key={index} className="mb-3">
                  <Row>
                    <Col lg="auto">
                      <h4 className={`${styles.currentDate}`}>{appointment.date}</h4>
                    </Col>
                  </Row>
                  <PatientAppointments
                    callerPatient={false}
                    appointmentList={appointment.appointments}
                    selectedFormatedDate={appointment.date}
                    upsertAppointment={upsertAppointment}
                    done={done}
                    error={error}
                    isLoading={isLoading}
                  />
                </div>
              ))}
              {isLoading && <Spinner animation="border" variant="info" />}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Agenda;
