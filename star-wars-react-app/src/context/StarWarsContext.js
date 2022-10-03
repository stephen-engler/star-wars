import React, { createContext, useContext } from 'react';
import { createStore } from '../store/store';

import { useLocalObservable } from 'mobx-react';

const StarWarsContext = createContext(null);

export const StarWarsContextProvider = ({ children }) => {
    const store = useLocalObservable(createStore);

    return <StarWarsContext.Provider value={store}>{children}</StarWarsContext.Provider>;
};
export const useStore = () => useContext(StarWarsContext);
