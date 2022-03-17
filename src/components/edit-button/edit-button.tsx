import React from 'react';
import { Image } from 'react-bootstrap';

import styles from './edit-button.module.scss';

/* eslint-disable-next-line */
export interface EditButtonProps {
  onClick: any;
}

export function EditButton(props: EditButtonProps) {
  const {
    onClick,
  } = props;
  return (
    <div className={`${styles.editIcon} mx-auto`}>
      <Image src="/assets/images/edit-icon.svg" alt="edit-icon" />
    </div>
  );
}

export default EditButton;
