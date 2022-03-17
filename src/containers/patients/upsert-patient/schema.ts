import * as Yup from 'yup';

export interface IForm {
  // basic information
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  passportNumberOrId: string;
  gender: string;
  bloodGroup: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    area: string;
    city: string;
    zipcode: any;
    state: string;
    country: string;
    formattedAddress: string;
  };
  emergencyContact: {
    name: string;
    number: string;
  };

  // insurances
  insurances: [
    {
      name: string;
      plan: string;
      memebershipNumber: string;
      mainMemberNumber: string;
    }
  ];

  // medical history
  chronicConditions: [
    {
      name: string;
      duration: string;
    }
  ];
  familyIllnesses: [
    {
      illnesses: string;
      relation: string;
    }
  ];

  allergies: [string];
  foodAllergies: [string];
  drugAllergies: [string];
  haveChildren: string;
  doYouSmoke: string;
  medications: [string];
  profileCompletePercentage?: number;
  id?: string;
  doctorId?: string;
}

export interface ChronicConditionInterface {
  name: string;
  duration: string;
};

export interface AllergiesInterface {
  allergy: string;
};

export const allergiesInitialValues = {
  allergy: ''
};

export const allergiesValidationSchema = Yup.object().shape({
  allergy: Yup.string().required('Select Allergy')
});

export interface ChildhoodIllnessInterface {
  illness: string;
};

export const childhoodIllnessInitialValues = {
  illness: ''
};

export const childhoodIllnessValidationSchema = Yup.object().shape({
  illness: Yup.string().required('Select Illness')
});

export const chronicConditionInitialValues = {
  name: '',
  duration: '',
};

export const chronicConditionValidationSchema = Yup.object().shape({
  name: Yup.string().required('Condition is Required'),
  duration: Yup.string().required('Duration is Required'),
});

export interface FamilyHistoryInterface {
  illness: string;
  side: string;
  whom: string;
};

export const familyHistoryInitialValues = {
  illness: '',
  side: '',
  whom: ''
};

export const familyHistoryValidationSchema = Yup.object().shape({
  illness: Yup.string().required('Condition is Required'),
  side: Yup.string().required('Side is Required'),
  whom: Yup.string().required('Whom is Required'),
});

export interface MedicationHistoryInterface {
  medication: string;
  type: string;
  dosage: number;
  frequency: string;
  medicationTime: string;
};

export const medicationHistoryInitialValues = {
  medication: '',
  type: '',
  dosage: null,
  frequency: '',
  medicationTime: ''
};

export const medicationHistoryValidationSchema = Yup.object().shape({
  medication: Yup.string().required(),
  type: Yup.string().required(),
  dosage: Yup.number().integer().min(1),
  frequency: Yup.string().required(),
  medicationTime: Yup.string().required('medication time is required'),
});

export const initialValues = {
  // basic information
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  passportNumberOrId: '',
  gender: '',
  bloodGroup: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    area: '',
    city: '',
    zipcode: '',
    state: '',
    country: '',
    formattedAddress: '',
  },
  emergencyContact: {
    name: '',
    number: '',
  },

  // insurances
  insurances: [
    {
      name: '',
      plan: '',
      memebershipNumber: '',
      mainMemberNumber: '',
    },
  ],

  // medical history
  chronicConditions: [],
  familyIllnesses: [],

  allergies: [],
  foodAllergies: [],
  drugAllergies: [],
  haveChildren: 'YES',
  doYouSmoke: 'NO',
  medications: [],
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  email: Yup.string().required('Email is required.'),
  phoneNumber: Yup.string().required('Phone No is required.'),
  passportNumberOrId: Yup.string().required('ID/Passport number is required.'),
  bloodGroup: Yup.string(),
  // .test('passportNumberOrId', 'ID/Passport number is not valid.', (passportNumberOrId) => luhn.validate(passportNumberOrId)),
  gender: Yup.string(),
  address: Yup.object(),
  emergencyContact: Yup.object(),
  insurances: Yup.array(),
  chronicConditions: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      duration: Yup.string(),
    })
  ),
  familyIllnesses: Yup.array().of(
    Yup.object().shape({
      illnesses: Yup.string(),
      relation: Yup.string(),
    })
  ),
  allergies: Yup.array().of(Yup.string()),
  foodAllergies: Yup.array().of(Yup.string()),
  drugAllergies: Yup.array().of(Yup.string()),
  haveChildren: Yup.string(),
  doYouSmoke: Yup.string(),
  medications: Yup.array().of(Yup.string()),
});
