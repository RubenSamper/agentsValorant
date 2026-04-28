import { createContext, useContext } from 'react';

export const AgentsContext = createContext(null);

export function useAgentsContext() {
  const context = useContext(AgentsContext);

  if (!context) {
    throw new Error('useAgentsContext debe usarse dentro de AgentsProvider');
  }

  return context;
}