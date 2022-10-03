import React, { useEffect } from 'react';
import useAllPlanetService from './AllPlanetService';
import { useStore } from '../../context/StarWarsContext';
import { Observer } from 'mobx-react';
import { Link } from 'react-router-dom';
const AllPlanets = () => {
    const { getAllPlanets } = useAllPlanetService();
    const store = useStore();
    useEffect(() => {
        (async () => {
            if (store.planets.length === 0) {
                await getAllPlanets();
            }
            store.setPlanet(null);
            store.setPeople([]);
            store.setPerson(null);
        })();
    }, [getAllPlanets, store]);
    return (
        <Observer>
            {() => {
                return (
                    <div>
                        {store.planets.map((planet) => {
                            return (
                                <div key={planet.url}>
                                    <Link to={`/planet/${planet.id}`}>{planet.name} </Link>{' '}
                                    {planet.url}
                                </div>
                            );
                        })}
                    </div>
                );
            }}
        </Observer>
    );
};

export default AllPlanets;
