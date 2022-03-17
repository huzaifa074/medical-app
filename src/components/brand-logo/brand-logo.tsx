import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './brand-logo.module.scss';

/* eslint-disable-next-line */
export interface BrandLogoProps {}

export function BrandLogo(props: BrandLogoProps) {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push('/dashboard')}
      className={`${styles.brandLogo}`}
    >
      <Image src="/assets/images/logo.svg" alt="Logo" />
    </div>
  );
}

export default BrandLogo;
