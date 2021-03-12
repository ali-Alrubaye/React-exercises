import { Link } from 'react-router-dom';
// import './Score.css';

function Score({ data }) {
  // const scoresContext = useContext(ScoresContext);
  const { game, date, player, score } = data[0];
  // const handleDelete = (id) => {
  //   deleteScores(id)
  //     .then((data) => {
  //       scoresContext.scoresDispatch({
  //         type: 'REMOVE_SUCCESS',
  //         payload: id,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col m-4">
          <div className="card-block px-2">
            <h3 className="item_game">{game.title}</h3>
            <p className="card-text">{player}</p>
            <p className="card-text">{date}</p>
          </div>
        </div>
        <div className="col m-4 text-center  ">
          <div className="card-block px-4">
            <p className="card-text ">{score}</p>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between w-100 ">
        <Link
          to={`/gamedetails/${game.title}`}
          className="btn btn-outline-success m-1"
        >
          Details
        </Link>
        <p className="mx-4 mt-1">Total score: {data.length}</p>
        {/* <button
          className="btn btn-outline-danger"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}

export default Score;
