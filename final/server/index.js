import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "data.json");

async function readSessions() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeSessions(sessions) {
  await fs.writeFile(DATA_FILE, JSON.stringify(sessions, null, 2));
}


// GET /api/sessions
app.get("/api/sessions", async (req, res) => {
  const sessions = await readSessions();
  res.json(sessions);
});

// POST /api/sessions
app.post("/api/sessions", async (req, res) => {
  const { mode, workTime, breakTime } = req.body;

  if (!mode || !workTime || !breakTime) {
    return res.status(400).json({ error: "Invalid session data." });
  }

  const sessions = await readSessions();
  const newSession = {
    id: sessions.length ? sessions[sessions.length - 1].id + 1 : 1,
    mode,
    workTime,
    breakTime,
    completedAt: new Date().toISOString(),
  };

  sessions.push(newSession);
  await writeSessions(sessions);

  res.status(201).json(newSession);
});

app.get("/", (req, res) => {
  res.send("StudyTimer+ backend is running.");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
