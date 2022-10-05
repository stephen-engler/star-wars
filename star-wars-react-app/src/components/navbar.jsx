import { Breadcrumbs, Divider, Grid, Link, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { useMst } from '../models/Root';
const Navbar = observer(() => {
    const store = useMst();

    return (
        <div>
            <Grid container spacing="2" alignItems={'flex-end'}>
                <Grid item xs={2}>
                    <Typography variant="h3" component="h3" color="primary">
                        Star Wars
                    </Typography>
                </Grid>
                <Grid item width="4">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link to="all-planets" component={RouterLink}>
                            Planets
                        </Link>
                        {store.planet && (
                            <Link to={`/planet/${store.planet.id}`} component={RouterLink}>
                                {store.planet.name}
                            </Link>
                        )}
                        {store.person && <Link>{store.person.name}</Link>}
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Divider />
            <Grid container justifyContent={'center'}>
                <Grid item xs={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    );
});

export default Navbar;
