import React from 'react';
import { Image, Media } from 'react-bootstrap';

import styles from './script-requests.module.scss';

/* eslint-disable-next-line */
export interface ScriptRequestsProps { }

export function ScriptRequests(props: ScriptRequestsProps) {
  return (
    <div className={`${styles.scriptRequests}`}>
      <h4 className="mb-4">Script Requests</h4>
      <Media className={`${styles.scriptRequestItem} align-items-center py-3`}>
        <Image src="/assets/images/default-avatar.png" alt="avatar" className={`${styles.userAvatar} mr-3`} roundedCircle/>
        <Media.Body>
          <h5 className="mb-0">David paul</h5>
          <p className="mb-0">Oxytycone 5mg</p>
        </Media.Body>
        <div className={styles.actionBtns}>
          <span>
            <Image src="/assets/images/right-icon.svg" alt="right-icon" />
          </span>
          <span>
            <Image src="/assets/images/cross-icon.svg" alt="cross-icon" />
          </span>
        </div>
      </Media>
      <Media className={`${styles.scriptRequestItem} align-items-center py-3`}>
        <Image src="/assets/images/default-avatar.png" alt="avatar" className={`${styles.userAvatar} mr-3`} roundedCircle/>
        <Media.Body>
          <h5 className="mb-0">David paul</h5>
          <p className="mb-0">Oxytycone 5mg</p>
        </Media.Body>
        <div className={styles.actionBtns}>
          <span>
            <Image src="/assets/images/right-icon.svg" alt="right-icon" />
          </span>
          <span>
            <Image src="/assets/images/cross-icon.svg" alt="cross-icon" />
          </span>
        </div>
      </Media>
      <Media className={`${styles.scriptRequestItem} align-items-center py-3`}>
        <Image src="/assets/images/default-avatar.png" alt="avatar" className={`${styles.userAvatar} mr-3`} roundedCircle/>
        <Media.Body>
          <h5 className="mb-0">David paul</h5>
          <p className="mb-0">Oxytycone 5mg</p>
        </Media.Body>
        <div className={styles.actionBtns}>
          <span>
            <Image src="/assets/images/right-icon.svg" alt="right-icon" />
          </span>
          <span>
            <Image src="/assets/images/cross-icon.svg" alt="cross-icon" />
          </span>
        </div>
      </Media>
      <Media className={`${styles.scriptRequestItem} align-items-center py-3`}>
        <Image src="/assets/images/default-avatar.png" alt="avatar" className={`${styles.userAvatar} mr-3`} roundedCircle/>
        <Media.Body>
          <h5 className="mb-0">David paul</h5>
          <p className="mb-0">Oxytycone 5mg</p>
        </Media.Body>
        <div className={styles.actionBtns}>
          <span>
            <Image src="/assets/images/right-icon.svg" alt="right-icon" />
          </span>
          <span>
            <Image src="/assets/images/cross-icon.svg" alt="cross-icon" />
          </span>
        </div>
      </Media>
      <Media className={`${styles.scriptRequestItem} align-items-center py-3`}>
        <Image src="/assets/images/default-avatar.png" alt="avatar" className={`${styles.userAvatar} mr-3`} roundedCircle/>
        <Media.Body>
          <h5 className="mb-0">David paul</h5>
          <p className="mb-0">Oxytycone 5mg</p>
        </Media.Body>
        <div className={styles.actionBtns}>
          <span>
            <Image src="/assets/images/right-icon.svg" alt="right-icon" />
          </span>
          <span>
            <Image src="/assets/images/cross-icon.svg" alt="cross-icon" />
          </span>
        </div>
      </Media>
    </div>
  );
}

export default ScriptRequests;
