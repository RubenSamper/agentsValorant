import '../styles/AgentDetail.css';

function AgentDetail({ agent, onClose }) {
  function handleModalContentClick(event) {
    event.stopPropagation();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="detail-container">
          <div className="detail-image">
            <img 
              src={agent.bustPortrait || agent.displayIcon} 
              alt={agent.displayName}
            />
          </div>

          <div className="detail-info">
            <div className="detail-header">
              <h1>{agent.displayName}</h1>
              <p className="detail-role">{agent.role?.displayName}</p>
            </div>

            <div className="detail-description">
              <p>{agent.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDetail;
