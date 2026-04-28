const API_URL = 'https://valorant-api.com/v1/agents';

function isPlayableCharacter(agent) {
  return agent.isPlayableCharacter;
}

export async function fetchAgentes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener agentes');
    }
    const data = await response.json();
    return data.data.filter(isPlayableCharacter);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
