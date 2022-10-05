import { useCallback } from 'react';
import axios from 'axios';
import { useMst } from '../models/Root';

const idRegex = new RegExp(/\d+/);

const swapiBaseUrl = 'https://swapi.dev/api';

const StarWarsService = () => {
    const store = useMst();

    const getIdFromUrl = useCallback((url) => {
        return +url.match(idRegex)[0];
    }, []);

    const getPlanetPage = useCallback(
        async (url) => {
            const response = await axios.get(url);
            const formattedResponse = response.data.results.map((planet) => {
                const id = getIdFromUrl(planet.url);
                return {
                    ...planet,
                    id
                };
            });
            store.addPlanets(formattedResponse);
            if (response.data.next) {
                await getPlanetPage(response.data.next);
            }
        },
        [store, getIdFromUrl]
    );

    const getAllPlanets = useCallback(async () => {
        await getPlanetPage(`${swapiBaseUrl}/planets`);
    }, [getPlanetPage]);

    const getPlanet = useCallback(async (id) => {
        const { data: planet } = await axios.get(`${swapiBaseUrl}/planets/${id}`);
        planet.id = id;
        return planet;
    }, []);

    const getPeople = useCallback(
        async (urls) => {
            const promises = urls.map((url) => {
                return axios.get(url);
            });
            const response = await Promise.all(promises);
            const people = response.map((r) => {
                const person = r.data;
                person.id = getIdFromUrl(person.url);
                return person;
            });
            return people;
        },
        [getIdFromUrl]
    );

    const getPerson = useCallback(async (id) => {
        const { data: person } = await axios.get(`${swapiBaseUrl}/people/${id}`);
        person.id = id;
        return person;
    }, []);

    return {
        getAllPlanets,
        getPlanet,
        getPeople,
        getPerson
    };
};

export default StarWarsService;
