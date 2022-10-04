import { useCallback } from 'react';
import axios from 'axios';
//import { useStore } from '../../context/StarWarsContext';
import { useMst } from '../../models/Root';
const regex = new RegExp(/\d+/);
const AllPlanetService = () => {
    //const store = useStore();
    const store = useMst();
    const getAllPlanets = useCallback(async () => {
        await getPlanetPage('https://swapi.dev/api/planets');
    }, []);

    const getPlanetPage = useCallback(async (url) => {
        const response = await axios.get(url);
        const formattedResponse = response.data.results.map((planet) => {
            const id = +planet.url.match(regex)[0];
            return {
                ...planet,
                id
            };
        });
        store.addPlanets(formattedResponse);
        if (response.data.next) {
            await getPlanetPage(response.data.next);
        }
    }, []);
    return {
        getAllPlanets
    };
};

export default AllPlanetService;
