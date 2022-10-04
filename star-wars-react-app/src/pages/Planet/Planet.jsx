import React, { useEffect, useState } from 'react';
import { useMst } from '../../models/Root';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import UsePlanetService from './PlanetService';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import {
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent
} from '@mui/material';

const Planet = observer(() => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const store = useMst();
    const { id } = useParams();
    const { getPlanet, getPeople } = UsePlanetService();

    useEffect(() => {
        (async () => {
            try {
                let planet = store.getPlanet(+id);
                if (planet) {
                    // to do check if planet is already in store
                    store.setPlanet(cloneDeep(planet));
                    const peopleResponse = await getPeople(planet.residents);
                    store.setPeople(peopleResponse);
                } else {
                    planet = await getPlanet(+id);
                    store.setPlanet(planet);
                    const peopleResponse = await getPeople(planet.residents);
                    store.setPeople(peopleResponse);
                }
                store.setPerson(undefined);
            } catch (error) {
                console.log(error);
                toast.error('Error getting planet');
            } finally {
                setLoading(false);
            }
        })();
    }, [getPlanet, store, id, getPeople]);

    const filtered =
        search === ''
            ? store.people
            : store.people.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            {loading && <CircularProgress />}
            {store.planet && (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {store.planet.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Population: {store.planet.population}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            {store.people && (
                <>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="standard"
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.currentTarget.value);
                        }}
                        size="small"
                    />
                    <TableContainer component={Paper} style={{ maxHeight: 600 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Birth Year</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Height</TableCell>
                                    <TableCell>Weight</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((person) => (
                                    <TableRow
                                        key={person.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Link to={`/person/${person.id}`}>{person.name}</Link>
                                        </TableCell>
                                        <TableCell>{person.birth_year}</TableCell>
                                        <TableCell>{person.gender}</TableCell>
                                        <TableCell>{person.height}</TableCell>
                                        <TableCell>{person.mass}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    );
});

export default Planet;
