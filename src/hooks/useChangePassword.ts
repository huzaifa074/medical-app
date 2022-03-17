import Auth from '@aws-amplify/auth';
import { useState } from 'react';
import { IProfileForm } from '../containers/auth/change-password/schema';

interface State {
  error: any;
  isLoading: boolean;
  done: boolean;
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    done: false,
  });

  const changePassword = async (values: IProfileForm) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, values.oldPassword, values.newPassword);
      setState((curr) => ({
        ...curr,
        error: null,
        done: true,
        isLoading: false
      }));
    } catch (e) {
      setState((curr) => ({
        ...curr,
        error: e,
        isLoading: false,
        done: false,
      }));
    }
  }

  return {
    ...state,
    changePassword
  };
};
