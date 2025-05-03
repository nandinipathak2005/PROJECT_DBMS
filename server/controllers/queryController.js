// const { Sequelize } = require('sequelize');
// const db = require('../config/db');

// const queryController = {
//   executeQuery: async (req, res) => {
//     const { query } = req.body;
//     const currentPuzzle = req.body.currentPuzzle; // You'll need to send this from the frontend
//     const currentBranch = req.body.currentBranch; // Optional

//     let expectedResult;
//     let notebookUpdate;
//     let nextPuzzle;
//     let branchPath;
//     let timePenalty = 0;

//     // Define logic to match the incoming query with expected outcomes
//     // based on the current puzzle and branch. This will likely involve
//     // checking against predefined correct and incorrect queries and their effects.

//     // Example (very basic and needs to be expanded significantly):
//     if (currentPuzzle === 1 && query.includes("vault_access_logs") && query.includes("COUNT(*)")) {
//       expectedResult = [{ person_id: 'P1002', access_count: 2 }];

//       notebookUpdate = 'Suspect: Lydia Crane (P1002). Note: Re-entered vault within minutes.';
//       nextPuzzle = 2;
//     } else if (currentPuzzle === 1 && query.includes("biometric")) {
//       expectedResult = [{ access_id: 101, person_id: 'P1033' }];
//       timePenalty = 30;
//     } else if (currentPuzzle === 1 && query.includes("access_time > '2025-04-29 14:00:00'")) {
//       expectedResult = [{ access_id: 104, person_id: 'P1100' }];
//       branchPath = '/puzzle/1/forgery';
//     } else {
//       timePenalty = 30; // Default penalty for incorrect query
//     }

//     if (expectedResult) {
//       res.json({ resultText: 'Query executed successfully.', table: expectedResult, notebookUpdate, next: nextPuzzle, branch: branchPath, timePenalty });
//     } else {
//       res.status(400).json({ error: 'Incorrect query or no specific outcome defined.', timePenalty });
//     }

//     // In a real application, you would use Sequelize to execute the
//     // provided query against your SQL database and then determine
//     // the game consequences based on the actual results.
//     // The 'expectedResult' logic above is a placeholder for your game logic.
//   },
// };

// module.exports = queryController;
// const { Sequelize } = require('sequelize');
// const db = require('../config/db'); // your Sequelize instance

// const queryController = {
//   executeQuery: async (req, res) => {
//     const { query, currentPuzzle, currentBranch } = req.body;

//     let notebookUpdate;
//     let nextPuzzle;
//     let branchPath;
//     let timePenalty = 0;

//     try {
//       // 🧠 Execute the query from frontend
//       const [results, metadata] = await db.query(query);

//       // ✅ Logic based on actual query
//       if (currentPuzzle === 1 && query.includes("vault_access_logs") && query.includes("COUNT(*)")) {
//         const lydia = results.find(row => row.person_id === 'P1002' && row.access_count === 2);
//         if (lydia) {
//           notebookUpdate = 'Suspect: Lydia Crane (P1002). Note: Re-entered vault within minutes.';
//           nextPuzzle = 2;
//         }
//       } else if (currentPuzzle === 1 && query.includes("biometric")) {
//         timePenalty = 30;
//       } else if (currentPuzzle === 1 && query.includes("access_time > '2025-04-29 14:00:00'")) {
//         const match = results.find(row => row.person_id === 'P1100');
//         if (match) {
//           branchPath = '/puzzle/1/forgery';
//         }
//       } else {
//         timePenalty = 30; // default penalty
//       }

//       res.json({
//         resultText: 'Query executed successfully.',
//         table: results,
//         notebookUpdate,
//         next: nextPuzzle,
//         branch: branchPath,
//         timePenalty
//       });

//     } catch (err) {
//       console.error('Query error:', err);
//       res.status(400).json({ error: 'Query execution failed. Please check your SQL syntax.', timePenalty: 30 });
//     }
//   }
// };
// module.exports = queryController;

// const { Sequelize } = require('sequelize');
// const db = require('../config/db'); // your Sequelize instance

// const queryController = {
//   executeQuery: async (req, res) => {
//     const { query, currentPuzzle, currentBranch } = req.body;

//     let notebookUpdate;
//     let nextPuzzle;
//     let branchPath;
//     let timePenalty = 0;

//     try {
//       // 🧠 Execute the query from frontend
//       const [results, metadata] = await db.query(query);

