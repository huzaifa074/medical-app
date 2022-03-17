import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useState } from 'react';
import { updateDoctorObject } from '@utils';
import { SignInData } from '../Entities/sessionEntity';

interface State {
  error: any;
  isLoading: boolean;
  doctor: CognitoUser | null;
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    doctor: null,
  });

  const signIn = async ({ userName, password }: SignInData) => {
    setState((curr) => ({ ...curr, error: null, isLoading: true, user: null }));
    try {
      const { attributes } = await Auth.signIn(userName, password);
      const doctor = await API.get('API', `/doctors/${attributes.sub}`, {});

      const updatedDoctorObj = updateDoctorObject(doctor);

      setState((curr) => ({ ...curr, isLoading: false, doctor: updatedDoctorObj }));
    } catch (error) {
      setState((curr) => ({ ...curr, error, isLoading: false }));
    }
  };

  return {
    ...state,
    signIn,
  };
};
