import * as Yup from 'yup';

export interface IForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  registrationNumber: string;
  // confirmPassword: string;
  termsPolicy: boolean;
  practiceNumber: string;
  passportNumber: string;
  primarySpeciality: any;
}

export const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  // confirmPassword: '',
  registrationNumber: '',
  termsPolicy: false,
  practiceNumber: '',
  passportNumber: '',
  primarySpeciality: null,
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  phoneNumber: Yup.string().required('Phone number is required.'),
  termsPolicy: Yup.bool().oneOf([true], 'Please accept Terms & Conditions.'),
  practiceNumber: Yup.string().required('Practice Number is required'),
  registrationNumber: Yup.string().required('Practice Number is required'),
  passportNumber: Yup.string().required('ID/Passport number is required.'),
  email: Yup.string()
    .required('Email is a required field')
    .email('Enter a valid email'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/,
      'Password should be a combination of uppercase/lower letters and at least 1 number.'
    ),
  primarySpeciality: Yup.object(),
  // confirmPassword: Yup.string()
  //   .required('Confirm Password is required')
  //   .when('password', {
  //     is: (val) => (val && val.length > 0 ? true : false),
  //     then: Yup.string().oneOf(
  //       [Yup.ref('password')],
  //       "Password and Confirm Password didn't match"
  //     ),
  //   }),
});
