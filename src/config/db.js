const mongoose = require("mongoose");

async function conect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

module.exports = conect;
