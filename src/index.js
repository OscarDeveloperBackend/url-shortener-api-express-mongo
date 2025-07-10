require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const conect = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd ? process.env.BASE_URL : `http://localhost:${PORT}`;

// conect();

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ Conectado a MongoDB");
});

db.on("error", (error) => {
  console.log(process.env.MONGO_URL);

  console.error("❌ Error de conexión:", error);
});

app.use(express.json());
const urlsRoutes = require("./routes/urls");

app.use("/urls", urlsRoutes);

app.use((req, res) => {
  res.status(200).json({
    conection: `${BASE_URL}`,
    mongourl: `${process.env.MONGO_URL}`,
    url: `${process.env.MONGO_URL}/${process.env.DB_NAME}`,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo en ${BASE_URL}`);
});
