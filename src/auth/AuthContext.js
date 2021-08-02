import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../components/Firebase';

const AuthContext = createContext();

const useAuth = () => {
  //retorna el contexto de auth
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //funcion que se ejecuta al cambiar el estado de login
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const login = (email, password) => {
    //resive el email y contrasena y hace login
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return auth.signOut();
  };

  //   useEffect(() => {
  //     return logOut();
  //   }, []);

  const value = {
    currentUser,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
