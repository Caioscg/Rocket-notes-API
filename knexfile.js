const path = require("path")

//TODO arq criado a partir do comando 'npx knex init', mas modificado na linha 1 e 8 pra frente
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    migrations: {   // tem que ter esse nome pra criar certo
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
