// ─────────────────────────────────────────────
//  routes/users.js
//  Base path: /api/users
//
//  All data is keyed by userId (passed in the URL).
//  No auth — the frontend stores the userId in
//  localStorage and sends it with every request.
//
//  GET  /:userId                        → get full user record
//  PUT  /:userId/profile                → save name / email / phone
//
//  GET  /:userId/favorites              → list favorites
//  POST /:userId/favorites/:movieId     → add to favorites
//  DELETE /:userId/favorites/:movieId   → remove from favorites
//
//  GET  /:userId/ratings                → list all ratings
//  PUT  /:userId/ratings/:movieId       → set rating (1-5)
//  DELETE /:userId/ratings/:movieId     → remove rating
// ─────────────────────────────────────────────
const router  = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readDB, writeDB } = require("../data/db");

// ── helpers ──────────────────────────────────

/** Get an existing user or create an empty one on the fly. */
function getOrCreate(userId) {
  const users = readDB("users");
  if (!users[userId]) {
    users[userId] = {
      id        : userId,
      profile   : { name: "", email: "", phone: "" },
      favorites : [],   // array of movie ids
      ratings   : {},   // { movieId: 1-5 }
      createdAt : new Date().toISOString(),
    };
    writeDB("users", users);
  }
  return { users, user: users[userId] };
}

// ── GET /api/users/:userId ────────────────────
router.get("/:userId", (req, res) => {
  const { user } = getOrCreate(req.params.userId);
  res.json(user);
});

// ── PUT /api/users/:userId/profile ────────────
// Body: { name, email, phone }
router.put("/:userId/profile", (req, res) => {
  const { name = "", email = "", phone = "" } = req.body;
  const { users, user } = getOrCreate(req.params.userId);

  user.profile = { name, email, phone };
  writeDB("users", users);

  res.json({ message: "Profile saved.", profile: user.profile });
});

// ── GET /api/users/:userId/favorites ──────────
router.get("/:userId/favorites", (req, res) => {
  const { user } = getOrCreate(req.params.userId);
  // Enrich with full movie objects
  const movies = readDB("movies");
  const enriched = user.favorites
    .map(id => movies.find(m => m.id === id))
    .filter(Boolean);
  res.json({ count: enriched.length, favorites: enriched });
});

// ── POST /api/users/:userId/favorites/:movieId ─
router.post("/:userId/favorites/:movieId", (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  const movies  = readDB("movies");
  const movie   = movies.find(m => m.id === movieId);
  if (!movie) return res.status(404).json({ error: "Movie not found." });

  const { users, user } = getOrCreate(req.params.userId);
  if (!user.favorites.includes(movieId)) {
    user.favorites.push(movieId);
    writeDB("users", users);
  }
  res.json({ message: "Added to favorites.", movieId });
});

// ── DELETE /api/users/:userId/favorites/:movieId
router.delete("/:userId/favorites/:movieId", (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  const { users, user } = getOrCreate(req.params.userId);

  user.favorites = user.favorites.filter(id => id !== movieId);
  writeDB("users", users);

  res.json({ message: "Removed from favorites.", movieId });
});

// ── GET /api/users/:userId/ratings ────────────
router.get("/:userId/ratings", (req, res) => {
  const { user } = getOrCreate(req.params.userId);
  res.json({ ratings: user.ratings });
});

// ── PUT /api/users/:userId/ratings/:movieId ───
// Body: { rating: 1-5 }
router.put("/:userId/ratings/:movieId", (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  const rating  = parseInt(req.body.rating, 10);

  if (isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be an integer between 1 and 5." });
  }

  const movies = readDB("movies");
  if (!movies.find(m => m.id === movieId)) {
    return res.status(404).json({ error: "Movie not found." });
  }

  const { users, user } = getOrCreate(req.params.userId);
  user.ratings[movieId] = rating;
  writeDB("users", users);

  res.json({ message: "Rating saved.", movieId, rating });
});

// ── DELETE /api/users/:userId/ratings/:movieId ─
router.delete("/:userId/ratings/:movieId", (req, res) => {
  const movieId = String(req.params.movieId);
  const { users, user } = getOrCreate(req.params.userId);

  delete user.ratings[movieId];
  writeDB("users", users);

  res.json({ message: "Rating removed.", movieId });
});

module.exports = router;
