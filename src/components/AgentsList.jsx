import AgentCard from './AgentCard';
import AgentDetail from './AgentDetail';
import SearchBar from './SearchBar';
import { useAgentsContext } from '../context/AgentsContext';
import '../styles/AgentsList.css';

function AgentsList() {
  const {
    agentes,
    filteredAgentes,
    favorites,
    loading,
    error,
    showOnlyFavorites,
    setShowOnlyFavorites,
    selectedAgent,
    setSelectedAgent,
  } = useAgentsContext();

  function handleToggleFavorites() {
    setShowOnlyFavorites(!showOnlyFavorites);
  }

  function handleCloseDetail() {
    setSelectedAgent(null);
  }

  function renderAgentCard(agent) {
    return (
      <AgentCard
        key={agent.uuid}
        agent={agent}
        isFavorite={favorites.includes(agent.uuid)}
        onSelectAgent={setSelectedAgent}
      />
    );
  }

  if (loading) {
    return <div className="loading">Cargando agentes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="agents-container">
      <header className="agents-header">
        <h1>Agentes de Valorant</h1>
      </header>

      <SearchBar />

      <button
        className={`filter-btn ${showOnlyFavorites ? 'active' : ''}`}
        onClick={handleToggleFavorites}
      >
        {showOnlyFavorites ? '✓ Mostrando Favoritos' : 'Mostrar Favoritos'}
      </button>

      {filteredAgentes.length === 0 ? (
        <div className="no-results">
          No se encontraron agentes {showOnlyFavorites && 'en favoritos'}
        </div>
      ) : (
        <div className="agents-grid">
          {filteredAgentes.map(renderAgentCard)}
        </div>
      )}

      <div className="results-info">
        Mostrando {filteredAgentes.length} de {agentes.length} agentes
      </div>

      {selectedAgent && (
        <AgentDetail 
          agent={selectedAgent} 
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default AgentsList;
