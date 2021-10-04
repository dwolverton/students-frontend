import { User } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

export interface AuthContextModel {
  user: User|null; // null when not logged in
}

const defaultValue:AuthContextModel = {
  user: null
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({children}: {children: ReactNode}) {
  const [ user, setUser ] = useState<User|null>(null);

  // Remember useEffect makes sure this code only runs once.
  useEffect(() => {
    // The return here passes the unsubscribe function back to useEffect which
    // will call it when this component is unmounted.
    return auth.onAuthStateChanged(newUser => {
      setUser(newUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthUser():User|null {
  return useContext(AuthContext).user;
}