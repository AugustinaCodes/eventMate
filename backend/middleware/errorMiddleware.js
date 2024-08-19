export function errMiddleware(err, req, res, next) {
  if (err) {
    res.status(500).json({ error: "Something went wrong!" });
    console.error(err.stack);
  }
}
