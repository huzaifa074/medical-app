import * as Yup from 'yup';

export interface IForm {
    consultationType: string;
    appointmentAt: string;
    patientId: string;
    subjective: string;
    objective: string;
    diagnosis: string;
    treatmentPlan: string;
    reasons: string[];
    followUpRequired: boolean;
    followUpDate: Date;
    followUpConsultationType: string;
    id?: string;
}

export const initialValues = {
    patientId: '',
    subjective: '',
    objective: '',    
    diagnosis: '',    
    treatmentPlan: '',   
    followUpRequired: true,
    followUpDate: Date.now(),
    followUpConsultationType: '',
    reasons: [],
};

export const validationSchema = Yup.object().shape({
    patientId: Yup.string(),
    subjective: Yup.string(),
    objective: Yup.string(),
    diagnosis: Yup.string(),
    treatmentPlan: Yup.string(),
    reasons: Yup.array().of(
        Yup.string()
    ),
});
