import * as Yup from 'yup';

export interface IForm {
  name: string,
  formattedAddress: string;
  geoPoint: {
    lat: number,
    lon: number,
  },
  schedule: any
}

export const initialValues: IForm = {
  name: '',
  formattedAddress: '',
  geoPoint: {
    lat: 0,
    lon: 0,
  },
  schedule: {
    autoConfirmAppointment: true,
    slotInterval: 30,
    workingHours: []
  }
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
});

export const scheduleValidationSchema = Yup.object().shape({
  schedule: Yup.object().shape({
    autoConfirmAppointment: Yup.boolean(),
    slotInterval: Yup.number(),
    workingHours: Yup.array().of(
      Yup.object().shape({
        active: Yup.boolean(),
        day: Yup.string(),
        dayNumber: Yup.number(),
        shifts: Yup.array().of(
          Yup.object().shape({
            startTime: Yup.string().required('Please Select Start Time'),
            endTime: Yup.string().required('Please Select End Time')
          })
        )
      })
    )
  })
});

