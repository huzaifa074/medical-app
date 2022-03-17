import { API } from 'aws-amplify';
import { useState } from 'react';
import institutesList from '../data/institutes.json';

interface State {
    error: any;
    institutesList: any[];
};

export default () => {
    const [state, setState] = useState<State>({
        error: null,
        institutesList: [],
    });


    const getInstitutesList = async (q: string) => {

        setState((curr) => ({ ...curr, error: null, instituteList: [] }));

        // const searchRegex = new RegExp(searchQuery, 'i');

        // search from institutes json
        const { items } = await API.get('API', `/institutes`, { queryStringParameters: { q } });

        setState((curr) => ({ ...curr, error: null, isLoading: false, institutesList: items }));

    };

    return {
        ...state,
        getInstitutesList,
    };
};
