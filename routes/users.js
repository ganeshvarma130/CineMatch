const router = require("express").Router();
const { readDB, writeDB } = require("../data/db");

function userKey(value) {
  const id = String(value || "").trim();
  if (!/^[a-zA-Z0-9_-]{1,120}$/.test(id)) return null;
  return id;
}

function movieId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function getOrCreate(userId) {
  const users = readDB("users");
  if (!users[userId]) {
    users[userId] = {
      id: userId,
      profile: { name: "", email: "", phone: "" },
      favorites: [],
      ratings: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    writeDB("users", users);
  }
  return { users, user: users[userId] };
}

function requireUser(req, res, next) {
  const id = userKey(req.params.userId);
  if (!id) return res.status(400).json({ error: "User id may contain only letters, numbers, underscores, and hyphens." });
  req.userId = id;
  next();
}

function requireMovie(req, res, next) {
  const id = movieId(req.params.movieId);
  if (!id) return res.status(400).json({ error: "Movie id must be a positive integer." });
  req.movieId = id;
  next();
}

function saved(users, user) {
  user.updatedAt = new Date().toISOString();
  writeDB("users", users);
}

router.use("/:userId", requireUser);

router.get("/:userId", (req, res) => {
  const { user } = getOrCreate(req.userId);
  res.json(user);
});

router.put("/:userId/profile", (req, res) => {
  const name = String(req.body?.name || "").trim().slice(0, 80);
  const email = String(req.body?.email || "").trim().slice(0, 160);
  const phone = String(req.body?.phone || "").trim().slice(0, 32);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }
  const { users, user } = getOrCreate(req.userId);
  user.profile = { name, email, phone };
  saved(users, user);
  res.json({ message: "Profile saved.", profile: user.profile, updatedAt: user.updatedAt });
});

router.get("/:userId/favorites", (req, res) => {
  const { user } = getOrCreate(req.userId);
  const movies = readDB("movies");
  const favorites = user.favorites.map(id => movies.find(movie => movie.id === id)).filter(Boolean);
  res.json({ count: favorites.length, favorites });
});

router.post("/:userId/favorites/:movieId", requireMovie, (req, res) => {
  const movie = readDB("movies").find(item => item.id === req.movieId);
  if (!movie) return res.status(404).json({ error: "Movie not found." });
  const { users, user } = getOrCreate(req.userId);
  const alreadySaved = user.favorites.includes(req.movieId);
  if (!alreadySaved) {
    user.favorites.push(req.movieId);
    saved(users, user);
  }
  res.status(alreadySaved ? 200 : 201).json({ message: alreadySaved ? "Movie was already in favorites." : "Added to favorites.", movieId: req.movieId, favorite: true });
});

router.delete("/:userId/favorites/:movieId", requireMovie, (req, res) => {
  const { users, user } = getOrCreate(req.userId);
  const hadFavorite = user.favorites.includes(req.movieId);
  user.favorites = user.favorites.filter(id => id !== req.movieId);
  if (hadFavorite) saved(users, user);
  res.json({ message: hadFavorite ? "Removed from favorites." : "Movie was not in favorites.", movieId: req.movieId, favorite: false });
});

router.get("/:userId/ratings", (req, res) => {
  const { user } = getOrCreate(req.userId);
  res.json({ count: Object.keys(user.ratings).length, ratings: user.ratings });
});

router.put("/:userId/ratings/:movieId", requireMovie, (req, res) => {
  const rating = Number(req.body?.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be an integer between 1 and 5." });
  }
  if (!readDB("movies").some(movie => movie.id === req.movieId)) {
    return res.status(404).json({ error: "Movie not found." });
  }
  const { users, user } = getOrCreate(req.userId);
  user.ratings[String(req.movieId)] = rating;
  saved(users, user);
  res.json({ message: "Rating saved.", movieId: req.movieId, rating });
});

router.delete("/:userId/ratings/:movieId", requireMovie, (req, res) => {
  const { users, user } = getOrCreate(req.userId);
  const key = String(req.movieId);
  const hadRating = Object.prototype.hasOwnProperty.call(user.ratings, key);
  delete user.ratings[key];
  if (hadRating) saved(users, user);
  res.json({ message: hadRating ? "Rating removed." : "Rating did not exist.", movieId: req.movieId });
});

module.exports = router;
