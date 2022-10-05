import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useMst } from '../../models/Root';
import UseStarWarsService from '../../services/StarWarsService';

const Planet = observer(() => {
    const [loading, setLoading] = useState(true);
    const store = useMst();
    const { id } = useParams();
    const { getPerson } = UseStarWarsService();

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
    }, [getPerson, store, id]);

    return (
        <div>
            {loading && <CircularProgress />}
            {store.person && (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {store.person.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Born: {store.person.birth_year}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Height: {store.person.height}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Weight: {store.person.mass}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Gender: {store.person.gender}
                        </Typography>
                        <Typography variant="body2">
                            Hair: {store.person.hair_color}
                            <br />
                            Eye Color: {store.person.eye_color}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    );
});

export default Planet;
