import { useFormik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  AvailabilityCard,
  Biography,
  DoctorProfileCard,
  Insurances,
  Media,
  PriceList,
  Sidebar,
  Specializations,
  TopBar,
  Qualifications,
  MedicalAids,
  About,
  ProfileSetting,
} from '@components';
import { onError } from '@utils';
import useDoctorProfile from '../../hooks/useDoctorProfile';
import styles from './doctor-profile.module.scss';
import { IForm, initialValues, validationSchema } from './schema';
import { Locations } from '../locations/locations';

/* eslint-disable-next-line */
export interface DoctorProfileProps {}

export function DoctorProfile(props: DoctorProfileProps) {
  const [activeTab, setActiveTab] = useState('background');
  // use custom doctor profle hook
  const {
    error,
    doctorProfile,
    done,
    isLoading,
    editDoctorProfile,
    getDoctorProfile,
  } = useDoctorProfile();

  /**
   * GET DOCTOR PROFILE
   */
  useEffect(() => {
    (async () => {
      try {
        getDoctorProfile();
      } catch (error) {
        onError(error);
      }
    })();
  }, []);

  async function handleProfileEditSubmit(values: IForm) {
    try {
      const body = { ...values };
      await editDoctorProfile(body);
    } catch (error) {
      onError(error);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: handleProfileEditSubmit,
  });

  return (
    <div className={`${styles.doctorProfile}`}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        {doctorProfile ? (
          <Row>
            <Col md={6} xl={3} className={`${styles.contentWrapperLeft}`}>
              <div className="content-body px-0 py-0 ">
                <DoctorProfileCard
                  doctor={doctorProfile}
                  error={error}
                  formik={formik}
                  done={done}
                  isLoading={isLoading}
                />
              </div>

              <div className="content-body px-3">
                <AvailabilityCard
                  doctor={doctorProfile}
                  formik={formik}
                  done={done}
                  error={error}
                  isLoading={isLoading}
                />
              </div>
            </Col>
            <Col xl={9} className={`${styles.contentWrapperRight} pl-xl-0`}>
              <div className="content-body" style={{ height: '99%' }}>
                <Tabs
                  activeKey={activeTab}
                  id="tab"
                  className={`${styles.tabItems} border-0`}
                  onSelect={(k) => setActiveTab(k)}
                >
                  <Tab eventKey="location" title="Location">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <Locations
                        doctor={doctorProfile}
                        editDoctorProfile={editDoctorProfile}
                        getDoctorProfile={getDoctorProfile}
                      />
                    </div>
                  </Tab>
                  {/* <Tab eventKey="about" title="About">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <Biography
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                      <Specializations
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                      <Qualifications
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                      <Insurances
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </div>
                  </Tab> */}
                  <Tab eventKey="background" title="Background">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <About
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                        handleNextTab={setActiveTab}
                      />
                    </div>
                  </Tab>
                  <Tab eventKey="insurances" title="Medical Aids">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <MedicalAids
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        error={error}
                        isLoading={isLoading}
                      />
                    </div>
                  </Tab>

                  <Tab eventKey="services" title="Price List">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <PriceList doctorId={doctorProfile.id} />
                    </div>
                  </Tab>

                  <Tab eventKey="media" title="Media">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <Media
                        doctor={doctorProfile}
                        formik={formik}
                        done={done}
                        isLoading={isLoading}
                      />
                    </div>
                  </Tab>

                  <Tab eventKey="profile" title="Profile Setting">
                    <div className={`${styles.tabItemContent} pt-xl-5 pt-4`}>
                      <ProfileSetting doctorId={doctorProfile.id} />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        ) : (
          <Spinner animation="border" />
        )}
      </Container>
    </div>
  );
}

export default DoctorProfile;
