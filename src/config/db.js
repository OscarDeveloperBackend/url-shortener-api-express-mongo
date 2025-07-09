const mongoose = require("mongoose");

async function conect() {
  try {
    console.log("🔍 Variables de entorno:");
    console.log("MONGO_URL existe:", !!process.env.MONGO_URL);
    console.log("DB_NAME:", process.env.DB_NAME);

    console.log("🔗 Intentando conectar...");
    await mongoose.connect(process.env.MONGO_URL, {
      dbname: process.env.DB_NAME,
      connectTimeoutMS: 30000, // 30 segundos
      serverSelectionTimeoutMS: 30000, // 30 segundos
    });

    console.log("✅ Conectado exitosamente");

    // Resto del código...
  } catch (error) {
    console.error("❌ Error específico:", error.name);
    console.error("❌ Mensaje:", error.message);
    process.exit(1);
  }
}

module.exports = conect;
