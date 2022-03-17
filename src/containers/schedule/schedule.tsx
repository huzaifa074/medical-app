import { useRouter } from 'next/router';
import React from 'react';
import { Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LoaderButton, ScheduleAccordion } from '@components';
import './schedule.module.scss';

interface ScheduleProps {
  formik: any;
  locationId: string;
  handleSlotIntervalChange: any;
  isLoading: boolean;
}

export function Schedule({ formik, locationId, handleSlotIntervalChange, isLoading }: ScheduleProps) {
  const router = useRouter();
  return (
    <Modal.Body>
      <Row>
        <Col>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <div className="form-header">
              <Row className='d-flex justify-content-end'>
                <Form.Group as={Col} md={4}>
                  <Form.Control
                    as="select"
                    size="lg"
                    name="schedule.slotInterval"
                    {...formik.getFieldProps('schedule.slotInterval')}
                    >
                    <option value={null}>Slot Duration</option>
                    <option value={30}>30 Minutes</option>
                    <option value={60}>1 Hour</option>
                    <option value={90}>1 Hour 30 Minutes</option>
                    <option value={120}>2 Hours</option>
                  </Form.Control>
                </Form.Group>
              </Row>
            </div>
            <div className="form-body">
              <ScheduleAccordion formik={formik} />
            </div>
            <Row className="my-4 justify-content-end">
              <Col className="col-auto text-right">
                <LoaderButton
                  classes="rounded-pill btn btn-primary btn-lg popup-footer-btn"
                  type="submit"
                  text="Save"
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal.Body>
  );
}

export default Schedule;
