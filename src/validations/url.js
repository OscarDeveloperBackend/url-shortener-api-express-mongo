const axios = require("axios");

async function verificarUrlExiste(url) {
  try {
    await axios.get(url);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = verificarUrlExiste;
