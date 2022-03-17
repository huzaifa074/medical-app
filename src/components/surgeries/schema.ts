import * as Yup from 'yup';

export interface SurgeryInterface {
    name: string;
    operateDate: string;
};

export const surgeryInitialValues = {
    name: '',
    operateDate: '',
};

export const surgeryValidationSchema = Yup.object().shape({
    name: Yup.string().required('Surgery Name is Required'),
    operateDate: Yup.date().max(new Date()).required('Surgery Date is Required'),
});
