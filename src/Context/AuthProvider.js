import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

export const authContext = createContext();

const AuthProvider = ({children}) => {
    const allValues = useFirebase();
    return (
        <authContext.Provider value={allValues}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;