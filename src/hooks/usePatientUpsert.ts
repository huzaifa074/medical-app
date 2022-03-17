import API from '@aws-amplify/api';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '@store';
import { IForm as PatientInterface } from '../containers/patients/upsert-patient/schema';
interface State {
  error: any;
  isLoading: boolean;
  patientToEdit: PatientInterface;
  insurancesList: string[];
  patientId: string;
  done: boolean;
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    patientToEdit: null,
    patientId: null,
    insurancesList: [],
    done: false,
  });

  const { currentUser } = useAppContext();

  const history = useHistory();

  const upsertPatient = async (body: PatientInterface) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      result: null,
      done: false,
    }));
    if ('name' in body) {
      body.name = `${body.firstName} ${body.lastName}`;
    }

    if ('gender' in body && !body.gender) {
      delete body.gender;
    }

    // add doctor id to body
    body.doctorId = currentUser.id;

    try {
      if (state.patientToEdit) {
        // edit patient api
        const patient = await API.put('API', `/patients/${state.patientToEdit.id}`, { body });
        setPatientId(state.patientToEdit.id);
        // navigate to patient detail
        setState((curr) => ({ ...curr, isLoading: false, done: true, patientToEdit: patient }));
      } else {
        // add patient api
        const patient = await API.post('API', '/patients', { body });
        setPatientId(patient.id);
        setState((curr) => ({ ...curr, isLoading: false, done: true }));
      }
    } catch (e) {
      setState((curr) => ({
        ...curr,
        error: e,
        isLoading: false,
        done: false,
      }));
    }
  };

  // get patient
  const getPatient = async (patientId: string) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
    }));
    try {
      const patient = await API.get('API', `/patients/${patientId}`, {});

      if (!('emergencyContact' in patient)) {
        patient.emergencyContact = {
          name: '',
          number: '',
        }
      }

      if (!('bloodGroup' in patient)) {
        patient.bloodGroup = '';
      }


      if (!('insurances' in patient) || !patient.insurances.length) {
        patient.insurances = [
          {
            name: '',
            plan: '',
            memebershipNumber: '',
            mainMemberNumber: '',
          }
        ];
      }

      if (!('phoneNumber' in patient)) {
        patient.phoneNumber = '';
      }

      if (!('passportNumberOrId' in patient)) {
        patient.passportNumberOrId = '';
      }

      if (!('surgeries' in patient)) {
        patient.surgeries = [];
      }

      if (!('vaccinations' in patient)) {
        patient.vaccinations = [];
      }

      if (!('childIllness' in patient)) {
        patient.childIllness = [];
      }

      if (!('socialHistory' in patient)) {
        patient.socialHistory = {
          smoker: {
            active: false,
            frequency: null
          },
          drinker: {
            active: false,
            frequency: null
          },
          physicallyActivity: {
            active: false,
            frequency: null
          }
        };
      }

      setState((curr) => ({
        ...curr,
        isLoading: false,
        patientToEdit: patient,
      }));
    } catch (e) {
      setState((curr) => ({ ...curr, error: e, isLoading: false }));
    }
  };

  // get insurances list
  const getInsurances = async () => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
    }));
    try {
      const { items } = await API.get('API', '/insurances', {});
      const mappedItems = items.map((insurance) => {
        const itemName = insurance.name;
        return itemName;
      });
      setState((curr) => ({
        ...curr,
        isLoading: false,
        insurancesList: mappedItems,
      }));
    } catch (e) {
      setState((curr) => ({ ...curr, error: e, isLoading: false }));
    }
  };

  const setPatientId = (id) => {
    setState((curr) => ({
      ...curr,
      patientId: id
    }));
  }

  return {
    ...state,
    upsertPatient,
    getPatient,
    getInsurances,
    setPatientId
  };
};
