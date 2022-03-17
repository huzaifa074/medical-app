import API from '@aws-amplify/api';
import { useState } from 'react';
import { useAppContext } from '@store';
import Auth from '@aws-amplify/auth';
import { DoctorServiceInterface } from '../containers/doctor-profile/schema';

interface State {
  error: any;
  isLoading: boolean;
  done: boolean;
  serviceToEdit: DoctorServiceInterface;
  doctorServicesList: DoctorServiceInterface[];
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    done: false,
    serviceToEdit: null,
    doctorServicesList: []
  });

  const upsertService = async (body: DoctorServiceInterface, doctorId: string) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      if (!body.discount) {
        body.discount = 0;
      }

      let updatedServiceList = [];

      if (state.serviceToEdit) {
        // edit patient api
        const updatedService = await API.put('API', `/services/${state.serviceToEdit.id}`, { body });
        // updating service list locally
        updatedServiceList = [...state.doctorServicesList];
        const updatedServiceIndex = updatedServiceList.findIndex(service => service.id === updatedService.id);
        updatedServiceList[updatedServiceIndex] = updatedService;
      } else {
        // add patient api
        body.doctorId = doctorId;
        const service = await API.post('API', '/services', { body });
        updatedServiceList = [...state.doctorServicesList, service];
      }
      // await getDoctorServices(doctorId);
      setState((curr) => ({ ...curr, isLoading: false, done: true, doctorServicesList: updatedServiceList }));
    } catch (e) {
      setState((curr) => ({
        ...curr,
        error: e,
        isLoading: false,
        done: false,
      }));
    }
  };


  const deleteService = async (serviceId: string, doctorId: string) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      // delete service
      await API.del('API', `/services/${serviceId}`, {});
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        done: true,
      }));
      await getDoctorServices(doctorId);
    } catch (e) {
      setState((curr) => ({
        ...curr,
        error: e,
        isLoading: false,
        done: false,
      }));
    }
  }

  const getDoctorServices = async (doctorId: string) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      // edit patient api
      const { items } = await API.get('API', `/services`, { queryStringParameters: { doctorId } });
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        doctorServicesList: items,
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

  const setServiceToEdit = (serviceToEdit: any) => {
    setState((curr) => ({
      ...curr,
      serviceToEdit,
    }));
  };

  return {
    ...state,
    upsertService,
    getDoctorServices,
    setServiceToEdit,
    deleteService
  };
};
