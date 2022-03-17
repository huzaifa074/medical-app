import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { FieldArray, FormikProvider } from 'formik';
import moment from 'moment';
import styles from './schedule-accordion.module.scss';

export function ScheduleAccordion({ formik }) {

  const handleTimeInputChange = (value: string, isStartTime: boolean, slotInterval: number, field: string) => {
    let resultantValue = '';
    if (isStartTime) {
      resultantValue = moment(value, 'HH:mm').add(slotInterval, 'minutes').format('HH:mm');
    } else {
      resultantValue = moment(value, 'HH:mm').subtract(slotInterval, 'minutes').format('HH:mm');
    }

    formik.setFieldValue(field, resultantValue);
  }

  return (
    <div className="schedule">
      <Accordion defaultActiveKey="monday">
        {formik.values.schedule.workingHours.map((schedule, index) => (
          <Card className="mb-4 border-bottom" key={schedule.day}>
            <Accordion.Toggle as={Card.Header} className={`${styles.scheduleItem} py-3`} eventKey={schedule.day}>
              <Form.Group controlId="timezone" className="mb-0">
                <Form.Check
                  custom
                  type="checkbox"
                  id={`autoSizingCheck-${schedule.day}`}
                  className="inline-block"
                  checked={formik.values.schedule.workingHours[index].active}
                  {...formik.getFieldProps(`schedule.workingHours[${index}].active`)}
                  label={schedule.day}
                />
                <span className={`${styles.downArrowIcon}`}>
                  <img src="/assets/images/down-arrow.svg" alt="down-arrow" />
                </span>
              </Form.Group>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={schedule.day}>
              <Card.Body>
                <FormikProvider value={formik}>
                  <FieldArray
                    name={`schedule.workingHours[${index}].shifts`}
                    render={(arrayHelpers) => (
                      formik.values.schedule.workingHours[index].shifts
                        .length > 0
                        ? formik.values.schedule.workingHours[index].shifts.map(
                          (shift, shiftIndex) => (
                            <Form.Row key={shiftIndex} className='align-items-center'>
                              <Form.Group as={Col} lg={5} controlId={`startTime-${schedule.day}`}>
                                <Form.Label>Start Time</Form.Label>
                                <input
                                  type="time"
                                  className='form-control'
                                  name={`schedule.workingHours[${index}].shifts[${shiftIndex}].startTime`}
                                  onChange={formik.handleChange}
                                  // onBlur={e => { handleTimeInputChange(e.target.value, true, formik.values.schedule.slotInterval, `schedule.workingHours[${index}].shifts[${shiftIndex}].endTime`) }}
                                  value={formik.values.schedule.workingHours[index].shifts[shiftIndex].startTime}
                                />
                              </Form.Group>
                              <Form.Group as={Col} lg={5} controlId={`endTime-${schedule.day}`}>
                                <Form.Label>End Time</Form.Label>
                                <input
                                  type="time"
                                  className='form-control'
                                  name={`schedule.workingHours[${index}].shifts[${shiftIndex}].endTime`}
                                  onChange={formik.handleChange}
                                  // onBlur={e => { handleTimeInputChange(e.target.value, false, formik.values.schedule.slotInterval, `schedule.workingHours[${index}].shifts[${shiftIndex}].startTime`) }}
                                  value={formik.values.schedule.workingHours[index].shifts[shiftIndex].endTime}
                                />
                              </Form.Group>

                              <Col lg={2} className="text-right">
                                {shiftIndex + 1 ===
                                  formik.values.schedule.workingHours[index]
                                    .shifts.length ? (
                                  <button
                                    type='button'
                                    className={`${styles.addMoreSchedule} btn p-0 mt-3`}
                                    onClick={() => {
                                      arrayHelpers.push({
                                        startTime: '',
                                        endTime: '',
                                      });
                                    }}
                                  >
                                    <img src="/assets/images/plus.svg" alt="Field Icon" />
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    className={`${styles.addMoreSchedule} btn p-0 mt-3`}
                                    onClick={() => {
                                      arrayHelpers.remove(shiftIndex);
                                    }}
                                  >
                                    <img src="/assets/images/trash.svg" alt="Field Icon" />
                                  </button>
                                )}
                                {shiftIndex + 1 ===
                                  formik.values.schedule.workingHours[index]
                                    .shifts.length && shiftIndex >= 1 ? (
                                      <button
                                      type='button'
                                      className={`${styles.addMoreSchedule} btn p-0 mt-3`}
                                      onClick={() => {
                                        arrayHelpers.remove(shiftIndex);
                                      }}
                                    >
                                      <img src="/assets/images/trash.svg" alt="Field Icon" />
                                    </button>
                                    ) : null}
                              </Col>
                            </Form.Row>
                          )) : null
                    )}
                  />
                </FormikProvider>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div >
  );
}

export default ScheduleAccordion;
