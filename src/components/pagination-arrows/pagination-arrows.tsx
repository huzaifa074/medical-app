import React from 'react';
import { Image } from 'react-bootstrap';

import styles from './pagination-arrows.module.scss';

/* eslint-disable-next-line */
export interface PaginationArrowsProps {
  page: number;
  size: number;
  totalRecords: number;
  changePage: (string) => void;
}

export function PaginationArrows({ page, size, totalRecords, changePage }: PaginationArrowsProps) {
  return (
    <div className={`${styles.paginationArrows} d-inline-flex`}>
      <span
        className={`${styles.arrowIcons} mr-2`}
        onClick={() => changePage('back')}
        title="Previous"
      >
        <Image
          src={`/assets/images/${page > 1 ? 'left-arrow-active.svg' : 'left-arrow.svg'
            }`}
          alt="arrow-icons"
        />
      </span>
      <span
        className={`${styles.arrowIcons}`}
        onClick={() => changePage('next')}
        title="Next"
      >
        <Image
          src={`/assets/images/${totalRecords > page * size
            ? 'right-arrow-active.svg'
            : 'right-arrow.svg'
            }`}
          alt="arrow-icons"
        />
      </span>
    </div>
  );
}

export default PaginationArrows;
