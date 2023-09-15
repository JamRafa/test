import express from "express";

const app = express();
app.use(express.json());

const port = process.env.PORT ?? 4000;

// Rota GET para listar inscritos
app.get("/inscritos", (req, res) => {
  // Supondo que você tenha um arquivo "db.json" com os dados
  const inscritos = require("../db.json").inscritos;
  res.json(inscritos);
});

// Rota POST para criar um novo inscrito
app.post("/inscritos", (req, res) => {
  try {
    const newInscrito = req.body;

    const oldInscritos = require("../db.json").inscritos;
    console.log(oldInscritos);

    const db = require("./db.json");
    db.inscritos.push(...oldInscritos, newInscrito);

    const fs = require("fs");
    fs.writeFile("./db.json", JSON.stringify(db, null, 2), (err: any) => {
      if (err) {
        console.error("Erro ao escrever o arquivo JSON:", err);
      } else {
        console.log("Arquivo JSON atualizado com sucesso.");
      }
    });

    res.json(newInscrito);
  } catch (err) {
    console.log(err, "nao deu");
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
