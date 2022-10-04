import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import UsePersonService from './PersonService';
import { useMst } from '../../models/Root';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import { CircularProgress } from '@mui/material';
const Planet = observer(() => {
    const [loading, setLoading] = useState(true);
    const store = useMst();
    const { id } = useParams();
    const { getPerson } = UsePersonService();

    useEffect(() => {
        (async () => {
            try {
                let person = store.getPerson(+id);
                if (person) {
                    store.setPerson(cloneDeep(person));
                } else {
                    person = await getPerson(+id);
                    store.setPerson(person);
                }
            } catch (error) {
                console.log(error);
                toast.error('Error getting person');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            {loading && <CircularProgress />}
            {store.person && store.person.name}
        </div>
    );
});

export default Planet;
