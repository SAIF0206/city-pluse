const API_KEY = "KCnXerRGa4qnnVKxCpxjglDHvXfIsmv9";

export const searchEvents = async (keyword, city) => {
  try {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${keyword}&city=${city}`
    );
    const data = await res.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error("Ticketmaster API error:", error);
    return [];
  }
};
