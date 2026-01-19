import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";

const DB_FILE = "./database.db";

(async () => {
  // Apagar banco anterior, se existir
  if (fs.existsSync(DB_FILE)) {
    console.log("🧹 Removendo banco anterior...");
    fs.unlinkSync(DB_FILE);
  }

  // Conectar e criar novo banco
  const db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  console.log("🧱 Criando tabelas...");

// Tabela de pacientes
await db.run(`
  CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data_nascimento TEXT,
    telefone TEXT,
    historico TEXT,
    observacoes TEXT,
    diabetes INTEGER,
    cardiovascular INTEGER,
    hipertensao INTEGER,
    alergias TEXT,
    medicamentos TEXT
  )
`);

// Tabela de atendimentos
await db.run(`
  CREATE TABLE IF NOT EXISTS atendimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER,
    data_atendimento TEXT,
    procedimento TEXT,
    observacoes TEXT,
    FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
  )
`);

  console.log("✅ Banco de dados criado com sucesso!");
  await db.close();
})();
