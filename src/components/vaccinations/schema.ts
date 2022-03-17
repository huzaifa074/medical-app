import * as Yup from 'yup';

export interface VaccinationInterface {
    name: string;
    vaccinationDate: string;
};

export const vaccinationInitialValues = {
    name: '',
    vaccinationDate: '',
};

export const vaccinationValidationSchema = Yup.object().shape({
    name: Yup.string().required('Vaccination Name is Required'),
    vaccinationDate: Yup.date().max(new Date()).required('Vaccination Date is Required'),
});
