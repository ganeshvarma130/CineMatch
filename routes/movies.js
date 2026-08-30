// ─────────────────────────────────────────────
//  routes/movies.js
//  Base path: /api/movies
//
//  GET  /                   → all movies (filter/sort via query)
//  GET  /search?q=          → search by title or genre
//  GET  /genres             → list every unique genre
//  GET  /top-rated          → top N by rating
//  GET  /type/:type         → movies OR anime
//  GET  /:id                → single movie by id
//  GET  /:id/similar        → similar movies (genre-overlap score)
// ─────────────────────────────────────────────
const router = require("express").Router();
const { readDB } = require("../data/db");

// ── helpers ──────────────────────────────────

/** Score how similar two movies are (same algorithm as your frontend). */
function similarityScore(a, b) {
  const genreOverlap = b.genre.filter(g => a.genre.includes(g)).length * 2;
  const sameType     = a.type === b.type ? 1 : 0;
  const closeYear    = Math.abs(a.year - b.year) < 5 ? 0.5 : 0;
  return genreOverlap + sameType + closeYear;
}

/** Parse an integer query param with a default. */
function intParam(val, def) {
  const n = parseInt(val, 10);
  return isNaN(n) ? def : n;
}

// ── GET /api/movies ───────────────────────────
// Query params:
//   type   = movie | anime
//   genre  = Action | Sci-Fi | ...
//   sort   = rating | year | title
//   order  = asc | desc      (default desc for rating/year, asc for title)
//   limit  = number          (default: all)
//   page   = number          (default: 1, works with limit)
router.get("/", (req, res) => {
  let movies = readDB("movies");

  // — filter —
  if (req.query.type)  movies = movies.filter(m => m.type  === req.query.type);
  if (req.query.genre) movies = movies.filter(m => m.genre.includes(req.query.genre));

  // — sort —
  const sort  = req.query.sort  || "rating";
  const order = req.query.order || (sort === "title" ? "asc" : "desc");

  movies.sort((a, b) => {
    let cmp = 0;
    if (sort === "rating") cmp = a.rating - b.rating;
    else if (sort === "year") cmp = a.year - b.year;
    else if (sort === "title") cmp = a.title.localeCompare(b.title);
    return order === "asc" ? cmp : -cmp;
  });

  // — paginate —
  const limit = intParam(req.query.limit, 0);   // 0 = no limit
  const page  = intParam(req.query.page,  1);

  const total = movies.length;
  if (limit > 0) {
    const start = (page - 1) * limit;
    movies = movies.slice(start, start + limit);
  }

  res.json({
    total,
    page   : limit > 0 ? page  : 1,
    pages  : limit > 0 ? Math.ceil(total / limit) : 1,
    count  : movies.length,
    movies,
  });
});

// ── GET /api/movies/search ────────────────────
// Query params: q (required)
router.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  if (!q) return res.status(400).json({ error: "Query param 'q' is required." });

  const movies = readDB("movies");
  const results = movies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.genre.some(g => g.toLowerCase().includes(q)) ||
    m.description.toLowerCase().includes(q)
  );

  res.json({ query: q, count: results.length, movies: results });
});

// ── GET /api/movies/genres ────────────────────
router.get("/genres", (req, res) => {
  const movies = readDB("movies");
  const genres = [...new Set(movies.flatMap(m => m.genre))].sort();
  res.json({ genres });
});

// ── GET /api/movies/top-rated ─────────────────
// Query params: limit (default 10), type (optional)
router.get("/top-rated", (req, res) => {
  let movies = readDB("movies");
  if (req.query.type) movies = movies.filter(m => m.type === req.query.type);

  const limit = intParam(req.query.limit, 10);
  movies = movies
    .filter(m => m.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  res.json({ count: movies.length, movies });
});

// ── GET /api/movies/type/:type ────────────────
router.get("/type/:type", (req, res) => {
  const { type } = req.params;
  if (!["movie", "anime"].includes(type)) {
    return res.status(400).json({ error: "Type must be 'movie' or 'anime'." });
  }
  const movies = readDB("movies").filter(m => m.type === type);
  res.json({ type, count: movies.length, movies });
});

// ── GET /api/movies/:id ───────────────────────
router.get("/:id", (req, res) => {
  const id     = parseInt(req.params.id, 10);
  const movies = readDB("movies");
  const movie  = movies.find(m => m.id === id);
  if (!movie) return res.status(404).json({ error: `Movie with id ${id} not found.` });
  res.json(movie);
});

// ── GET /api/movies/:id/similar ──────────────
// Query params: limit (default 8)
router.get("/:id/similar", (req, res) => {
  const id     = parseInt(req.params.id, 10);
  const movies = readDB("movies");
  const target = movies.find(m => m.id === id);
  if (!target) return res.status(404).json({ error: `Movie with id ${id} not found.` });

  const limit = intParam(req.query.limit, 8);

  const similar = movies
    .filter(m => m.id !== id)
    .map(m => ({ ...m, _score: similarityScore(target, m) }))
    .sort((a, b) => b._score - a._score || b.rating - a.rating)
    .slice(0, limit)
    .map(({ _score, ...m }) => m);   // strip internal score field

  res.json({ basedOn: target.title, count: similar.length, movies: similar });
});

module.exports = router;
