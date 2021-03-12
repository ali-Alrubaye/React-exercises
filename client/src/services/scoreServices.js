import axios from 'axios';

export async function getScores() {
  const response = await axios.get('http://localhost:8000/highscores');
  return response;
}
export async function getHighScores() {
  const response = await axios.get('http://localhost:8000/highscores/high');
  return response;
}

export async function getScore(id) {
  const response = await axios.get(`http://localhost:8000/highscores/${id}`);
  return response;
}
export async function gethightenScore(title) {
  const response = await axios.get(
    `http://localhost:8000/highscores/highten/${title}`
  );
  return response;
}
export async function deleteScores(id) {
  const response = await axios.delete(`http://localhost:8000/highscores/${id}`);
  return response;
}

export async function addScore(values) {
  const response = await axios.post('http://localhost:8000/highscores', values);
  return response;
}

export async function getGame(id) {
  const response = await axios.get(`http://localhost:8000/games/${id}`);
  return response;
}
export async function getGameBytitle(id) {
  const response = await axios.get(`http://localhost:8000/games/title/${id}`);
  return response;
}

const scoreServices = {
  getScores,
  getHighScores,
  getScore,
  gethightenScore,
  deleteScores,
  addScore,
  getGame,
  getGameBytitle,
};
export default scoreServices;
