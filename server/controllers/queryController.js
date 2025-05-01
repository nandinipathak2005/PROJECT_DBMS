const { Sequelize } = require('sequelize');
const db = require('../config/db');

const queryController = {
  executeQuery: async (req, res) => {
    const { query } = req.body;
    const currentPuzzle = req.body.currentPuzzle; // You'll need to send this from the frontend
    const currentBranch = req.body.currentBranch; // Optional

    let expectedResult;
    let notebookUpdate;
    let nextPuzzle;
    let branchPath;
    let timePenalty = 0;

    // Define logic to match the incoming query with expected outcomes
    // based on the current puzzle and branch. This will likely involve
    // checking against predefined correct and incorrect queries and their effects.

    // Example (very basic and needs to be expanded significantly):
    if (currentPuzzle === 1 && query.includes("vault_access_logs") && query.includes("COUNT(*)")) {
      expectedResult = [{ person_id: 'P1002', access_count: 2 }];
      notebookUpdate = 'Suspect: Lydia Crane (P1002). Note: Re-entered vault within minutes.';
      nextPuzzle = 2;
    } else if (currentPuzzle === 1 && query.includes("biometric")) {
      expectedResult = [{ access_id: 101, person_id: 'P1033' }];
      timePenalty = 30;
    } else if (currentPuzzle === 1 && query.includes("access_time > '2025-04-29 14:00:00'")) {
      expectedResult = [{ access_id: 104, person_id: 'P1100' }];
      branchPath = '/puzzle/1/forgery';
    } else {
      timePenalty = 30; // Default penalty for incorrect query
    }

    if (expectedResult) {
      res.json({ resultText: 'Query executed successfully.', table: expectedResult, notebookUpdate, next: nextPuzzle, branch: branchPath, timePenalty });
    } else {
      res.status(400).json({ error: 'Incorrect query or no specific outcome defined.', timePenalty });
    }

    // In a real application, you would use Sequelize to execute the
    // provided query against your SQL database and then determine
    // the game consequences based on the actual results.
    // The 'expectedResult' logic above is a placeholder for your game logic.
  },
};

module.exports = queryController;