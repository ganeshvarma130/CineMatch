// ═════════════════════════════════════════════
//  api.js  —  CineMatch Frontend API Client
//  Drop this file next to your script.js and
//  add  <script src="api.js"></script>  in your
//  HTML BEFORE script.js.
//
//  Every function returns a Promise, so you can:
//    const movies = await API.movies.all();
//    await API.user.saveProfile({ name, email, phone });
// ═════════════════════════════════════════════

const API_BASE = "http://localhost:3000/api";

// ── userId ────────────────────────────────────
// We generate one UUID per browser and store it
// in localStorage so the same user is recognised
// across page reloads.
function getUserId() {
  let id = localStorage.getItem("cinematch_userId");
  if (!id) {
    // Simple UUID-like id (no library needed in browser)
    id = "user_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("cinematch_userId", id);
  }
  return id;
}

// ── low-level fetch wrapper ───────────────────
async function http(method, path, body) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const res  = await fetch(API_BASE + path, opts);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "API error");
  return data;
}

// ── Shorthand helpers ─────────────────────────
const get    = p       => http("GET",    p);
const post   = (p, b)  => http("POST",   p, b);
const put    = (p, b)  => http("PUT",    p, b);
const del    = p       => http("DELETE", p);

// ═════════════════════════════════════════════
//  Public API object — attach to window so your
//  existing script.js can call window.API.*
// ═════════════════════════════════════════════
window.API = {

  // ── Movies ─────────────────────────────────

  movies: {
    /** All movies. Options: { type, genre, sort, order, limit, page } */
    all(opts = {}) {
      const q = new URLSearchParams(opts).toString();
      return get("/movies" + (q ? "?" + q : ""));
    },

    /** Search by title / genre / description. */
    search(query) {
      return get(`/movies/search?q=${encodeURIComponent(query)}`);
    },

    /** All unique genres. */
    genres() {
      return get("/movies/genres");
    },

    /** Top-rated movies. Optionally pass { type, limit }. */
    topRated(opts = {}) {
      const q = new URLSearchParams(opts).toString();
      return get("/movies/top-rated" + (q ? "?" + q : ""));
    },

    /** Single movie by id. */
    byId(id) {
      return get(`/movies/${id}`);
    },

    /** Similar movies. Optionally pass { limit }. */
    similar(id, limit = 8) {
      return get(`/movies/${id}/similar?limit=${limit}`);
    },
  },

  // ── User ───────────────────────────────────

  user: {
    id: getUserId(),

    /** Get full user record (profile + favorites + ratings). */
    get() {
      return get(`/users/${this.id}`);
    },

    /** Save profile. Pass { name, email, phone }. */
    saveProfile(profile) {
      return put(`/users/${this.id}/profile`, profile);
    },

    // — Favorites —

    /** List favorites (returns full movie objects). */
    getFavorites() {
      return get(`/users/${this.id}/favorites`);
    },

    /** Add a movie to favorites. */
    addFavorite(movieId) {
      return post(`/users/${this.id}/favorites/${movieId}`);
    },

    /** Remove a movie from favorites. */
    removeFavorite(movieId) {
      return del(`/users/${this.id}/favorites/${movieId}`);
    },

    /** Toggle favorite (add if missing, remove if present). */
    async toggleFavorite(movie) {
      const { favorites } = await this.getFavorites();
      const exists = favorites.some(f => f.id === movie.id);
      if (exists) {
        await this.removeFavorite(movie.id);
        return false;   // now NOT a favorite
      } else {
        await this.addFavorite(movie.id);
        return true;    // now IS a favorite
      }
    },

    // — Ratings —

    /** Get all ratings. Returns { ratings: { movieId: 1-5 } }. */
    getRatings() {
      return get(`/users/${this.id}/ratings`);
    },

    /** Save a star rating (1-5). */
    setRating(movieId, rating) {
      return put(`/users/${this.id}/ratings/${movieId}`, { rating });
    },

    /** Remove a rating. */
    removeRating(movieId) {
      return del(`/users/${this.id}/ratings/${movieId}`);
    },
  },
};

console.log("✅ CineMatch API client ready. User ID:", window.API.user.id);
