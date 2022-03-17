import React from 'react';
import { Form, InputGroup, FormControl, Button, Image } from 'react-bootstrap';

import styles from './search-bar.module.scss';

/* eslint-disable-next-line */
export interface SearchBarProps { }

export function SearchBar(props: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <Form>
        <Form.Group className="position-relative mb-0">
          <Form.Control size="lg" type="text" placeholder="Search" />
          <Button variant="primary" className={styles.searchBtn}>
            <Image src="/assets/images/search-icon.svg" alt="Search Icon" />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchBar;
