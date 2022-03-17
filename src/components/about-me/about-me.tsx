import React from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import Input from '../input/input';

import styles from './about-me.module.scss';

/* eslint-disable-next-line */
export interface AboutMeProps { }

export function AboutMe(props: AboutMeProps) {
  return (
    <div className={`${styles.aboutMe} position-relative`}>
      <Form>
        <Form.Group controlId="about-me" className={`${styles.aboutMeContent} position-relative mb-0`}>
          <Form.Control as="textarea" rows={7} />
          <Form.Label className="d-flex align-items-ceter">
            <Image src="/assets/images/user-icon.svg" alt="user-icon" />
            <span className={`${styles.title} ml-2`}>About Me</span>
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AboutMe;
