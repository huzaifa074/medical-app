import React, { useEffect, useState } from 'react';

import { Modal, DropdownButton, Dropdown, Form, Col, Row, Container } from 'react-bootstrap';
import { Input, LoaderButton } from '@components';
import API from '@aws-amplify/api';

import { useFormik } from 'formik';
import { onError } from '@utils';
import { toast } from 'react-toastify';
import styles from './price-list.module.scss';
import { doctorServiceInitialValues, doctorServiceValidationSchema, DoctorServiceInterface } from '../../containers/doctor-profile/schema';

import useDoctorService from '../../hooks/useDoctorService';

/* eslint-disable-next-line */
export interface PriceListProps {
  doctorId: string;
}

export function PriceList({ doctorId }: PriceListProps) {
  const [showModal, setShowModal] = useState(false);

  const {
    done,
    error,
    isLoading,
    doctorServicesList,
    serviceToEdit,
    getDoctorServices,
    upsertService,
    setServiceToEdit,
    deleteService
  } = useDoctorService();

  // show modal on add new service
  const handleAddNewService = () => {
    setShowModal(true);
  }

  // set service to edit
  const handleEditService = (service: DoctorServiceInterface) => {
    setServiceToEdit(service);
    const newValues = { ...service };
    formik.setValues(newValues);
    setShowModal(true);
  };

  const handleDeleteService = (serviceId: string) => {
    try {
      deleteService(serviceId, doctorId);
    } catch (error) {
      onError(error);
    }
  };

  // onsubmit
  const handleSubmit = (values: any) => {
    const body = { ...values };
    upsertService(body, doctorId);
  }

  // get doctor patient service
  useEffect(() => {
    (async () => {
      try {
        if (!doctorId) return;
        await getDoctorServices(doctorId);
      } catch (error) {
        onError(error);
      }
    })();
  }, [doctorId]);

  // Call on error and update
  useEffect(() => {
    if (done) {
      // show success toast
      toast.success(showModal ?
        serviceToEdit
          ? 'Service Edited Successfully.'
          : 'Service Added Successfully.'
        : 'Service Deleted Successfully.'
      );
      if (showModal) {
        setServiceToEdit(null);
        formik.resetForm();
        setShowModal(false);
      }
    } else if (error) {
      onError(error);
    }
  }, [done, error]);

  // service edit use effect

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: doctorServiceInitialValues,
    validationSchema: doctorServiceValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleOnCancel = () => {
    formik.resetForm();
    setServiceToEdit(null);
    setShowModal(false);
  }

  return (
    <div className={`${styles.services}`}>
      <Row>
        <Col md={6} xl={4} className="mb-xl-4 mb-3 pl-3">
          <div className={`${styles.serviceAdd} ${styles.serviceItem} bg-white bg-white d-flex justify-content-center align-items-center text-center`}>
            <div onClick={handleAddNewService}>
              <img src="/assets/images/plus.svg" alt="Plus Icon" />
              <h2 className="mt-3">Add Service</h2>
            </div>
          </div>
        </Col>
        {doctorServicesList &&
          doctorServicesList.length > 0 &&
          doctorServicesList.map((service) => (
            <Col md={6} xl={4} className="mb-xl-4 mb-3 pl-0" key={service.id}>
              <div className={`${styles.serviceItem} py-4 bg-white`}>
                <DropdownButton
                  className={`${styles.actionBtn} three-dots`}
                  drop="left"
                  variant="link"
                  title="s"
                >
                  <Dropdown.Item eventKey="1" onClick={() => { handleEditService(service) }}>
                    <img src="/assets/images/edit-icon.svg" alt="edit-icon" className="mr-2" />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={() => { handleDeleteService(service.id) }}>
                    <img src="/assets/images/trash.svg" alt="trash-icon" className="mr-2" />
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
                <div className={`${styles.serviceItemContent} text-center`}>
                  <h3 className="font-weight-bold">{service.name}</h3>
                  <h4 className="my-3">{service.price}</h4>
                  <h6>{service.discount}% <span>(Discount)</span></h6>
                  <p>{service.description || 'N/A'}</p>
                </div>
              </div>
            </Col >
          ))
        }
      </Row>
      <Modal show={showModal} onHide={() => handleOnCancel()} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{serviceToEdit ? 'Edit Service' : 'Add New Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-wrap" noValidate onSubmit={formik.handleSubmit} >
            <Row>
              <Input
                groupAs={Col}
                md="12"
                label="Service Name"
                placeholder="Service Name"
                icon="full-name.svg"
                type="text"
                name="name"
                formik={formik}
                {...formik.getFieldProps('name')}
              />
            </Row>

            <Row>
              <Input
                groupAs={Col}
                md="6"
                label="Price"
                placeholder="Price"
                icon="price-icon.svg"
                type="number"
                name="price"
                formik={formik}
                {...formik.getFieldProps('price')}
              />

              <Input
                groupAs={Col}
                md="6"
                label="Discount Price %"
                placeholder="Discount Price"
                icon="price-icon.svg"
                type="number"
                name="discount"
                formik={formik}
                {...formik.getFieldProps('discount')}
              />
            </Row>

            <Row>
              <Input
                groupAs={Col}
                md="12"
                label="Description"
                placeholder="Description"
                type="string"
                name="description"
                formik={formik}
                as="textarea"
                rows="5"
                {...formik.getFieldProps('description')}
              />
            </Row>

            <Row className="my-4">
              <Col className="text-right">
                <LoaderButton
                  classes="btn btn-primary btn-lg"
                  text="Save"
                  type="submit"
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PriceList;
