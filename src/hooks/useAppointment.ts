import API from '@aws-amplify/api';
import moment from 'moment';
import { useState } from 'react';
import { useAppContext } from '@store';

interface State {
    error: any;
    isLoading: boolean;
    isSlotsLoading: boolean;
    isPatientsLoading: boolean;
    done: boolean;
    patientsList: any[];
    appointmentToEdit: any;
    totalRecords: number;
    appointmentList: any[];
    slots: any[];
}

interface appointmentListQueryParams {
    page: number;
    size: number;
}

export default () => {
    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        isSlotsLoading: false,
        isPatientsLoading: false,
        done: false,
        patientsList: [],
        appointmentToEdit: null,
        totalRecords: 0,
        appointmentList: [],
        slots: []
    });

    // current logged in doctor profile
    const { currentUser } = useAppContext();

    const upsertAppointment = async (body: any, appointmentId: string = null) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
            done: false,
        }));

        // adding doctor id in body
        body.doctorId = currentUser.id;
        if (body.followUpDate) {
            body.followUpDate = moment(body.followUpDate).unix();
        } else {
            body.followUpDate = 0;
        }
        try {
            if (appointmentId) {
                let updatedAppointmentList = [];
                // edit appointment api
                const updatedAppointment = await API.put('API', `/appointments/${appointmentId}`, { body });
                // update list of appointments
                updatedAppointmentList = [...state.appointmentList];
                const updatedAppointmentIndex = updatedAppointmentList.findIndex(appointment => appointment.id === updatedAppointment.id);
                updatedAppointmentList[updatedAppointmentIndex] = updatedAppointment;
                setState((curr) => ({ ...curr, isLoading: false, done: true, appointmentList: updatedAppointmentList }));
            } else {
                // add appointment api
                await API.post('API', '/appointments', { body });
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

    // get appointments list
    const getAppointments = async ({ page, size }: appointmentListQueryParams, patientId?: string, pastConsultations?: boolean) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
            done: false,
        }));
        try {

            // create query paramters object
            let queryStringParameters: any = { page, size };

            // conditionally add patient id to query paramters if got in method parameters
            if (patientId) {
                queryStringParameters = { patientId };
                if (pastConsultations) {
                    queryStringParameters.endTime = moment(new Date()).toISOString();
                } else {
                    queryStringParameters.startTime = moment(new Date()).toISOString();
                }
            }

            // get appointments api
            const { items, total } = await API.get('API', patientId ? `/appointments` : `/doctors/${currentUser.id}/appointments`, { queryStringParameters });
            setState((curr) => ({
                ...curr,
                error: null,
                isLoading: false,
                appointmentList: items,
                totalRecords: total,
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

    // get appointments for specific date
    const getAppointmentsForSpecificDate = async (date: string[], { page = 1, size = 500 }: appointmentListQueryParams, patientId?: string) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
            done: false,
        }));
        try {
            const queryStringParameters: any = {
                startTime: date[0],
                endTime: date[1],
                page,
                size
            };

            if (patientId) {
                queryStringParameters.patientId = patientId;
            }

            // get appointments api
            const { items, total } = await API.get('API', `/doctors/${currentUser.id}/appointments`, { queryStringParameters });
            setState((curr) => ({
                ...curr,
                error: null,
                isLoading: false,
                appointmentList: items,
                totalRecords: total,
            }));

            return items;

        } catch (e) {
            setState((curr) => ({
                ...curr,
                error: e,
                isLoading: false,
                done: false,
            }));
        }
    };

    // get appointments list
    const getPatientsList = async (query: string) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isPatientsLoading: true,
            done: false,
        }));
        try {
            // get patients list api
            const { items, total } = await API.get('API', `/patients`, { queryStringParameters: { q: query, doctorId: currentUser.id }, });
            setState((curr) => ({
                ...curr,
                error: null,
                isPatientsLoading: false,
                patientsList: items,
            }));
        } catch (e) {
            setState((curr) => ({
                ...curr,
                error: e,
                isPatientsLoading: false,
                done: false,
            }));
        }
    };

    // get slots
    const getSlots = async (date, locationId = '') => {
        setState((curr) => ({
            ...curr,
            error: null,
            isSlotsLoading: true,
            done: false,
        }));
        try {
            // get patients list api
            const slot = await API.get('API', `/doctors/${currentUser.id}/slots`, { queryStringParameters: { date, locationId }, });
            setState((curr) => ({
                ...curr,
                error: null,
                isSlotsLoading: false,
                slots: slot[date][0] ? slot[date] : [],
            }));
        } catch (e) {
            setState((curr) => ({
                ...curr,
                error: e,
                isSlotsLoading: false,
                done: false,
            }));
        }
    };

    // set appointment to edit
    const setAppointmentToEdit = (appointmentToEdit) => {
        setState((curr) => ({
            ...curr,
            appointmentToEdit
        }));
    }

    // get appointment detail by appointment id
    const getAppointmentById = async (appointmentId: string) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
            done: false,
        }));
        try {
            // get patients list api
            const appointmentToEdit = await API.get('API', `/appointments/${appointmentId}`, {});
            if (appointmentToEdit.followUpDate) {
                appointmentToEdit.followUpDate = moment.unix(appointmentToEdit.followUpDate).format('YYYY-MM-DD');
            } else {
                appointmentToEdit.followUpDate = '';
            }
            setState((curr) => ({
                ...curr,
                error: null,
                isLoading: false,
                appointmentToEdit
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
        getAppointments,
        upsertAppointment,
        getPatientsList,
        getAppointmentById,
        getSlots,
        getAppointmentsForSpecificDate,
        setAppointmentToEdit,
    };
};
