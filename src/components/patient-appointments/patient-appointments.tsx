import React, { useEffect } from 'react';
import { Image, Media, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import { onError } from '@utils';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import useAppointment from '../../hooks/useAppointment';
import styles from './patient-appointments.module.scss';

/* eslint-disable-next-line */
export interface PatientAppointmentsProps {
  appointmentList: any[];
  callerPatient: boolean;
  selectedFormatedDate?: string;
  callerUpcoming?: boolean;
  callerPast?: boolean;
  upsertAppointment(body: any, id: string): void;
  isLoading: boolean;
  done: boolean;
  error: any;
}

export function PatientAppointments({
  upsertAppointment,
  isLoading,
  done,
  error,
  appointmentList,
  callerPatient = false,
  callerUpcoming = false,
  callerPast = false,
  selectedFormatedDate,
}: PatientAppointmentsProps) {
  const history = useHistory();

  // update appointment status method
  const updateAppointmentStatus = async (
    status: string,
    updatedAppointment: any
  ) => {
    const body = { status };
    await upsertAppointment(body, updatedAppointment.id);
  };

  // handle appointment edit click
  const handleAppointmentEdit = (appointmentId: string) => {
    history.push(`/appointments/${appointmentId}/edit`);
  };

  // handle appointment start click
  const handleAppointmentStart = (appointmentId: string) => {
    history.push(`/consultation/${appointmentId}`);
  };

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      toast.success('Appointment Status Updated Successfully');
    } else if (error) {
      onError(error);
    }
  }, [done, error]);
  // alert(styles.patientAppointments);
  return appointmentList && appointmentList.length > 0 ? (
    <Table className={`${styles.patientAppointments}`} responsive>
      <thead>
        <tr>
          <th>Time</th>
          <th className={`${styles.patientInfo}`}>Patient</th>
          <th className="text-center">Type</th>
          <th className={`${styles.statusBox}`}>Status</th>
          {callerPatient && (
            <>
              <th>Prescription</th>
              <th>Summary</th>
              <th>Sick Note</th>
              <th>Invoice</th>
            </>
          )}
          <th className="text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {appointmentList.map((appointment, index) => (
          <tr key={index}>
            <td className={`${styles.appointmentDate}`}>
              {/* <dd className={`${styles.date} mb-0`}>{moment(appointment.appointmentAt).format('DD MMM')}</dd> */}
              <dd className={`${styles.date} mb-0`}>
                {moment(appointment.appointmentAt).format('HH:mm')}
              </dd>
              <dd>
                {moment(
                  moment(appointment.appointmentAt).add(30, 'minutes')
                ).format('HH:mm')}
              </dd>
            </td>
            <td style={{ width: 150 }} className={`${styles.patientInfo}`}>
              <Media className={`${styles.patientInfoItem} align-items-center`}>
                <Image
                  src={
                    appointment.patient?.profilePicture?.originalUrl ||
                    '/assets/images/default-avatar.png'
                  }
                  alt="avatar"
                  className={`${styles.doctorAvatar} mr-3`}
                />

                <Media.Body>
                  <h5>{appointment.patient.name}</h5>
                  <p className="mb-0">{appointment.patient.phoneNumber}</p>
                </Media.Body>
              </Media>
            </td>
            <td className="text-center">
              <Image
                src={`/assets/images/${
                  appointment.consultationType === 'online'
                    ? 'online-consultation.svg'
                    : appointment.consultationType === 'home-visit'
                    ? 'home-visit.svg'
                    : 'in-person.svg'
                }`}
                alt="type"
                className={styles.consultationType}
              />
            </td>
            <td style={{ paddingRight: 0 }} className={`${styles.statusBox}`}>
              <span
                className={`${styles.appointmentStatus} ${styles.statusPending}`}
              >
                {appointment.status}
              </span>
            </td>
            {callerPatient && (
              <>
                <td>
                  <Image
                    src="/assets/images/prescription.svg"
                    alt="prescription"
                    className={styles.consultationDetails}
                  />
                </td>
                <td>
                  <Image
                    src="/assets/images/summary.svg"
                    alt="summary"
                    className={styles.consultationDetails}
                  />
                </td>
                <td>
                  <Image
                    src="/assets/images/sick-notes.svg"
                    alt="sick-notes"
                    className={styles.consultationDetails}
                  />
                </td>
                <td>
                  <Image
                    src="/assets/images/invoice.svg"
                    alt="invoice"
                    className={styles.consultationDetails}
                  />
                </td>
              </>
            )}
            <td style={{ display: 'flex' }} className="position-relative">
              <DropdownButton
                className={`${styles.actionBtn} three-dots`}
                drop="left"
                variant="link"
                title="s"
              >
                <Dropdown.Item
                  eventKey="7"
                  onClick={() => handleAppointmentStart(appointment.id)}
                >
                  <Image
                    src="/assets/images/check-icon.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>Start</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="1"
                  onClick={() =>
                    updateAppointmentStatus('CONFIRMED', appointment)
                  }
                >
                  <Image
                    src="/assets/images/check-icon.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>Confirm</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => handleAppointmentEdit(appointment.id)}
                >
                  <Image
                    src="/assets/images/reschedule.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>Reschedule</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  onClick={() =>
                    updateAppointmentStatus('NO_SHOW', appointment)
                  }
                >
                  <Image
                    src="/assets/images/not-show.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>No Show</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="4"
                  onClick={() =>
                    updateAppointmentStatus('CANCELLED', appointment)
                  }
                >
                  <Image
                    src="/assets/images/cancel.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>Cancel</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="5"
                  onClick={() =>
                    updateAppointmentStatus('COMPLETE', appointment)
                  }
                >
                  <Image
                    src="/assets/images/check-icon.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>Complete</span>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="6"
                  onClick={() => handleAppointmentEdit(appointment.id)}
                >
                  <Image
                    src="/assets/images/edit-icon.svg"
                    alt="action-icon"
                    className="mr-2"
                  />
                  <span>Edit</span>
                </Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p className="px-4">
      {callerPatient
        ? callerUpcoming
          ? 'No Upcoming Appointments'
          : callerPast
          ? 'No Past Appointments'
          : 'Today'
        : `No Appointments For ${selectedFormatedDate}`}{' '}
    </p>
  );
}

export default PatientAppointments;
