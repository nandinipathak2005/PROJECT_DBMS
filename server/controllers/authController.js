// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
    /*signup: async (req, res) => {
        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) return res.status(400).json({ message: 'Username already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, password: hashedPassword, coins: 0 });
            res.status(201).json({ message: 'Signup successful', userId: newUser.id });
        } catch (err) {
            console.error("Signup Error:", err);
            res.status(500).json({ error: err.message });
        }
    },*/
    signup: async (req, res) => {
        const { username, password } = req.body;
        console.log("Signup request received:", username); // Log input

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                console.log("User already exists");
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                username,
                password: hashedPassword,
                coins: 100
            });

            console.log("User created:", newUser.username);
            res.status(201).json({ message: 'Signup successful', userId: newUser.id, coins: newUser.coins });

        } catch (err) {
            console.error("Signup Error:", err); // SHOW this in terminal
            res.status(500).json({ error: err.message });
        }
    },


    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

            res.status(200).json({ message: 'Login successful', userId: user.id, coins: user.coins });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    leaderboard: async (req, res) => {
        try {
            const topUsers = await User.findAll({
                order: [['coins', 'DESC']],
                limit: 10,
                attributes: ['username', 'coins'],
            });

            res.status(200).json(topUsers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = authController;
