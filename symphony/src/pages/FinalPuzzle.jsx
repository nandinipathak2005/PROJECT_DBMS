import { useState, useEffect, useContext } from 'react';
import { Clock, BookOpen, HelpCircle, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { executeQuery, fetchPuzzle } from '../api';
import QueryResults from '../components/QueryResults';
import StoryBox from '../components/StoryBox';
import RiddleComponent from '../components/RiddleComponent';
import SQLQueryInterface from '../components/SQLQueryInterface';
import Notebook from '../components/Notebook';
import GameProgressBar from '../components/GameProgressBar';

export default function FinalPuzzle() {
  const navigate = useNavigate();
  const { gameTime, deductTime, addNotebookEntry, updatePuzzle, notebookEntries } = useContext(GameContext);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [puzzleData, setPuzzleData] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasQueryExecuted, setHasQueryExecuted] = useState(false);

  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        const data = await fetchPuzzle('final'); // Or 4, depending on your backend route
        setPuzzleData(data);
      } catch (err) {
        setError(err.message || 'Failed to load final puzzle data.');
      } finally {
        setLoading(false);
      }
    };
    loadPuzzle();
  }, []);

  const handleQuerySelect = (queryText) => setSelectedQuery(queryText);

  const handleExecuteQuery = async () => {
    if (!selectedQuery) return alert('Please select a query.');

    setQueryResult({ loading: true, data: null, error: null });
    setHasQueryExecuted(true);
    try {
      const result = await executeQuery(selectedQuery, 'final'); // Or 4
      setQueryResult({ loading: false, data: result, error: null });

      if (result?.notebookUpdate) {
        addNotebookEntry({
          title: `Final Puzzle – Symphony Key`,
          content: result.notebookUpdate,
        });
      }

      if (result?.timePenalty) {
        deductTime(result.timePenalty);
      }

      if (!result?.table || result.table.length === 0) {
        alert('No data fetched for this query.');
      }
    } catch (err) {
      setQueryResult({ loading: false, data: null, error: err.message });
      deductTime(30);
    }
  };

  const handleProceed = () => {
    navigate('/end-game'); // Navigate to the end game page irrespective of the query
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? '0' + mins : mins}`;
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Final Puzzle...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">Error loading Final Puzzle: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/puzzle/3" className="flex items-center text-gray-400 hover:text-gray-300 mr-6">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm">Back to Puzzle 3</span>
          </Link>
          <h1 className="text-xl font-medium text-white">{puzzleData?.title || '🎼 Final Puzzle – Riddle Lock on Symphony Database'}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-indigo-300 mr-2" />
            <span className="text-white font-medium">{formatTime(gameTime)}</span>
          </div>
          <button
            onClick={() => setIsNotebookOpen(!isNotebookOpen)}
            className={`flex items-center px-3 py-1 rounded-full transition-colors ${
              isNotebookOpen ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Notebook
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-56px)]">
        <div className={`flex-grow transition-all ${isNotebookOpen ? 'mr-80' : ''} p-6`}>
          <GameProgressBar current={4} total={4} />
          <div className="space-y-6 mt-4">
            {puzzleData?.riddle && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-yellow-300 mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Riddle
                </h3>
                <p className="text-gray-300 italic mb-3">{puzzleData.riddle}</p>
                {puzzleData?.clue && <p className="text-gray-300 mb-3">Clue: {puzzleData.clue}</p>}
              </div>
            )}

            {puzzleData?.queries && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  SQL Query Interface
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  Unlock the symphony's secret with the correct SQL query.
                </p>
                <SQLQueryInterface
                  queries={puzzleData.queries.map(q => q.text)}
                  onQuerySelect={handleQuerySelect}
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleExecuteQuery}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    Execute Query <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {queryResult && <QueryResults result={queryResult} />}

            {hasQueryExecuted && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleProceed}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  Proceed to End <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
        <Notebook isOpen={isNotebookOpen} entries={notebookEntries} />
      </div>
    </div>
  );
}