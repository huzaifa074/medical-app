import React, { ElementType } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

import styles from './input.module.scss';

/* eslint-disable-next-line */
export interface InputProps {
  formik: any;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  style?: any;
  groupAs?: ElementType<any>;
  md?: string;
  align?: string;
  onChange?: any;
  accept?: string;
  as?: ElementType<any>;
  rows?: string
  readonly?: boolean;
  required?: boolean;
  value?: string;
  asTextArea?: string;
  icon?: string;
  addIcon?: boolean;
  removeIcon?: boolean;
  onBlurCapture?: any;
  clickiconhandler?: any;
  max?: string
}

export function Input(props: InputProps) {
  const {
    formik, required, type, name, label, style, placeholder, icon, asTextArea, readonly, groupAs, md = '12', align = 'text-left', addIcon = false, removeIcon = false, ...rest
  } = props;
  const requiredClass = required ? 'required' : '';

  return (
    <Form.Group as={groupAs} md={md} controlId={name} className={styles.inputField}>
      <InputGroup>
        <Form.Control
          readOnly={readonly}
          type={type}
          placeholder={placeholder}
          style={style}
          className={`${formik.errors[name] && formik.touched[name] ? ' is-invalid' : ''} ${align}`}
          max={props?.max}
          {...rest}
        />

        {
          icon && (
            <InputGroup.Append>
              <InputGroup.Text>
                <img src={`/assets/images/icons/${icon}`} alt="Field Icon" {...((addIcon || removeIcon) && { onClick: props.clickiconhandler })} />
              </InputGroup.Text>
            </InputGroup.Append>
          )
        }
        {
          label && <Form.Label className={`${align} ${requiredClass} ${asTextArea}`}>{label}</Form.Label>
        }

        {
          formik.errors[name] && (
              <Form.Control.Feedback type="invalid">
                {formik.errors[name]}
              </Form.Control.Feedback>
          )
        }
      </InputGroup>
    </Form.Group>
  );
}

export default Input;