//       // ✅ Logic based on actual query
//       if (currentPuzzle === 1 && query.includes("vault_access_logs") && query.includes("COUNT(*)")) {
//         const lydia = results.find(row => row.person_id === 'P1002' && row.access_count === 2);
//         if (lydia) {
//           notebookUpdate = 'Suspect: Lydia Crane (P1002). Note: Re-entered vault within minutes.';
//           nextPuzzle = 2;
//         }
//       } else if (currentPuzzle === 1 && query.includes("biometric")) {
//         timePenalty = 30;
//       } else if (currentPuzzle === 1 && query.includes("access_time > '2025-04-29 14:00:00'")) {
//         // If the query includes the time condition, navigate to the forgery branch
//         branchPath = '/puzzle/1/forgery';
//       } else {
//         timePenalty = 30; // default penalty
//       }

//       res.json({
//         resultText: 'Query executed successfully.',
//         table: results,
//         notebookUpdate,
//         next: nextPuzzle,
//         branch: branchPath,
//         timePenalty
//       });

//     } catch (err) {
//       console.error('Query error:', err);
//       res.status(400).json({ error: 'Query execution failed. Please check your SQL syntax.', timePenalty: 30 });
//     }
//   }
// };
// module.exports = queryController;

// const { Sequelize } = require('sequelize');
// const db = require('../config/db'); // your Sequelize instance

// const queryController = {
//   executeQuery: async (req, res) => {
//   console.log('Full req.body:', req.body);
//     const { query, currentPuzzle, currentBranch } = req.body;

//     let notebookUpdate;
//     let nextPuzzle;
//     let branchPath;
//     let timePenalty = 0;
//     let isCorrect = false;
//     let isMisleading = false;

//     try {
//       // 🧠 Execute the query from frontend
//       const [results, metadata] = await db.query(query);

//       // ✅ Logic for Puzzle 1
//       if (currentPuzzle === 1) {
//         if (query.includes("vault_access_logs") && query.includes("COUNT(*)")) {
//           const lydia = results.find(row => row.person_id === 'P1002' && row.access_count === 2);
//           if (lydia) {
//             notebookUpdate = 'Suspect: Lydia Crane (P1002). Note: Re-entered vault within minutes.';
//             nextPuzzle = 2;
//             isCorrect = true;
//           }
//         } else if (query.includes("biometric")) {
//           timePenalty = 30;
//         } else if (query.includes("access_time > '2025-04-29 14:00:00'")) {
//           branchPath = '/puzzle/1/forgery';
//           isMisleading = true; // Assuming this leads to a false lead initially
//         } else {
//           timePenalty = 30; // default penalty for other incorrect queries
//         }
//       }
//       // ✅ Logic for Puzzle 2
//       else if (currentPuzzle === 2) {
//         if (
//           query.includes("security_logs") &&
//           query.includes("device_registry") &&
//           query.includes("personnel") &&
//           query.includes("'P1033'") &&
//           query.includes("'footage corrupted'")
//         ) {
//           const axel = results.find(row => row.name && row.event_type === 'footage corrupted' && row.location);
// console.log('Query results:', results); // <--- Inspect the results
// console.log('Axel found:', axel); 
//           if (axel) {
//             notebookUpdate = 'Suspect: Axel Borne. Note: As the audio technician, he has access and knowledge of the security systems. His presence near the console during the corruption is highly suspicious.';
//             nextPuzzle = 3;
//             isCorrect = true;
//           } else {
//             timePenalty = 30; // Correct query structure but no matching data
//           }
//         } else if (query.includes("security_logs") && query.includes("'login'")) {
//           timePenalty = 30;
//         } else if (
//           query.includes("device_registry") &&
//           query.includes("security_logs") &&
//           query.includes("'Main Lobby'") &&
//           query.includes("'footage corrupted'")
//         ) {
//           branchPath = '/puzzle/2/stage-left';
//           isMisleading = true;
//         } else {
//           timePenalty = 30; // Default for other incorrect queries in puzzle 2
//         }
//       }
//       // Add logic for handling queries within branches of Puzzle 2 if needed
//       else if (currentPuzzle === 2 && currentBranch === 'false_lead_marcus') {
//         if (query.includes("TIME(sl.timestamp)") && query.includes("'P1067'") && query.includes("'footage corrupted'")) {
//           isMisleading = true; // Reinforcing the false lead
//           // You might want to provide specific feedback or a notebook update here
//         } else if (query.includes("ORDER BY timestamp DESC") && query.includes("security_logs")) {
//           timePenalty = 30; // Incorrect within the branch
//         } else if (query.includes("GROUP BY dr.location")) {
//           timePenalty = 30; // Incorrect within the branch
//         } else if (query.includes("TIME()")) {
//           // User selected the correct SQL function in the riddle
//           // You might want to provide positive feedback here, but the navigation
//           // should likely still depend on the subsequent query.
//         } else {
//           timePenalty = 30;
//         }
//       }

