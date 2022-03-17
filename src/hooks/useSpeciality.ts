import API from '@aws-amplify/api';
import { useState } from 'react';

interface State {
    error: any;
    isLoading: boolean;
    done: boolean;
    specialitiesList: string[];
};

export default () => {
    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        done: false,
        specialitiesList: [],
    });

    const getSpecialitiesList = async () => {
        setState((curr) => ({ ...curr, error: null, isLoading: true, done: false }));
        try {
            // edit patient api
            const { items } = await API.get('API', `/specialities`, {});
            const mappedSpecialities = items.map(speciality => {
                const updatedSpeciality = { name: speciality.name, id: speciality.id };
                return updatedSpeciality;
            });

            setState((curr) => ({ ...curr, error: null, isLoading: false, specialitiesList: mappedSpecialities, done: true }));
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
        getSpecialitiesList,
    };
};
