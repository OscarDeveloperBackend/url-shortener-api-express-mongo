const mongoose = require("mongoose");

async function conect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbname: process.env.DB_NAME,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

module.exports = conect;
