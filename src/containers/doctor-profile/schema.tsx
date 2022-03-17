import * as Yup from 'yup';

export interface Consultation {
  online: {
    active: boolean,
    fee: number
  },
  inPerson: {
    active: boolean,
    fee: number
  },
  homeVisit: {
    active: boolean,
    fee: number
  }
}

export interface Institute {
  domains: string[];
  web_pages: string[];
  'state-province': string[];
  alpha_two_code: string;
  name: string;
  country: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Speciality {
  name: string;
  id?: string;
}

export interface Insurance {
  name: string;
  id?: string;
}

/**
 * Qualification schema and interface
 */
export interface Qualification {
  degreeTitle: string;
  complitionYear: string;
  certificateUrl: string;
  institute: Institute;
}


export const qualificationInitialValues = {
  degreeTitle: '',
  complitionYear: '',
  certificateUrl: '',
  // institute: {
    // name: '',
    // id: 'abc',
    // domains: [],
    // web_pages: [],
    // 'state-province': [],
    // alpha_two_code: '',
    // country: '',
  // },
  institute: null,
};

export const qualificationValidationSchema = Yup.object().shape({
  degreeTitle: Yup.string().required('Enter Degree Title'),
  complitionYear: Yup.string().required('Select Complition Year'),
  certificateUrl: Yup.string(),
  institute: Yup.object().required('Select Institute'),
});

/**
 * Doctor profile interface and validation schema
 */
export interface IForm {
  biography: string;
  consultation: Consultation;
  qualifications: Qualification[];
  specialities: Speciality[];
  insurances: Insurance[];
  languages: Language[];
  primarySpeciality: any;
  id?: string;
}

export const initialValues = {
  biography: '',
  firstName: '',
  lastName: '',
  email: '',
  consultation: {
    online: {
      active: false,
      fee: 0,
    },
    inPerson: {
      active: false,
      fee: 0,
    },
    homeVisit: {
      active: false,
      fee: 0,
    },
  },
  qualifications: [],
  specialities: [],
  insurances: [],
  languages: [],
  primarySpeciality: null,
};

export const consultationValidationSchema = Yup.object().shape({
  online: Yup.object().shape({
    active: Yup.boolean(),
    fee: Yup.number()
      .integer()
      .min(0, 'Fee should be a positive number')
      .when('active', {
        is: true,
        then: Yup.number().required('Price is required'),
      }),
  }),
  inPerson: Yup.object().shape({
    active: Yup.boolean(),
    fee: Yup.number()
      .integer()
      .min(0, 'Fee should be a positive number')
      .when('active', {
        is: true,
        then: Yup.number().required('Price is required'),
      }),
  }),
  homeVisit: Yup.object().shape({
    active: Yup.boolean(),
    fee: Yup.number()
      .integer()
      .min(0, 'Fee should be a positive number')
      .when('active', {
        is: true,
        then: Yup.number().required('Price is required'),
      }),
  })
});

export const validationSchema = Yup.object().shape({
  biography: Yup.string(),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  consultation: consultationValidationSchema,
  specialities: Yup.array().of(Yup.object()),
  insurances: Yup.array().of(Yup.object()),

  qualifications: Yup.array().of(qualificationValidationSchema),
  languages: Yup.array().of(
    Yup.object().shape({
      code: Yup.string(),
      name: Yup.string(),
      nativeName: Yup.string(),
    })
  ),
  primarySpeciality: Yup.object()
});

/**
 * Doctor services interface and validation schema
 */
export interface DoctorServiceInterface {
  id?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  doctorId?: string;
}

export const doctorServiceInitialValues = {
  name: '',
  description: '',
  price: '',
  discount: '',
};

export const doctorServiceValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  description: Yup.string().required('Description is Required'),
  price: Yup.number().required('Price is Required').min(1),
  discount: Yup.number().min(1, 'Discount cannot be less than 1 percent').max(100, 'Discount cannot be greater than 100 percent')
});

