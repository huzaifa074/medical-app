import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
export interface IForm {
    id: string;
    medication: string;
    type: string;
    dosage: number;
    frequency: string;
    medicationTime: string;
    administration: string;
    instructions: string;
    refil: string;
    prescriptionFileUrl: string;
}


export const initialValues = {
    id: uuid(),
    medication: '',
    type: '',
    dosage: 0,
    frequency: '',
    medicationTime: '',
    administration: '',
    instructions: '',
    refil: '',
    prescriptionFileUrl: '',
};

export const validationSchema = Yup.object().shape({
    id: Yup.string(),
    medication: Yup.string().when('prescriptionFileUrl', { is: (value) => value === '', then: Yup.string().required(), otherwise: Yup.string() }),
    type: Yup.string(),
    dosage: Yup.number().integer().min(1),
    frequency: Yup.string(),
    medicationTime: Yup.string(),
    administration: Yup.string(),
    instructions: Yup.string(),
    refil: Yup.string(),
    prescriptionFileUrl: Yup.string(),
});
