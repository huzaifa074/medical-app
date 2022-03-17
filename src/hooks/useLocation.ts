import API from '@aws-amplify/api';
import { useState } from 'react';
import { useAppContext } from '@store';
import useDoctorProfile from './useDoctorProfile';

interface State {
    error: any;
    isLoading: boolean;
    done: boolean;
    locationForEdit: any;
}

export default (editDoctorProfile, getDoctorProfile) => {
    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        done: false,
        locationForEdit: null,
    });

    const { currentUser, setCurrentUser } = useAppContext();

    const upsertLocation = async (body: any) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
            done: false,
        }));
        try {
            // create update location
            const location = state.locationForEdit
                ? await API.put('API', `/locations/${state.locationForEdit.id}`, { body: { name: body.name, formattedAddress: body.formattedAddress, geoPoint: body.geoPoint, schedule: body.schedule } })
                : await API.post('API', '/locations', { body: { name: body.name, formattedAddress: body.formattedAddress, geoPoint: body.geoPoint } });

            // update doctor
            if (state.locationForEdit) {
                const locationIndex = currentUser.practiceLocations.findIndex(location => location.id === state.locationForEdit.id);
                currentUser.practiceLocations.splice(locationIndex, 1);
            }

            const locationToPush = state.locationForEdit ? {
                id: location.id,
                name: body.name,
                formattedAddress: body.formattedAddress,
                geoPoint: body.geoPoint,
                schedule: body.schedule,
                consultation: body.consultation,
            } : {
                id: location.id,
                name: body.name,
                formattedAddress: body.formattedAddress,
                geoPoint: body.geoPoint,
                schedule: {},
                consultation: {},
            }

            const doctorBody = {
                ...currentUser,
                practiceLocations: [
                    ...currentUser.practiceLocations,
                    locationToPush
                ],
            };

            await editDoctorProfile(doctorBody, false);
            // await getDoctorProfile(false);

            setState((curr) => ({
                ...curr,
                error: null,
                isLoading: false,
                done: true,
                locationForEdit: null
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

    const setLocationToEdit = (location: any) => {
        setState((curr) => ({
            ...curr,
            locationForEdit: location
        }));
    };

    const updateLocationSchedule = async (locationId, body: any) => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
            done: false,
        }));
        try {
            const updatedLocationObj = await API.put('API', `/doctors/${currentUser.id}/locations/${locationId}/schedule`, {
                body,
            });

            const locationIndex = currentUser.practiceLocations.findIndex(location => location.id === locationId);
            currentUser.practiceLocations[locationIndex] = { ...currentUser.practiceLocations[locationIndex], schedule: updatedLocationObj.schedule };

            const doctorBody = {
                ...currentUser,
                practiceLocations: [
                    ...currentUser.practiceLocations,
                ],
            };

            await editDoctorProfile(doctorBody);
            await getDoctorProfile(true);

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
        upsertLocation,
        setLocationToEdit,
        currentUser,
        updateLocationSchedule
    };
};
