import React, { useEffect } from 'react';
import { useStore } from '../../context/StarWarsContext';
import { Observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import UsePlanetService from './PlanetService';
import { Link } from 'react-router-dom';
const Planet = () => {
    const store = useStore();
    const { id } = useParams();
    const { getPlanet, getPeople } = UsePlanetService();
    useEffect(() => {
        (async () => {
            let planet = store.planets.filter((planet) => planet.id === +id)[0];
            if (planet) {
                // to do check if planet is already in store
                store.setPlanet(planet);
                const peopleResponse = await getPeople(planet.residents);
                store.setPeople(peopleResponse);
            } else {
                planet = await getPlanet(+id);
                store.setPlanet(planet);
                const peopleResponse = await getPeople(planet.residents);
                console.log(peopleResponse);
                store.setPeople(peopleResponse);
            }
        })();
    }, [getPlanet, store, id, getPeople]);
    return (
        <Observer>
            {() => {
                return (
                    <div>
                        {store.planet && store.planet.name}
                        {store.people &&
                            store.people.map((person) => {
                                return (
                                    <div key={person.name}>
                                        <Link to={`/person/${person.id}`}>{person.name}</Link>
                                    </div>
                                );
                            })}
                    </div>
                );
            }}
        </Observer>
    );
};

export default Planet;
