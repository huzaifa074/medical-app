import React, { useEffect } from 'react';
import { Row, Image, Form } from 'react-bootstrap';
import styles from './social-history.module.scss';

/* eslint-disable-next-line */
export interface SocialHistoryProps {
  patient: any;
  formik: any;
  done: any;
  isLoading: any;
  error: any;
}

export function SocialHistory({
  patient,
  formik,
  done,
  isLoading,
  error,
}: SocialHistoryProps) {

  useEffect(() => {
    if (patient) {
      // set value on modal show
      formik.setValues({
        ...patient,
        socialHistory: patient.socialHistory,
      });
    }
  }, []);

  return (
    <div className={`${styles.container} content-body`}>
      <Form className="form-wrap" noValidate onSubmit={formik.handleSubmit}>
        <Row className="justify-content-center">
          <h3>Social History</h3>
        </Row>
        <Row>
          <div className={styles.spacing}>
            <div className={`${styles.item}`}>
              <div className={styles.itemInner}>
                <span className={styles.emojiContainer}>
                  <span className={styles.emoji} role="img" aria-label="snezzing">🚬</span>
                </span>
                <div className={styles.justify}>
                  <p className={styles.GeneralCheckupDescription} style={{ display: "inline" }}>
                    Smoker
                  </p>
                  <div className='custom-control custom-switch'>
                    <Form.Check
                      type="switch"
                      id="active-1"
                      label=""
                      name="socialHistory.smoker.active"
                      checked={formik.values.socialHistory?.smoker?.active === true ? true : false}
                      formik={formik}
                      {...formik.getFieldProps('socialHistory.smoker.active')}
                      onChangeCapture={(e) => formik.handleSubmit(formik.values)}
                    />
                  </div>
                </div>
                <p className={styles.GeneralCheckupDescription}>Light</p>
              </div>
            </div>
          </div>
          <div className={styles.spacing}>
            <div className={`${styles.item}`}>
              <div className={styles.itemInner}>
                <span className={styles.emojiContainer}>
                  <span className={styles.emoji} role="img" aria-label="snezzing">🍻</span>
                </span>
                <div className={styles.justify}>
                  <p className={styles.GeneralCheckupDescription}>
                    Drinker
                  </p>
                  <div className='custom-control custom-switch'>
                    <Form.Check
                      type="switch"
                      id="active-2"
                      label=""
                      name="socialHistory.drinker.active"
                      checked={formik.values.socialHistory?.drinker?.active === true ? true : false}
                      formik={formik}
                      {...formik.getFieldProps('socialHistory.drinker.active')}
                      onChangeCapture={(e) => formik.handleSubmit(formik.values)}
                    />
                  </div>
                </div>
                <p className={styles.GeneralCheckupDescription}>0 drinks a week</p>
              </div>
            </div>
          </div>
          <div className={styles.spacing}>
            <div className={`${styles.item}`}>
              <div className={styles.itemInner}>
                <span className={styles.emojiContainer}>
                  <span className={styles.emoji} role="img" aria-label="snezzing">👟</span>
                </span>
                <div className={styles.justify}>
                  <p className={styles.GeneralCheckupDescription}>
                    Physical active
                  </p>
                  <div className='custom-control custom-switch'>
                    <Form.Check
                      type="switch"
                      id="active-3"
                      label=""
                      name="socialHistory.physicallyActivity.active"
                      checked={formik.values.socialHistory?.physicallyActivity?.active === true ? true : false}
                      formik={formik}
                      {...formik.getFieldProps('socialHistory.physicallyActivity.active')}
                      onChangeCapture={(e) => formik.handleSubmit(formik.values)}
                    />
                  </div>
                </div>
                <p className={styles.GeneralCheckupDescription}>30 min, once a weak</p>
              </div>
            </div>
          </div>
        </Row>
      </Form>
    </div>
  );
}

export default SocialHistory;
