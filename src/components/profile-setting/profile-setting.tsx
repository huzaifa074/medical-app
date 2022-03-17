import React, { useEffect, useState } from 'react';

import {
  Modal,
  DropdownButton,
  Dropdown,
  Form,
  Col,
  Row,
  Container,
  Image,
  Button,
} from 'react-bootstrap';
import { Input, LoaderButton } from '@components';
import API from '@aws-amplify/api';
import axios from 'axios';
import { useFormik } from 'formik';
import { onError } from '@utils';
import { toast } from 'react-toastify';
import styles from './profile-setting.module.scss';
import {
  doctorServiceInitialValues,
  doctorServiceValidationSchema,
  DoctorServiceInterface,
} from '../../containers/doctor-profile/schema';
import AnvilSignatureModal from '@anvilco/react-signature-modal';
import '@anvilco/react-signature-modal/dist/styles.css';

import useDoctorService from '../../hooks/useDoctorService';

// import Anvil from '@anvilco/anvil';
// // The API key is found under your organization settings
// const apiKey = '6l4lPIAmXcUDks4HQJvT7JCj2FVKLxaz';
// const anvilClient = new Anvil({ apiKey });

////react
/* eslint-disable-next-line */
export interface ProfileSettingProps {
  doctorId: string;
}

export function ProfileSetting({ doctorId }: ProfileSettingProps) {
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
    deleteService,
  } = useDoctorService();

  // show modal on add new service
  const handleSignature = () => {
    setShowModal(true);
  };

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
  };

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
      toast.success(
        showModal
          ? serviceToEdit
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
  };

  const generateCheckoutID = async () => {

    const params: any = {
      entityId: '8ac7a4c77959fdbb01795ae33ccf04ee',
      amount: '1',
      currency: 'ZAR',
      paymentType: 'DB',
    };

    // var formBody: any = [];
    // for (var property in params) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(params[property]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
    const config = {
      method: 'POST',
      url: 'https://test.oppwa.com/v1/checkouts',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Bearer OGFjN2E0Yzc3OTU5ZmRiYjAxNzk1YWUzMzcwZTA0ZWN8QmNod0ZRRTlHcg=='
      },
      data: JSON.stringify(params),
      port: 443
    };

    const data = await axios(config);
    console.log(data);
    // let data = await fetch('https://test.oppwa.com/v1/checkouts', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization:
    //       'Bearer OGFjN2E0Yzc3OTU5ZmRiYjAxNzk1YWUzMzcwZTA0ZWN8QmNod0ZRRTlHcg==',
    //   },
    //   body: params,
    // });
    // let data_json = await data.json();
    // if (data.status == 200) {
    //   console.log("successully generated checkout id", data_json.id);
    //   return data_json.id;
    // }
  };

  const onCheckOut = async () => {
    try {
      const checkoutId = await generateCheckoutID();
      console.log(checkoutId);
      const paymentParams = {
        checkoutID: checkoutId,
        paymentBrand: 'VISA',
        cardNumber: 4200000000000000,
        holderName: 'Rander Technology',
        expiryMonth: '12',
        expiryYear: '2025',
        cvv: '123',
      };
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div className={`${styles.services}`}>
      <Row>
        <div className={styles.subsrption}>
          <div className={styles.headingRow}>
            <span className={styles.heading}>Subscription details</span>{' '}
            <span>
              <Image
                className={styles.icon}
                src="/assets/images/edit-icon.svg"
                alt="edit-icon"
              />
            </span>
          </div>

          <div className={styles.iconRow}>
            <Button onClick={onCheckOut}>Subscribe</Button>
            <Image
              className={styles.icon}
              src="/assets/images/edit-icon.svg"
              alt="edit-icon"
            />
          </div>

          <div className={styles.iconRow}>
            <Image
              className={styles.icon}
              src="/assets/images/edit-icon.svg"
              alt="edit-icon"
            />
          </div>

          <div className={styles.visaRow}>
            <span className={styles.visa}>VISA</span>
            <span className={styles.visaNumber}>***************546</span>
          </div>
          <p className={styles.expires}>Expires September 2023</p>
        </div>

        <div className={styles.account}>
          <h3 className={styles.heading}>Account Settings</h3>

          <div className={styles.btnRow}>
            <Button className={styles.btn1}>Reset Login Detail</Button>
            <Button className={styles.btn2}>Reset Password</Button>
          </div>
          <div className={styles.btnRow}>
            <Button className={styles.btn1}>Deactivate Account</Button>
            <Button className={styles.btn2}>Delete Account</Button>
          </div>
        </div>
        <div className={styles.authorisation}>
          <div className={styles.iconRow}>
            <span onClick={handleSignature}>
              <Image
                className={styles.icon}
                src="/assets/images/edit-icon.svg"
                alt="edit-icon"
              />
            </span>
          </div>
          <h3 className={styles.heading}>Authorisations</h3>
        </div>
      </Row>

      <AnvilSignatureModal
        // signURL={signURL}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        // onLoad={() => setLoading(false)}
        // onFinish={(redirectURL) => window.location.assign(redirectURL)}
      />

      <Modal
        // show={showModal}
        show={false}
        onHide={() => handleOnCancel()}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Signature</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <Form className="form-wrap" noValidate onSubmit={formik.handleSubmit}>
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
          </Form> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProfileSetting;
