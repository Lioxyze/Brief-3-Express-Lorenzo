import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function connectToDatabase() {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      time INTEGER,
      difficulty INTEGER,
      budget INTEGER,
      description TEXT
    );
  `);

  return db;
}

