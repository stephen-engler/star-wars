import React, { useEffect } from 'react';
import { useStore } from '../../context/StarWarsContext';
import { Observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import UsePersonService from './PersonService';

const Planet = () => {
    const store = useStore();
    const { id } = useParams();
    const { getPerson } = UsePersonService();
    useEffect(() => {
        (async () => {
            console.log('test');
            let person = store.people.filter((p) => p.id === +id)[0];
            if (person) {
                store.setPerson(person);
            } else {
                person = await getPerson(+id);
                store.setPerson(person);
            }
        })();
    }, []);
    return (
        <Observer>
            {() => {
                return <div>{store.person && store.person.name}</div>;
            }}
        </Observer>
    );
};

export default Planet;
