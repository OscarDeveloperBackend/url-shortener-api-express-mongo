const express = require("express");
const routes = express.Router();
const Url = require("../models/Url");

const verificarUrlExiste = require("../validations/url");

function generarCodigo() {
  const caracteres =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let resultado = "";

  for (let i = 0; i < 5; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indice];
  }

  return resultado;
}

routes.get("/", async (req, res) => {
  try {
    const data = await Url.find();

    if (data.length === 0) {
      return res.status(200).json({ message: "No existe data." });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routes.post("/", async (req, res) => {
  try {
    const { url_base } = req.body;

    const esValida = await verificarUrlExiste(url_base);
    if (!esValida) {
      return res
        .status(400)
        .json({ message: "La URL proporcionada no existe o no responde." });
    }

    const data = await Url.findOne({ url_base: url_base });
    if (data)
      return res
        .status(200)
        .json({ message: "Url recortada", url_recortada: data.url_recortada });

    let codigo;
    while (true) {
      codigo = generarCodigo();
      const respuesta = await Url.findOne({ codigo: codigo });
      if (!respuesta) {
        break;
      }
    }

    const BASE_URL =
      process.env.NODE_ENV === "production"
        ? process.env.BASE_URL
        : `http://localhost:${process.env.PORT || 3000}`;

    let u = `${BASE_URL}/urls/redict/${codigo}`;

    const url_create = await Url.create({
      url_base: url_base,
      url_recortada: u,
      codigo: codigo,
      n_cliks: 0,
    });

    res.status(201).json({
      message: "URL recortada con éxito",
      url_recortada: url_create.url_recortada,
      url_create,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routes.get("/redict/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;

    const url = await Url.findOne({ codigo: codigo });

    if (!url) {
      return res.status(404).json({ message: "Url no valida" });
    }

    url.n_cliks++;
    await url.save();

    res.redirect(url.url_base);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = routes;
