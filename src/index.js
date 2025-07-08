require("dotenv").config();

const express = require("express");
const conect = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd ? process.env.BASE_URL : `http://localhost:${PORT}`;

conect();
app.use(express.json());
const urlsRoutes = require("./routes/urls");

app.use("/urls", urlsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no válida ❌" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${BASE_URL}`);
});
