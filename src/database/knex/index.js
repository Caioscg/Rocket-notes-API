const config = require("../../../knexfile")
const knex = require("knex")

const connection = knex(config.development)  //*? para conectar o knex com o banco de dados

module.exports = connection
