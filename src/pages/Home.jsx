import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useFavorites } from "../context/FavoritesContext";

const API_KEY = "KCnXerRGa4qnnVKxCpxjglDHvXfIsmv9";

const Home = () => {
  const { lang, toggleLanguage } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${keyword}&city=${city}`
      );
      const data = await res.json();
      const events = data._embedded?.events || [];
      setEvents(events);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const isFavorited = (id) => favorites.some((e) => e.id === id);

  return (
    <div className="flex-1 px-6 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">🎫 City Pulse</h1>
        <p className="text-gray-600">
          {lang === "en"
            ? "Search for events by keyword and city"
            : "ابحث عن الفعاليات حسب الكلمة والمدينة"}
        </p>
        <button
          onClick={toggleLanguage}
          className="mt-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          {lang === "en" ? "Switch to Arabic" : "Switch to English"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={lang === "en" ? "Event" : "الفعالية"}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder={lang === "en" ? "City" : "المدينة"}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={fetchEvents}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          {lang === "en" ? "Search" : "ابحث"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">
            {lang === "en" ? "Loading events..." : "جاري تحميل الفعاليات..."}
          </p>
        ) : events.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            {lang === "en"
              ? "No events found. Try searching!"
              : "لم يتم العثور على فعاليات"}
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded shadow hover:shadow-lg cursor-pointer overflow-hidden transition"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <img
                src={event.images?.[0]?.url}
                alt={event.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 relative">
                <h2 className="text-lg font-bold">{event.name}</h2>
                <p className="text-sm text-gray-600">
                  {event.dates?.start?.localDate}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {event._embedded?.venues?.[0]?.name}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event);
                  }}
                  className={`absolute top-3 right-3 text-xl ${
                    isFavorited(event.id) ? "text-red-500" : "text-gray-400"
                  }`}
                  title={
                    isFavorited(event.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  ♥
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
