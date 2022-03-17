import API from '@aws-amplify/api';
import { useState } from 'react';
import { useAppContext } from '@store';
import Auth from '@aws-amplify/auth';
import { isObject } from 'formik';
import { updateDoctorObject } from '@utils';
import { IForm as DoctorInterface } from '../containers/doctor-profile/schema';

interface State {
  error: any;
  isLoading: boolean;
  doctorProfile: DoctorInterface;
  done: boolean;
  specialitiesList: string[];
  dashboardStats: any
}

export default () => {
  const [state, setState] = useState<State>({
    error: null,
    isLoading: false,
    doctorProfile: null,
    done: false,
    specialitiesList: [],
    dashboardStats: null
  });

  const { currentUser, setCurrentUser } = useAppContext();

  const getDoctorProfile = async (forceUpdate = false) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      doctorProfile: forceUpdate ? state.doctorProfile : null,
      done: false,
    }));
    if (!currentUser.id || forceUpdate) {
      try {
        const { attributes } = await Auth.currentUserInfo();
        const doctor = await API.get('API', `/doctors/${attributes.sub}`, {});

        const updatedDoctorObj = updateDoctorObject(doctor);
        setCurrentUser(updatedDoctorObj);
        setState((curr) => ({
          ...curr,
          error: null,
          isLoading: false,
          doctorProfile: doctor,
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
    } else {
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        doctorProfile: currentUser,
        done: true,
      }));
    }
  };

  const editDoctorProfile = async (body: any) => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));

    try {
      // check if specialities or insurances exists in body then map them to contain only ids
      if ('specialities' in body) {
        const mappedSpecialities = body.specialities.map(
          (speciality) => speciality.id
        );
        body.specialities = mappedSpecialities;
      }

      if ('insurances' in body) {
        const mappedInsurances = body.insurances.map(
          (insurance) => insurance.id
        );
        body.insurances = mappedInsurances.filter(insurance => insurance !== 'selectAll');
      }

      if ('primarySpeciality' in body && isObject(body.primarySpeciality)) {
        body.primarySpeciality = body.primarySpeciality.id;
      }

      // edit doctor api
      body.name = `${body.firstName} ${body.lastName}`;
      const updatedDoctor = await API.put('API', `/doctors/${currentUser.id}`, {
        body,
      });

      const updatedDoctorObj = updateDoctorObject(updatedDoctor);

      setCurrentUser(updatedDoctorObj);

      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        doctorProfile: updatedDoctor,
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

  const getSpecialitiesList = async () => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
    }));
    try {
      // edit patient api
      const specialities = await API.get('API', `/specialities`, {});
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        specialitiesList: specialities,
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


  const getDashboardStats = async () => {
    setState((curr) => ({
      ...curr,
      error: null,
      isLoading: true,
      done: false,
      dashboardStats: null,
    }));
    try {
      // edit patient api
      const dashboardStats = await API.get('API', `/doctors/${currentUser.id}/stats`, {});
      console.log("dashboardStats", dashboardStats);
      setState((curr) => ({
        ...curr,
        error: null,
        isLoading: false,
        dashboardStats: dashboardStats,
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
    getDoctorProfile,
    editDoctorProfile,
    getSpecialitiesList,
    getDashboardStats
  };
};
