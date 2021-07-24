import { createContext, ReactElement } from 'react';
import { database } from './index';

export const BoxContext = createContext(database);
export const BoxProvider = ({ children }: { children: ReactElement }) => {
  return <BoxContext.Provider value={database}>{children}</BoxContext.Provider>;
};
