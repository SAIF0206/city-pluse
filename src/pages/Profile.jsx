import React from "react";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/avatar.jpg";
import bgImage from "../assets/abu-dhabi.jpg";

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading user profile...</p>
      </div>
    );
  }

  const createdAt = new Date(currentUser.metadata.creationTime);
  const accountAgeInDays = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/0 backdrop-blur"></div>

      <div className="relative z-10 p-4">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={currentUser.photoURL || avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
              {currentUser.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-500">{currentUser.email}</p>
          </div>

          <div className="border-t border-gray-300 pt-4 text-sm text-gray-700">
            <h3 className="text-md font-medium mb-2 text-gray-600">
              Account Info
            </h3>
            <p>
              <span className="font-semibold">Email:</span> {currentUser.email}
            </p>
            <p>
              <span className="font-semibold">Account Created:</span>{" "}
              {createdAt.toLocaleDateString()} ({accountAgeInDays} days ago)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
