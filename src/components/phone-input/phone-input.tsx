import React, { ElementType } from 'react';

import { Form, InputGroup } from 'react-bootstrap';

import PhoneNumber from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import styles from './phone-input.module.scss';

/* eslint-disable-next-line */
export interface PhoneInputProps {
  formik: any;
  type: string;
  label: string;
  name: string;
  groupAs: ElementType<any>;
  md: string;
  align?: string;
  icon?: string;
  controlName?: string;
}

export function PhoneInput(props: PhoneInputProps) {
  const {
    formik, type, name, label, icon, groupAs, controlName = 'phoneNumber', md = '12', align = 'text-left', ...rest
  } = props;
  const handleChange = (phoneNumber) => {
    formik.setFieldValue(controlName, phoneNumber);
  };

  const value = controlName === 'phoneNumber' ? formik.values.phoneNumber : (formik.values.emergencyContact.number || '');

  return (
    <Form.Group as={groupAs} md={md} controlId={name}>
      {/* <Form.Label className={align}>Phone Number</Form.Label> */}
      <InputGroup>
        <PhoneNumber
          inputProps={{
            name,
            id: name,
          }}
          country="za"
          prefix="+"
          // onlyCountries={['za']}
          inputClass={`form-control ${align} ${styles.phoneInput}`}
          {...rest}
          // disableCountryCode={false}
          value={value}
          onChange={handleChange}
          // autoFormat={true}
          enableAreaCodes
          placeholder="987-654-3210"
        />
        {
          icon && (
            <InputGroup.Append>
              <InputGroup.Text>
                <img src={`/assets/images/icons/${icon}`} alt="Field Icon" />
              </InputGroup.Text>
            </InputGroup.Append>
          )
        }
        <Form.Control.Feedback type="invalid"
          className={formik.errors[controlName] && formik.touched[controlName] ? 'd-block' : ''}>
          {formik.errors[controlName]}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>

  );
}

export default PhoneInput;
