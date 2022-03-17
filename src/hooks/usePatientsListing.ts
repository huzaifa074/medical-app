import API from '@aws-amplify/api';

import { useState } from 'react';
import { useAppContext } from '@store';

interface State {
  error: any;
  isLoading: boolean;
  patients: any[];
  totalRecords: number;
  done: boolean;
}

interface patientsListQueryParams {
  page: number;
  size: number;
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    patients: [],
    totalRecords: 0,
    done: false,
  });

  const { currentUser, setCurrentUser } = useAppContext();

  const getListing = async ({ page, size }: patientsListQueryParams) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      patients: [],
      done: true,
    }));
    try {
      const { items, total } = await API.get('API', '/patients', {
        queryStringParameters: { page, size, doctorId: currentUser.id },
      });
      setState((curr) => ({
        ...curr,
        isLoading: false,
        totalRecords: total,
        patients: items,
        done: true,
      }));
    } catch (error) {
      setState((curr) => ({ ...curr, error, isLoading: false }));
    }
  };

  return {
    ...state,
    getListing,
  };
};
