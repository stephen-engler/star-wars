import { useCallback } from 'react';
import axios from 'axios';

const regex = new RegExp(/\d+/);
const PlanetService = () => {
    const getPlanet = useCallback(async (id) => {
        const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
        response.data.id = id;
        return response.data;
    }, []);

    const getPeople = useCallback(async (urls) => {
        const promises = urls.map((url) => {
            return axios.get(url);
        });
        const response = await Promise.all(promises);
        const people = response.map((r) => {
            const person = r.data;
            person.id = +person.url.match(regex)[0];
            return person;
        });
        return people;
    }, []);
    return {
        getPlanet,
        getPeople
    };
};

export default PlanetService;
