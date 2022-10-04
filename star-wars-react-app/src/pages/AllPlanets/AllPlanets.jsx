import React, { useEffect, useState } from 'react';
import useAllPlanetService from './AllPlanetService';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useMst } from '../../models/Root';
import { toast } from 'react-toastify';
import {
    CircularProgress,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

const AllPlanets = observer(() => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { getAllPlanets } = useAllPlanetService();
    const store = useMst();

    useEffect(() => {
        (async () => {
            try {
                if (store.planets.length === 0) {
                    await getAllPlanets();
                }
                store.setPlanet(undefined);
                store.setPeople([]);
                store.setPerson(undefined);
            } catch (error) {
                console.log(error);
                toast.error('Error getting planets');
            } finally {
                setLoading(false);
            }
        })();
    }, [getAllPlanets, store]);

    const filtered =
        search === ''
            ? store.planets
            : store.planets.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ flexGrow: 1 }}>
            {loading && <CircularProgress />}
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
                            <TableCell>Population</TableCell>
                            <TableCell>Terrain</TableCell>
                            <TableCell>Gravity</TableCell>
                            <TableCell>Climate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((planet) => (
                            <TableRow
                                key={planet.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Link to={`/planet/${planet.id}`}>{planet.name}</Link>
                                </TableCell>
                                <TableCell>{planet.population}</TableCell>
                                <TableCell>{planet.terrain}</TableCell>
                                <TableCell>{planet.gravity}</TableCell>
                                <TableCell>{planet.climate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});

export default AllPlanets;
