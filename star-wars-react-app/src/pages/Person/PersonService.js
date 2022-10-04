import { useCallback } from 'react';
import axios from 'axios';

const PersonService = () => {
    const getPerson = useCallback(async (id) => {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        const person = response.data;
        person.id = id;
        return person;
    }, []);
    return {
        getPerson
    };
};

export default PersonService;
