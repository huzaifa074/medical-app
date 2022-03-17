import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { useState } from 'react';
import { useAppContext } from '@store';
import { IForgotPasswordForm, IResetPasswordForm } from '../containers/auth/forgot-password/schema';

interface State {
  error: any;
  isLoading: boolean;
  done: boolean;
  isResetCodeRequested: boolean;
  userEmail: string;
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    done: false,
    isResetCodeRequested: false,
    userEmail: '',
  });

  const { userHasAuthenticated } = useAppContext();

  const { currentUser, setCurrentUser } = useAppContext();

  const forgotPasswordSubmit = async (values: IForgotPasswordForm) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      await Auth.forgotPassword(values.email);
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        userEmail: values.email,
        isResetCodeRequested: true
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

  const resetCodeClick = async (email: string) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      await Auth.forgotPassword(email);
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
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

  const resetPasswordSubmit = async (values: IResetPasswordForm) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      await Auth.forgotPasswordSubmit(state.userEmail, values.code, values.password);
      await Auth.signIn(state.userEmail, values.password);
      userHasAuthenticated(true);
      const loggedInUser = await Auth.currentAuthenticatedUser();
      if (loggedInUser?.attributes) {
        const userDetails = await API.get('API', `/patients/me`, {});
        setCurrentUser(userDetails);
      }
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
  }

  const setUserEmail = (email: string) => {
    setState((curr) => ({
      ...curr,
      userEmail: email
    }));
  }

  const setIsResetCodeRequested = (isRequested: boolean) => {
    setState((curr) => ({
      ...curr,
      isResetCodeRequested: isRequested
    }));
  }

  return {
    ...state,
    userHasAuthenticated,
    currentUser,
    setCurrentUser,
    setIsResetCodeRequested,
    setUserEmail,
    forgotPasswordSubmit,
    resetCodeClick,
    resetPasswordSubmit
  };
};
