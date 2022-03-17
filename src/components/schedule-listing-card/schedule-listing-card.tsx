import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, } from 'react-bootstrap';
import moment from 'moment';
import styles from './schedule-listing-card.module.scss';

/* eslint-disable-next-line */
export interface ScheduleListingCardProps {
  workingHours: any[];
}

export function ScheduleListingCard({ workingHours }: ScheduleListingCardProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedShifts, setSelectedShifts] = useState([]);

  useEffect(() => {
    if (!workingHours) return;
    setSelectedShifts(flattenShift(workingHours));
  }, [workingHours]);

  const flattenShift = (arr) => {
    let shiftArray = [];
    arr.forEach((workingHour, index) => {
      shiftArray = [...shiftArray, ...workingHour.shifts]
    });

    return shiftArray;
  }

  return (
    <div className={styles.scheduleListingCard}>
      <Card>
        <Card.Header className="bg-white px-2">
          <div className={`${styles.scheduleItems} ${styles.scheduleDays}`}>
            {
              workingHours && workingHours.length > 0 && workingHours.length > 0 ?
                workingHours.map((day, index) =>
                  // className={`${selectedDay === day.dayNumber ? styles.selected : null} mx-1 text-center`}
                  // onClick={() => { setSelectedDay(day.dayNumber); setSelectedShifts(day.shifts) }}
                  day.active && day.shifts?.length > 0 ? (<span key={index} className="mx-1 text-center">
                    {moment().day(day.dayNumber).format("ddd")}
                  </span>
                  ) : null
                ) : null
            }
          </div>
        </Card.Header>
        <Card.Body className="px-2">
          <div className="row px-2">
            {workingHours && workingHours.length > 0 ?
              workingHours.map((day, index) => (
                <div key={index} className={`${styles.scheduleItems} ${styles.scheduleTime}`}>
                  {
                    day.active && day.shifts && day.shifts?.length > 0 ?
                      day.shifts.map((shift, index) => (
                        <span className="mx-1 text-center mb-2 d-block" key={index}>
                          {shift.startTime} - {shift.endTime}
                        </span>
                      )) :
                      null}
                </div>
              )) : null}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ScheduleListingCard;
