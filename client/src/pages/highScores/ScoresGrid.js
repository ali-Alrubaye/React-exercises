import React, { useContext, useEffect, useState } from 'react';
import Score from './Score';
import { Link } from 'react-router-dom';
import scoreServices from '../../services/scoreServices';
import { ScoresContext } from '../../contexts/HighscoreContext';

function ScoresGrid() {
  const scoresContext = useContext(ScoresContext);
  const { highscores, loading, error } = scoresContext.scores;

  const [data, setData] = useState([]);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    scoresContext.scoresDispatch({ type: 'FETCH_REQUEST' });
    scoreServices
      .getScores()
      .then((response) => {
        // groupByGame(response.data);

        scoresContext.scoresDispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
        });
      })
      .catch((error) => {
        scoresContext.scoresDispatch({
          type: 'FETCH_ERROR',
          payload: error.message,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    function groupByGame(score) {
      let group = score.reduce((r, a) => {
        r[a.game.title] = [...(r[a.game.title] || []), a];
        return r;
      }, []);
      let result = Object.values(group.sort((a, b) => b.score - a.score));
      setData(result);
    }
    groupByGame(highscores);
  }, [highscores]);

  return loading ? (
    <h2>Loading</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div>
      <h1>Highscores</h1>
      <Link to={'/new'} className="btn btn-outline-primary mb-3">
        Registrera event
      </Link>
      {data.map((d, index) => (
        <Score key={index} data={d} />
      ))}
    </div>
  );
}

export default ScoresGrid;
