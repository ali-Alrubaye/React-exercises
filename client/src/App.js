import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HighscoreContext from './contexts/HighscoreContext';
import GameContext from './contexts/GamesContext';
import ScoresGrid from './pages/highScores/ScoresGrid';
import './App.css';
import GameDetails from './components/GameDetails';
import NewRegister from './pages/Register/NewRegister';

function App() {
  return (
    <HighscoreContext>
      <GameContext>
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/">
                <ScoresGrid />
              </Route>
              <Route path="/new">
                <NewRegister />
              </Route>
              <Route path="/gamedetails/:slug">
                <GameDetails />
              </Route>
            </Switch>
          </Router>
        </div>
      </GameContext>
    </HighscoreContext>
  );
}

export default App;
