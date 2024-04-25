import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import data from "./articleData.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8888;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/articleData", (req, res) => {
  res.json(data);
});

app.get("/formatedArticle", (req, res) => {
  res.sendFile(path.join(__dirname, "/formatedArticle.js"));
});

app.get("/stylesheet", (req, res) => {
  res.type("text/css").sendFile(path.join(__dirname, "/stylesheet.css"));
});

app.listen(PORT, () => {
  console.log(
    "Server is Successfully Running, and App is listening on port " + PORT
  );
});
