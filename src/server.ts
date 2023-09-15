import express from 'express'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 4000


// Rota GET para listar inscritos
app.get("/inscritos", (req, res) => {
  // Supondo que você tenha um arquivo "db.json" com os dados
  const inscritos = require("./db.json").inscritos;
  res.json(inscritos);
});

// Rota POST para criar um novo inscrito
app.post("/inscritos", (req, res) => {
  const newInscrito = req.body;

  // Supondo que você tenha um arquivo "db.json" com os dados
  const db = require("./db.json");
  db.inscritos.push(newInscrito);

  // Salvar a atualização no arquivo "db.json"
  const fs = require("fs");
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));

  res.json(newInscrito);
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});