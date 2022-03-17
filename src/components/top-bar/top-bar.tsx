import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Col,
  Dropdown,
  DropdownButton,
  Image,
  Row,
  Button,
  Modal,
} from 'react-bootstrap';

import { SearchBar } from '@components';

import Auth from '@aws-amplify/auth';

import { useAppContext } from '@store';
import { onError } from '@utils';

import styles from './top-bar.module.scss';
import { ChangePassword } from '@containers';

/* eslint-disable-next-line */
export interface TopBarProps {}

export function TopBar(props: TopBarProps) {
  const router = useHistory();

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const { currentUser, setCurrentUser, userHasAuthenticated } = useAppContext();

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
      userHasAuthenticated(false);
      setCurrentUser({});
      router.push('/login');
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className={`${styles.topBar}`}>
      <Row className="justify-content-lg-between justify-content-end align-items-center">
        <Col className="col-auto mb-4 mb-lg-0">
          <SearchBar />
        </Col>
        <Col className="col-auto text-right">
          <div className={`${styles.topNavbar} d-flex align-items-center`}>
            <div
              className={`${styles.activeUser} d-flex align-items-center logged-user`}
            >
              <span>
                <Image
                  src={
                    currentUser?.profilePicture?.originalUrl ||
                    '/assets/images/default-avatar.png'
                  }
                  alt="Profile Avatar"
                />
              </span>
              <DropdownButton
                menuAlign="right"
                title={currentUser?.name || ''}
                id="dropdown-menu-align-right"
              >
                <Dropdown.Item
                  eventKey="1"
                  className={`${styles.dropdownItem}`}
                >
                  <Image
                    src="/assets/images/my-profile.svg"
                    alt="my-profile"
                    className={`${styles.linkIcon} mr-3`}
                  />
                  <Link to="/profile">My Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  className={`${styles.dropdownItem}`}
                  onClick={() => setShowChangePasswordModal(true)}
                >
                  <Image
                    src="/assets/images/reset-password-icon.svg"
                    alt="reset-password-icon"
                    className={`${styles.linkIcon} mr-3`}
                  />
                  {/* open change password component in modal */}
                  Change Password
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="4"
                  className={`${styles.dropdownItem}`}
                  onClick={signOut}
                >
                  <Image
                    src="/assets/images/logout-icon.svg"
                    alt="logout-icon"
                    className={`${styles.linkIcon} mr-3`}
                  />
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <div className={`${styles.notifications} position-relative`}>
              <Image
                src="/assets/images/notification-icon.svg"
                alt="notification"
              />
              <span className={`${styles.notificationsAlert}`} />
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        show={showChangePasswordModal}
        onHide={() => {
          setShowChangePasswordModal(false);
        }}
        size="lg"
        centered
      >
        {/* <Modal.Header closeButton /> */}
        <ChangePassword toggleModal={setShowChangePasswordModal} />
      </Modal>
    </div>
  );
}

export default TopBar;
