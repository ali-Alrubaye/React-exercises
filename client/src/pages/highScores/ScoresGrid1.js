import React, { useContext, useEffect, useState } from 'react';
import { ScoresContext } from '../../contexts/HighscoreContext';
import Score from './Score';
import { Link } from 'react-router-dom';
import scoreServices from '../../services/scoreServices';

function ScoresGrid() {
  const scoresContext = useContext(ScoresContext);
  const [sort, setSort] = useState([]);
  const { highscores, loading, error } = scoresContext.scores;
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  function groupBy(objectArray) {
    const result = objectArray.reduce(function (acc, obj) {
      let game = { ...obj['game'] };
      let key = game['title'];
      if (!acc[key]) {
        acc[key] = {};
      }
      if ((acc[key] = {})) {
        acc[key] = obj;
      }
      return acc;
    }, []);
    setData(result);
    // return result;
  }

  useEffect(() => {
    groupBy(sort);
  }, [show]);

  console.log(data);
  useEffect(() => {
    scoreServices
      .getScores()
      .then((res) => {
        setSort(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  //   useEffect(() => {
  //     scoresContext.scoresDispatch({ type: 'FETCH_REQUEST' });
  //     scoreServices
  //       .getHighScores()
  //       .then((response) => {
  //         scoresContext.scoresDispatch({
  //           type: 'FETCH_SUCCESS',
  //           payload: response.data,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log('Error', error);
  //         scoresContext.scoresDispatch({
  //           type: 'FETCH_ERROR',
  //           payload: error,
  //         });
  //       });
  //   }, []);

  return !show ? (
    <h2>Loading</h2>
  ) : (
    <div>
      <h1>Highscores</h1>
      <Link to={'/new'} className="btn btn-outline-primary mb-3">
        Registrera event
      </Link>
      {/* {gr.map((g, index) => (*/}
      {/* <Score data={data} /> */}
      {/*))} */}
    </div>
  );
}

export default ScoresGrid;
