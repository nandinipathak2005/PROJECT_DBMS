/*import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
console.log('DashboardPage loaded');

const DashboardPage = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
            //setCoins(user.coins);
        } else {
            navigate('/login');
        }
    }, []);*/
/*useEffect(() => {
    const userId = localStorage.getItem('userId');
    const coins = localStorage.getItem('coins');

    if (userId) {
        setUsername(`User ${userId}`);
        setCoins(coins || 0);
    } else {
        navigate('/');
    }
}, []);*/

/*
    const handleStartCase = () => {
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 text-center">
            <h1 className="text-4xl font-bold text-indigo-700">The Fatal Query</h1>
            <p className="text-lg mt-1 text-gray-600">Query the Clues. Crack the Riddles. Beat the Clock. Nab the Killer.</p>

            <div className="mt-6 flex justify-center gap-10">
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Welcome, {username}</h2>
                    <p>Coins: <span className="font-bold">{coins}</span></p>
                </div>
                <button
                    className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-500"
                    onClick={() => navigate('/leaderboard')}
                >
                    View Leaderboard
                </button>
                <button
                    className="bg-purple-600 text-white px-6 py-3 rounded shadow hover:bg-purple-500"
                    onClick={() => navigate('/profile')}
                >
                    Profile
                </button>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Stages</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <button
                        className="bg-green-600 text-white p-4 rounded shadow hover:bg-green-500"
                        onClick={handleStartCase}
                    >
                        Start Case: Murder at Midnight
                    </button>*/
{/* Future stage buttons can go here */ }
/*</div >
</div >
</div >
);
};

export default DashboardPage;
*/
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { Music, FileText, ChevronRight, Volume2, Clock, Database, GitBranch, Users, Trophy, UserCircle } from 'lucide-react';
import ss from '../assets/ss.png';
import vv from '../assets/vv.png';
import sw from '../assets/sw.png';
const DashboardPage = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState(0);
    const [username, setUsername] = useState('');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stages, setStages] = useState([
        { id: 0, title: 'Stolen Symphony', description: 'A Detective Miles Corbin Mystery', imageUrl: ss },
        { id: 1, title: 'The Vanished Violinist', description: 'A musical mystery.', imageUrl: vv },
        { id: 2, title: 'The Silent Witness', description: 'Uncover the truth.', imageUrl: sw },
    ]);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setUsername(user.username);
                setCoins(user.coins || 100); // Ensure coins is initialized
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            navigate('/'); // Redirect if there's an error with localStorage data
        }

        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, [navigate]); // Added navigate as dependency

    const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);

    const handleStartCase = (stageId) => {
        navigate(`/home${stageId}`); // Corrected template literal
    };

    const user = localStorage.getItem('user');
    if (!user) {
        return <div>Please log in.</div>;
    }

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>

            {/* Simple purple glow effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900 rounded-full opacity-20 blur-xl"></div>

            {/* Music themed overlay */}
            <div
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/api/placeholder/1200/800')", // Replace with your actual image URL
                    backgroundBlendMode: "overlay",
                }}
            />
            {/* Main content container with opacity transition */}
            <div className={`relative z-10 container mx-auto px-4 pt-8 pb-16 flex flex-col items-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header with navigation elements */}
                <div className="w-full flex justify-between items-center mb-8 px-4">
                    <div className="flex items-center gap-2">
                        <Music className="w-6 h-6 text-indigo-400" />
                        <span className="text-lg font-medium text-indigo-300">The Fatal Query</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <UserCircle
                                className="w-6 h-6 text-gray-300"
                                onClick={() => navigate('/profile')}
                            />
                            <span className="text-sm text-gray-300">{username}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Coin Icon */}
                            <Trophy className="w-6 h-6 text-yellow-400" />
                            <span className="text-sm text-yellow-400">{coins}</span>
                        </div>
                        <button
                            className="text-gray-300 hover:text-white transition-colors"
                            onClick={() => navigate('/leaderboard')}
                        >
                            <span className="sr-only">Leaderboard</span>
                            <Users className="w-6 h-6" />
                        </button>
                        <button
                            className={`p-3 rounded-full ${isAudioPlaying ? 'bg-indigo-700' : 'bg-gray-800'} hover:bg-indigo-600 transition-colors`}
                            onClick={toggleAudio}
                            aria-label="Toggle audio"
                        >
                            <Volume2 className={`w-5 h-5 ${isAudioPlaying ? 'text-indigo-300' : 'text-gray-300'}`} />
                        </button>
                    </div>
                </div>

                {/* Game title with better styling */}
                <div className="mt-8 mb-10 text-center">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-wider text-white">
                        <span className="text-indigo-300">THE</span> FATAL
                    </h1>
                    <h2 className="text-7xl md:text-9xl font-serif italic mt-2 tracking-tight text-purple-300">
                        QUERY
                    </h2>
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
                        <span className="text-xl font-light text-gray-300">Query the Clues. Crack the Riddles. Beat the Clock. Nab the Killer.</span>
                        <div className="w-12 h-1 bg-indigo-700 rounded-full"></div>
                    </div>
                </div>

                {/* Stages Section */}
                <div className="mt-10 w-full">
                    <h3 className="text-3xl font-semibold mb-6 text-indigo-300 text-center">Cases</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stages.map((stage) => (
                            <div
                                key={stage.id}
                                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-600 transition-colors shadow-md flex flex-col items-start justify-between"
                                onClick={() => handleStartCase(stage.id)}
                            >
                                {stage.imageUrl && (
                                    <div className="w-full h-48 rounded-md mb-4">
                                        <img
                                            src={stage.imageUrl}
                                            alt={stage.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                )}
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">{stage.title}</h4>
                                        <p className="text-gray-400 text-sm">{stage.description}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Game features with better cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-900 rounded-lg">
                                <Clock className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-medium text-indigo-300">20 mins</h3>
                        </div>
                        <p className="text-gray-400">Solve the mystery before time runs out and the trail goes cold</p>
                    </div>

                    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-900 rounded-lg">
                                <Database className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-medium text-indigo-300">SQL Queries</h3>
                        </div>
                        <p className="text-gray-400">Use your database skills to uncover hidden clues and connections</p>
                    </div>

                    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-800 hover:border-indigo-700 transition-colors shadow-lg group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-900 rounded-lg">
                                <GitBranch className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-medium text-indigo-300">Multiple Paths</h3>
                        </div>
                        <p className="text-gray-400">Each decision leads to different story branches and outcomes</p>
                    </div>
                </div>

                {/* Footer element */}
                <div className="mt-20 text-center text-gray-500">
                    <p>Unmask the culprit. Recover the score. Restore the harmony.</p>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
