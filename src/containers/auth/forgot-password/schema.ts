import * as yup from 'yup';

export interface IForgotPasswordForm {
  email: string,
};

export interface IResetPasswordForm {
  code: string,
  password: string;
  confirmPassword: string;
};

export const initialValues: IForgotPasswordForm = {
  email: '',
}

export const validationSchema = yup.object({
  email: yup.string().email().required(),
});


export const resetPasswordInitialValues: IResetPasswordForm = {
  code: '',
  password: '',
  confirmPassword: ''
}

export const resetPasswordValidationSchema = yup.object({
  code: yup.string().required('Required'),
  password: yup.string()
    .required('Password is a required field')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/,
      'Password should be a combination of uppercase/lower letters and at least 1 number.'
    ),
  confirmPassword: yup.string()
    .required('Required')
    .test(
      'password-match',
      'Password musth match.',
      function (value) {
        return this.parent.password === value
      }
    ),

});
