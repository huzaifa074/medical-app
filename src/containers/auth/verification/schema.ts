import * as Yup from 'yup';

export interface IForm {
  email: string;
  firstCharachter: string;
  secondCharachter: string;
  thirdCharachter: string;
  fourthCharachter: string;
  fifthCharachter: string;
  sixthCharachter: string;
}

export const initialValues = {
  email: '',
  firstCharachter: '',
  secondCharachter: '',
  thirdCharachter: '',
  fourthCharachter: '',
  fifthCharachter: '',
  sixthCharachter: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required.'),
  firstCharachter: Yup.string()
    .min(1)
    .max(1)
    .required('Email confirmation code is required.'),
  secondCharachter: Yup.string()
    .min(1)
    .max(1)
    .required('Email confirmation code is required.'),
  thirdCharachter: Yup.string()
    .min(1)
    .max(1)
    .required('Email confirmation code is required.'),
  fourthCharachter: Yup.string()
    .min(1)
    .max(1)
    .required('Email confirmation code is required.'),
  fifthCharachter: Yup.string()
    .min(1)
    .max(1)
    .required('Email confirmation code is required.'),
  sixthCharachter: Yup.string()
    .min(1)
    .max(1)
    .required('Email confirmation code is required.'),
});
