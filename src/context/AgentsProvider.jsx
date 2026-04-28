import { useEffect, useMemo, useState } from 'react';
import { fetchAgentes } from '../api/AgentesApi';
import { AgentsContext } from './AgentsContext';

const FAVORITES_STORAGE_KEY = 'agentsFavorites';

function readFavoritesFromStorage() {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function filterBySearchTerm(agentes, searchTerm) {
  const normalizedTerm = searchTerm.toLowerCase();
  const filteredAgentes = [];

  for (const agent of agentes) {
    if (agent.displayName.toLowerCase().includes(normalizedTerm)) {
      filteredAgentes.push(agent);
    }
  }

  return filteredAgentes;
}

function filterByFavorites(agentes, favorites) {
  const filteredAgentes = [];

  for (const agent of agentes) {
    if (favorites.includes(agent.uuid)) {
      filteredAgentes.push(agent);
    }
  }

  return filteredAgentes;
}

function toggleFavoriteInList(favorites, uuid) {
  const updatedFavorites = [];
  let wasFound = false;

  for (const favoriteId of favorites) {
    if (favoriteId === uuid) {
      wasFound = true;
      continue;
    }

    updatedFavorites.push(favoriteId);
  }

  if (!wasFound) {
    updatedFavorites.push(uuid);
  }

  return updatedFavorites;
}

export function AgentsProvider({ children }) {
  const [agentes, setAgentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(readFavoritesFromStorage());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  async function loadAgentesData() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAgentes();
      setAgentes(data);
    } catch {
      setError('No se pudieron cargar los agentes');
    } finally {
      setLoading(false);
    }
  }

  function handleLoadAgentesEffect() {
    void loadAgentesData();
  }

  function persistFavorites() {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }

  function buildFilteredAgentes() {
    let filtered = agentes;

    if (searchTerm) {
      filtered = filterBySearchTerm(filtered, searchTerm);
    }

    if (showOnlyFavorites) {
      filtered = filterByFavorites(filtered, favorites);
    }

    return filtered;
  }

  useEffect(handleLoadAgentesEffect, []);

  useEffect(persistFavorites, [favorites]);

  const filteredAgentes = useMemo(buildFilteredAgentes, [
    agentes,
    searchTerm,
    showOnlyFavorites,
    favorites,
  ]);

  function toggleFavorite(uuid) {
    setFavorites(toggleFavoriteInList(favorites, uuid));
  }

  const value = {
    agentes,
    filteredAgentes,
    searchTerm,
    setSearchTerm,
    favorites,
    toggleFavorite,
    loading,
    error,
    showOnlyFavorites,
    setShowOnlyFavorites,
    selectedAgent,
    setSelectedAgent,
  };

  return <AgentsContext.Provider value={value}>{children}</AgentsContext.Provider>;
}