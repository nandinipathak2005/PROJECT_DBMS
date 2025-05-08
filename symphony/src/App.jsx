
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './GameContext';
import HomePage from './pages/HomePage';
import CharacterProfiles from './pages/CharacterProfiles';
import Puzzle1 from './pages/Puzzle1';
import Puzzle1Branch from './pages/Puzzle1Branch';
import Puzzle2 from './pages/Puzzle2';
import Puzzle2Branch from './pages/Puzzle2Branch';
import Puzzle3 from './pages/Puzzle3';
import Puzzle3Branch from './pages/Puzzle3Branch'
import Puzzle3Branch2 from './pages/Puzzle3Branch2';
import FinalPuzzle from './pages/FinalPuzzle';
//import EndStageOne from './pages/EndStageOne';
//import GameEnd from './pages/GameEnd';
 /* <Route path="/final" element={<FinalPuzzle />} />
          <Route path="/end" element={<GameEnd />} />*/
function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharacterProfiles />} />
          <Route path="/puzzle/1" element={<Puzzle1 />} />
          <Route path="/puzzle/1/forgery" element={<Puzzle1Branch />} />
          <Route path="/puzzle/2" element={<Puzzle2 />} />
          <Route path="/puzzle/2/stage-left" element={<Puzzle2Branch />} />
          <Route path="/puzzle/3" element={<Puzzle3 />} />
          <Route path="/puzzle/3/archivist" element={<Puzzle3Branch />} />
          <Route path="/puzzle/3/technician" element={<Puzzle3Branch2 />} />
          <Route path="/final-puzzle" element={<FinalPuzzle />} />
          {/* <Route path="/end-game" element={<EndStageOne />} />
         */}
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;