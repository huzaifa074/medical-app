import API from '@aws-amplify/api';
import { useState } from 'react';

interface State {
    error: any;
    isLoading: boolean;
    insurancesList: string[];
    done: boolean;
}

export default () => {
    const [state, setState] = useState<State>({
        error: null,
        isLoading: false,
        insurancesList: [],
        done: false,
    });


    // get insurances list
    const getInsurances = async () => {
        setState((curr) => ({
            ...curr,
            error: null,
            isLoading: true,
        }));
        try {
            const { items } = await API.get('API', '/insurances', {});
            const mappedItems = items.map((insurance) => {
                const updatedInsurance = { name: insurance.name, id: insurance.id };
                return updatedInsurance;
            });
            mappedItems.unshift({ name: 'Select All', id: 'selectAll' });
            setState((curr) => ({
                ...curr,
                isLoading: false,
                insurancesList: mappedItems,
            }));
        } catch (e) {
            setState((curr) => ({ ...curr, error: e, isLoading: false }));
        }
    };

    return {
        ...state,
        getInsurances,
    };
};
