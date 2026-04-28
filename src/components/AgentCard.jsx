import '../styles/AgentCard.css';
import { useAgentsContext } from '../context/AgentsContext';

function AgentCard({ agent, isFavorite, onSelectAgent }) {
  const { toggleFavorite } = useAgentsContext();

  function handleCardClick() {
    onSelectAgent(agent);
  }

  function handleFavoriteClick(event) {
    event.stopPropagation();
    toggleFavorite(agent.uuid);
  }

  return (
    <div className="agent-card" onClick={handleCardClick}>
      <div className="agent-image-wrapper">
        <img 
          src={agent.displayIcon} 
          alt={agent.displayName}
          className="agent-image"
        />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          ♥
        </button>
      </div>
      <div className="agent-info">
        <h3 className="agent-name">{agent.displayName}</h3>
        <p className="agent-role">{agent.role?.displayName || 'Rol desconocido'}</p>
        <p className="agent-description">{agent.description.substring(0, 80)}...</p>
        <span className="view-details">Ver detalles →</span>
      </div>
    </div>
  );
}

export default AgentCard;
