import { useCallback } from 'react';
import axios from 'axios';

const PersonService = () => {
    const getPerson = useCallback(async (id) => {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        return response.data;
    }, []);
    return {
        getPerson
    };
};

export default PersonService;
