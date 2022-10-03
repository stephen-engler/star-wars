import { types } from 'mobx-state-tree';

const Planets = types.model({
    name: types.string,
    id: types.number,
    url: types.string
});

const StarWarsStore = types.model({
    planets: types.array(Planets)
});

export const create = () => {
    StarWarsStore.create({
        planets: []
    });
};

export const starWars = StarWarsStore.create;

export const createStore = () => {
    return {
        planets: [],
        setPlanets(localPlanets) {
            this.planets = [...this.planets, ...localPlanets];
        },
        planet: undefined,
        setPlanet(localPlanet) {
            this.planet = localPlanet;
        },
        people: [],
        setPeople(localPeople) {
            this.people = localPeople;
        },
        person: undefined,
        setPerson(localPerson) {
            this.person = localPerson;
        }
    };
};
