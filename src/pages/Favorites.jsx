import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all favorite events?"
    );
    if (confirmed) {
      clearFavorites();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        {favorites.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-500">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
          <p className="mb-4">
            You haven’t added any events to your favorites.
          </p>
          <Link
            to="/home"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
