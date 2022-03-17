import * as yup from 'yup';
import { string } from 'yup/lib/locale';


export interface IProfileForm {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
};

export const initialValues: IProfileForm = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

export const validationSchema = yup.object({
  oldPassword: yup.string().required('Required'),
  newPassword: yup.string()
    .required('Password is a required field')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/,
      'Password should be a combination of uppercase/lower letters and at least 1 number.'
    ),
  confirmNewPassword: yup.string()
    .required('Required')
    .test(
      'password-match',
      'Password musth match.',
      function (value) {
        return this.parent.newPassword === value
      }
    ),
});
