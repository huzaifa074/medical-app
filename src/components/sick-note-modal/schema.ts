import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

export interface IForm {
    id: string;
    startDate: string;
    endDate: string;
    sickNoteFileUrl: string;
    note: string;
}


export const initialValues = {
    id: uuid(),
    startDate: '',
    endDate: '',
    sickNoteFileUrl: '',
    note: ''
};

export const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    startDate: Yup.date().max(Yup.ref('endDate'), 'Start Date must be earlier than end date'),
    endDate: Yup.date().min(Yup.ref('startDate'), 'End Date must be earlier than start date'),
    sickNoteFileUrl: Yup.string(),
    note: Yup.string()
});
