import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok " });
});

const port = 3001;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
