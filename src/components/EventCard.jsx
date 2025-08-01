import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorited = favorites.some((fav) => fav.id === event.id);

  const venue = event._embedded?.venues?.[0];
  const date = event.dates?.start?.localDate;

  return (
    <div
      className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer relative"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <img
        src={event.images?.[0]?.url}
        alt={event.name}
        className="h-40 w-full object-cover rounded-t"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">
          {event.name}
        </h3>
        <p className="text-sm text-gray-600">{date}</p>
        <p className="text-sm text-gray-500 truncate">{venue?.name}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(event);
        }}
        className={`absolute top-3 right-3 text-xl ${
          isFavorited ? "text-red-500" : "text-gray-400"
        }`}
        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        ♥
      </button>
    </div>
  );
};

export default EventCard;
