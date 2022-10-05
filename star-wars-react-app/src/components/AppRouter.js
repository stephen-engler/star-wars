import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AllPlanets from '../pages/AllPlanets/AllPlanets';
import Person from '../pages/Person/Person';
import Planet from '../pages/Planet/Planet';
import Navbar from './NavBar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
                path: 'all-planets',
                element: <AllPlanets />
            },
            {
                path: 'planet/:id',
                element: <Planet />
            },
            {
                path: 'person/:id',
                element: <Person />
            },
            {
                index: true,
                element: <AllPlanets />
            }
        ]
    }
]);

export default router;
