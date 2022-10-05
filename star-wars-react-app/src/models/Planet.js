import { types } from 'mobx-state-tree';

export const Planet = types.model({
    name: types.string,
    url: types.string,
    id: types.identifierNumber,
    climate: types.string,
    diameter: types.string,
    gravity: types.string,
    orbital_period: types.string,
    rotational_period: types.maybe(types.string),
    population: types.string,
    residents: types.array(types.string),
    surface_water: types.string,
    terrain: types.string,
    films: types.array(types.string),
    created: types.maybe(types.string),
    edited: types.maybe(types.string)
});
