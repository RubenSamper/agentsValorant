import '../styles/SearchBar.css';
import { useAgentsContext } from '../context/AgentsContext';

function SearchBar() {
  const { searchTerm, setSearchTerm, favorites } = useAgentsContext();

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Buscar agente..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="favorite-count">
        ♥ Favoritos: {favorites.length}
      </div>
    </div>
  );
}

export default SearchBar;
