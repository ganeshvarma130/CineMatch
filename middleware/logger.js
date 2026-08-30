// ─────────────────────────────────────────────
//  middleware/logger.js
//  Logs every request: METHOD  /path  STATUS  Xms
// ─────────────────────────────────────────────
function logger(req, res, next) {
  const start = Date.now();

  // Run AFTER the response is sent so we can log the status code
  res.on("finish", () => {
    const ms     = Date.now() - start;
    const status = res.statusCode;
    const color  = status >= 500 ? "\x1b[31m"   // red
                 : status >= 400 ? "\x1b[33m"   // yellow
                 : status >= 200 ? "\x1b[32m"   // green
                 : "\x1b[0m";

    console.log(
      `${color}${req.method}\x1b[0m ${req.originalUrl.padEnd(45)} ${color}${status}\x1b[0m  ${ms}ms`
    );
  });

  next();
}

module.exports = logger;
