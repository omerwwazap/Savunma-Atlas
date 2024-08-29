import React, { createContext, useContext } from 'react';
import { supabase } from './supabaseClient';

const SupabaseContext = createContext();

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};