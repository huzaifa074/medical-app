import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { useAppContext } from '@store';
import { Auth } from 'aws-amplify';
import { onError } from '@utils';
import { Link, useHistory } from 'react-router-dom';
import styles from './main-menu.module.scss';

/* eslint-disable-next-line */
export interface MainMenuProps {}

export function MainMenu(props: MainMenuProps) {
  const { activeTab, setActiveTab } = useAppContext();
  const history = useHistory();

  const { currentUser, setCurrentUser, userHasAuthenticated } = useAppContext();

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
      userHasAuthenticated(false);
      setCurrentUser({});
      history.push('/login');
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className={`${styles.mainMenu}`}>
      <Nav
        // defaultActiveKey="/patients"
        activeKey="/dashboard"
        className={`${styles.navItems} flex-column sidebar-menu`}
      >
        <Nav.Item>
          <Link className="d-block" to="/dashboard">
            <span className="dashboard" /> Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="d-block" to="/agenda">
            <span className="agenda" /> Agenda
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="d-block" to="/patients">
            <span className="patients" /> Patients
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="d-block" to="/consultations">
            <span className="consultations" /> Consultations
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="d-block" to="/reports">
            <span className="reports" /> Reports
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="d-block" to="/profile">
            <span className="my-profile" /> My Profile
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="logout" onClick={signOut}>
            <span className="logout" /> Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default MainMenu;
