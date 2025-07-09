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
  res.status(200).json({
    conection: `${BASE_URL}`,
    mongourl: `${process.env.MONGO_URL}`,
    url: `${process.env.MONGO_URL}/${process.env.DB_NAME}`,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo en ${BASE_URL}`);
});
