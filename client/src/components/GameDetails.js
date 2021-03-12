import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  getGameBytitle,
  gethightenScore,
  deleteScores,
} from '../services/scoreServices';
import { ScoresContext } from '../contexts/HighscoreContext';

function GameDetails() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [highTen, setHighTen] = useState([]);
  const [highLoading, setHighLoading] = useState(true);
  const scoresContext = useContext(ScoresContext);
  const history = useHistory();
  let { slug } = useParams();

  useEffect(() => {
    getGameBytitle(slug)
      .then((response) => {
        setFilters(response.data);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log('not found');
      });
  }, [slug]);

  useEffect(() => {
    gethightenScore(slug)
      .then((response) => {
        setHighTen(response.data);
      })
      .then(() => setHighLoading(false))
      .catch((error) => {
        console.log('not found');
      });
  }, [slug]);

  const handleDelete = (id) => {
    deleteScores(id)
      .then((data) => {
        scoresContext.scoresDispatch({
          type: 'REMOVE_SUCCESS',
          payload: id,
        });
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12 text-center m-2">Highscores</h1>
      </div>
      <div className="">
        {loading ? (
          <h3 className="">Not found</h3>
        ) : (
          <div className="card">
            <div className="row no-gutters">
              <div className="col m-4">
                <div className="card-block px-2">
                  <h4 className="card-title">{filters.title}</h4>
                  <p className="card-text">{filters.description}</p>
                  <p className="card-text">Genre: {filters.genre}</p>
                  <p className="card-text">
                    Release year: {filters.releaseYear}
                  </p>
                </div>
              </div>
              <div className="col-auto">
                <img
                  src={filters.imageUrl}
                  className="img-fluid"
                  alt={filters.title}
                />
              </div>
            </div>
            <div className="card-footer w-100 text-muted">
              <Link to="#" className="btn btn-primary">
                Mor..
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="row mt-3">
        {highLoading ? (
          <h3>don't have score</h3>
        ) : (
          highTen.map((game) => (
            <div key={game._id} className="card mb-3">
              <h3>{game.title}</h3>
              <div className="row no-gutters">
                <div className="col m-4">
                  <div className="card-block px-2">
                    <h3 className="item_game">{game.title}</h3>
                    <p className="card-text">{game.player}</p>
                    <p className="card-text">{game.date}</p>
                  </div>
                </div>
                <div className="col m-4 text-center  ">
                  <div className="card-block px-4">
                    <p className="card-text ">{game.score}</p>
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-danger m-2 w-10"
                  onClick={() => handleDelete(game._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GameDetails;
