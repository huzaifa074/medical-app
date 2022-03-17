import React from 'react';

import styles from './listing-button.module.scss';

/* eslint-disable-next-line */
export interface ListingButtonProps {
  text: string;
  classes: string;
  icon?: string;
  cancelClickHandler?: (string) => void;
}

export function ListingButton(props: ListingButtonProps) {
  const {
    classes,
    text,
    icon,
    cancelClickHandler
  } = props;

  return (
    <div className={`${styles.listingButton} ${classes}`}>
      <span className={styles.title}>{text}</span>
      {
        icon && (
          <span className={`${styles.cancelIcon} ml-2`} onClick={cancelClickHandler}>
            <img src={`/assets/images/${icon}`} alt="Field Icon" />
          </span>
        )
      }

    </div>
  );
}

export default ListingButton;
