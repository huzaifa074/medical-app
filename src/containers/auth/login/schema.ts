import * as Yup from 'yup';

export interface IForm {
  username: string;
  password: string;
}

export const initialValues = {
  username: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is Required'),
  password: Yup.string().required('Password is required.'),
});
