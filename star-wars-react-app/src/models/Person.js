import { types } from 'mobx-state-tree';

export const Person = types.model({
    name: types.string,
    url: types.string,
    id: types.identifierNumber,
    height: types.string,
    mass: types.string,
    hair_color: types.string,
    skin_color: types.string,
    eye_color: types.string,
    birth_year: types.string,
    gender: types.string
});
