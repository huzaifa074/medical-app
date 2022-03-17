import * as Yup from 'yup';

export interface IForm {
  patientId: string;
  consultationType: string;
  appointmentAt: string;
  reasons: string[];
  objective: string;
  subjective: string;
  diagnosis: string;
  treatmentPlan: string;
  followUpDate: string;
  // symptom: string;
}

export const initialValues = {
  patientId: '',
  consultationType: 'online',
  appointmentAt: '',
  reasons: [],
  objective: '',
  subjective: '',
  diagnosis: '',
  treatmentPlan: '',
  followUpDate: ''
  // symptom: null
};

export const validationSchema = Yup.object().shape({
  patientId: Yup.string().required('Please select patient.'),
  consultationType: Yup.string().required('Please select consultation type.'),
  appointmentAt: Yup.string().required('Select appointment time.'),
  reasons: Yup.array().of(
    Yup.string()
  ).required('Please select reasons.'),
  // symptom: Yup.string()
});