//       res.json({
//         resultText: 'Query executed successfully.',
//         table: results,
//         notebookUpdate,
//         next: nextPuzzle,
//         branch: branchPath,
//         timePenalty,
//         isCorrect,
//         isMisleading
//       });

//     } catch (err) {
//       console.error('Query error:', err);
//       res.status(400).json({ error: 'Query execution failed. Please check your SQL syntax.', timePenalty: 30 });
//     }
//   }
// };
// module.exports = queryController;

//shreyas version
const { Sequelize } = require('sequelize');
const db = require('../config/db');

const queryController = {
  executeQuery: async (req, res) => {
    const { query } = req.body;
    const currentPuzzle = req.body.currentPuzzle;
    const currentBranch = req.body.currentBranch;

    let expectedResult;
    let notebookUpdate;
    let nextPuzzle;
    let branchPath;
    let timePenalty = 0;

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
    }

    // // ✅ Puzzle 2 Logic (Modified)
    // else if (currentPuzzle === 2) {
    //   if (
    //     query.includes("SELECT p.name, sl.event_type, dr.location") &&
    //     query.includes("FROM security_logs sl") &&
    //     query.includes("JOIN device_registry dr ON sl.terminal_id = dr.terminal_id") &&
    //     query.includes("JOIN personnel p ON p.person_id = 'P1033'") &&
    //     query.includes("WHERE sl.event_type = 'footage corrupted'")
    //   ) {
    //     expectedResult = [
    //       { name: 'Axel Borne', event_type: 'footage corrupted', location: 'Security Room A - Console T-03' },
    //     ];
    //     notebookUpdate = 'Suspect: Axel Borne. Note: As the audio technician, he has access and knowledge of the security systems. His presence near the console during the corruption is highly suspicious.';
    //     nextPuzzle = 3;
    //   } else if (query.includes("SELECT * FROM security_logs WHERE event_type = 'login'")) {
    //     timePenalty = 30; // Incorrect query
    //   } else if (
    //     query.includes("SELECT * FROM device_registry dr") &&
    //     query.includes("JOIN security_logs sl ON dr.terminal_id = sl.terminal_id") &&
    //     query.includes("WHERE dr.location = 'Main Lobby'") &&
    //     query.includes("AND sl.event_type = 'footage corrupted'")
    //   ) {
    //     // Misleading query for Puzzle 2
    //     expectedResult = []; // Simulate an empty result
    //     branchPath = '/puzzle/2/stage-left';
    //     // No nextPuzzle here, the frontend will handle navigation on "Proceed"
    //   } else {
    //     timePenalty = 30; // Default penalty for other incorrect queries in Puzzle 2
    //   }
    // } else {
    //   timePenalty = 30; // Default penalty for incorrect puzzle context
    // }
    else if (currentPuzzle === 2) {
      try {
        const [results] = await db.query(query);
        expectedResult = results;
    
        // Check if the query is the intended correct one
        if (
          results.length > 0 &&
          results.some(r =>
            r.name === 'Axel Borne' &&
            r.event_type === 'footage corrupted' &&
            r.location?.includes('Security Room A')
          )
        ) {
          notebookUpdate = 'Suspect: Axel Borne. Note: As the audio technician, he has access and knowledge of the security systems. His presence near the console during the corruption is highly suspicious.';
          nextPuzzle = 3;
        } else if (query.includes("event_type = 'login'")) {
          timePenalty = 30;
        } else if (query.includes("Main Lobby") && query.includes("footage corrupted")) {
          branchPath = '/puzzle/2/stage-left';
        } else {
          timePenalty = 30;
        }
      } catch (err) {
        console.error('Query execution failed:', err);
        return res.status(400).json({ error: 'Failed to execute query.', timePenalty: 30 });
      }
    }
    if (expectedResult !== undefined) {
      res.json({
        resultText: 'Query executed successfully.',
        table: expectedResult,
        notebookUpdate,
        next: nextPuzzle,
        branch: branchPath,
        timePenalty,
      });
    } else {
      res.status(400).json({ error: 'Incorrect query or no specific outcome defined.', timePenalty });
    }
  },
};

module.exports = queryController;