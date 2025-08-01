import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const API_KEY = "KCnXerRGa4qnnVKxCpxjglDHvXfIsmv9";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorited = (id) => favorites.some((e) => e.id === id);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!event) return <div className="text-center mt-20">Event not found</div>;

  const venue = event._embedded?.venues?.[0];
  const location = venue?.location;
  const mapUrl = location
    ? `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`
    : null;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded shadow p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <img
            src={event.images?.[0]?.url}
            alt={event.name}
            className="rounded w-full h-64 object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold">{event.name}</h1>
            <button
              onClick={() => toggleFavorite(event)}
              className={`text-2xl ${
                isFavorited(event.id) ? "text-red-500" : "text-gray-400"
              }`}
              title="Favorite"
            >
              ♥
            </button>
          </div>

          <p className="mt-2 text-gray-600">
            Date: {event.dates?.start?.localDate} at{" "}
            {event.dates?.start?.localTime}
          </p>

          {venue && (
            <>
              <p className="text-gray-600 mt-2 font-semibold">Venue:</p>
              <p className="text-gray-700">
                {venue.name}, {venue.city?.name}, {venue.country?.name}
              </p>
              <p className="text-sm text-gray-500">{venue.address?.line1}</p>
            </>
          )}

          {event.info && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-1">Details:</h3>
              <p className="text-sm text-gray-600">{event.info}</p>
            </div>
          )}
        </div>
      </div>

      {mapUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Location Map
          </h2>
          <iframe
            title="Google Map"
            src={mapUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default EventDetails;
