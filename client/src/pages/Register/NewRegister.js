import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { useHistory, Link } from 'react-router-dom';
import { ScoresContext } from '../../contexts/HighscoreContext';
import { GamesContext } from '../../contexts/GamesContext';
import { addScore } from '../../services/scoreServices';

function NewRegister() {
  const scoresContext = useContext(ScoresContext);
  const gameContext = useContext(GamesContext);

  const gameData = gameContext.games.game.map((d) => ({
    value: d._id,
    label: d.title,
  }));

  const history = useHistory();

  const [newRegister, setNewRegister] = useState({
    game: { id: '', title: '' },
    date: '',
    player: '',
    score: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addScore(newRegister)
      .then((response) => {
        scoresContext.scoresDispatch({
          type: 'REGISTER_SUCCESS',
          payload: response.data,
        });
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Register highscore</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Select
            options={gameData}
            placeholder="please select game"
            required
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                game: { id: e.value, title: e.label },
              })
            }
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-control"
            id="date"
            name="date"
            defaultValue="2021-01-01T12:00:00"
            type="datetime-local"
            required
            onChange={(e) =>
              setNewRegister({ ...newRegister, date: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputplayer">Player</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputplayer"
            placeholder="Enter player"
            required
            onChange={(e) =>
              setNewRegister({ ...newRegister, player: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputscore">Score</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputscore"
            placeholder="Enter score"
            required
            onChange={(e) =>
              setNewRegister({ ...newRegister, score: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary m-3">
            Add
          </button>
          <Link to="/" type="button" className="btn btn-secondary m-3">
            Cansel
          </Link>
        </div>

        {/* <div className="form-group">
                    <button type="submit" className="btn btn-outline-secondary">Cansel</button>
                </div> */}
      </form>
    </div>
  );
}

export default NewRegister;
