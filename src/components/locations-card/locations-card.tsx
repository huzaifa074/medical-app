import React, { useState } from 'react';
import { Col, Image, Media, Row, Modal } from 'react-bootstrap';
import styles from './locations-card.module.scss';

import { ScheduleListingCard } from '../schedule-listing-card/schedule-listing-card';
import SchedulePreview from '../schedule-preview/schedule-preview';

/* eslint-disable-next-line */
export interface LocationsProps {
  doctor: any,
  handleAddEditLocation: (any) => void,
  handleEditSchedule: (any) => void
}
// location card component

export function LocationsCard({ doctor, handleAddEditLocation, handleEditSchedule }: LocationsProps) {
  // for preview modal
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const previewModal = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowModal(true);
  }
  return (
    <div className={`${styles.locations}`}>
      {doctor.practiceLocations && doctor.practiceLocations.length > 0 ?
        <>
          {doctor.practiceLocations.map(location => (
            <div key={location.id}>
              <Row>
                <Col sm={12} >
                  <h6 className={`${styles.editSchedule} text-right mb-3`}>
                    <span onClick={() => { handleEditSchedule(location) }} >Edit Schedule</span>
                    <span>
                      <Image src="/assets/images/edit-icon.svg" alt="edit-icon" className="ml-2" />
                    </span>
                  </h6>
                </Col>
                <Col lg={4} xl={3} className="pl-xl-0">
                  <div className={`${styles.locationListItem}`}>
                    <Media>
                      <Image src="/assets/images/location-icon.svg" alt="location" className="mr-3" />
                      <Media.Body>
                        <div className='d-flex justify-space-between'>
                          <h5>{location.name}</h5>
                          <span>
                            <Image
                              src="/assets/images/edit-icon.svg"
                              className={`${styles.editIcon} ml-2`}
                              onClick={() => { handleAddEditLocation(location) }}
                              alt="edit-icon"
                            />
                          </span>
                        </div>
                        <p>{location.formattedAddress}</p>
                        <h6 onClick={() => { previewModal(location.id) }}>Preview Schedule</h6>
                      </Media.Body>
                    </Media>
                  </div>
                </Col>
                <Col lg={8} xl={9} className="pl-xl-0">
                  <ScheduleListingCard workingHours={location.schedule?.workingHours} />
                </Col>
              </Row>
              <hr className="my-4" />
            </div>
          ))}
          <Row className="align-items-center">
            <Col md={12} className={`${styles.addMoreLocation} text-center `}>
              <Image src="./assets/images/add.svg" alt="add" className="mr-2" />
              <span className="pt-1" onClick={() => handleAddEditLocation(null)}>Add More</span>
            </Col>
          </Row>
        </>
        :
        (<Row className={`justify-content-center align-items-center `}>
          <Col lg={5}>
            <div className={`${styles.locationNotFound} text-center `}>
              <img src="/assets/images/not-found.svg" alt="location" />
              <h4 className="mt-xl-5 mt-4">No Record Found</h4>
              <img
                src="/assets/images/plus.svg"
                alt="location"
                className={`${styles.addLocation} mt-4 `}
                onClick={() => handleAddEditLocation(null)}
              />
            </div>
          </Col>
        </Row>)}

      <Modal
        show={showModal}
        onHide={() => { setShowModal(false); setSelectedLocation(null); }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Schedule Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-4">
          <SchedulePreview locationId={selectedLocation}/>
        </Modal.Body>
      </Modal>
    </div >
  );
}

export default LocationsCard;
