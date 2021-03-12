import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

export const GamesContext = React.createContext();

const initialState = {
  loading: true,
  error: '',
  game: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        game: action.payload,
        error: '',
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        game: [],
        error: 'Something went wrong!',
      };
    default:
      return state;
  }
};

function GameContext(children) {
  const [game, gamesDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/games`)
      .then((response) => {
        gamesDispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        gamesDispatch({ type: 'FETCH_ERROR' });
      });
  }, []);

  return (
    <div>
      <GamesContext.Provider
        value={{ games: game, gamesDispatch: gamesDispatch }}
        {...children}
      ></GamesContext.Provider>
    </div>
  );
}

export default GameContext;
