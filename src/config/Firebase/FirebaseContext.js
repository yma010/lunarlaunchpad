import React, { createContext } from 'react';
import Firebase from './firebase';

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => (
    <FirebaseContext.Provider value={new Firebase()}>
        { children }
    </FirebaseContext.Provider>
);
