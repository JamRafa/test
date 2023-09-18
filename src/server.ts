import express from "express";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

const firebaseConfig = {
  apiKey: "AIzaSyAnT-E77StOZY05pvI8hKIus35x5dgC2UE",
  authDomain: "encontro-a2dfd.firebaseapp.com",
  projectId: "encontro-a2dfd",
  storageBucket: "encontro-a2dfd.appspot.com",
  messagingSenderId: "264660272963",
  appId: "1:264660272963:web:95c0b38734d31a953491f6",
  measurementId: "G-8JV3CFQH4R",
};

const fireBaseApp = initializeApp(firebaseConfig);
const db = getDatabase(fireBaseApp);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});

const port = process.env.PORT ?? 4000;

app.get("/inscritos", async (req, res) => {
  try {
    //const db = getDatabase();

    const inscritosRef = ref(db, "inscritos");

    const snapshot = await get(inscritosRef);

    if (snapshot.exists()) {
      const inscritos = snapshot.val();

      res.json(inscritos);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error("Erro ao obter dados do Firebase:", err);
    res.status(500).json({ error: "Erro ao obter dados do Firebase" });
  }
});

app.post("/inscritos", async (req, res) => {
  console.log(req.body);
  try {
    req.body.id = uuidv4();
    req.body.pagamento = false;
    const newInscrito = req.body;

    const db = getDatabase();

    const inscritosRef = ref(db, "inscritos");

    const novoInscritoRef = push(inscritosRef, newInscrito);

    const novoInscritoKey = novoInscritoRef.key;

    res.json({ id: novoInscritoKey, ...newInscrito });
  } catch (err) {
    console.error("Erro ao adicionar novo inscrito:", err);
    res.status(500).json({ error: "Erro ao adicionar novo inscrito" });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
