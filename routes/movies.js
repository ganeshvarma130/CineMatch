const router = require("express").Router();
const { readDB } = require("../data/db");

const TYPES = new Set(["movie", "anime"]);
const SORTS = new Set(["rating", "year", "title"]);

function numberParam(value, fallback, { min = 0, max = 100 } = {}) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function clean(value, max = 80) {
  return String(value || "").trim().slice(0, max);
}

function findMovies(query = {}) {
  let movies = readDB("movies");
  const type = clean(query.type).toLowerCase();
  const genre = clean(query.genre).toLowerCase();
  const q = clean(query.q, 100).toLowerCase();

  if (type) movies = movies.filter(movie => movie.type === type);
  if (genre) movies = movies.filter(movie => movie.genre.some(item => item.toLowerCase() === genre));
  if (q) movies = movies.filter(movie => [movie.title, movie.description, ...movie.genre]
    .some(value => String(value).toLowerCase().includes(q)));
  return movies;
}

function sortMovies(movies, sort = "rating", order) {
  const safeSort = SORTS.has(sort) ? sort : "rating";
  const safeOrder = order === "asc" || order === "desc"
    ? order
    : safeSort === "title" ? "asc" : "desc";
  return [...movies].sort((a, b) => {
    const left = safeSort === "title" ? a.title.localeCompare(b.title) : (a[safeSort] || 0) - (b[safeSort] || 0);
    return safeOrder === "asc" ? left : -left;
  });
}

function similarityScore(target, candidate) {
  const overlap = candidate.genre.filter(genre => target.genre.includes(genre)).length * 2;
  const sameType = target.type === candidate.type ? 1 : 0;
  const closeYear = Math.abs(target.year - candidate.year) <= 5 ? 0.5 : 0;
  return overlap + sameType + closeYear;
}

function pageResult(items, page, limit) {
  const total = items.length;
  if (!limit) return { total, page: 1, pages: 1, count: total, movies: items };
  const pages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, pages);
  const start = (safePage - 1) * limit;
  return { total, page: safePage, pages, count: Math.min(limit, Math.max(0, total - start)), movies: items.slice(start, start + limit) };
}

router.get("/", (req, res) => {
  const type = clean(req.query.type).toLowerCase();
  if (type && !TYPES.has(type)) return res.status(400).json({ error: "Type must be 'movie' or 'anime'." });
  const sort = clean(req.query.sort).toLowerCase() || "rating";
  if (!SORTS.has(sort)) return res.status(400).json({ error: "Sort must be 'rating', 'year', or 'title'." });
  const movies = sortMovies(findMovies(req.query), sort, clean(req.query.order).toLowerCase() || undefined);
  const limit = numberParam(req.query.limit, 0, { min: 0, max: 100 });
  const page = numberParam(req.query.page, 1, { min: 1, max: 100000 });
  res.json(pageResult(movies, page, limit));
});

router.get("/search", (req, res) => {
  const query = clean(req.query.q, 100);
  if (!query) return res.status(400).json({ error: "Query param 'q' is required." });
  const movies = sortMovies(findMovies({ q: query }), "rating", "desc");
  res.json({ query, count: movies.length, movies });
});

router.get("/genres", (req, res) => {
  const movies = readDB("movies");
  const counts = movies.flatMap(movie => movie.genre).reduce((result, genre) => {
    result[genre] = (result[genre] || 0) + 1;
    return result;
  }, {});
  const genres = Object.keys(counts).sort((a, b) => a.localeCompare(b));
  res.json({ count: genres.length, genres, counts });
});

router.get("/stats", (req, res) => {
  const movies = readDB("movies");
  const byType = movies.reduce((result, movie) => {
    result[movie.type] = (result[movie.type] || 0) + 1;
    return result;
  }, {});
  res.json({ total: movies.length, byType, averageRating: Number((movies.reduce((sum, movie) => sum + Number(movie.rating || 0), 0) / Math.max(1, movies.length)).toFixed(2)) });
});

router.get("/top-rated", (req, res) => {
  const type = clean(req.query.type).toLowerCase();
  if (type && !TYPES.has(type)) return res.status(400).json({ error: "Type must be 'movie' or 'anime'." });
  const limit = numberParam(req.query.limit, 10, { min: 1, max: 100 });
  const movies = sortMovies(findMovies({ type }), "rating", "desc").filter(movie => Number(movie.rating) > 0).slice(0, limit);
  res.json({ count: movies.length, movies });
});

router.get("/discover", (req, res) => {
  const type = clean(req.query.type).toLowerCase();
  if (type && !TYPES.has(type)) return res.status(400).json({ error: "Type must be 'movie' or 'anime'." });
  const limit = numberParam(req.query.limit, 12, { min: 1, max: 100 });
  const movies = sortMovies(findMovies({ type }), "year", "desc").slice(0, limit);
  res.json({ count: movies.length, movies });
});

router.get("/type/:type", (req, res) => {
  const type = clean(req.params.type).toLowerCase();
  if (!TYPES.has(type)) return res.status(400).json({ error: "Type must be 'movie' or 'anime'." });
  const movies = sortMovies(findMovies({ type }), "rating", "desc");
  res.json({ type, count: movies.length, movies });
});

router.get("/:id/similar", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Movie id must be an integer." });
  const movies = readDB("movies");
  const target = movies.find(movie => movie.id === id);
  if (!target) return res.status(404).json({ error: `Movie with id ${id} not found.` });
  const limit = numberParam(req.query.limit, 8, { min: 1, max: 50 });
  const similar = movies.filter(movie => movie.id !== id)
    .map(movie => ({ movie, score: similarityScore(target, movie) }))
    .sort((a, b) => b.score - a.score || b.movie.rating - a.movie.rating)
    .slice(0, limit).map(({ movie }) => movie);
  res.json({ basedOn: target.title, count: similar.length, movies: similar });
});

router.get("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Movie id must be an integer." });
  const movie = readDB("movies").find(item => item.id === id);
  if (!movie) return res.status(404).json({ error: `Movie with id ${id} not found.` });
  res.json(movie);
});

module.exports = router;
