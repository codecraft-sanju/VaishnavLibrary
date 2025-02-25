import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User"; // Ensure correct import

const Welcome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = UserData(); // Ensure UserData is correctly used
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('User detected, redirecting...'); // Debugging log
      navigate('/home'); // Redirect if logged in
    }
  }, [user, navigate]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleExploreClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Welcome Section */}
      <h1 className="mb-4 text-5xl font-bold text-center">
        Welcome to Vaishanav Library
      </h1>
      <p className="max-w-lg mb-6 text-lg text-center">
        Manage books, track members, and keep your library organized in one
        place.
      </p>
      <button
        onClick={handleExploreClick}
        className="px-6 py-2 font-semibold text-blue-600 transition bg-white rounded-lg shadow-lg hover:bg-gray-200"
      >
        Explore Library
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 text-center bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Please Log In First
            </h2>
            <p className="mb-6 text-gray-600">
              You need to log in to access the library management system.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="px-4 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600"
              >
                Log in
              </Link>
            </div>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-gray-700 transition bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;