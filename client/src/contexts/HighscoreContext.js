import React, { useReducer } from 'react';

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  REGISTER_SUCCESS,
  REMOVE_SUCCESS,
} from './Types';

export const ScoresContext = React.createContext();

const initialState = {
  loading: false,
  error: '',
  highscores: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        highscores: [],
        error: '',
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        highscores: action.payload,
        error: '',
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        highscores: [],
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      // const add_state = [...state.highscores];
      // add_state = [...state.highscores, action.payload];
      return {
        ...state,
        loading: false,
        highscores: [...state.highscores, action.payload],
        error: '',
      };
    case REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        highscores: state.highscores.filter(
          (scor) => scor._id !== action.payload
        ),
        error: '',
      };
    default:
      return state;
  }
};
function HighscoreContext(children) {
  const [score, scoresDispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   scoresDispatch({ type: FETCH_REQUEST });
  //   scoreServices
  //     .getScores()
  //     .then((response) => {
  //       scoresDispatch({ type: FETCH_SUCCESS, payload: response.data });
  //     })
  //     .catch((error) => {
  //       scoresDispatch({ type: FETCH_ERROR });
  //     });
  // }, []);
  return (
    <div>
      <ScoresContext.Provider
        value={{ scores: score, scoresDispatch: scoresDispatch }}
        {...children}
      ></ScoresContext.Provider>
    </div>
  );
}

export default HighscoreContext;
