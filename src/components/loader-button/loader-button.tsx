import React from 'react';
import { Button, Image, Spinner } from "react-bootstrap";

import styles from './loader-button.module.scss';

/* eslint-disable-next-line */
export interface LoaderButtonProps {
  classes: string;
  text: string;
  type: string;
  isLoading?: boolean;
  disabled?: boolean,
}

export function LoaderButton(props: LoaderButtonProps) {
  const {
    classes,
    disabled,
    isLoading,
    text,
    type,
  } = props;

  const loading = <Image src="../../assets/images/loader.gif" alt="....." />;

  return (
    <Button
      className={`${styles.LoaderButton} ${classes}`}
      disabled={disabled || isLoading}
      type={type}
    // {...props}
    >
      {
        isLoading
          ? <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
          />
          : text
      }
    </Button>
  );
}

export default LoaderButton;
