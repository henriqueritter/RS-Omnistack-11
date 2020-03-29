const crypto = require('crypto'); //pacote do NODE, sera usado para gerar a ID da ONG

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX'); //ira gerar uma string aleatoria de 4 bytes que sera convertida para HEXA;
}