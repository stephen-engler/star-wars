import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from '../context/StarWarsContext';
import { Link } from 'react-router-dom';
import { Observer } from 'mobx-react';
const Navbar = () => {
    const store = useStore();
    return (
        <Observer>
            {() => {
                return (
                    <div>
                        <div>Star Wars</div>
                        <div>
                            <Link to="all-planets">Planets</Link>{' '}
                            {store.planet && (
                                <>
                                    /{' '}
                                    <Link to={`/planet/${store.planet.id}`}>
                                        {store.planet.name}
                                    </Link>
                                </>
                            )}
                        </div>
                        <Outlet />
                    </div>
                );
            }}
        </Observer>
    );
};

export default Navbar;
