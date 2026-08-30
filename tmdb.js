// tmdb.js
// CineMatch TMDB API helper

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function tmdbFetch(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TMDB API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// Search for a movie
async function searchMovie(title) {
  const query = encodeURIComponent(title);

  return tmdbFetch(
    `/search/movie?query=${query}&language=en-US&include_adult=false`
  );
}

// Search for a TV/anime title
async function searchTV(title) {
  const query = encodeURIComponent(title);

  return tmdbFetch(
    `/search/tv?query=${query}&language=en-US&include_adult=false`
  );
}

module.exports = {
  searchMovie,
  searchTV,
};