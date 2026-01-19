import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Configurações
app.use(bodyParser.json());
app.use(express.static("public"));

// Banco de dados
const dbPromise = open({
  filename: "database.db",
  driver: sqlite3.Database,
});

// Inicialização do banco
async function initDB() {
  const db = await dbPromise;

  await db.exec(`
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
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS atendimentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_id INTEGER,
      data_atendimento TEXT,
      procedimento TEXT,
      observacoes TEXT,
      FOREIGN KEY(paciente_id) REFERENCES pacientes(id)
    );
  `);
}
initDB();

// Rotas -------------------------------

// 📋 Listar pacientes
app.get("/api/pacientes", async (req, res) => {
  const db = await dbPromise;
  const pacientes = await db.all("SELECT * FROM pacientes ORDER BY nome");
  res.json(pacientes);
});

// ➕ Adicionar paciente
app.post("/api/pacientes", async (req, res) => {
  const {
    nome,
    data_nascimento,
    telefone,
    historico,
    observacoes,
    diabetes,
    cardiovascular,
    hipertensao,
    alergias,
    medicamentos,
  } = req.body;

  try {
    const db = await dbPromise;
    await db.run(
      `INSERT INTO pacientes 
      (nome, data_nascimento, telefone, historico, observacoes, diabetes, cardiovascular, hipertensao, alergias, medicamentos)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        data_nascimento,
        telefone,
        historico,
        observacoes,
        diabetes ? 1 : 0,
        cardiovascular ? 1 : 0,
        hipertensao ? 1 : 0,
        alergias,
        medicamentos,
      ]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro ao salvar paciente:", err);
    res.status(500).json({ error: "Erro ao salvar paciente" });
  }
});

// 🧾 Salvar atendimento
app.post("/api/atendimentos", async (req, res) => {
  const { paciente_id, data_atendimento, procedimento, observacoes } = req.body;
  try {
    const db = await dbPromise;
    await db.run(
      `INSERT INTO atendimentos (paciente_id, data_atendimento, procedimento, observacoes)
       VALUES (?, ?, ?, ?)`,
      [paciente_id, data_atendimento, procedimento, observacoes]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erro ao salvar atendimento:", err);
    res.status(500).json({ error: "Erro ao salvar atendimento" });
  }
});

// 📖 Buscar histórico de atendimentos por paciente
app.get("/api/atendimentos/:pacienteId", async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const db = await dbPromise;
    const atendimentos = await db.all(
      "SELECT * FROM atendimentos WHERE paciente_id = ? ORDER BY data_atendimento DESC",
      [pacienteId]
    );
    res.json(atendimentos);
  } catch (err) {
    console.error("Erro ao carregar atendimentos:", err);
    res.status(500).json({ error: "Erro ao carregar atendimentos" });
  }
});

// -------------------------------------

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
