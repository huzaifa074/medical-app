import { ISignUpResult } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useAppContext } from '@store';
import { SignUpData } from '../Entities/sessionEntity';

interface State {
  error: any;
  isLoading: boolean;
  result: ISignUpResult | null;
  done: boolean;
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    result: null,
    done: false,
  });

  const { setCurrentUser } = useAppContext();

  const signUp = async ({
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    passportNumber,
    practiceNumber,
    primarySpeciality,
    registrationNumber
  }: SignUpData) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      result: null,
    }));
    try {
      const body = {
        username: email.split('@')[0],
        // username: values.email,
        password,
        attributes: {
          name: firstName + ' ' + lastName,
          email,
          phone_number: `+${phoneNumber}`,
          zoneinfo: 'doctor',
          'custom:passport_number': passportNumber,
          'custom:practice_number': practiceNumber,
          'custom:primary_speciality': primarySpeciality.id,
          'custom:registration_number': registrationNumber
        },
      };
      const result = await Auth.signUp(body);
      setState((curr) => ({ ...curr, isLoading: false, done: true, result }));
    } catch (e) {
      setState((curr) => ({
        ...curr,
        error: e,
        isLoading: false,
        done: false,
      }));
    }
  };

  const resendVerificationCode = async (email: string) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      await Auth.resendSignUp(email.split('@')[0]);
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        done: true,
      }));
    } catch (e) {
      setState((curr) => ({
        ...curr,
        error: e,
        isLoading: false,
        done: false,
      }));
    }
  };

  return {
    ...state,
    signUp,
    resendVerificationCode,
  };
};
