require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const logger = require("./middleware/logger");
const moviesRouter = require("./routes/movies");
const usersRouter = require("./routes/users");
const { databaseStatus } = require("./data/db");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "*")
  .split(",").map(origin => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.set("json spaces", 2);

app.use(cors({
  origin(origin, callback) {
    if (!origin || CLIENT_ORIGINS.includes("*") || CLIENT_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS."));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Request-Id"],
}));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json({ limit: "100kb", strict: true }));
app.use(logger);
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use("/api/movies", moviesRouter);
app.use("/api/users", usersRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "cinematch-api",
    version: process.env.npm_package_version || "1.0.0",
    time: new Date().toISOString(),
    database: databaseStatus(),
  });
});

app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found.",
    method: req.method,
    path: req.path,
    requestId: req.requestId,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || (err.type === "entity.parse.failed" ? 400 : 500);
  const message = status < 500 ? err.message : "Internal server error.";
  if (status >= 500) console.error(err);
  res.status(status).json({ error: message, requestId: req.requestId });
});

function start() {
  return app.listen(PORT, () => {
    console.log(`CineMatch API listening on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

if (require.main === module) start();

module.exports = { app, start };
