//TODO arq criado com 'npx knex migrate: make createNotes (precisa do mrigations criado corretamente no knexfile)
//! cria tabelas ed forma automatizada
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id")  // autoincrements
    table.text("title")     // tipo text
    table.text("description") // tipo text
    table.integer("user_id").references("id").inTable("users")  // user_id que faz referencia ao id do users // tipo int

    table.timestamp("create_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")


//TODO 'npx knex migrrate:latest' para criar
//TODO após criar o atalho no package.json é só rodar npm run migrate