const express = require('express');
const gameRoutes = require('./game');
const queryRoutes = require('./query');
const characterRoutes = require('./characters');
const puzzleRoutes = require('./puzzles');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Use the appropriate routes
router.use('/game', gameRoutes);
router.use('/query', queryRoutes);
router.use('/characters', characterRoutes); // Ensure this matches the frontend
router.use('/puzzles', puzzleRoutes);
router.use('/auth', authRoutes);

module.exports = router;
