// ═════════════════════════════════════════════
//  server.js  —  CineMatch Backend
//  Stack: Node.js + Express + JSON file storage
// ═════════════════════════════════════════════
const express = require("express");
const cors    = require("cors");
const path    = require("path");

const logger     = require("./middleware/logger");
const moviesRouter = require("./routes/movies");
const usersRouter  = require("./routes/users");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────

// Allow your frontend (opened as a local file or
// on a different port) to call this API.
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Log every request
app.use(logger);

// ── Serve frontend static files ───────────────
// Put your index.html / style.css / script.js /
// posters/ folder INSIDE a "public" sub-folder
// next to server.js, and they'll be served here.
app.use(express.static(path.join(__dirname, "public")));

// ── API Routes ────────────────────────────────
app.use("/api/movies", moviesRouter);
app.use("/api/users",  usersRouter);

// ── Health check ──────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status  : "ok",
    message : "CineMatch API is running 🎬",
    time    : new Date().toISOString(),
  });
});

// ── 404 handler ───────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ──────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// ── Start ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬  CineMatch backend running`);
  console.log(`    Local:  http://localhost:${PORT}`);
  console.log(`    Health: http://localhost:${PORT}/api/health\n`);
});
