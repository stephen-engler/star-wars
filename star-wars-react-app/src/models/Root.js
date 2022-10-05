import { onSnapshot, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { Planet } from './Planet';
import { Person } from './Person';

const RootModel = types
    .model({
        planets: types.array(Planet),
        // tried making this a types.maybe(types.references(Planet)) here but ran into issues
        // if user navigated to planet page directly and there was no Planet to reference in the Planets array
        // could get it to work by fetching all planets first but didn't seem worth the loading time
        // or maybe adding the one planet to the planet array so theirs a reference but would need to refactor how i'm
        // adding to the planets array when fetching.
        planet: types.maybe(Planet),
        people: types.array(Person),
        person: types.maybe(Person)
    })
    .actions((self) => ({
        addPlanets(newPlanets) {
            self.planets = self.planets.concat(newPlanets);
        },
        getPlanet(id) {
            const planet = self.planets.filter((p) => p.id === id)[0];
            return planet;
        },
        setPlanet(newPlanet) {
            if (newPlanet) {
                self.planet = newPlanet;
            } else {
                self.planet = undefined;
            }
        },
        setPeople(newPeople) {
            self.people = newPeople;
        },
        getPerson(id) {
            const person = self.people.filter((p) => p.id === id)[0];
            return person;
        },
        setPerson(newPerson) {
            self.person = newPerson;
        }
    }));

let initialState = RootModel.create({
    planets: [],
    people: [],
    person: undefined,
    planet: undefined
});

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
    console.log('Snapshot: ', snapshot);
    localStorage.setItem('rootState', JSON.stringify(snapshot));
});

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }
    return store;
}
