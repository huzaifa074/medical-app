import { Sidebar, TopBar } from '@components';
import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import styles from './commingSoon.module.scss';

export function CommingSoon() {
  return (
    <div className={`${styles.agenda}`}>
      <Sidebar />
      <Container fluid className="content-wrapper">
        <TopBar />
        <div className="content-body h-100 ">
          <Row>
            <Col md={12} xl={6}>
              <Image src="assets/images/commingsoon.jpeg" />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default CommingSoon;
