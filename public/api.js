(function createCineMatchApi(global) {
  const API_BASE = String(global.CINEMATCH_API_BASE || "/api").replace(/\/$/, "");
  const REQUEST_TIMEOUT_MS = 10000;

  function getUserId() {
    const key = "cinematch_userId";
    let id = global.localStorage.getItem(key);
    if (!id) {
      id = `user_${global.crypto?.randomUUID?.() || `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`}`;
      global.localStorage.setItem(key, id);
    }
    return id;
  }

  function queryString(options = {}) {
    return new URLSearchParams(Object.entries(options).filter(([, value]) => value !== undefined && value !== null && value !== "")).toString();
  }

  async function http(method, route, body) {
    const controller = new AbortController();
    const timer = global.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const options = {
      method,
      signal: controller.signal,
      headers: { Accept: "application/json" },
    };
    if (body !== undefined) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    try {
      const response = await global.fetch(API_BASE + route, options);
      const text = await response.text();
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch (_) { data = { message: text }; }
      if (!response.ok) {
        const error = new Error(data.error || data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.requestId = response.headers.get("x-request-id") || data.requestId;
        throw error;
      }
      return data;
    } catch (error) {
      if (error.name === "AbortError") throw new Error("CineMatch API request timed out.");
      throw error;
    } finally {
      global.clearTimeout(timer);
    }
  }

  const get = route => http("GET", route);
  const post = (route, body) => http("POST", route, body);
  const put = (route, body) => http("PUT", route, body);
  const del = route => http("DELETE", route);
  const userPath = id => `/users/${encodeURIComponent(id)}`;

  global.API = {
    baseUrl: API_BASE,
    health: () => get("/health"),
    movies: {
      all(options = {}) {
        const query = queryString(options);
        return get(`/movies${query ? `?${query}` : ""}`);
      },
      search(query) { return get(`/movies/search?q=${encodeURIComponent(query)}`); },
      genres() { return get("/movies/genres"); },
      stats() { return get("/movies/stats"); },
      discover(options = {}) {
        const query = queryString(options);
        return get(`/movies/discover${query ? `?${query}` : ""}`);
      },
      topRated(options = {}) {
        const query = queryString(options);
        return get(`/movies/top-rated${query ? `?${query}` : ""}`);
      },
      byType(type) { return get(`/movies/type/${encodeURIComponent(type)}`); },
      byId(id) { return get(`/movies/${encodeURIComponent(id)}`); },
      similar(id, limit = 8) { return get(`/movies/${encodeURIComponent(id)}/similar?limit=${encodeURIComponent(limit)}`); },
    },
    user: {
      id: getUserId(),
      get() { return get(userPath(this.id)); },
      saveProfile(profile) { return put(`${userPath(this.id)}/profile`, profile); },
      getFavorites() { return get(`${userPath(this.id)}/favorites`); },
      addFavorite(movieId) { return post(`${userPath(this.id)}/favorites/${encodeURIComponent(movieId)}`); },
      removeFavorite(movieId) { return del(`${userPath(this.id)}/favorites/${encodeURIComponent(movieId)}`); },
      async toggleFavorite(movie) {
        const { favorites } = await this.getFavorites();
        const exists = favorites.some(item => item.id === movie.id);
        if (exists) { await this.removeFavorite(movie.id); return false; }
        await this.addFavorite(movie.id); return true;
      },
      getRatings() { return get(`${userPath(this.id)}/ratings`); },
      setRating(movieId, rating) { return put(`${userPath(this.id)}/ratings/${encodeURIComponent(movieId)}`, { rating }); },
      removeRating(movieId) { return del(`${userPath(this.id)}/ratings/${encodeURIComponent(movieId)}`); },
    },
  };
})(window);
