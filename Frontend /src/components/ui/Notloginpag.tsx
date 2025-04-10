import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedInPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2">Welcome to YourApp</h1>
                <p className="text-gray-300">Please sign in or sign up to continue</p>
            </div>

            <div className="flex flex-col w-full max-w-xs gap-4">
                <Link
                    to="/signin"
                    className="w-full text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400"
                >
                    Sign In
                </Link>

                <Link
                    to="/signup"
                    className="w-full text-center bg-gradient-to-r from-green-400 to-emerald-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-green-500 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                    Sign Up
                </Link>
            </div>

            <div className="absolute bottom-5 text-sm text-gray-500">
                © 2025 YourApp. All rights reserved.
            </div>
        </div>
    );
};

export default NotLoggedInPage;
